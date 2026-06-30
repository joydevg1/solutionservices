from flask import Blueprint, request, jsonify, g
from store import data_store
from utils.auth import (
    issue_token,
    require_auth,
    require_role,
    can_assign_admin,
    validate_email,
    sanitize_text,
    ADMIN_EMAILS,
)

users_bp = Blueprint("users", __name__)
VALID_ROLES = ["admin", "subscriber", "customer"]


@users_bp.route("/session", methods=["POST", "OPTIONS"])
def session():
    if request.method == "OPTIONS":
        return "", 204

    data = request.get_json() or {}
    name = sanitize_text(data.get("name"), 120)
    email = validate_email(data.get("email"))
    role = data.get("role")
    admin_key = data.get("adminKey", "")

    if not name or not email or not role:
        return jsonify({"message": "Valid name, email, and role are required."}), 400

    if role not in VALID_ROLES:
        return jsonify({"message": "Invalid role. Use admin, subscriber, or customer."}), 400

    existing = data_store.list_users() or []
    existing = next((u for u in existing if u["email"] == email), None)

    if role == "admin":
        if not can_assign_admin(email, admin_key):
            return jsonify({"message": "Admin access denied. Check email and admin key."}), 403
    elif existing and existing.get("role") == "admin":
        return jsonify({"message": "This account is admin-only. Sign in with admin credentials."}), 403

    try:
        user = data_store.upsert_user(name, email, role)
        token = issue_token(user)
    except RuntimeError as exc:
        return jsonify({"message": str(exc)}), 503

    return jsonify({"user": user, "token": token}), 200


@users_bp.route("/", methods=["GET"])
@require_role("admin")
def list_all_users():
    return jsonify(data_store.list_users()), 200


@users_bp.route("/<int:user_id>/role", methods=["PATCH", "OPTIONS"])
@require_auth
def patch_role(user_id):
    if request.method == "OPTIONS":
        return "", 204

    if g.current_user["id"] != user_id:
        return jsonify({"message": "You can only update your own account."}), 403

    data = request.get_json() or {}
    role = data.get("role")

    if role != "subscriber":
        return jsonify({"message": "Only upgrade to subscriber is allowed."}), 400

    if g.current_user["role"] not in ("customer",):
        return jsonify({"message": "Account is already upgraded or not eligible."}), 400

    user = data_store.update_user_role(user_id, role)
    if not user:
        return jsonify({"message": "User not found."}), 404

    token = issue_token(user)
    return jsonify({"user": user, "token": token}), 200

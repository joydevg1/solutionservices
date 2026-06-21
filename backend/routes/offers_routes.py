from flask import Blueprint, request, jsonify
from store import data_store
from utils.auth import require_role, sanitize_text

offers_bp = Blueprint("offers", __name__)


@offers_bp.route("/", methods=["GET", "OPTIONS"])
def list_offers():
    if request.method == "OPTIONS":
        return "", 204
    return jsonify(data_store.list_offers()), 200


@offers_bp.route("/", methods=["POST"])
@require_role("admin")
def create_offer():
    data = request.get_json() or {}
    if not data.get("title") or data.get("discountPercent") is None:
        return jsonify({"message": "Title and discountPercent required."}), 400

    try:
        discount = int(data["discountPercent"])
        if discount < 0 or discount > 90:
            raise ValueError()
    except (TypeError, ValueError):
        return jsonify({"message": "discountPercent must be 0-90."}), 400

    offer = data_store.add_offer(
        {
            "title": sanitize_text(data["title"], 120),
            "discountPercent": discount,
            "serviceId": int(data["serviceId"]) if data.get("serviceId") else None,
            "role": data.get("role", "subscriber"),
        }
    )
    return jsonify(offer), 201

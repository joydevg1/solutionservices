from flask import Blueprint, request, jsonify, g
from store import data_store
from utils.auth import require_auth, require_role, validate_booking_items, sanitize_text

bookings_bp = Blueprint("bookings", __name__)
ALLOWED_STATUSES = ["pending_approval", "approved", "rejected", "completed"]


@bookings_bp.route("/", methods=["POST", "GET", "OPTIONS"])
@require_auth
def bookings_root():
    if request.method == "OPTIONS":
        return "", 204

    if request.method == "GET":
        if g.current_user["role"] == "admin":
            status = request.args.get("status")
            return jsonify(data_store.list_bookings(status=status or None)), 200

        return jsonify(data_store.list_bookings(user_id=g.current_user["id"])), 200

    data = request.get_json() or {}
    user_id = data.get("userId")

    if user_id != g.current_user["id"]:
        return jsonify({"message": "Cannot create bookings for another user."}), 403

    location = sanitize_text(data.get("location"), 300)
    address = sanitize_text(data.get("address"), 500)
    items = data.get("items")

    if not location or not address or not validate_booking_items(items):
        return jsonify({"message": "Invalid booking data."}), 400

    booking = data_store.create_booking(
        {
            "userId": g.current_user["id"],
            "userName": sanitize_text(g.current_user.get("name") or data.get("userName"), 120),
            "userEmail": g.current_user["email"],
            "userRole": g.current_user["role"],
            "phone": sanitize_text(data.get("phone"), 20),
            "location": location,
            "address": address,
            "items": items,
            "totalAmount": min(
                float(data.get("totalAmount") or sum(i.get("price", 0) for i in items)),
                10_000_000,
            ),
        }
    )
    return jsonify(
        {"message": "Booking submitted. Waiting for admin approval.", "booking": booking}
    ), 201


@bookings_bp.route("/<int:booking_id>/status", methods=["PATCH", "OPTIONS"])
@require_role("admin")
def update_status(booking_id):
    if request.method == "OPTIONS":
        return "", 204

    data = request.get_json() or {}
    status = data.get("status")
    if status not in ALLOWED_STATUSES:
        return jsonify({"message": "Invalid status."}), 400

    booking = data_store.update_booking_status(booking_id, status)
    if not booking:
        return jsonify({"message": "Booking not found."}), 404

    return jsonify({"booking": booking, "updatedBy": g.current_user["id"]}), 200

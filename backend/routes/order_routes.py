from flask import Blueprint, request, jsonify, g
from store import data_store
from utils.auth import require_auth, validate_booking_items, sanitize_text

order_bp = Blueprint("order", __name__)


@order_bp.route("/", methods=["POST", "OPTIONS"])
@require_auth
def place_order():
    if request.method == "OPTIONS":
        return "", 204

    data = request.get_json() or {}
    address = sanitize_text(data.get("address"), 500)
    location = sanitize_text(data.get("location") or address, 300)
    services = data.get("services")
    total_amount = data.get("totalAmount")

    if not address:
        return jsonify({"message": "Missing required order fields."}), 400

    items = services if services else [{"name": "Service", "price": total_amount or 0}]
    if not validate_booking_items(items):
        return jsonify({"message": "Invalid order items."}), 400

    booking = data_store.create_booking(
        {
            "userId": g.current_user["id"],
            "userName": sanitize_text(g.current_user.get("name"), 120),
            "userEmail": g.current_user["email"],
            "userRole": g.current_user["role"],
            "phone": sanitize_text(data.get("customerPhone"), 20),
            "location": location,
            "address": address,
            "items": items,
            "totalAmount": min(
                float(total_amount or sum(i.get("price", 0) for i in items)),
                10_000_000,
            ),
        }
    )

    return jsonify(
        {
            "message": "Booking submitted. Waiting for admin approval.",
            "orderId": booking["id"],
            "booking": booking,
        }
    ), 200

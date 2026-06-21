from flask import Blueprint, request, jsonify
from store import data_store
from utils.auth import require_role, sanitize_text

catalog_bp = Blueprint("catalog", __name__)


@catalog_bp.route("/custom", methods=["GET", "OPTIONS"])
def list_custom_services():
    if request.method == "OPTIONS":
        return "", 204
    return jsonify(data_store.list_custom_services()), 200


@catalog_bp.route("/custom", methods=["POST"])
@require_role("admin")
def create_custom_service():
    data = request.get_json() or {}
    if not data.get("title") or not data.get("category") or data.get("basePrice") is None:
        return jsonify({"message": "title, category, and basePrice required."}), 400

    try:
        base_price = float(data["basePrice"])
        if base_price < 0 or base_price > 1_000_000:
            raise ValueError()
    except (TypeError, ValueError):
        return jsonify({"message": "Invalid basePrice."}), 400

    service = data_store.add_custom_service(
        {
            "title": sanitize_text(data["title"], 120),
            "category": sanitize_text(data["category"], 80),
            "description": sanitize_text(data.get("description"), 500),
            "basePrice": base_price,
            "subscriberPrice": float(data["subscriberPrice"])
            if data.get("subscriberPrice") is not None
            else None,
        }
    )
    return jsonify(service), 201

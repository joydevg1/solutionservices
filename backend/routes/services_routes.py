from flask import Blueprint, request, jsonify, g
from recommendation import generate_recommendations
from store import data_store
from utils.pricing import merge_catalog
from utils.auth import effective_role, get_bearer_token, decode_token
import jwt
import asyncio

services_bp = Blueprint("services", __name__)


def _resolve_role():
    token = get_bearer_token()
    if token:
        try:
            payload = decode_token(token)
            return payload.get("role", "customer")
        except jwt.PyJWTError:
            pass
    return effective_role()


@services_bp.route("/", methods=["GET", "OPTIONS"])
def get_services():
    if request.method == "OPTIONS":
        return "", 204

    role = _resolve_role()
    offers = data_store.list_offers()
    custom = data_store.list_custom_services()
    return jsonify(merge_catalog(custom, role, offers)), 200


@services_bp.route("/recommendations", methods=["GET", "OPTIONS"])
def get_recommendations():
    if request.method == "OPTIONS":
        return "", 204

    email = request.args.get("email")
    role = _resolve_role()

    try:
        purchases = []
        if email:
            bookings = data_store.list_bookings()
            purchases = [
                item["name"]
                for b in bookings
                if b.get("userEmail") == email.lower() and b.get("status") == "approved"
                for item in b.get("items", [])
            ]

        recommendations = asyncio.run(
            generate_recommendations(purchases if purchases else None)
        )
        offers = data_store.list_offers()
        enriched = merge_catalog([], role, offers)
        matched = [s for s in enriched if any(r["id"] == s["id"] for r in recommendations)]
        return jsonify(matched if matched else recommendations), 200

    except Exception as e:
        print(f"Error generating recommendations: {e}")
        return jsonify({"message": "Unable to generate recommendations."}), 500

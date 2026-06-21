"""Authentication and authorization helpers."""
import os
import re
from datetime import datetime, timedelta
from functools import wraps

import jwt
from flask import g, jsonify, request

JWT_SECRET = os.getenv("JWT_SECRET", "")
JWT_EXPIRE_HOURS = int(os.getenv("JWT_EXPIRE_HOURS", "168"))  # 7 days
ADMIN_BOOTSTRAP_KEY = os.getenv("ADMIN_BOOTSTRAP_KEY", "")
ADMIN_EMAILS = {
    e.strip().lower()
    for e in os.getenv("ADMIN_EMAILS", "admin@example.com").split(",")
    if e.strip()
}

EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


def _ensure_secret():
    if not JWT_SECRET or JWT_SECRET in ("secret_key", "change-this-in-production"):
        if os.getenv("FLASK_ENV") == "production" or os.getenv("NODE_ENV") == "production":
            raise RuntimeError("JWT_SECRET must be set to a strong value in production.")


def issue_token(user):
    _ensure_secret()
    payload = {
        "sub": str(user["id"]),
        "email": user["email"],
        "role": user["role"],
        "name": user["name"],
        "exp": datetime.utcnow() + timedelta(hours=JWT_EXPIRE_HOURS),
        "iat": datetime.utcnow(),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm="HS256")


def decode_token(token):
    _ensure_secret()
    return jwt.decode(token, JWT_SECRET, algorithms=["HS256"])


def get_bearer_token():
    header = request.headers.get("Authorization", "")
    if not header.startswith("Bearer "):
        return None
    return header[7:].strip()


def load_current_user(required=False):
    token = get_bearer_token()
    if not token:
        if required:
            return None
        g.current_user = None
        return None
    try:
        payload = decode_token(token)
        g.current_user = {
            "id": int(payload["sub"]),
            "email": payload["email"],
            "role": payload["role"],
            "name": payload.get("name", ""),
        }
        return g.current_user
    except jwt.PyJWTError:
        g.current_user = None
        return None if not required else None


def require_auth(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        token = get_bearer_token()
        if not token:
            return jsonify({"message": "Authentication required."}), 401
        try:
            payload = decode_token(token)
            g.current_user = {
                "id": int(payload["sub"]),
                "email": payload["email"],
                "role": payload["role"],
                "name": payload.get("name", ""),
            }
        except jwt.PyJWTError:
            return jsonify({"message": "Invalid or expired token."}), 401
        return f(*args, **kwargs)

    return wrapper


def require_role(*roles):
    def decorator(f):
        @wraps(f)
        @require_auth
        def wrapper(*args, **kwargs):
            if g.current_user["role"] not in roles:
                return jsonify({"message": "Insufficient permissions."}), 403
            return f(*args, **kwargs)

        return wrapper

    return decorator


def effective_role():
    if getattr(g, "current_user", None):
        return g.current_user["role"]
    role = request.args.get("role", "customer")
    return role if role in ("customer", "subscriber", "admin") else "customer"


def can_assign_admin(email, admin_key):
    if not ADMIN_BOOTSTRAP_KEY:
        return False
    if not admin_key or admin_key != ADMIN_BOOTSTRAP_KEY:
        return False
    return email.strip().lower() in ADMIN_EMAILS


def validate_email(email):
    email = (email or "").strip().lower()
    if not email or len(email) > 254 or not EMAIL_RE.match(email):
        return None
    return email


def sanitize_text(value, max_len=500):
    if value is None:
        return ""
    text = str(value).strip()
    return text[:max_len]


def validate_booking_items(items):
    if not isinstance(items, list) or not items or len(items) > 50:
        return False
    for item in items:
        if not isinstance(item, dict):
            return False
        name = sanitize_text(item.get("name"), 200)
        if not name:
            return False
        try:
            price = float(item.get("price", 0))
        except (TypeError, ValueError):
            return False
        if price < 0 or price > 1_000_000:
            return False
    return True

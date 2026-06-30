from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

from db_init import setup_database

print("Starting backend initialization...")
setup_database()

from routes.auth_routes import auth_bp
from routes.services_routes import services_bp
from routes.order_routes import order_bp
from routes.chat_routes import chat_bp
from routes.admin_routes import admin_bp
from routes.users_routes import users_bp
from routes.bookings_routes import bookings_bp
from routes.offers_routes import offers_bp
from routes.catalog_routes import catalog_bp

app = Flask(__name__)
app.url_map.strict_slashes = False

allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000")
origin_list = [o.strip() for o in allowed_origins.split(",") if o.strip()]

# Allow Cloudflare Pages preview URLs and custom domain variants.
CORS_ORIGIN_PATTERNS = [
    r"https://.*\.pages\.dev$",
    r"https://(www\.)?solutionservices\.co\.in$",
]

is_production = os.getenv("FLASK_ENV") == "production"

CORS(
    app,
    resources={
        r"/api/*": {
            "origins": (origin_list + CORS_ORIGIN_PATTERNS) if is_production else "*"
        }
    },
    methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
    supports_credentials=False,
)


@app.after_request
def security_headers(response):
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    if os.getenv("FLASK_ENV") == "production":
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    return response


app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(users_bp, url_prefix="/api/users")
app.register_blueprint(services_bp, url_prefix="/api/services")
app.register_blueprint(order_bp, url_prefix="/api/order")
app.register_blueprint(bookings_bp, url_prefix="/api/bookings")
app.register_blueprint(offers_bp, url_prefix="/api/offers")
app.register_blueprint(catalog_bp, url_prefix="/api/catalog")
app.register_blueprint(chat_bp, url_prefix="/api/chat")
app.register_blueprint(admin_bp, url_prefix="/api/admin")


@app.route("/api/health", methods=["GET", "OPTIONS"])
def health_check():
    if request.method == "OPTIONS":
        return "", 204
    return jsonify({"status": "ok"}), 200


@app.errorhandler(404)
def not_found(error):
    return jsonify({"message": "Endpoint not found."}), 404


@app.errorhandler(500)
def internal_error(error):
    return jsonify({"message": "Internal server error."}), 500


if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    debug = os.getenv("DEBUG", "False").lower() == "true"
    if debug and os.getenv("FLASK_ENV") == "production":
        print("WARNING: DEBUG must be False in production.")
    app.run(host="0.0.0.0", port=port, debug=debug)

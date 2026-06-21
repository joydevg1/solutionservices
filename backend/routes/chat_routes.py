from flask import Blueprint, request, jsonify, g
from llm_utils import generate_text
from data.knowledge_base import get_knowledge_base
from store import data_store
from utils.auth import require_auth, require_role, sanitize_text, load_current_user, get_bearer_token, decode_token
import jwt

chat_bp = Blueprint("chat", __name__)

MAX_MESSAGE_LEN = 2000


def build_knowledge_prompt(question):
    kb = get_knowledge_base()
    facts = "\n\n".join([f"{item['title']}: {item['description']}" for item in kb])
    return f"""You are a support assistant for Solution Services home marketplace. Answer only using the service knowledge base below.

Knowledge Base:
{facts}

Question: {question}
Answer:"""


def is_out_of_context(question):
    normalized = question.lower()
    keywords = [
        "price", "service", "cleaning", "salon", "repair", "plumbing", "electrical",
        "pest", "order", "booking", "home", "ac", "subscribe", "location",
    ]
    return not any(keyword in normalized for keyword in keywords)


@chat_bp.route("/", methods=["POST", "OPTIONS"])
@require_auth
def chat():
    if request.method == "OPTIONS":
        return "", 204

    data = request.get_json() or {}
    message = sanitize_text(data.get("message"), MAX_MESSAGE_LEN)
    user_id = data.get("userId")

    if not message:
        return jsonify({"message": "Question message is required."}), 400
    if user_id != g.current_user["id"]:
        return jsonify({"message": "Cannot send chat as another user."}), 403

    try:
        data_store.add_chat_message(user_id, "user", message)

        if is_out_of_context(message):
            answer = "I can only help with our services, pricing, bookings, and locations."
            out_of_context = True
        else:
            prompt = build_knowledge_prompt(message)
            response = generate_text(prompt, max_tokens=120, temperature=0.6)
            answer = response.strip() if response else "Sorry, I am unable to answer that right now."
            out_of_context = False

        data_store.add_chat_message(user_id, "assistant", answer)
        return jsonify({"answer": answer, "outOfContext": out_of_context}), 200

    except Exception as e:
        print(f"Error processing chat: {e}")
        return jsonify({"message": "Unable to process chat request."}), 500


@chat_bp.route("/history/<int:user_id>", methods=["GET", "OPTIONS"])
def chat_history(user_id):
    if request.method == "OPTIONS":
        return "", 204

    token = get_bearer_token()
    if not token:
        return jsonify({"message": "Authentication required."}), 401
    try:
        payload = decode_token(token)
    except jwt.PyJWTError:
        return jsonify({"message": "Invalid or expired token."}), 401

    if payload["role"] != "admin" and int(payload["sub"]) != user_id:
        return jsonify({"message": "Access denied."}), 403

    return jsonify(data_store.get_chat_by_user(user_id)), 200


@chat_bp.route("/users", methods=["GET", "OPTIONS"])
@require_role("admin")
def chat_users():
    if request.method == "OPTIONS":
        return "", 204
    return jsonify(data_store.get_chat_user_summaries()), 200

import json
from datetime import datetime

from db_connection import execute_insert_update, execute_query


def _now():
    return datetime.utcnow().isoformat() + "Z"


def _user_row(row):
    return {
        "id": row["id"],
        "name": row["name"],
        "email": row["email"],
        "role": row["role"],
        "createdAt": row["created_at"],
        "updatedAt": row["updated_at"],
    }


def _booking_row(row):
    return {
        "id": row["id"],
        "userId": row["user_id"],
        "userName": row["user_name"],
        "userEmail": row["user_email"],
        "userRole": row["user_role"],
        "phone": row["phone"] or "",
        "location": row["location"] or "",
        "address": row["address"],
        "items": json.loads(row["items_json"] or "[]"),
        "totalAmount": row["total_amount"],
        "status": row["status"],
        "createdAt": row["created_at"],
        "updatedAt": row["updated_at"],
    }


def _chat_row(row):
    return {
        "id": row["id"],
        "userId": row["user_id"],
        "from": row["from_role"],
        "text": row["text"],
        "createdAt": row["created_at"],
    }


def _offer_row(row):
    return {
        "id": row["id"],
        "title": row["title"],
        "discountPercent": row["discount_percent"],
        "serviceId": row["service_id"],
        "active": bool(row["active"]),
        "role": row["role"],
    }


def _custom_service_row(row):
    return {
        "id": row["id"],
        "title": row["title"],
        "category": row["category"],
        "description": row["description"] or "",
        "basePrice": row["base_price"],
        "subscriberPrice": row["subscriber_price"],
        "createdAt": row["created_at"],
    }


def upsert_user(name, email, role):
    normalized = email.strip().lower()
    now = _now()
    existing = execute_query("SELECT * FROM users WHERE email = ?", (normalized,))
    if existing:
        execute_insert_update(
            "UPDATE users SET name = ?, role = ?, updated_at = ? WHERE id = ?",
            (name.strip(), role, now, existing[0]["id"]),
        )
        row = execute_query("SELECT * FROM users WHERE id = ?", (existing[0]["id"],))[0]
        return _user_row(row)

    user_id = execute_insert_update(
        """
        INSERT INTO users (name, email, role, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?)
        """,
        (name.strip(), normalized, role, now, now),
    )
    row = execute_query("SELECT * FROM users WHERE id = ?", (user_id,))[0]
    return _user_row(row)


def get_user_by_id(user_id):
    rows = execute_query("SELECT * FROM users WHERE id = ?", (int(user_id),))
    return _user_row(rows[0]) if rows else None


def update_user_role(user_id, role):
    now = _now()
    updated = execute_insert_update(
        "UPDATE users SET role = ?, updated_at = ? WHERE id = ?",
        (role, now, int(user_id)),
    )
    if not updated:
        return None
    rows = execute_query("SELECT * FROM users WHERE id = ?", (int(user_id),))
    return _user_row(rows[0]) if rows else None


def list_users():
    rows = execute_query("SELECT * FROM users ORDER BY id")
    return [_user_row(r) for r in rows]


def create_booking(payload):
    now = _now()
    booking_id = execute_insert_update(
        """
        INSERT INTO bookings (
            user_id, user_name, user_email, user_role, phone, location, address,
            items_json, total_amount, status, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            payload["userId"],
            payload["userName"],
            payload["userEmail"],
            payload.get("userRole", "customer"),
            payload.get("phone", ""),
            payload.get("location", ""),
            payload["address"],
            json.dumps(payload.get("items", [])),
            payload.get("totalAmount", 0),
            "pending_approval",
            now,
            now,
        ),
    )
    row = execute_query("SELECT * FROM bookings WHERE id = ?", (booking_id,))[0]
    return _booking_row(row)


def list_bookings(user_id=None, status=None):
    query = "SELECT * FROM bookings WHERE 1=1"
    params = []
    if user_id is not None:
        query += " AND user_id = ?"
        params.append(int(user_id))
    if status:
        query += " AND status = ?"
        params.append(status)
    query += " ORDER BY created_at DESC"
    rows = execute_query(query, tuple(params))
    return [_booking_row(r) for r in rows]


def update_booking_status(booking_id, status):
    now = _now()
    updated = execute_insert_update(
        "UPDATE bookings SET status = ?, updated_at = ? WHERE id = ?",
        (status, now, int(booking_id)),
    )
    if not updated:
        return None
    rows = execute_query("SELECT * FROM bookings WHERE id = ?", (int(booking_id),))
    return _booking_row(rows[0]) if rows else None


def add_chat_message(user_id, from_role, text):
    now = _now()
    msg_id = execute_insert_update(
        """
        INSERT INTO chat_messages (user_id, from_role, text, created_at)
        VALUES (?, ?, ?, ?)
        """,
        (int(user_id), from_role, text, now),
    )
    row = execute_query("SELECT * FROM chat_messages WHERE id = ?", (msg_id,))[0]
    return _chat_row(row)


def get_chat_by_user(user_id):
    rows = execute_query(
        "SELECT * FROM chat_messages WHERE user_id = ? ORDER BY created_at ASC",
        (int(user_id),),
    )
    return [_chat_row(r) for r in rows]


def get_chat_user_summaries():
    rows = execute_query(
        """
        SELECT
            cm.user_id,
            u.name AS user_name,
            u.email AS user_email,
            COUNT(*) AS message_count,
            MAX(cm.created_at) AS last_message_at,
            (
                SELECT text FROM chat_messages
                WHERE user_id = cm.user_id
                ORDER BY created_at DESC LIMIT 1
            ) AS last_preview
        FROM chat_messages cm
        LEFT JOIN users u ON u.id = cm.user_id
        GROUP BY cm.user_id
        ORDER BY last_message_at DESC
        """
    )
    return [
        {
            "userId": r["user_id"],
            "userName": r["user_name"] or "Unknown",
            "userEmail": r["user_email"] or "",
            "messageCount": r["message_count"],
            "lastMessageAt": r["last_message_at"],
            "lastPreview": (r["last_preview"] or "")[:80],
        }
        for r in rows
    ]


def list_offers():
    rows = execute_query("SELECT * FROM offers WHERE active = 1 ORDER BY id")
    return [_offer_row(r) for r in rows]


def add_offer(offer):
    offer_id = execute_insert_update(
        """
        INSERT INTO offers (title, discount_percent, service_id, active, role)
        VALUES (?, ?, ?, 1, ?)
        """,
        (
            offer["title"],
            offer["discountPercent"],
            offer.get("serviceId"),
            offer.get("role", "subscriber"),
        ),
    )
    row = execute_query("SELECT * FROM offers WHERE id = ?", (offer_id,))[0]
    return _offer_row(row)


def list_custom_services():
    rows = execute_query("SELECT * FROM custom_services ORDER BY id")
    return [_custom_service_row(r) for r in rows]


def add_custom_service(service):
    now = _now()
    service_id = execute_insert_update(
        """
        INSERT INTO custom_services (title, category, description, base_price, subscriber_price, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
        """,
        (
            service["title"],
            service["category"],
            service.get("description", ""),
            service["basePrice"],
            service.get("subscriberPrice"),
            now,
        ),
    )
    row = execute_query("SELECT * FROM custom_services WHERE id = ?", (service_id,))[0]
    return _custom_service_row(row)

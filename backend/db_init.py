import json
import os
import sqlite3
from datetime import datetime

from db_connection import DB_PATH

JSON_PATH = os.path.join(os.path.dirname(__file__), "data", "appData.json")
JSON_ARCHIVE = os.path.join(os.path.dirname(__file__), "data", "appData.json.migrated")


def _now():
    return datetime.utcnow().isoformat() + "Z"


def _create_tables(cursor):
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            phone TEXT,
            role TEXT NOT NULL DEFAULT 'customer',
            created_at TEXT,
            updated_at TEXT
        )
        """
    )

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS services (
            id INTEGER PRIMARY KEY,
            title TEXT NOT NULL,
            category TEXT NOT NULL,
            price INTEGER NOT NULL,
            description TEXT NOT NULL
        )
        """
    )

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            user_name TEXT NOT NULL,
            user_email TEXT NOT NULL,
            user_role TEXT NOT NULL DEFAULT 'customer',
            phone TEXT,
            location TEXT,
            address TEXT NOT NULL,
            items_json TEXT NOT NULL,
            total_amount REAL NOT NULL DEFAULT 0,
            status TEXT NOT NULL DEFAULT 'pending_approval',
            created_at TEXT,
            updated_at TEXT,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
        """
    )

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS chat_messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            from_role TEXT NOT NULL,
            text TEXT NOT NULL,
            created_at TEXT,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
        """
    )

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS offers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            discount_percent INTEGER NOT NULL,
            service_id INTEGER,
            active INTEGER NOT NULL DEFAULT 1,
            role TEXT NOT NULL DEFAULT 'subscriber'
        )
        """
    )

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS custom_services (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            category TEXT NOT NULL,
            description TEXT,
            base_price REAL NOT NULL,
            subscriber_price REAL,
            created_at TEXT
        )
        """
    )

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            service_id INTEGER NOT NULL,
            service_name TEXT NOT NULL,
            price INTEGER NOT NULL,
            address TEXT NOT NULL,
            status TEXT DEFAULT 'received',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
        """
    )

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS user_purchases (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            service_name TEXT NOT NULL,
            purchased_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
        """
    )

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS settings (
            setting_key TEXT PRIMARY KEY,
            setting_value TEXT
        )
        """
    )

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS app_meta (
            key TEXT PRIMARY KEY,
            value TEXT
        )
        """
    )


def _migrate_schema(cursor):
    cursor.execute("PRAGMA table_info(users)")
    user_cols = {row[1] for row in cursor.fetchall()}
    if "role" not in user_cols:
        cursor.execute("ALTER TABLE users ADD COLUMN role TEXT NOT NULL DEFAULT 'customer'")
    if "updated_at" not in user_cols:
        cursor.execute("ALTER TABLE users ADD COLUMN updated_at TEXT")


def _seed_services_and_settings(cursor):
    services = [
        (1, "Home Cleaning", "Cleaning", 999, "Professional full-home cleaning services, including kitchen, bathroom, bedroom, living room, and balcony cleaning. Add-on services include deep cleaning, sofa cleaning, and kitchen chimney cleaning."),
        (2, "Salon at Home", "Beauty", 799, "Salon-quality haircuts, styling, waxing, threading, manicure, pedicure, and grooming at your home."),
        (3, "Appliance Repair", "Repair", 899, "Fast appliance repair for washing machines, refrigerators, microwave ovens, air conditioners, water heaters, and kitchen chimneys."),
        (4, "Plumbing", "Home Services", 699, "Reliable plumbing solutions for blocked drains, leaky taps, faucet installation, pipe repair, geyser repair, and bathroom fittings."),
        (5, "Electrical Services", "Home Services", 749, "Certified electricians for wiring, switchboard installation, fan and light fitting, inverter service, and safety inspections."),
        (6, "Pest Control", "Cleaning", 849, "Professional pest control for mosquitoes, cockroaches, rodents, ants, termites, and household pests with safe chemical treatments."),
    ]
    for row in services:
        try:
            cursor.execute("INSERT INTO services VALUES (?, ?, ?, ?, ?)", row)
        except sqlite3.IntegrityError:
            pass

    settings = [
        ("notificationEmail", "orders@example.com"),
        ("whatsappMessage", "A new order has arrived. Please follow up immediately."),
    ]
    for key, value in settings:
        try:
            cursor.execute("INSERT INTO settings VALUES (?, ?)", (key, value))
        except sqlite3.IntegrityError:
            pass

    default_offers = [
        (1, "Subscriber — 15% off all services", 15, None, 1, "subscriber"),
        (2, "AC season special", 10, 3, 1, "subscriber"),
    ]
    cursor.execute("SELECT COUNT(*) FROM offers")
    if cursor.fetchone()[0] == 0:
        for row in default_offers:
            try:
                cursor.execute(
                    "INSERT INTO offers (id, title, discount_percent, service_id, active, role) VALUES (?, ?, ?, ?, ?, ?)",
                    row,
                )
            except sqlite3.IntegrityError:
                pass


def _update_sequence(cursor, table, column="id"):
    cursor.execute(f"SELECT MAX({column}) FROM {table}")
    max_id = cursor.fetchone()[0]
    if max_id:
        cursor.execute(
            "INSERT OR REPLACE INTO sqlite_sequence (name, seq) VALUES (?, ?)",
            (table, max_id),
        )


def _migrate_json(cursor):
    if not os.path.exists(JSON_PATH):
        return False

    cursor.execute("SELECT value FROM app_meta WHERE key = 'json_migrated'")
    if cursor.fetchone():
        return False

    with open(JSON_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    print("[migrate] Importing records from appData.json into SQLite...")

    for user in data.get("users", []):
        try:
            cursor.execute(
                """
                INSERT INTO users (id, name, email, phone, role, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    user["id"],
                    user["name"],
                    user["email"],
                    user.get("phone"),
                    user.get("role", "customer"),
                    user.get("createdAt", _now()),
                    user.get("updatedAt", _now()),
                ),
            )
        except sqlite3.IntegrityError:
            cursor.execute(
                """
                UPDATE users SET name=?, role=?, updated_at=? WHERE email=?
                """,
                (user["name"], user.get("role", "customer"), user.get("updatedAt", _now()), user["email"]),
            )
    _update_sequence(cursor, "users")

    for booking in data.get("bookings", []):
        try:
            cursor.execute(
                """
                INSERT INTO bookings (
                    id, user_id, user_name, user_email, user_role, phone, location, address,
                    items_json, total_amount, status, created_at, updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    booking["id"],
                    booking["userId"],
                    booking["userName"],
                    booking["userEmail"],
                    booking.get("userRole", "customer"),
                    booking.get("phone", ""),
                    booking.get("location", ""),
                    booking["address"],
                    json.dumps(booking.get("items", [])),
                    booking.get("totalAmount", 0),
                    booking.get("status", "pending_approval"),
                    booking.get("createdAt", _now()),
                    booking.get("updatedAt", _now()),
                ),
            )
        except sqlite3.IntegrityError:
            pass
    _update_sequence(cursor, "bookings")

    for msg in data.get("chatMessages", []):
        try:
            cursor.execute(
                """
                INSERT INTO chat_messages (id, user_id, from_role, text, created_at)
                VALUES (?, ?, ?, ?, ?)
                """,
                (
                    msg["id"],
                    msg["userId"],
                    msg["from"],
                    msg["text"],
                    msg.get("createdAt", _now()),
                ),
            )
        except sqlite3.IntegrityError:
            pass
    _update_sequence(cursor, "chat_messages")

    for offer in data.get("offers", []):
        try:
            cursor.execute(
                """
                INSERT INTO offers (id, title, discount_percent, service_id, active, role)
                VALUES (?, ?, ?, ?, ?, ?)
                """,
                (
                    offer["id"],
                    offer["title"],
                    offer["discountPercent"],
                    offer.get("serviceId"),
                    1 if offer.get("active", True) else 0,
                    offer.get("role", "subscriber"),
                ),
            )
        except sqlite3.IntegrityError:
            pass
    _update_sequence(cursor, "offers")

    for svc in data.get("customServices", []):
        try:
            cursor.execute(
                """
                INSERT INTO custom_services (id, title, category, description, base_price, subscriber_price, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    svc["id"],
                    svc["title"],
                    svc["category"],
                    svc.get("description", ""),
                    svc["basePrice"],
                    svc.get("subscriberPrice"),
                    svc.get("createdAt", _now()),
                ),
            )
        except sqlite3.IntegrityError:
            pass
    _update_sequence(cursor, "custom_services")

    cursor.execute("INSERT OR REPLACE INTO app_meta (key, value) VALUES ('json_migrated', '1')")
    print("[migrate] JSON import complete.")
    return True


def _archive_json():
    if os.path.exists(JSON_PATH):
        if os.path.exists(JSON_ARCHIVE):
            os.remove(JSON_ARCHIVE)
        os.rename(JSON_PATH, JSON_ARCHIVE)
        print(f"[migrate] Archived appData.json to {JSON_ARCHIVE}")


def initialize_database():
    try:
        connection = sqlite3.connect(DB_PATH)
        cursor = connection.cursor()

        print("[db] Initializing SQLite database...")
        _create_tables(cursor)
        _migrate_schema(cursor)
        _seed_services_and_settings(cursor)

        migrated = _migrate_json(cursor)
        connection.commit()
        cursor.close()
        connection.close()

        if migrated:
            _archive_json()

        print("[db] SQLite database ready")
        print(f"[db] Location: {DB_PATH}")
        return True
    except Exception as e:
        print(f"[db] Error initializing database: {e}")
        return False


def setup_database():
    print("\n" + "=" * 50)
    print("DATABASE INITIALIZATION (SQLite)")
    print("=" * 50)
    result = initialize_database()
    print("=" * 50 + "\n")
    return result


if __name__ == "__main__":
    setup_database()

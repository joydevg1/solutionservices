const path = require("path");
const Database = require("better-sqlite3");

const DB_PATH = path.join(__dirname, "urban_services.db");

let db;

function getDb() {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
  }
  return db;
}

function now() {
  return new Date().toISOString();
}

function userRow(row) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function bookingRow(row) {
  return {
    id: row.id,
    userId: row.user_id,
    userName: row.user_name,
    userEmail: row.user_email,
    userRole: row.user_role,
    phone: row.phone || "",
    location: row.location || "",
    address: row.address,
    items: JSON.parse(row.items_json || "[]"),
    totalAmount: row.total_amount,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function chatRow(row) {
  return {
    id: row.id,
    userId: row.user_id,
    from: row.from_role,
    text: row.text,
    createdAt: row.created_at,
  };
}

function offerRow(row) {
  return {
    id: row.id,
    title: row.title,
    discountPercent: row.discount_percent,
    serviceId: row.service_id,
    active: Boolean(row.active),
    role: row.role,
  };
}

function customServiceRow(row) {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    description: row.description || "",
    basePrice: row.base_price,
    subscriberPrice: row.subscriber_price,
    createdAt: row.created_at,
  };
}

function upsertUser({ name, email, role }) {
  const conn = getDb();
  const normalizedEmail = email.trim().toLowerCase();
  const ts = now();
  const existing = conn.prepare("SELECT * FROM users WHERE email = ?").get(normalizedEmail);

  if (existing) {
    conn.prepare("UPDATE users SET name = ?, role = ?, updated_at = ? WHERE id = ?").run(
      name.trim(),
      role,
      ts,
      existing.id
    );
    return userRow(conn.prepare("SELECT * FROM users WHERE id = ?").get(existing.id));
  }

  const result = conn
    .prepare("INSERT INTO users (name, email, role, created_at, updated_at) VALUES (?, ?, ?, ?, ?)")
    .run(name.trim(), normalizedEmail, role, ts, ts);
  return userRow(conn.prepare("SELECT * FROM users WHERE id = ?").get(result.lastInsertRowid));
}

function getUserById(id) {
  const row = getDb().prepare("SELECT * FROM users WHERE id = ?").get(Number(id));
  return row ? userRow(row) : null;
}

function updateUserRole(userId, role) {
  const conn = getDb();
  const ts = now();
  const result = conn.prepare("UPDATE users SET role = ?, updated_at = ? WHERE id = ?").run(role, ts, Number(userId));
  if (!result.changes) return null;
  const row = conn.prepare("SELECT * FROM users WHERE id = ?").get(Number(userId));
  return row ? userRow(row) : null;
}

function listUsers() {
  return getDb()
    .prepare("SELECT * FROM users ORDER BY id")
    .all()
    .map(userRow);
}

function createBooking(payload) {
  const conn = getDb();
  const ts = now();
  const result = conn
    .prepare(
      `INSERT INTO bookings (
        user_id, user_name, user_email, user_role, phone, location, address,
        items_json, total_amount, status, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      payload.userId,
      payload.userName,
      payload.userEmail,
      payload.userRole || "customer",
      payload.phone || "",
      payload.location || "",
      payload.address,
      JSON.stringify(payload.items || []),
      payload.totalAmount || 0,
      "pending_approval",
      ts,
      ts
    );
  const row = conn.prepare("SELECT * FROM bookings WHERE id = ?").get(result.lastInsertRowid);
  return bookingRow(row);
}

function listBookings({ userId, status } = {}) {
  const conn = getDb();
  let query = "SELECT * FROM bookings WHERE 1=1";
  const params = [];
  if (userId) {
    query += " AND user_id = ?";
    params.push(Number(userId));
  }
  if (status) {
    query += " AND status = ?";
    params.push(status);
  }
  query += " ORDER BY created_at DESC";
  return conn.prepare(query).all(...params).map(bookingRow);
}

function updateBookingStatus(id, status) {
  const conn = getDb();
  const ts = now();
  const result = conn.prepare("UPDATE bookings SET status = ?, updated_at = ? WHERE id = ?").run(status, ts, Number(id));
  if (!result.changes) return null;
  const row = conn.prepare("SELECT * FROM bookings WHERE id = ?").get(Number(id));
  return row ? bookingRow(row) : null;
}

function addChatMessage({ userId, from, text }) {
  const conn = getDb();
  const ts = now();
  const result = conn
    .prepare("INSERT INTO chat_messages (user_id, from_role, text, created_at) VALUES (?, ?, ?, ?)")
    .run(Number(userId), from, text, ts);
  const row = conn.prepare("SELECT * FROM chat_messages WHERE id = ?").get(result.lastInsertRowid);
  return chatRow(row);
}

function getChatByUser(userId) {
  return getDb()
    .prepare("SELECT * FROM chat_messages WHERE user_id = ? ORDER BY created_at ASC")
    .all(Number(userId))
    .map(chatRow);
}

function getChatUserSummaries() {
  const rows = getDb()
    .prepare(
      `SELECT
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
      ORDER BY last_message_at DESC`
    )
    .all();

  return rows.map((r) => ({
    userId: r.user_id,
    userName: r.user_name || "Unknown",
    userEmail: r.user_email || "",
    messageCount: r.message_count,
    lastMessageAt: r.last_message_at,
    lastPreview: (r.last_preview || "").slice(0, 80),
  }));
}

function listOffers() {
  return getDb()
    .prepare("SELECT * FROM offers WHERE active = 1 ORDER BY id")
    .all()
    .map(offerRow);
}

function addOffer(offer) {
  const conn = getDb();
  const result = conn
    .prepare("INSERT INTO offers (title, discount_percent, service_id, active, role) VALUES (?, ?, ?, 1, ?)")
    .run(offer.title, offer.discountPercent, offer.serviceId ?? null, offer.role || "subscriber");
  const row = conn.prepare("SELECT * FROM offers WHERE id = ?").get(result.lastInsertRowid);
  return offerRow(row);
}

function listCustomServices() {
  return getDb()
    .prepare("SELECT * FROM custom_services ORDER BY id")
    .all()
    .map(customServiceRow);
}

function addCustomService(service) {
  const conn = getDb();
  const ts = now();
  const result = conn
    .prepare(
      "INSERT INTO custom_services (title, category, description, base_price, subscriber_price, created_at) VALUES (?, ?, ?, ?, ?, ?)"
    )
    .run(
      service.title,
      service.category,
      service.description || "",
      service.basePrice,
      service.subscriberPrice ?? null,
      ts
    );
  const row = conn.prepare("SELECT * FROM custom_services WHERE id = ?").get(result.lastInsertRowid);
  return customServiceRow(row);
}

module.exports = {
  upsertUser,
  getUserById,
  updateUserRole,
  listUsers,
  createBooking,
  listBookings,
  updateBookingStatus,
  addChatMessage,
  getChatByUser,
  getChatUserSummaries,
  listOffers,
  addOffer,
  listCustomServices,
  addCustomService,
};

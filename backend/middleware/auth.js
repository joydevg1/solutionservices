const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "";
const JWT_EXPIRE_HOURS = Number(process.env.JWT_EXPIRE_HOURS || 168);
const ADMIN_BOOTSTRAP_KEY = process.env.ADMIN_BOOTSTRAP_KEY || "";
const ADMIN_EMAILS = new Set(
  (process.env.ADMIN_EMAILS || "admin@example.com")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
);

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function ensureSecret() {
  if (!JWT_SECRET || JWT_SECRET === "secret_key" || JWT_SECRET === "change-this-in-production") {
    if (process.env.NODE_ENV === "production") {
      throw new Error("JWT_SECRET must be set to a strong value in production.");
    }
  }
}

function issueToken(user) {
  ensureSecret();
  return jwt.sign(
    { sub: String(user.id), email: user.email, role: user.role, name: user.name },
    JWT_SECRET,
    { expiresIn: `${JWT_EXPIRE_HOURS}h` }
  );
}

function decodeToken(token) {
  ensureSecret();
  return jwt.verify(token, JWT_SECRET);
}

function getBearerToken(req) {
  const header = req.headers.authorization || "";
  if (!header.startsWith("Bearer ")) return null;
  return header.slice(7).trim();
}

function loadUser(req, res, next) {
  const token = getBearerToken(req);
  if (!token) {
    req.user = null;
    return next();
  }
  try {
    const payload = decodeToken(token);
    req.user = {
      id: Number(payload.sub),
      email: payload.email,
      role: payload.role,
      name: payload.name || "",
    };
  } catch {
    req.user = null;
  }
  next();
}

function requireAuth(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: "Authentication required." });
  }
  next();
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Insufficient permissions." });
    }
    next();
  };
}

function effectiveRole(req) {
  if (req.user) return req.user.role;
  const role = req.query.role || "customer";
  return ["customer", "subscriber", "admin"].includes(role) ? role : "customer";
}

function canAssignAdmin(email, adminKey) {
  if (!ADMIN_BOOTSTRAP_KEY || !adminKey || adminKey !== ADMIN_BOOTSTRAP_KEY) return false;
  return ADMIN_EMAILS.has(email.trim().toLowerCase());
}

function validateEmail(email) {
  const normalized = (email || "").trim().toLowerCase();
  if (!normalized || normalized.length > 254 || !EMAIL_RE.test(normalized)) return null;
  return normalized;
}

function sanitizeText(value, maxLen = 500) {
  if (value == null) return "";
  return String(value).trim().slice(0, maxLen);
}

function validateBookingItems(items) {
  if (!Array.isArray(items) || !items.length || items.length > 50) return false;
  return items.every((item) => {
    if (!item || typeof item !== "object") return false;
    const name = sanitizeText(item.name, 200);
    const price = Number(item.price);
    return name && !Number.isNaN(price) && price >= 0 && price <= 1_000_000;
  });
}

module.exports = {
  issueToken,
  decodeToken,
  getBearerToken,
  loadUser,
  requireAuth,
  requireRole,
  effectiveRole,
  canAssignAdmin,
  validateEmail,
  sanitizeText,
  validateBookingItems,
  ADMIN_EMAILS,
};

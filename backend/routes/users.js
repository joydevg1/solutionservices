const express = require("express");
const store = require("../store/dataStore");
const {
  issueToken,
  requireAuth,
  requireRole,
  canAssignAdmin,
  validateEmail,
  sanitizeText,
  validateBookingItems,
  effectiveRole,
  decodeToken,
  getBearerToken,
} = require("../middleware/auth");

const router = express.Router();
const VALID_ROLES = ["admin", "subscriber", "customer"];

router.post("/session", (req, res) => {
  const name = sanitizeText(req.body.name, 120);
  const email = validateEmail(req.body.email);
  const role = req.body.role;
  const adminKey = req.body.adminKey || "";

  if (!name || !email || !role) {
    return res.status(400).json({ message: "Valid name, email, and role are required." });
  }
  if (!VALID_ROLES.includes(role)) {
    return res.status(400).json({ message: "Invalid role." });
  }

  const existing = store.listUsers().find((u) => u.email === email);
  if (role === "admin") {
    if (!canAssignAdmin(email, adminKey)) {
      return res.status(403).json({ message: "Admin access denied. Check email and admin key." });
    }
  } else if (existing?.role === "admin") {
    return res.status(403).json({ message: "This account is admin-only." });
  }

  const user = store.upsertUser({ name, email, role });
  const token = issueToken(user);
  res.json({ user, token });
});

router.get("/", requireRole("admin"), (req, res) => {
  res.json(store.listUsers());
});

router.patch("/:id/role", requireAuth, (req, res) => {
  const userId = Number(req.params.id);
  if (req.user.id !== userId) {
    return res.status(403).json({ message: "You can only update your own account." });
  }
  if (req.body.role !== "subscriber" || req.user.role !== "customer") {
    return res.status(400).json({ message: "Only customer accounts can upgrade to subscriber." });
  }
  const user = store.updateUserRole(userId, "subscriber");
  if (!user) return res.status(404).json({ message: "User not found." });
  res.json({ user, token: issueToken(user) });
});

module.exports = router;

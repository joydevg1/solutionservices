const express = require("express");
const jwt = require("jsonwebtoken");
const pool = require("../db");
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

function verifyToken(req, res, next) {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ message: "Missing authorization header." });
  }
  const token = header.split(" ")[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    if (payload.role !== "admin") {
      return res.status(403).json({ message: "Admin role required." });
    }
    req.admin = payload;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token." });
  }
}

router.get("/config", verifyToken, async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT setting_key, setting_value FROM settings WHERE setting_key IN (?, ?)", [
      "notificationEmail",
      "whatsappMessage",
    ]);
    const config = rows.reduce((acc, row) => {
      acc[row.setting_key] = row.setting_value;
      return acc;
    }, {});
    res.json(config);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to retrieve admin config." });
  }
});

router.post("/config", verifyToken, async (req, res) => {
  const { notificationEmail, whatsappMessage } = req.body;
  try {
    await pool.query(
      "INSERT INTO settings (setting_key, setting_value) VALUES (?, ?), (?, ?) ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)",
      [
        "notificationEmail",
        notificationEmail || process.env.NOTIFICATION_EMAIL || "",
        "whatsappMessage",
        whatsappMessage || "",
      ]
    );
    res.json({ message: "Admin configuration updated." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to update admin config." });
  }
});

module.exports = router;

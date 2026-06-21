const express = require("express");
const store = require("../store/dataStore");
const { requireRole, sanitizeText } = require("../middleware/auth");

const router = express.Router();

router.get("/custom", (req, res) => {
  res.json(store.listCustomServices());
});

router.post("/custom", requireRole("admin"), (req, res) => {
  const { title, category, description, basePrice, subscriberPrice } = req.body;
  if (!title || !category || basePrice == null) {
    return res.status(400).json({ message: "title, category, and basePrice required." });
  }
  const price = Number(basePrice);
  if (Number.isNaN(price) || price < 0 || price > 1_000_000) {
    return res.status(400).json({ message: "Invalid basePrice." });
  }
  const service = store.addCustomService({
    title: sanitizeText(title, 120),
    category: sanitizeText(category, 80),
    description: sanitizeText(description, 500),
    basePrice: price,
    subscriberPrice: subscriberPrice != null ? Number(subscriberPrice) : null,
  });
  res.status(201).json(service);
});

module.exports = router;

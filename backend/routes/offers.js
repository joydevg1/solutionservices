const express = require("express");
const store = require("../store/dataStore");
const { requireRole, sanitizeText } = require("../middleware/auth");

const router = express.Router();

router.get("/", (req, res) => {
  res.json(store.listOffers());
});

router.post("/", requireRole("admin"), (req, res) => {
  if (!req.body.title || req.body.discountPercent == null) {
    return res.status(400).json({ message: "Title and discountPercent required." });
  }
  const discount = Number(req.body.discountPercent);
  if (Number.isNaN(discount) || discount < 0 || discount > 90) {
    return res.status(400).json({ message: "discountPercent must be 0-90." });
  }
  const offer = store.addOffer({
    title: sanitizeText(req.body.title, 120),
    discountPercent: discount,
    serviceId: req.body.serviceId != null ? Number(req.body.serviceId) : null,
    role: req.body.role || "subscriber",
  });
  res.status(201).json(offer);
});

module.exports = router;

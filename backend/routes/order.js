const express = require("express");
const store = require("../store/dataStore");
const { requireAuth, sanitizeText, validateBookingItems } = require("../middleware/auth");

const router = express.Router();

router.post("/", requireAuth, (req, res) => {
  const address = sanitizeText(req.body.address, 500);
  const location = sanitizeText(req.body.location || address, 300);
  const services = req.body.services;
  const totalAmount = req.body.totalAmount;
  if (!address) return res.status(400).json({ message: "Missing required order fields." });
  const items = services?.length ? services : [{ name: "Service", price: totalAmount || 0 }];
  if (!validateBookingItems(items)) return res.status(400).json({ message: "Invalid order items." });

  const booking = store.createBooking({
    userId: req.user.id,
    userName: sanitizeText(req.user.name, 120),
    userEmail: req.user.email,
    userRole: req.user.role,
    phone: sanitizeText(req.body.customerPhone, 20),
    location,
    address,
    items,
    totalAmount: Math.min(Number(totalAmount) || items.reduce((s, i) => s + (i.price || 0), 0), 10_000_000),
  });
  res.json({ message: "Booking submitted. Waiting for admin approval.", orderId: booking.id, booking });
});

module.exports = router;

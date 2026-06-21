const express = require("express");
const store = require("../store/dataStore");
const { requireAuth, requireRole, sanitizeText, validateBookingItems } = require("../middleware/auth");

const router = express.Router();
const ALLOWED = ["pending_approval", "approved", "rejected", "completed"];

router.post("/", requireAuth, (req, res) => {
  if (req.body.userId !== req.user.id) {
    return res.status(403).json({ message: "Cannot create bookings for another user." });
  }
  const location = sanitizeText(req.body.location, 300);
  const address = sanitizeText(req.body.address, 500);
  const items = req.body.items;
  if (!location || !address || !validateBookingItems(items)) {
    return res.status(400).json({ message: "Invalid booking data." });
  }
  const booking = store.createBooking({
    userId: req.user.id,
    userName: sanitizeText(req.user.name, 120),
    userEmail: req.user.email,
    userRole: req.user.role,
    phone: sanitizeText(req.body.phone, 20),
    location,
    address,
    items,
    totalAmount: Math.min(
      Number(req.body.totalAmount) || items.reduce((s, i) => s + (i.price || 0), 0),
      10_000_000
    ),
  });
  res.status(201).json({ message: "Booking submitted. Waiting for admin approval.", booking });
});

router.get("/", requireAuth, (req, res) => {
  if (req.user.role === "admin") {
    return res.json(store.listBookings({ status: req.query.status || undefined }));
  }
  res.json(store.listBookings({ userId: req.user.id }));
});

router.patch("/:id/status", requireRole("admin"), (req, res) => {
  if (!ALLOWED.includes(req.body.status)) {
    return res.status(400).json({ message: "Invalid status." });
  }
  const booking = store.updateBookingStatus(req.params.id, req.body.status);
  if (!booking) return res.status(404).json({ message: "Booking not found." });
  res.json({ booking, updatedBy: req.user.id });
});

module.exports = router;

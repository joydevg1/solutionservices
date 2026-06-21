import { useEffect, useState } from "react";
import { fetchBookings } from "../api";
import { STATUS_LABELS } from "../constants/dashboard";

export default function MyBookings({ refreshKey }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchBookings()
      .then(setBookings)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [refreshKey]);

  if (loading) return <p className="empty-state">Loading your bookings…</p>;

  if (!bookings.length) {
    return (
      <div className="empty-state">
        <p>No bookings yet</p>
        <p className="cart-empty__hint">Add services to cart and confirm to request a visit</p>
      </div>
    );
  }

  return (
    <ul className="bookings-list">
      {bookings.map((b) => {
        const status = STATUS_LABELS[b.status] || { label: b.status, className: "" };
        return (
          <li key={b.id} className="booking-card">
            <div className="booking-card__head">
              <strong>Booking #{b.id}</strong>
              <span className={`status-badge ${status.className}`}>{status.label}</span>
            </div>
            <p className="booking-card__meta">
              📍 {b.location} · {new Date(b.createdAt).toLocaleString()}
            </p>
            <ul className="booking-card__items">
              {b.items.map((item, i) => (
                <li key={i}>
                  {item.name} — ₹{item.price}
                </li>
              ))}
            </ul>
            <p className="booking-card__total">Total: ₹{b.totalAmount}</p>
          </li>
        );
      })}
    </ul>
  );
}

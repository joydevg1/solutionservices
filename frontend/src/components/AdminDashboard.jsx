import { useEffect, useState } from "react";
import {
  fetchBookings,
  updateBookingStatus,
  fetchChatUsers,
  fetchChatHistory,
  addCustomService,
  addOffer,
  fetchOffers,
} from "../api";
import { STATUS_LABELS } from "../constants/dashboard";
import { useUser } from "../context/UserContext";

export default function AdminDashboard() {
  const { user, logout } = useUser();
  const [tab, setTab] = useState("bookings");
  const [bookings, setBookings] = useState([]);
  const [chatUsers, setChatUsers] = useState([]);
  const [selectedChatUser, setSelectedChatUser] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [offers, setOffers] = useState([]);
  const [newService, setNewService] = useState({ title: "", category: "", description: "", basePrice: "" });
  const [newOffer, setNewOffer] = useState({ title: "", discountPercent: "10", serviceId: "" });

  const loadBookings = () => fetchBookings().then(setBookings).catch(console.error);
  const loadChatUsers = () => fetchChatUsers().then(setChatUsers).catch(console.error);

  useEffect(() => {
    loadBookings();
    loadChatUsers();
    fetchOffers().then(setOffers).catch(console.error);
  }, []);

  useEffect(() => {
    if (selectedChatUser) {
      fetchChatHistory(selectedChatUser).then(setChatHistory).catch(console.error);
    }
  }, [selectedChatUser]);

  const handleStatus = async (id, status) => {
    await updateBookingStatus(id, status);
    loadBookings();
  };

  const pending = bookings.filter((b) => b.status === "pending_approval");

  return (
    <div className="admin-app">
      <header className="admin-topbar">
        <div>
          <h1>Admin console</h1>
          <p>{user.name} · {user.email}</p>
        </div>
        <button type="button" className="btn btn--ghost" onClick={logout}>
          Sign out
        </button>
      </header>

      <nav className="admin-tabs">
        {[
          ["bookings", `Bookings (${pending.length} pending)`],
          ["chat", "Customer chats"],
          ["services", "Add service"],
          ["offers", "Offers"],
        ].map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={tab === id ? "active" : ""}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </nav>

      {tab === "bookings" && (
        <section className="panel">
          <h2>Pending approval</h2>
          {pending.length === 0 ? (
            <p className="empty-state">No pending requests</p>
          ) : (
            <div className="admin-bookings">
              {pending.map((b) => (
                <BookingAdminCard key={b.id} booking={b} onStatus={handleStatus} />
              ))}
            </div>
          )}

          <h2 className="section-title section-title--spaced">All bookings</h2>
          <div className="admin-bookings">
            {bookings.map((b) => (
              <BookingAdminCard key={b.id} booking={b} onStatus={handleStatus} showActions={b.status === "pending_approval"} />
            ))}
          </div>
        </section>
      )}

      {tab === "chat" && (
        <section className="panel admin-chat-layout">
          <aside className="chat-user-list">
            <h2>Users</h2>
            {chatUsers.length === 0 ? (
              <p className="empty-state">No chat history yet</p>
            ) : (
              chatUsers.map((u) => (
                <button
                  key={u.userId}
                  type="button"
                  className={`chat-user-item ${selectedChatUser === u.userId ? "active" : ""}`}
                  onClick={() => setSelectedChatUser(u.userId)}
                >
                  <strong>{u.userName}</strong>
                  <span>{u.userEmail}</span>
                  <small>{u.messageCount} messages</small>
                </button>
              ))
            )}
          </aside>
          <div className="chat-history-panel">
            <h2>Conversation</h2>
            {!selectedChatUser ? (
              <p className="empty-state">Select a user to view chat history</p>
            ) : (
              <div className="chat-history-log">
                {chatHistory.map((m) => (
                  <div key={m.id} className={`chat-item ${m.from === "user" ? "user" : "bot"}`}>
                    <div className="chat-label">{m.from === "user" ? "Customer" : "Assistant"}</div>
                    <div className="chat-text">{m.text}</div>
                    <time>{new Date(m.createdAt).toLocaleString()}</time>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {tab === "services" && (
        <section className="panel">
          <h2>Add new service</h2>
          <form
            className="booking-form"
            onSubmit={async (e) => {
              e.preventDefault();
              await addCustomService({
                ...newService,
                basePrice: Number(newService.basePrice),
              });
              setNewService({ title: "", category: "", description: "", basePrice: "" });
              alert("Service added to catalog");
            }}
          >
            <label>Title<input value={newService.title} onChange={(e) => setNewService({ ...newService, title: e.target.value })} required /></label>
            <label>Category<input value={newService.category} onChange={(e) => setNewService({ ...newService, category: e.target.value })} required /></label>
            <label>Description<textarea value={newService.description} onChange={(e) => setNewService({ ...newService, description: e.target.value })} rows={2} /></label>
            <label>Base price (₹)<input type="number" value={newService.basePrice} onChange={(e) => setNewService({ ...newService, basePrice: e.target.value })} required /></label>
            <button type="submit" className="btn btn--primary">Add service</button>
          </form>
        </section>
      )}

      {tab === "offers" && (
        <section className="panel">
          <h2>Active offers</h2>
          <ul className="offers-admin-list">
            {offers.map((o) => (
              <li key={o.id}>{o.title} — {o.discountPercent}% {o.serviceId ? `(service #${o.serviceId})` : "(all)"}</li>
            ))}
          </ul>
          <h2 className="section-title section-title--spaced">Create offer</h2>
          <form
            className="booking-form"
            onSubmit={async (e) => {
              e.preventDefault();
              await addOffer({
                title: newOffer.title,
                discountPercent: Number(newOffer.discountPercent),
                serviceId: newOffer.serviceId ? Number(newOffer.serviceId) : null,
                role: "subscriber",
              });
              fetchOffers().then(setOffers);
              setNewOffer({ title: "", discountPercent: "10", serviceId: "" });
            }}
          >
            <label>Title<input value={newOffer.title} onChange={(e) => setNewOffer({ ...newOffer, title: e.target.value })} required /></label>
            <label>Discount %<input type="number" value={newOffer.discountPercent} onChange={(e) => setNewOffer({ ...newOffer, discountPercent: e.target.value })} /></label>
            <label>Service ID (optional)<input value={newOffer.serviceId} onChange={(e) => setNewOffer({ ...newOffer, serviceId: e.target.value })} placeholder="e.g. 3 for AC" /></label>
            <button type="submit" className="btn btn--primary">Create offer</button>
          </form>
        </section>
      )}
    </div>
  );
}

function BookingAdminCard({ booking, onStatus, showActions = true }) {
  const status = STATUS_LABELS[booking.status] || { label: booking.status, className: "" };
  return (
    <article className="booking-card booking-card--admin">
      <div className="booking-card__head">
        <strong>#{booking.id} · {booking.userName}</strong>
        <span className={`status-badge ${status.className}`}>{status.label}</span>
      </div>
      <p className="booking-card__meta">{booking.userEmail} · {booking.phone}</p>
      <p className="booking-card__meta">📍 {booking.location}</p>
      <p className="booking-card__meta">{booking.address}</p>
      <ul className="booking-card__items">
        {booking.items.map((item, i) => (
          <li key={i}>{item.name} — ₹{item.price}</li>
        ))}
      </ul>
      <p className="booking-card__total">₹{booking.totalAmount} · Role: {booking.userRole}</p>
      {showActions && booking.status === "pending_approval" && (
        <div className="booking-card__actions">
          <button type="button" className="btn btn--primary" onClick={() => onStatus(booking.id, "approved")}>
            Approve
          </button>
          <button type="button" className="btn btn--danger" onClick={() => onStatus(booking.id, "rejected")}>
            Reject
          </button>
        </div>
      )}
    </article>
  );
}

import { useState } from "react";
import { createSession } from "../api";

const ROLES = [
  { id: "customer", title: "Customer", desc: "Standard pricing. Upgrade anytime." },
  { id: "subscriber", title: "Subscriber", desc: "Member pricing and exclusive offers." },
  { id: "admin", title: "Admin", desc: "Manage bookings, services, and chats." },
];

export default function LoginScreen({ onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("customer");
  const [adminKey, setAdminKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!name.trim() || !email.trim()) {
      setError("Please enter your name and email.");
      return;
    }
    if (role === "admin" && !adminKey.trim()) {
      setError("Admin key is required for admin access.");
      return;
    }
    setLoading(true);
    try {
      const user = await createSession({
        name: name.trim(),
        email: email.trim(),
        role,
        adminKey: role === "admin" ? adminKey.trim() : undefined,
      });
      onLogin(user);
    } catch (err) {
      const msg = err.response?.data?.message || "Could not sign in. Is the server running?";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="login-brand">
          <span className="site-header__logo">SS</span>
          <div>
            <h1>Solution Services</h1>
            <p>Home services at your doorstep</p>
          </div>
        </div>

        <form onSubmit={submit} className="login-form">
          <label>
            Your name
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" required />
          </label>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              required
            />
          </label>

          {role === "admin" && (
            <label>
              Admin key
              <input
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                placeholder="From server ADMIN_BOOTSTRAP_KEY"
                required
              />
            </label>
          )}

          <fieldset className="role-picker">
            <legend>Continue as</legend>
            {ROLES.map((r) => (
              <label key={r.id} className={`role-option ${role === r.id ? "role-option--active" : ""}`}>
                <input
                  type="radio"
                  name="role"
                  value={r.id}
                  checked={role === r.id}
                  onChange={() => setRole(r.id)}
                />
                <span className="role-option__title">{r.title}</span>
                <span className="role-option__desc">{r.desc}</span>
              </label>
            ))}
          </fieldset>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="btn btn--primary btn--block" disabled={loading}>
            {loading ? "Signing in…" : "Continue"}
          </button>
          <p className="login-note">Sessions are secured with signed tokens.</p>
        </form>
      </div>
    </div>
  );
}

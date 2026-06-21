import { useState } from "react";

export default function AdminPanel({ token, config, onLogin, onSaveConfig }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notificationEmail, setNotificationEmail] = useState(config.notificationEmail || "");
  const [whatsappMessage, setWhatsappMessage] = useState(config.whatsappMessage || "");
  const [isLoading, setIsLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await onLogin({ email, password });
    setIsLoading(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await onSaveConfig({ notificationEmail, whatsappMessage });
    setIsLoading(false);
  };

  return (
    <details className="admin-drawer" open={expanded} onToggle={(e) => setExpanded(e.target.open)}>
      <summary>Staff login & notifications</summary>
      <div className="panel admin-panel">
        {!token ? (
          <form onSubmit={handleLogin} className="admin-form">
            <label>
              Admin email
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@yourcompany.com"
                type="email"
                disabled={isLoading}
                required
              />
            </label>
            <label>
              Password
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                disabled={isLoading}
                required
              />
            </label>
            <button type="submit" className="btn btn--secondary" disabled={isLoading}>
              {isLoading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSave} className="admin-form">
            <p className="admin-badge">Signed in as admin</p>
            <label>
              Order notification email
              <input
                value={notificationEmail}
                onChange={(e) => setNotificationEmail(e.target.value)}
                type="email"
              />
            </label>
            <label>
              WhatsApp message template
              <textarea
                value={whatsappMessage}
                onChange={(e) => setWhatsappMessage(e.target.value)}
                rows={4}
                placeholder="Hi {name}, your booking #{orderId} is confirmed."
              />
            </label>
            <button type="submit" className="btn btn--secondary" disabled={isLoading}>
              {isLoading ? "Saving…" : "Save settings"}
            </button>
          </form>
        )}
      </div>
    </details>
  );
}

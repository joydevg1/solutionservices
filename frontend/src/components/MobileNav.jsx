export default function MobileNav({ activeTab, onTabChange, cartCount }) {
  const tabs = [
    { id: "browse", label: "Home", icon: "grid" },
    { id: "bookings", label: "Bookings", icon: "bookings" },
    { id: "cart", label: "Cart", icon: "cart", badge: cartCount },
    { id: "help", label: "Help", icon: "chat" },
  ];

  return (
    <nav className="mobile-nav" aria-label="Main navigation">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={`mobile-nav__item ${activeTab === tab.id ? "mobile-nav__item--active" : ""}`}
          onClick={() => onTabChange(tab.id)}
        >
          <span className={`mobile-nav__icon mobile-nav__icon--${tab.icon}`} data-icon={tab.icon} aria-hidden="true" />
          <span>{tab.label}</span>
          {tab.badge > 0 && <span className="mobile-nav__badge">{tab.badge}</span>}
        </button>
      ))}
    </nav>
  );
}

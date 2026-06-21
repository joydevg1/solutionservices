export default function AppHeader({ cartCount, onCartClick, searchQuery, onSearchChange, user, onLogout }) {
  return (
    <header className="site-header">
      <div className="site-header__brand">
        <span className="site-header__logo" aria-hidden="true">
          SS
        </span>
        <div>
          <p className="site-header__eyebrow">Trusted home professionals</p>
          <h1 className="site-header__title">Solution Services</h1>
        </div>
      </div>

      <div className="site-header__search">
        <svg className="site-header__search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path d="M20 20L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          placeholder="Search cleaning, AC, salon..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search services"
        />
      </div>

      {user && (
        <button type="button" className="site-header__profile" onClick={onLogout} title="Sign out">
          {user.name.split(" ")[0]}
        </button>
      )}

      <button type="button" className="site-header__cart" onClick={onCartClick} aria-label={`Cart, ${cartCount} items`}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M6 6h15l-1.5 9H8L6 6zm0 0L5 3H2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="9" cy="20" r="1.5" fill="currentColor" />
          <circle cx="18" cy="20" r="1.5" fill="currentColor" />
        </svg>
        {cartCount > 0 && <span className="site-header__cart-badge">{cartCount}</span>}
      </button>
    </header>
  );
}

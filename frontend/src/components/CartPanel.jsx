export default function CartPanel({
  cartItems,
  onRemoveItem,
  onCheckout,
  isCheckingOut,
  phone,
  onPhoneChange,
  address,
  onAddressChange,
  location,
}) {
  const total = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <aside className="cart-panel">
      <div className="cart-header">
        <h2>Booking summary</h2>
        <span className="cart-badge">{cartItems.length}</span>
      </div>

      <div className="cart-checkout-fields">
        <label>
          Phone
          <input
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            placeholder="+91 98765 43210"
          />
        </label>
        <label>
          Address
          <textarea
            value={address}
            onChange={(e) => onAddressChange(e.target.value)}
            rows={2}
            placeholder="Flat, building, landmark"
          />
        </label>
        {!location?.trim() && (
          <p className="cart-location-hint">Set your area in the location bar above</p>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Cart is empty</p>
          <p className="cart-empty__hint">Pick a category to add services</p>
        </div>
      ) : (
        <>
          <ul className="cart-items">
            {cartItems.map((item, idx) => (
              <li key={`${item.id || item.name}-${idx}`} className="cart-item">
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-service">
                    {item.serviceName}
                    {item.categoryName ? ` · ${item.categoryName}` : ""}
                  </div>
                </div>
                <div className="cart-item-right">
                  <div className="cart-item-price">₹{item.price}</div>
                  <button
                    type="button"
                    className="cart-item-remove"
                    onClick={() => onRemoveItem(idx)}
                    aria-label={`Remove ${item.name}`}
                  >
                    ×
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-footer">
            <div className="cart-total">
              <span>Total</span>
              <strong>₹{total}</strong>
            </div>
            <button
              type="button"
              className="checkout-button"
              onClick={onCheckout}
              disabled={isCheckingOut || cartItems.length === 0}
            >
              {isCheckingOut ? "Submitting…" : "Request booking"}
            </button>
            <p className="cart-footer-note">Admin will approve your request</p>
          </div>
        </>
      )}
    </aside>
  );
}

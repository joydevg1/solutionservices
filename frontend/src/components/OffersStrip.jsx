export default function OffersStrip({ offers, userRole, onUpgrade, compact = false }) {
  if (userRole === "subscriber" && offers?.length) {
    return (
      <section className={`offers-strip ${compact ? "offers-strip--compact" : ""}`}>
        {!compact && <h2 className="section-title">Offers</h2>}
        <div className="offers-strip__list">
          {offers.slice(0, compact ? 2 : 4).map((o) => (
            <div key={o.id} className="offer-pill">
              <span className="offer-pill__badge">{o.discountPercent}%</span>
              <span className="offer-pill__text">{o.title}</span>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (userRole === "customer") {
    return (
      <section className={`upgrade-banner ${compact ? "upgrade-banner--compact" : ""}`}>
        <div>
          <h3>Go Premium</h3>
          <p>15% off every booking</p>
        </div>
        <button type="button" className="btn btn--light btn--sm" onClick={onUpgrade}>
          Upgrade
        </button>
      </section>
    );
  }

  return null;
}

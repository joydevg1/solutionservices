import { FEATURED_AC } from "../constants/dashboard";
import { applyPrice } from "../utils/pricing";

export default function FeaturedRow({ userRole, offers, onBookItem }) {
  return (
    <section className="featured-row">
      <div className="section-head">
        <h2 className="section-title">Most booked — AC services</h2>
        <button type="button" className="link-btn" onClick={() => onBookItem(3)}>
          See all
        </button>
      </div>
      <div className="featured-row__scroll">
        {FEATURED_AC.map((item) => {
          const { base, final, discountPercent } = applyPrice(item.price, userRole, offers, 3);
          return (
            <article key={item.name} className="mini-card">
              {item.tag && <span className="mini-card__tag">{item.tag}</span>}
              <div className="mini-card__rating">★ {item.rating}</div>
              <h3>{item.name}</h3>
              <div className="mini-card__price">
                {discountPercent > 0 && <s>₹{base}</s>}
                <strong>₹{final}</strong>
              </div>
              <button type="button" className="btn btn--sm btn--primary" onClick={() => onBookItem(3)}>
                Add
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default function Recommendations({ recommendations, onSelect }) {
  if (!recommendations.length) return null;

  return (
    <section className="section-block recommendations-block">
      <h2 className="section-title">Picked for you</h2>
      <div className="recommendation-cards">
        {recommendations.map((item) => (
          <button
            key={item.id}
            type="button"
            className="recommendation-card"
            onClick={() => onSelect?.(item)}
          >
            <div className="recommendation-title">{item.title}</div>
            <div className="recommendation-category">{item.category}</div>
            {item.price != null && <div className="recommendation-price">from ₹{item.price}</div>}
          </button>
        ))}
      </div>
    </section>
  );
}

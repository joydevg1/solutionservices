const categoryIcons = {
  Cleaning: "🧹",
  Beauty: "💇",
  Repair: "❄️",
  "Home Services": "🔧",
};

const categoryColors = {
  Cleaning: "#ecfdf5",
  Beauty: "#fdf4ff",
  Repair: "#eff6ff",
  "Home Services": "#fff7ed",
};

export default function ServiceCard({ service, onClick }) {
  const icon = categoryIcons[service.category] || "✨";
  const bg = categoryColors[service.category] || "#f8fafc";
  const startingPrice = Number(service.price) || 0;

  return (
    <button type="button" className="service-card" onClick={onClick} style={{ "--card-tint": bg }}>
      <div className="service-card__top">
        <span className="service-card__icon">{icon}</span>
        <span className="service-card__category">{service.category}</span>
      </div>
      <h3 className="service-card__title">{service.title}</h3>
      <p className="service-card__desc">{service.description}</p>
      <div className="service-card__footer">
        <span className="service-card__cta">Explore →</span>
        <span className="service-card__price">
          {service.discountPercent > 0 && <s>₹{service.basePrice || startingPrice}</s>}
          <strong>₹{service.price ?? startingPrice}</strong>
        </span>
      </div>
    </button>
  );
}

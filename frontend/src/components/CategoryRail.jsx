import { CATEGORY_CHIPS } from "../constants/dashboard";

export default function CategoryRail({ onSelect, compact = false }) {
  return (
    <section className={`category-rail ${compact ? "category-rail--compact" : ""}`}>
      {!compact && <h2 className="section-title">Categories</h2>}
      <div className="category-rail__grid">
        {CATEGORY_CHIPS.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={`category-chip ${cat.highlight ? "category-chip--highlight" : ""}`}
            onClick={() => onSelect(cat.id)}
          >
            <span className="category-chip__icon">{cat.icon}</span>
            <span className="category-chip__label">{cat.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

import React from "react";

export default function ServiceModal({ service, subcategories, onSelect, onClose }) {
  if (!subcategories) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} title="Close">
          ✕
        </button>

        <h2 className="modal-title">📋 {subcategories.title}</h2>
        <p style={{ color: "#666", marginBottom: "24px", fontSize: "0.95rem" }}>
          Select the specific service you need
        </p>

        {subcategories.sections.map((section, idx) => (
          <div key={idx} className="modal-section">
            <h3 className="section-name">{section.name}</h3>
            <div className="items-grid">
              {section.items.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  className="item-box"
                  onClick={() => onSelect(item)}
                  role="button"
                  tabIndex="0"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      onSelect(item);
                    }
                  }}
                >
                  <div className="item-icon">📦</div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

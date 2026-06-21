import { useState, useEffect } from "react";
import { serviceHierarchy, serviceIcons } from "../constants/serviceHierarchy";
import { applyPrice } from "../utils/pricing";

export default function HierarchicalServiceBrowser({
  onAddToCart,
  onClose,
  initialServiceId = null,
  userRole = "customer",
  offers = [],
}) {
  const [selectedService, setSelectedService] = useState(initialServiceId);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [addedItems, setAddedItems] = useState(new Set());

  useEffect(() => {
    setSelectedService(initialServiceId);
    setSelectedCategory(null);
  }, [initialServiceId]);

  const service = selectedService ? serviceHierarchy[selectedService] : null;
  const categories = service ? Object.keys(service.categories) : [];

  const handleServiceSelect = (serviceId) => {
    setSelectedService(serviceId);
    setSelectedCategory(null);
  };

  const handleAddToCart = (item) => {
    const priced = applyPrice(item.price, userRole, offers, selectedService);
    onAddToCart({
      serviceName: service.name,
      categoryName: selectedCategory,
      name: item.name,
      price: priced.final,
      basePrice: priced.base,
      discountPercent: priced.discountPercent,
      id: `${selectedService}-${selectedCategory}-${item.name}`,
    });
    setAddedItems((prev) => new Set([...prev, item.name]));
  };

  const title = !selectedService
    ? "Choose a service"
    : selectedCategory
      ? selectedCategory
      : service.name;

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="browser-title"
    >
      <div className="modal-content modal-content--browser">
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <div className="hierarchical-browser">
          <div className="browser-header">
            <div>
              <p className="browser-eyebrow">Book a sub-service</p>
              <h2 id="browser-title">{title}</h2>
            </div>
          </div>

          {(selectedService || selectedCategory) && (
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <button type="button" className="breadcrumb-link" onClick={() => { setSelectedService(null); setSelectedCategory(null); }}>
                All services
              </button>
              {selectedService && (
                <>
                  <span className="breadcrumb-separator">/</span>
                  <button
                    type="button"
                    className="breadcrumb-link"
                    onClick={() => setSelectedCategory(null)}
                    aria-current={selectedCategory ? undefined : "page"}
                  >
                    {serviceHierarchy[selectedService].name}
                  </button>
                </>
              )}
              {selectedCategory && (
                <>
                  <span className="breadcrumb-separator">/</span>
                  <span className="breadcrumb-current">{selectedCategory}</span>
                </>
              )}
            </nav>
          )}

          <div className="browser-content">
            {!selectedService ? (
              <div className="services-list">
                {Object.entries(serviceHierarchy).map(([id, svc]) => (
                  <button
                    key={id}
                    type="button"
                    className="service-item-button"
                    onClick={() => handleServiceSelect(Number(id))}
                  >
                    <span className="service-item-icon">{serviceIcons[svc.icon] || "📦"}</span>
                    <div className="service-item-info">
                      <span className="service-item-name">{svc.name}</span>
                      <span className="service-item-count">
                        {Object.keys(svc.categories).length} categories
                      </span>
                    </div>
                    <span className="service-item-arrow" aria-hidden="true">→</span>
                  </button>
                ))}
              </div>
            ) : !selectedCategory ? (
              <div className="categories-list">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className="category-item"
                    onClick={() => setSelectedCategory(category)}
                  >
                    <span className="category-item-name">{category}</span>
                    <span className="category-item-count">{service.categories[category].length}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="items-list">
                {service.categories[selectedCategory].map((item) => {
                const priced = applyPrice(item.price, userRole, offers, selectedService);
                return (
                  <div key={item.name} className="item-row">
                    <div className="item-info">
                      <div className="item-name">{item.name}</div>
                      <div className="item-price">
                        {priced.discountPercent > 0 && <s>₹{priced.base}</s>}
                        <strong> ₹{priced.final}</strong>
                      </div>
                    </div>
                    <button
                      type="button"
                      className={`add-btn ${addedItems.has(item.name) ? "added" : ""}`}
                      onClick={() => handleAddToCart(item)}
                      disabled={addedItems.has(item.name)}
                    >
                      {addedItems.has(item.name) ? "Added" : "Add"}
                    </button>
                  </div>
                );
              })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

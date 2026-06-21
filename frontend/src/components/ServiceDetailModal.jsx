import React, { useState } from "react";

const serviceDetails = {
  1: {
    title: "Home Cleaning",
    icon: "🧹",
    description: "Professional home cleaning services",
    sections: [
      {
        name: "Room Cleaning",
        items: [
          { name: "Kitchen", price: 500 },
          { name: "Bathroom", price: 400 },
          { name: "Bedroom", price: 350 },
          { name: "Living Room", price: 450 },
          { name: "Balcony", price: 300 }
        ]
      },
      {
        name: "Deep Cleaning",
        items: [
          { name: "Deep Sofa Cleaning", price: 800 },
          { name: "Kitchen Chimney Cleaning", price: 600 },
          { name: "Carpet Cleaning", price: 700 },
          { name: "Wall Cleaning", price: 550 }
        ]
      }
    ]
  },
  2: {
    title: "Salon at Home",
    icon: "💇",
    description: "Professional salon services at your home",
    sections: [
      {
        name: "Hair Services",
        items: [
          { name: "Haircut", price: 300 },
          { name: "Styling", price: 400 },
          { name: "Coloring", price: 1000 },
          { name: "Hair Treatment", price: 800 }
        ]
      },
      {
        name: "Body Care",
        items: [
          { name: "Waxing", price: 500 },
          { name: "Threading", price: 200 },
          { name: "Manicure", price: 300 },
          { name: "Pedicure", price: 400 },
          { name: "Grooming", price: 600 }
        ]
      }
    ]
  },
  3: {
    title: "Appliance Repair",
    icon: "🔧",
    description: "Professional appliance repair services",
    sections: [
      {
        name: "Large Appliances",
        items: [
          { name: "AC Repair", price: 800 },
          { name: "Washing Machine Repair", price: 700 },
          { name: "Refrigerator Repair", price: 900 },
          { name: "Television Repair", price: 1000 }
        ]
      },
      {
        name: "Other Appliances",
        items: [
          { name: "Chimney Repair", price: 600 },
          { name: "Microwave Repair", price: 500 },
          { name: "Laptop Repair", price: 1200 },
          { name: "RO/Water Purifier Repair", price: 700 },
          { name: "Geyser Repair", price: 600 },
          { name: "Air Cooler Repair", price: 500 }
        ]
      }
    ]
  },
  4: {
    title: "Plumbing",
    icon: "🚰",
    description: "Professional plumbing services",
    sections: [
      {
        name: "Common Issues",
        items: [
          { name: "Blocked Drains", price: 400 },
          { name: "Leaky Taps", price: 350 },
          { name: "Pipe Repair", price: 600 },
          { name: "Geyser Repair", price: 700 }
        ]
      },
      {
        name: "Installation",
        items: [
          { name: "Faucet Installation", price: 500 },
          { name: "Bathroom Fittings", price: 800 },
          { name: "Water Tank Installation", price: 1500 }
        ]
      }
    ]
  },
  5: {
    title: "Electrical Services",
    icon: "⚡",
    description: "Professional electrical services",
    sections: [
      {
        name: "Installations",
        items: [
          { name: "Wiring", price: 800 },
          { name: "Switchboard Installation", price: 1000 },
          { name: "Fan Installation", price: 400 },
          { name: "Light Fitting", price: 300 }
        ]
      },
      {
        name: "Maintenance",
        items: [
          { name: "Inverter Service", price: 600 },
          { name: "Safety Inspection", price: 500 },
          { name: "Troubleshooting", price: 400 }
        ]
      }
    ]
  },
  6: {
    title: "Pest Control",
    icon: "🐛",
    description: "Professional pest control services",
    sections: [
      {
        name: "Pest Types",
        items: [
          { name: "Mosquitoes Treatment", price: 700 },
          { name: "Cockroaches Treatment", price: 800 },
          { name: "Rodents Treatment", price: 900 },
          { name: "Ants Treatment", price: 600 },
          { name: "Termites Treatment", price: 1200 }
        ]
      },
      {
        name: "Treatment Options",
        items: [
          { name: "Standard Treatment", price: 500 },
          { name: "Premium Treatment", price: 1000 },
          { name: "Maintenance Plan (Monthly)", price: 800 }
        ]
      }
    ]
  }
};

export default function ServiceDetailModal({ serviceId, onAddToCart, onClose }) {
  const service = serviceDetails[serviceId];
  const [addedItems, setAddedItems] = useState(new Set());
  const [justAdded, setJustAdded] = useState(null);

  if (!service) {
    return null;
  }

  const handleAddToCart = (item) => {
    onAddToCart({
      serviceName: service.title,
      name: item.name,
      price: item.price,
      id: `${serviceId}-${item.name}`
    });

    setAddedItems(new Set([...addedItems, item.name]));
    setJustAdded(item.name);
    setTimeout(() => setJustAdded(null), 1500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} title="Close">
          ✕
        </button>

        <div className="service-detail-header">
          <div style={{ fontSize: "3rem" }}>{service.icon}</div>
          <div>
            <h2 className="modal-title">{service.title}</h2>
            <p style={{ color: "#666", margin: "8px 0 0" }}>{service.description}</p>
          </div>
        </div>

        <div className="service-detail-body">
          {service.sections.map((section, sectionIdx) => (
            <div key={sectionIdx} className="service-section">
              <h3 className="section-name">📂 {section.name}</h3>
              <div className="service-items-list">
                {section.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="service-item">
                    <div className="service-item-info">
                      <div className="service-item-name">{item.name}</div>
                      <div className="service-item-price">₹{item.price}</div>
                    </div>
                    <button
                      className={`add-to-cart-btn ${addedItems.has(item.name) ? 'added' : ''}`}
                      onClick={() => handleAddToCart(item)}
                      title="Add to cart"
                    >
                      {addedItems.has(item.name) ? "✓ Added" : "+ Add"}
                    </button>
                    {justAdded === item.name && (
                      <div className="add-animation">✓</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="modal-footer">
          <p style={{ color: "#999", fontSize: "0.85rem", margin: 0 }}>
            Click "Add" on any service to add it to your cart
          </p>
        </div>
      </div>
    </div>
  );
}

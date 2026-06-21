const knowledgeBase = require("../data/knowledgeBase");

const SUBSCRIBER_DEFAULT_DISCOUNT = 15;

function applyDiscount(price, discountPercent) {
  const discount = Math.round((price * discountPercent) / 100);
  return Math.max(0, price - discount);
}

function getOffersForUser(offers, userRole, serviceId = null) {
  if (userRole !== "subscriber") return [];
  return offers.filter(
    (o) =>
      o.active !== false &&
      (o.role === "subscriber" || !o.role) &&
      (o.serviceId == null || o.serviceId === serviceId)
  );
}

function priceForItem(basePrice, userRole, offers, serviceId = null) {
  const price = Number(basePrice) || 0;
  if (userRole === "admin") return { base: price, final: price, discountPercent: 0 };

  if (userRole === "subscriber") {
    const applicable = getOffersForUser(offers, "subscriber", serviceId);
    const best = applicable.reduce((max, o) => Math.max(max, o.discountPercent || 0), SUBSCRIBER_DEFAULT_DISCOUNT);
    return { base: price, final: applyDiscount(price, best), discountPercent: best };
  }

  return { base: price, final: price, discountPercent: 0 };
}

function enrichServices(services, userRole, offers) {
  return services.map((s) => {
    const pricing = priceForItem(s.price, userRole, offers, s.id);
    return {
      ...s,
      basePrice: pricing.base,
      price: pricing.final,
      discountPercent: pricing.discountPercent,
    };
  });
}

function mergeCatalog(customServices, userRole, offers) {
  const base = [...knowledgeBase, ...customServices.map((c) => ({
    id: c.id,
    title: c.title,
    category: c.category,
    price: c.basePrice,
    description: c.description,
    custom: true,
  }))];
  return enrichServices(base, userRole, offers);
}

module.exports = {
  SUBSCRIBER_DEFAULT_DISCOUNT,
  priceForItem,
  enrichServices,
  mergeCatalog,
  getOffersForUser,
};

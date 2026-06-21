const DEFAULT_SUBSCRIBER_DISCOUNT = 15;

export function getDiscountForItem(offers, userRole, serviceId) {
  if (userRole !== "subscriber") return 0;
  const applicable = (offers || []).filter(
    (o) => o.active !== false && (o.serviceId == null || o.serviceId === serviceId)
  );
  const fromOffers = applicable.reduce((max, o) => Math.max(max, o.discountPercent || 0), 0);
  return Math.max(DEFAULT_SUBSCRIBER_DISCOUNT, fromOffers);
}

export function applyPrice(basePrice, userRole, offers, serviceId) {
  const base = Number(basePrice) || 0;
  const discount = getDiscountForItem(offers, userRole, serviceId);
  const final = discount > 0 ? Math.round(base * (1 - discount / 100)) : base;
  return { base, final, discountPercent: discount };
}

from data.knowledge_base import get_knowledge_base

SUBSCRIBER_DEFAULT_DISCOUNT = 15


def apply_discount(price, discount_percent):
    discount = round((price * discount_percent) / 100)
    return max(0, price - discount)


def get_discount_for_item(offers, user_role, service_id=None):
    if user_role != "subscriber":
        return 0
    applicable = [
        o
        for o in offers
        if o.get("active", True)
        and (o.get("serviceId") is None or o.get("serviceId") == service_id)
    ]
    from_offers = max((o.get("discountPercent", 0) for o in applicable), default=0)
    return max(SUBSCRIBER_DEFAULT_DISCOUNT, from_offers)


def price_for_item(base_price, user_role, offers, service_id=None):
    price = float(base_price or 0)
    if user_role == "admin":
        return {"base": price, "final": price, "discountPercent": 0}
    if user_role == "subscriber":
        discount = get_discount_for_item(offers, user_role, service_id)
        return {
            "base": price,
            "final": apply_discount(price, discount),
            "discountPercent": discount,
        }
    return {"base": price, "final": price, "discountPercent": 0}


def merge_catalog(custom_services, user_role, offers):
    base = list(get_knowledge_base())
    for c in custom_services:
        base.append(
            {
                "id": c["id"],
                "title": c["title"],
                "category": c["category"],
                "price": c["basePrice"],
                "description": c.get("description", ""),
                "custom": True,
            }
        )
    result = []
    for s in base:
        p = price_for_item(s["price"], user_role, offers, s["id"])
        result.append(
            {
                **s,
                "basePrice": p["base"],
                "price": p["final"],
                "discountPercent": p["discountPercent"],
            }
        )
    return result

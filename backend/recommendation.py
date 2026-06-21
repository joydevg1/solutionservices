from llm_utils import generate_text
from data.knowledge_base import get_knowledge_base

def get_top_services():
    """Return top 3 services as default recommendations."""
    kb = get_knowledge_base()
    return [{"id": s["id"], "title": s["title"], "category": s["category"]} for s in kb[:3]]

async def generate_recommendations(past_purchases=None):
    """Generate recommendations based on past purchases."""
    if not past_purchases:
        return get_top_services()
    
    kb = get_knowledge_base()
    purchase_list = "\n".join([f"- {purchase}" for purchase in past_purchases])
    service_list = ", ".join([s["title"] for s in kb])
    
    prompt = f"""You are a service recommendation assistant for a home services marketplace. The customer has previously purchased:
{purchase_list}

Recommend up to 4 services from this list: {service_list}. Provide only service names separated by commas."""
    
    text = generate_text(prompt, max_tokens=80, temperature=0.6)
    
    if not text:
        return fallback_recommendations(past_purchases)
    
    # Parse recommendations from the generated text
    names = []
    for item in text.replace("\n", ",").replace("|", ",").replace(";", ",").split(","):
        item = item.strip()
        if item:
            names.append(item)
    
    matches = []
    for name in names:
        for service in kb:
            if name.lower() in service["title"].lower() and service not in matches:
                matches.append(service)
                break
    
    if matches:
        return matches[:4]
    
    return fallback_recommendations(past_purchases)

def fallback_recommendations(past_purchases):
    """Return fallback recommendations when LLM generation fails."""
    kb = get_knowledge_base()
    categories = set()
    
    for purchase in past_purchases:
        for service in kb:
            if purchase.lower() == service["title"].lower() or purchase.lower() in service["title"].lower():
                categories.add(service["category"])
                break
    
    recommended = [s for s in kb if s["category"] in categories]
    
    if not recommended:
        return get_top_services()
    
    return recommended[:4]

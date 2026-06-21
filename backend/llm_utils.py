import os
from data.knowledge_base import get_knowledge_base

def load_model():
    """Load the language model and tokenizer (simplified version)."""
    return True, True

def generate_text(prompt, max_tokens=150, temperature=0.7):
    """
    Generate text using simple text matching instead of LLM.
    Falls back to knowledge base matching for practical recommendations.
    """
    try:
        kb = get_knowledge_base()
        
        # Simple keyword-based response generation
        normalized_prompt = prompt.lower()
        
        # Extract service-related keywords
        best_match = None
        best_score = 0
        
        for service in kb:
            keywords = service['title'].lower().split() + service['description'].lower().split()
            score = sum(1 for keyword in keywords if keyword in normalized_prompt)
            if score > best_score:
                best_score = score
                best_match = service
        
        if best_match and best_score > 0:
            return f"Based on your query, I recommend our {best_match['title']} service at ₹{best_match['price']}. {best_match['description']}"
        
        # Fallback response
        return "I can help you with information about our services including Home Cleaning, Salon at Home, Appliance Repair, Plumbing, Electrical Services, and Pest Control. What would you like to know?"
    
    except Exception as e:
        print(f"Error generating text: {e}")
        return None


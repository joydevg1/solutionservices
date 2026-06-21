const { generateText } = require("./llm");
const knowledgeBase = require("./data/knowledgeBase");

function getTopServices() {
  return knowledgeBase.slice(0, 3).map((service) => ({
    id: service.id,
    title: service.title,
    category: service.category,
  }));
}

async function generateRecommendations(pastPurchases = []) {
  if (!pastPurchases || pastPurchases.length === 0) {
    return getTopServices();
  }

  const purchaseList = pastPurchases.map((purchase) => `- ${purchase}`).join("\n");
  const prompt = `You are a service recommendation assistant for a home services marketplace. The customer has previously purchased:\n${purchaseList}\n\nRecommend up to 4 services from this list: ${knowledgeBase
    .map((service) => service.title)
    .join(", ")}\. Provide only service names separated by commas.`;

  const text = await generateText(prompt, { maxTokens: 80, temperature: 0.6 });
  if (!text) {
    return fallbackRecommendations(pastPurchases);
  }

  const names = text
    .split(/,|\n|\||;/)
    .map((item) => item.trim())
    .filter(Boolean);

  const matches = [];
  for (const name of names) {
    const service = knowledgeBase.find((s) =>
      s.title.toLowerCase().includes(name.toLowerCase())
    );
    if (service && !matches.some((m) => m.id === service.id)) {
      matches.push(service);
    }
  }

  return matches.length > 0 ? matches.slice(0, 4) : fallbackRecommendations(pastPurchases);
}

function fallbackRecommendations(pastPurchases) {
  const categories = new Set(pastPurchases.map((service) => {
    const match = knowledgeBase.find((item) =>
      item.title.toLowerCase() === service.toLowerCase() || item.title.toLowerCase().includes(service.toLowerCase())
    );
    return match ? match.category : null;
  }).filter(Boolean));

  const recommended = knowledgeBase.filter((service) => categories.has(service.category));
  if (recommended.length === 0) {
    return getTopServices();
  }

  return recommended.slice(0, 4);
}

module.exports = {
  generateRecommendations,
};

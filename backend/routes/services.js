const express = require("express");
const router = express.Router();
const store = require("../store/dataStore");
const { generateRecommendations } = require("../recommendation");
const { mergeCatalog } = require("../utils/pricing");
const { effectiveRole, decodeToken, getBearerToken } = require("../middleware/auth");

function resolveRole(req) {
  const token = getBearerToken(req);
  if (token) {
    try {
      return decodeToken(token).role || "customer";
    } catch {
      /* fall through */
    }
  }
  return effectiveRole(req);
}

router.get("/", (req, res) => {
  const role = resolveRole(req);
  const offers = store.listOffers();
  const custom = store.listCustomServices();
  res.json(mergeCatalog(custom, role, offers));
});

router.get("/recommendations", async (req, res) => {
  const { email } = req.query;
  const role = resolveRole(req);
  try {
    let purchases = [];
    if (email) {
      purchases = store
        .listBookings()
        .filter((b) => b.userEmail === email.toLowerCase() && b.status === "approved")
        .flatMap((b) => b.items.map((i) => i.name));
    }
    const recommendations = await generateRecommendations(purchases);
    const offers = store.listOffers();
    const enriched = mergeCatalog([], role, offers).filter((s) =>
      recommendations.some((r) => r.id === s.id)
    );
    res.json(enriched.length ? enriched : recommendations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to generate recommendations." });
  }
});

module.exports = router;

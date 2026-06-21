const express = require("express");
const { generateText } = require("../llm");
const knowledgeBase = require("../data/knowledgeBase");
const store = require("../store/dataStore");
const { requireAuth, requireRole, sanitizeText, decodeToken, getBearerToken } = require("../middleware/auth");

const router = express.Router();
const MAX_MESSAGE_LEN = 2000;

function buildKnowledgePrompt(question) {
  const facts = knowledgeBase.map((item) => `${item.title}: ${item.description}`).join("\n\n");
  return `You are a support assistant for Solution Services.\n\nKnowledge Base:\n${facts}\n\nQuestion: ${question}\nAnswer:`;
}

function isOutOfContext(question) {
  const normalized = question.toLowerCase();
  const keywords = ["price", "service", "cleaning", "salon", "repair", "plumbing", "electrical", "pest", "order", "booking", "home", "ac", "subscribe", "location"];
  return !keywords.some((k) => normalized.includes(k));
}

router.post("/", requireAuth, async (req, res) => {
  const message = sanitizeText(req.body.message, MAX_MESSAGE_LEN);
  const userId = req.body.userId;
  if (!message) return res.status(400).json({ message: "Question message is required." });
  if (userId !== req.user.id) return res.status(403).json({ message: "Cannot send chat as another user." });

  try {
    store.addChatMessage({ userId, from: "user", text: message });
    let answer;
    let outOfContext = false;
    if (isOutOfContext(message)) {
      answer = "I can only help with our services, pricing, bookings, and locations.";
      outOfContext = true;
    } else {
      const response = await generateText(buildKnowledgePrompt(message), { maxTokens: 120, temperature: 0.6 });
      answer = response ? response.trim() : "Sorry, I am unable to answer that right now.";
    }
    store.addChatMessage({ userId, from: "assistant", text: answer });
    res.json({ answer, outOfContext });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to process chat request." });
  }
});

router.get("/history/:userId", (req, res) => {
  const token = getBearerToken(req);
  if (!token) return res.status(401).json({ message: "Authentication required." });
  try {
    const payload = decodeToken(token);
    const userId = Number(req.params.userId);
    if (payload.role !== "admin" && Number(payload.sub) !== userId) {
      return res.status(403).json({ message: "Access denied." });
    }
    res.json(store.getChatByUser(userId));
  } catch {
    res.status(401).json({ message: "Invalid or expired token." });
  }
});

router.get("/users", requireRole("admin"), (req, res) => {
  res.json(store.getChatUserSummaries());
});

module.exports = router;

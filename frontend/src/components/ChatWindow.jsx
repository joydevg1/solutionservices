import { useState, useEffect, useRef } from "react";
import { fetchChatHistory } from "../api";

const SUGGESTIONS = [
  "What AC cleaning options do you offer?",
  "How much is foam cleaning for subscribers?",
  "How does booking approval work?",
];

export default function ChatWindow({ onSend, conversation, userId, onHistoryLoaded }) {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatLogRef = useRef(null);

  useEffect(() => {
    if (!userId) return;
    fetchChatHistory(userId)
      .then((msgs) => {
        if (msgs.length && onHistoryLoaded) {
          onHistoryLoaded(
            msgs.map((m) => ({
              from: m.from === "user" ? "user" : "assistant",
              text: m.text,
            }))
          );
        }
      })
      .catch(console.error);
  }, [userId]);

  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [conversation]);

  const send = async (text) => {
    const trimmed = (text || message).trim();
    if (!trimmed || !userId) return;

    setIsLoading(true);
    await onSend(trimmed);
    setMessage("");
    setIsLoading(false);
  };

  return (
    <section className="chat-panel">
      <h2 className="section-title">Help & support</h2>
      <p className="section-sub">Ask about services, pricing, or bookings</p>

      <div className="chat-log" ref={chatLogRef}>
        {conversation.length === 0 ? (
          <div className="chat-empty">
            <p>How can we help you today?</p>
            <div className="chat-suggestions">
              {SUGGESTIONS.map((q) => (
                <button key={q} type="button" className="chat-suggestion" onClick={() => send(q)} disabled={isLoading}>
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          conversation.map((entry, index) => (
            <div key={index} className={entry.from === "user" ? "chat-item user" : "chat-item bot"}>
              <div className="chat-label">{entry.from === "user" ? "You" : "Assistant"}</div>
              <div className="chat-text">{entry.text}</div>
            </div>
          ))
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
        className="chat-form"
      >
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your question..."
          disabled={isLoading}
          aria-label="Chat message"
        />
        <button type="submit" className="btn btn--primary" disabled={isLoading}>
          {isLoading ? "…" : "Send"}
        </button>
      </form>
    </section>
  );
}

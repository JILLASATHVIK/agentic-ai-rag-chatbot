import { useState } from "react";
import "./App.css";

const API_URL = "http://127.0.0.1:8000";

function App() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const askQuestion = async (text = question) => {
    const q = text.trim();

    if (!q || loading) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: q },
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: q,
        }),
      });

      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data.answer ||
            "No answer was returned from the RAG system.",
          sources: data.sources || [],
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Unable to connect to the RAG API. Make sure FastAPI is running on port 8000.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    askQuestion();
  };

  const suggestions = [
    "What is Agentic AI?",
    "How does Agentic AI work?",
    "What capabilities do AI agents have?",
  ];

  return (
    <div className="app">
      <div className="background-grid" />
      <div className="glow glow-one" />
      <div className="glow glow-two" />

      <header className="topbar">
        <div className="brand">
          <div className="brand-icon">✦</div>

          <div>
            <h1>AGENTIC AI</h1>
            <span>RAG INTELLIGENCE SYSTEM</span>
          </div>
        </div>

        <div className="status">
          <span className="status-dot" />
          SYSTEM ONLINE
        </div>
      </header>

      <main className="main">
        <section className="hero">
          <div className="eyebrow">
            LOCAL KNOWLEDGE ENGINE
          </div>

          <h2>
            Agentic <span>Intelligence</span>
          </h2>

          <p>
            Explore your Agentic AI knowledge base,
            grounded in retrieved source material.
          </p>

          <div className="suggestions">
            {suggestions.map((item) => (
              <button
                key={item}
                onClick={() => askQuestion(item)}
                disabled={loading}
              >
                {item}
                <span>→</span>
              </button>
            ))}
          </div>
        </section>

        <section className="chat-area">
          {messages.length === 0 ? (
            <div className="empty-state">
              <div className="orb">
                <div className="orb-inner">✦</div>
              </div>

              <h3>Knowledge Interface</h3>

              <p>
                Ask a question about Agentic AI and receive
                an answer generated from your Pinecone
                knowledge base.
              </p>
            </div>
          ) : (
            <div className="messages">
              {messages.map((message, index) => (
                <div
                  className={`message-row ${message.role}`}
                  key={index}
                >
                  {message.role === "assistant" && (
                    <div className="avatar">✦</div>
                  )}

                  <div className="message-content">
                    <div className="message-label">
                      {message.role === "user"
                        ? "YOU"
                        : "AGENTIC AI"}
                    </div>

                    <div className="message-bubble">
                      {message.content}
                    </div>

                    {message.sources?.length > 0 && (
                      <div className="sources">
                        <span>Sources</span>

                        {message.sources.map(
                          (source, sourceIndex) => (
                            <div
                              key={sourceIndex}
                              className="source-item"
                            >
                              {source}
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="message-row assistant">
                  <div className="avatar">✦</div>

                  <div className="message-content">
                    <div className="message-label">
                      AGENTIC AI
                    </div>

                    <div className="message-bubble typing">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        <form
          className="input-container"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask about your Agentic AI knowledge base..."
            disabled={loading}
          />

          <button
            className="send-button"
            type="submit"
            disabled={loading || !question.trim()}
          >
            {loading ? "..." : "➤"}
          </button>
        </form>

        <div className="system-info">
          <span>LOCAL QWEN 2.5</span>
          <b>•</b>
          <span>PINECONE RAG</span>
          <b>•</b>
          <span>384D EMBEDDINGS</span>
        </div>
      </main>
    </div>
  );
}

export default App;
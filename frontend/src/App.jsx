import { useEffect, useRef, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  BrainCircuit,
  ChevronDown,
  Database,
  FileText,
  Send,
  Sparkles,
} from "lucide-react";
import "./App.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const SUGGESTED_QUESTIONS = [
  "What is Agentic AI?",
  "How does Agentic AI work?",
  "What capabilities do AI agents have?",
];

function sourceLabel(source) {
  const title = source.title || source.document_title || source.source;
  return title ? String(title).split(/[\\/]/).pop() : "Retrieved passage";
}

function App() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState("checking");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    let disposed = false;

    const checkHealth = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/health`);
        const health = await response.json();
        if (!response.ok || health.status !== "healthy") {
          throw new Error("API is not healthy");
        }
        if (!disposed) setApiStatus("online");
      } catch {
        if (!disposed) setApiStatus("offline");
      }
    };

    checkHealth();
    const intervalId = window.setInterval(checkHealth, 30_000);

    return () => {
      disposed = true;
      window.clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  const askQuestion = async (submittedQuestion = question) => {
    const userQuestion = submittedQuestion.trim();
    if (!userQuestion || loading) return;

    setMessages((current) => [
      ...current,
      { id: crypto.randomUUID(), role: "user", content: userQuestion },
    ]);
    setQuestion("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userQuestion }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "The request failed.");

      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.answer || "The API returned an empty answer.",
          sources: Array.isArray(data.sources) ? data.sources : [],
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "I couldn't complete that request. Check that the API, Pinecone, and Ollama are available, then try again.",
          sources: [],
          isError: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      askQuestion();
    }
  };

  return (
    <div className="app-shell">
      <div className="background-grid" aria-hidden="true" />
      <div className="glow glow-one" aria-hidden="true" />
      <div className="glow glow-two" aria-hidden="true" />

      <header className="topbar">
        <div className="brand">
          <div className="logo" aria-hidden="true">
            <Sparkles size={21} />
          </div>
          <div className="brand-copy">
            <h1>AGENTIC AI</h1>
            <span>RAG INTELLIGENCE SYSTEM</span>
          </div>
        </div>

        <div className={`system-status ${apiStatus}`} role="status">
          <span className="status-dot" />
          <span>
            {apiStatus === "online"
              ? "API CONNECTED"
              : apiStatus === "offline"
                ? "API OFFLINE"
                : "CHECKING API"}
          </span>
        </div>
      </header>

      <main className="main-layout">
        <aside className="sidebar" aria-label="System configuration">
          <p className="sidebar-heading">SYSTEMS</p>

          <div className="side-card">
            <div className="side-icon model-icon"><BrainCircuit size={19} /></div>
            <div className="side-copy">
              <strong>Qwen 2.5</strong>
              <p>Ollama · local inference</p>
            </div>
            <span className="side-tag">7B</span>
          </div>

          <div className="side-card">
            <div className="side-icon database-icon"><Database size={19} /></div>
            <div className="side-copy">
              <strong>Pinecone</strong>
              <p>agentic-ai-index-384</p>
            </div>
            <span className="side-tag">384D</span>
          </div>

          <div className="side-card">
            <div className="side-icon activity-icon"><Activity size={19} /></div>
            <div className="side-copy">
              <strong>RAG pipeline</strong>
              <p>Top 3 retrieved chunks</p>
            </div>
          </div>

          <div className="tech-box">
            <span className="tech-label">LOCAL EMBEDDINGS</span>
            <strong>all-MiniLM-L6-v2</strong>
            <span className="tech-detail">384 dimensions</span>
          </div>

          <div className="sidebar-footer">
            <span className="sidebar-pulse" />
            <span>Context-grounded responses</span>
          </div>
        </aside>

        <section className="chat-container" aria-label="Agentic AI chat">
          {messages.length === 0 ? (
            <div className="welcome">
              <div className="orb" aria-hidden="true">
                <span className="orb-core"><Sparkles size={30} /></span>
                <span className="orb-ring orb-ring-one" />
                <span className="orb-ring orb-ring-two" />
              </div>
              <p className="eyebrow">LOCAL KNOWLEDGE ENGINE</p>
              <h2>Agentic Intelligence</h2>
              <p className="welcome-copy">
                Explore your Agentic AI knowledge base, grounded in retrieved source material.
              </p>

              <div className="suggestions" aria-label="Suggested questions">
                {SUGGESTED_QUESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => setQuestion(suggestion)}
                  >
                    <span>{suggestion}</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="messages" role="log" aria-live="polite" aria-relevant="additions">
              {messages.map((message) => (
                <article className={`message-row ${message.role}`} key={message.id}>
                  <div className="message-avatar" aria-hidden="true">
                    {message.role === "assistant" ? <Sparkles size={16} /> : "YOU"}
                  </div>
                  <div className="message-content">
                    <span className="message-label">
                      {message.role === "assistant" ? "AGENTIC AI" : "YOU"}
                    </span>
                    <p className={message.isError ? "message-error" : ""}>{message.content}</p>
                    {message.role === "assistant" && message.sources?.length > 0 && (
                      <details className="sources">
                        <summary>
                          <FileText size={15} aria-hidden="true" />
                          <span>Sources</span>
                          <span className="source-count">{message.sources.length}</span>
                          <ChevronDown className="source-chevron" size={15} aria-hidden="true" />
                        </summary>
                        <div className="source-list">
                          {message.sources.map((source, index) => (
                            <div className="source-item" key={`${source.source || "source"}-${index}`}>
                              <strong>{sourceLabel(source)}</strong>
                              {source.page !== undefined && (
                                <span>Page {source.page}</span>
                              )}
                              {source.source && (
                                <small className="source-path">{source.source}</small>
                              )}
                            </div>
                          ))}
                        </div>
                      </details>
                    )}
                  </div>
                </article>
              ))}

              {loading && (
                <div className="message-row assistant" aria-label="Agentic AI is responding">
                  <div className="message-avatar" aria-hidden="true"><Sparkles size={16} /></div>
                  <div className="message-content">
                    <span className="message-label">RETRIEVING CONTEXT</span>
                    <div className="typing" aria-hidden="true">
                      <span /><span /><span />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}

          <div className="input-area">
            <div className="input-wrapper">
              <textarea
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about your Agentic AI knowledge base..."
                aria-label="Your question"
                rows={1}
              />
              <button
                className="send-button"
                type="button"
                onClick={() => askQuestion()}
                disabled={loading || !question.trim()}
                aria-label="Send question"
                title="Send question"
              >
                <Send size={18} />
              </button>
            </div>
            <div className="input-info">
              <span>LOCAL QWEN 2.5</span>
              <span className="info-divider" />
              <span>PINECONE RAG</span>
              <span className="input-hint">ENTER TO SEND · SHIFT + ENTER FOR NEW LINE</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
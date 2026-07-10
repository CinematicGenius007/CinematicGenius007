import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { chatGreeting, chatSuggestions } from "../content/chatPrompts";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open]);

  const busy = status === "submitted" || status === "streaming";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    sendMessage({ text });
    setInput("");
  }

  function ask(text: string) {
    if (busy) return;
    sendMessage({ text });
  }

  function splitSuggestions(text: string): { body: string; suggestions: string[] } {
    const match = text.match(/\n?SUGGESTIONS:\s*(.+)\s*$/i);
    if (!match) return { body: text, suggestions: [] };
    const suggestions = match[1]
      .split("|")
      .map((s) => s.trim())
      .filter(Boolean);
    return { body: text.slice(0, match.index).trim(), suggestions };
  }

  return (
    <div className={`chat chat--film${open ? " chat--open" : ""}`}>
      {open ? (
        <div className="chat__panel" role="dialog" aria-label="Chat with Ayush's portfolio assistant">
          <div className="chat__head">
            <span className="chat__title">Ask the projectionist</span>
            <button type="button" className="chat__close" onClick={() => setOpen(false)} aria-label="Close chat">
              ×
            </button>
          </div>
          <div className="chat__body" ref={scrollRef}>
            {messages.length === 0 ? (
              <>
                <p className="chat__greeting">{chatGreeting}</p>
                <div className="chat__suggestions">
                  {chatSuggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className="chat__suggestion"
                      onClick={() => ask(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </>
            ) : null}
            {messages.map((m, mi) => {
              const isLast = mi === messages.length - 1;
              return (
                <div key={m.id} className={`chat__msg chat__msg--${m.role}`}>
                  {m.parts.map((part, i) => {
                    if (part.type !== "text") return null;
                    const { body, suggestions } = splitSuggestions(part.text);
                    return (
                      <div key={i}>
                        {body}
                        {m.role === "assistant" && isLast && !busy && suggestions.length > 0 ? (
                          <div className="chat__suggestions chat__suggestions--inline">
                            {suggestions.map((s) => (
                              <button
                                key={s}
                                type="button"
                                className="chat__suggestion"
                                onClick={() => ask(s)}
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              );
            })}
            {busy ? <div className="chat__msg chat__msg--assistant chat__msg--pending">…</div> : null}
            {error ? (
              <p className="chat__error">
                {error.message.includes("429")
                  ? "Too many messages — try again later."
                  : "Something went wrong. Try again."}
              </p>
            ) : null}
          </div>
          <form className="chat__form" onSubmit={handleSubmit}>
            <input
              className="chat__input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something…"
              disabled={busy}
              aria-label="Message"
            />
            <button type="submit" className="chat__send" disabled={busy || !input.trim()}>
              Send
            </button>
          </form>
        </div>
      ) : null}
      <button
        type="button"
        className="chat__toggle"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? "×" : "Ask"}
      </button>
    </div>
  );
}

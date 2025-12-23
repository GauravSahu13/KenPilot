"use client";

import { useState, useRef, useEffect } from "react";
import { Send, RefreshCcw, History, Folder } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface SessionMeta {
  sessionId: string;
  createdAt?: string;
  updatedAt?: string;
  messageCount?: number;
}

const WELCOME: Message = {
  role: "assistant",
  content:
    "Hello! I'm the AI assistant for Kenmark ITan Solutions. How can I help you today?",
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessions, setSessions] = useState<SessionMeta[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const resetChat = () => {
    setMessages([WELCOME]);
    setSessionId(null);
    setInput("");
    inputRef.current?.focus();
  };

  const loadSessions = async () => {
    try {
      const res = await fetch("/api/chat/history?limit=100");
      const data = await res.json();
      if (Array.isArray(data)) {
        setSessions(data);
      }
    } catch (err) {
      console.error("Failed to load sessions", err);
    }
  };

  const loadSessionMessages = async (id: string) => {
    try {
      const res = await fetch(`/api/chat/history?sessionId=${encodeURIComponent(id)}`);
      const data = await res.json();
      if (data && Array.isArray(data.messages)) {
        setSessionId(id);
        setMessages(
          data.messages.map((m: { role: string; content: string }) => ({
            role: m.role === "assistant" ? "assistant" : "user",
            content: m.content,
          }))
        );
      }
    } catch (err) {
      console.error("Failed to load session messages", err);
    }
  };

  useEffect(() => {
    loadSessions();
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          sessionId: sessionId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (!sessionId && data.sessionId) {
          setSessionId(data.sessionId);
        }
        // Refresh session list
        loadSessions();
        // Replace with returned history to include persisted messages
        if (Array.isArray(data.history)) {
          setMessages(
            data.history.map((m: { role: string; content: string }) => ({
              role: m.role === "assistant" ? "assistant" : "user",
              content: m.content,
            }))
          );
        } else {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: data.response },
          ]);
        }
      } else {
        throw new Error(data.error || "Failed to get response");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I apologize, but I'm having trouble processing your request. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <section className="mt-12">
      <div className="max-w-4xl mx-auto rounded-2xl border border-gray-200/70 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 shadow-xl backdrop-blur">
        <div className="flex items-center justify-between px-4 md:px-6 py-3 dark:border-gray-700">
          <div className="flex items-center gap-2">
            {sessionId && (
              <div className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60">
                <History className="h-4 w-4" />
                <span>Session active</span>
              </div>
            )}
            <div className="relative group">
              <div className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                <Folder className="h-4 w-4" />
                History
              </div>
              <div className="absolute right-0 mt-2 w-64 max-h-72 overflow-y-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition">
                <div className="p-2 text-xs text-gray-500 dark:text-gray-400">
                  Recent sessions
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                  {sessions.length === 0 && (
                    <div className="px-3 py-2 text-xs text-gray-500 dark:text-gray-400">
                      No sessions yet
                    </div>
                  )}
                  {sessions.map((s) => (
                    <button
                      key={s.sessionId}
                      onClick={() => loadSessionMessages(s.sessionId)}
                      className="w-full text-left px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition text-xs text-gray-800 dark:text-gray-100"
                    >
                      <div className="font-semibold truncate">{s.sessionId}</div>
                      <div className="text-[11px] text-gray-500 dark:text-gray-400">
                        {s.messageCount ?? 0} messages
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={resetChat}
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <RefreshCcw className="h-4 w-4" />
              New chat
            </button>
          </div>
        </div>

        <div className="h-[60vh] md:h-[70vh] overflow-y-auto px-4 md:px-6 py-4 bg-gray-50 dark:bg-gray-950/60 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`w-full md:w-auto max-w-3xl rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${
                  message.role === "user"
                    ? "bg-primary-600 text-white"
                    : "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-100 dark:border-gray-800"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}

            {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl px-4 py-3">
                  <div className="typing-indicator text-gray-600 dark:text-gray-300 flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-primary-500 animate-pulse" />
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-gray-200/70 dark:border-gray-700 px-4 md:px-6 py-4 bg-white dark:bg-gray-900 rounded-b-2xl">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message Kenmark AI..."
                className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 pr-12 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg text-white bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 transition-colors"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            This assistant answers using Kenmark ITan Solutions knowledge. Avoid sharing sensitive data.
          </p>
        </div>
      </div>
    </section>
  );
}


import React, { useState, useEffect, useRef } from "react";
import DOMPurify from "dompurify";
import { marked } from "marked";

const baseURL = "https://awareguard-backend.onrender.com";

// ---------- Suggestions shown above the input ----------
const suggestions = [
  "How can I verify if a job offer is real?",
  "What are common signs of a loan app scam?",
  "How do I check if a message is phishing?",
  "What should I do after paying a scammer?",
  "How can I avoid fake investment schemes?",
];

// ---------- Fast canned responses (instant replies) ----------
const cannedResponses = [
  {
    patterns: ["hi", "hello", "hey", "hi.", "hello.", "hey."],
    answer:
      "Hi 👋 I'm AwareGuard, your scam-awareness assistant.\n\n" +
      "You can ask me things like:\n" +
      "• How to verify a job offer\n" +
      "• How to check if a message is phishing\n" +
      "• What to do after sending money to a scammer\n\n" +
      "Type your question or tap one of the suggestions above.",
  },
  {
    patterns: [
      "who are you",
      "what are you",
      "what are you built for",
      "what do you do",
      "what is awareguard",
      "tell me about yourself",
    ],
    answer:
      "I'm AwareGuard – an AI assistant focused entirely on online safety and scam awareness.\n\n" +
      "I help you:\n" +
      "• Understand common scam tricks\n" +
      "• Analyse suspicious messages, links, job offers, or loan apps\n" +
      "• Suggest what to do next if you think you’ve been scammed\n\n" +
      "Share any situation that feels unusual, and I’ll help you break it down.",
  },
];

// ---------- Helper: Match canned patterns ----------
const getCannedResponse = (text) => {
  const normalized = text.trim().toLowerCase();

  for (const item of cannedResponses) {
    if (item.patterns.some((p) => normalized === p || normalized.includes(p))) {
      return item.answer;
    }
  }
  return null;
};

// ---------- Convert markdown → Safe HTML ----------
const formatAIText = (text) => {
  const html = marked(text);
  return DOMPurify.sanitize(html);
};

const AskAwareGuard = () => {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [conversations, setConversations] = useState([]);

  const answerRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto-scroll to newest message
  useEffect(() => {
    answerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversations]);

  // ---------- Core Sending Function ----------
  const sendPrompt = async (prompt, { allowCanned = true } = {}) => {
    const question = prompt.trim();
    if (!question) return;

    setError("");

    // 1) Quick canned response (instant)
    if (allowCanned) {
      const canned = getCannedResponse(question);
      if (canned) {
        setConversations((prev) => [
          ...prev,
          { question, answer: formatAIText(canned) },
        ]);

        setUserInput("");
        textareaRef.current?.focus();

        // Warm Render backend silently
        (async () => {
          try {
            await fetch(`${baseURL}/api/ask`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                prompt: "Warm up and be ready for incoming user questions.",
                messages: [],
              }),
            });
          } catch (err) {
            console.warn("Warm-up failed (Render sleeping) – safe to ignore.");
          }
        })();

        return;
      }
    }

    // 2) Normal AI request
    setLoading(true);

    const messages = [
      ...conversations.flatMap((c) => [
        { role: "user", content: c.question },
        { role: "assistant", content: c.answer },
      ]),
      { role: "user", content: question },
    ];

    try {
      const res = await fetch(`${baseURL}/api/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: question, messages }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error("Unexpected server response. Try again.");
      }

      if (!res.ok) throw new Error(data.error || "Server error");

      setConversations((prev) => [
        ...prev,
        { question, answer: formatAIText(data.answer) },
      ]);

      setUserInput("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      textareaRef.current?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInput.trim() || loading) return;
    sendPrompt(userInput);
  };

  return (
    <div className="min-h-screen bg-slate-200 flex flex-col">
      <main className="flex-grow px-4 md:px-10 py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border p-6">

          <h1 className="text-3xl font-bold text-center text-gray-900 mb-1">
            Ask AwareGuard AI
          </h1>
          <p className="text-gray-600 text-center font-semibold mb-4">
            Paste a suspicious message or describe any situation that feels off.
          </p>

          {/* SUGGESTIONS */}
          <p className="text-gray-900 text-sm font-semibold mb-2">Try these:</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => sendPrompt(s)}
                className="px-3 py-2 bg-gray-100 border rounded-full text-sm font-semibold hover:bg-gray-900 hover:text-white transition"
              >
                {s}
              </button>
            ))}
          </div>

          {/* CHAT MESSAGES */}
          <div className="max-h-[420px] overflow-y-auto space-y-4 mb-6 p-2">
            {conversations.map((msg, i) => (
              <div key={i} className="space-y-1">
                
                {/* USER */}
                <div className="flex justify-end">
                  <div className="bg-blue-600 text-white px-4 py-2 rounded-xl max-w-[80%] font-semibold">
                    {msg.question}
                  </div>
                </div>

                {/* AI */}
                <div className="flex justify-start">
                  <div
                    className="bg-gray-100 text-gray-900 px-4 py-3 rounded-xl shadow-sm max-w-[85%] font-semibold prose prose-sm"
                    dangerouslySetInnerHTML={{ __html: msg.answer }}
                  ></div>
                </div>
              </div>
            ))}

            <div ref={answerRef}></div>
          </div>

          {/* INPUT AREA */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <textarea
              ref={textareaRef}
              className="w-full border rounded-xl p-4 h-32 resize-none font-semibold focus:ring-1 focus:ring-gray-900"
              placeholder="Type your question here..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            ></textarea>

            {error && (
              <p className="text-red-600 text-center font-semibold">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || !userInput.trim()}
              className="bg-blue-600 text-white rounded-full py-3 font-semibold hover:bg-gray-900 transition disabled:opacity-60"
            >
              {loading ? "Thinking..." : "Ask Now"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AskAwareGuard;

import React, { useState, useEffect, useRef } from 'react';
import DOMPurify from 'dompurify';
import { marked } from 'marked';

const baseURL = "https://awareguard-backend.onrender.com";

const suggestions = [
  "How can I verify if a job offer is real?",
  "What are common signs of a loan app scam?",
  "How do I check if a message is phishing?",
  "What should I do after paying a scammer?",
  "How can I avoid fake investment schemes?"
];

// Convert markdown → Safe HTML
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

  // Auto-scroll
  useEffect(() => {
    if (answerRef.current) {
      answerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversations]);

  // Send message
  const sendPrompt = async (prompt) => {
    const question = prompt.trim();
    if (!question) return;

    setError("");

    setLoading(true);

    const messages = [
      ...conversations.map((c) => ({ role: "user", content: c.question })),
      ...conversations.map((c) => ({ role: "assistant", content: c.answer })),
      { role: "user", content: question }
    ];

    try {
      const res = await fetch(`${baseURL}/api/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: question, messages })
      });

      let data;
      try {
        data = await res.json();
      } catch (err) {
        throw new Error("Unexpected server response. Try again.");
      }

      if (!res.ok) throw new Error(data.error || "Server error");

      setConversations((prev) => [
        ...prev,
        {
          question,
          answer: formatAIText(data.answer) // 👈 FIX markdown
        }
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
    if (loading || !userInput.trim()) return;
    sendPrompt(userInput);
  };

  return (
    <div className="min-h-screen bg-slate-200 flex flex-col">
      <main className="flex-grow px-4 md:px-10 py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border p-6">

          <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
            Ask AwareGuard AI
          </h1>

          <p className="text-gray-600 text-center font-semibold mb-4">
            Paste a suspicious message or describe a situation. AwareGuard will analyze it.
          </p>

          {/* Suggestions */}
          <div className="mb-5">
            <p className="text-gray-800 text-sm font-semibold mb-2">Try one:</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((text, i) => (
                <button
                  key={i}
                  className="px-3 py-2 bg-gray-100 text-gray-900 border rounded-full text-xs md:text-sm font-semibold hover:bg-gray-900 hover:text-white transition"
                  onClick={() => sendPrompt(text)}
                >
                  {text}
                </button>
              ))}
            </div>
          </div>

          {/* Chat area */}
          <div className="max-h-[420px] overflow-y-auto space-y-4 mb-6 p-2">
            {conversations.map((item, idx) => (
              <div key={idx} className="space-y-1">

                {/* User Message */}
                <div className="flex justify-end">
                  <div className="bg-blue-600 text-white px-4 py-2 rounded-xl max-w-[80%] font-semibold">
                    {item.question}
                  </div>
                </div>

                {/* AI Message */}
                <div className="flex justify-start">
                  <div
                    className="bg-gray-100 text-gray-900 px-4 py-3 rounded-xl shadow-sm max-w-[85%] font-semibold prose prose-sm"
                    dangerouslySetInnerHTML={{ __html: item.answer }}
                  ></div>
                </div>
              </div>
            ))}

            <div ref={answerRef}></div>
          </div>

          {/* Input */}
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

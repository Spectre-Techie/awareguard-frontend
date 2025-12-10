import React, { useState, useEffect, useRef } from 'react';

const baseURL = 'https://awareguard-backend.onrender.com';

const suggestions = [
  'How can I verify if a job offer is real?',
  'What are common signs of a loan app scam?',
  'How do I check if a message is phishing?',
  'What should I do after paying a scammer?',
  'How can I avoid fake investment schemes?',
];

const cannedResponses = [
  {
    patterns: ['hi', 'hello', 'hey', 'hi.', 'hello.', 'hey.'],
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
      'who are you',
      'what are you',
      'what are you built for',
      'what do you do',
      'what is awareguard',
      'tell me about yourself',
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

const getCannedResponse = (text) => {
  const normalized = text.trim().toLowerCase();

  for (const item of cannedResponses) {
    if (item.patterns.some((p) => normalized === p || normalized.includes(p))) {
      return item.answer;
    }
  }
  return null;
};

const AskAwareGuard = () => {
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [conversations, setConversations] = useState([]);

  const answerRef = useRef(null);
  const textareaRef = useRef(null);

  // Scroll to latest answer
  useEffect(() => {
    if (answerRef.current) {
      answerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversations]);

  const sendPrompt = async (prompt, { allowCanned = true } = {}) => {
    const question = prompt.trim();
    if (!question) return;

    setError('');

    // 1) Handle canned quick responses (greetings / meta questions)
    if (allowCanned) {
      const canned = getCannedResponse(question);
      if (canned) {
        // Immediate response in UI, no backend delay
        setConversations((prev) => [
          ...prev,
          { question, answer: canned },
        ]);
        setUserInput('');
        textareaRef.current?.focus();

        // Warm up backend silently in the background
        (async () => {
          try {
            await fetch(`${baseURL}/api/ask`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                prompt:
                  'Warm up and be ready to answer scam-awareness questions from the user.',
                messages: [],
              }),
            });
          } catch (err) {
            console.error('Backend warm-up failed (not critical):', err);
          }
        })();

        return;
      }
    }

    // 2) Normal AI request flow
    setLoading(true);

    // Build message history for context
    const messages = [
      ...conversations.map((c) => ({
        role: 'user',
        content: c.question,
      })),
      ...conversations.map((c) => ({
        role: 'assistant',
        content: c.answer,
      })),
      { role: 'user', content: question },
    ];

    try {
      const res = await fetch(`${baseURL}/api/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: question,
          messages,
        }),
      });

      let data;
      try {
        data = await res.json();
      } catch (parseError) {
        console.error('Failed to parse JSON from /api/ask:', parseError);
        throw new Error(
          'The server returned an unexpected response. Please try again.'
        );
      }

      if (!res.ok) {
        throw new Error(data.error || 'Server error');
      }

      setConversations((prev) => [
        ...prev,
        { question, answer: data.answer },
      ]);
      setUserInput('');
      textareaRef.current?.focus();
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to get a response. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim() || loading) return;
    await sendPrompt(userInput);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleClear = () => {
    setUserInput('');
    setError('');
    textareaRef.current?.focus();
  };

  const handleSuggestionClick = (text) => {
    // Send suggestion directly rather than filling the textarea
    if (!loading) {
      sendPrompt(text);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-200">
      <main className="flex-grow px-4 md:px-10 py-10">
        <div className="max-w-3xl mx-auto bg-gray-50 p-6 rounded-2xl shadow-lg">
          <h1 className="text-2xl font-bold mb-2 text-center">
            Ask AwareGuard AI
          </h1>
          <p className="text-sm text-gray-700 font-semibold text-center mb-4">
            Paste a suspicious message, job offer, link, loan app, or describe any
            situation that feels off. AwareGuard will help you analyse it.
          </p>

          {/* Suggestions */}
          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-800 mb-2">
              Try one of these:
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => handleSuggestionClick(s)}
                  className="text-xs md:text-sm px-3 py-2 rounded-full border border-gray-400 bg-white hover:bg-gray-900 hover:text-white font-semibold transition"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <textarea
              ref={textareaRef}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your question or paste a suspicious message..."
              className="w-full p-4 border font-semibold rounded-lg focus:ring-1 focus:ring-gray-900 resize-none"
              rows={5}
              maxLength={500}
            />
            <div className="flex gap-2 justify-between">
              <button
                type="submit"
                disabled={loading || !userInput.trim()}
                className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-gray-900 transition w-full disabled:opacity-60"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                    Thinking...
                  </span>
                ) : (
                  'Ask Now'
                )}
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="bg-gray-900 text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-600 transition"
              >
                Clear
              </button>
            </div>
          </form>

          {error && (
            <p className="mt-4 text-red-600 text-center font-semibold text-sm">
              {error}
            </p>
          )}

          {conversations.length > 0 && (
            <div className="mt-6 space-y-4 max-h-[400px] overflow-y-auto">
              {conversations.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-4 rounded-lg shadow-sm"
                >
                  <p className="font-semibold text-blue-800">You:</p>
                  <p className="mb-2 text-black-900 font-semibold whitespace-pre-line">
                    {item.question}
                  </p>
                  <p className="font-semibold text-green-800">AwareGuard:</p>
                  <p className="text-gray-900 font-semibold whitespace-pre-line">
                    {item.answer}
                  </p>
                </div>
              ))}
              <div ref={answerRef}></div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AskAwareGuard;

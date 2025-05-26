import React, { useState, useEffect, useRef } from 'react';

const AskAwareGuard = () => {
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [conversations, setConversations] = useState([]);

  const answerRef = useRef(null);
  const textareaRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const question = userInput.trim();
    setLoading(true);
    setError('');
    setUserInput('');

    // 👇 Construct message history
    const messages = [
      ...conversations.map((c) => ({ role: 'user', content: c.question })),
      ...conversations.map((c) => ({ role: 'assistant', content: c.answer })),
      { role: 'user', content: question }
    ];

    try {
      const res = await fetch('http://localhost:8000/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: question, // 🔹 Still use "prompt" for your backend
          messages         // 🔹 Add memory context
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Server error');

      setConversations((prev) => [
        ...prev,
        { question, answer: data.answer }
      ]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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

  useEffect(() => {
    if (answerRef.current) {
      answerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversations]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-200">
      <main className="flex-grow px-4 md:px-10 py-10">
        <div className="max-w-3xl mx-auto bg-gray-50 p-6 rounded-2xl shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-center">Ask AwareGuard AI</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <textarea
              ref={textareaRef}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your question..."
              className="w-full p-4 border font-semibold rounded-lg focus:ring-1 focus:ring-gray-900 resize-none"
              rows={5}
              maxLength={500}
            />
            <div className="flex gap-2 justify-between">
              <button
                type="submit"
                disabled={loading || !userInput.trim()}
                className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-gray-900 transition w-full"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Thinking...
                  </span>
                ) : 'Ask Now'}
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

          {error && <p className="mt-4 text-red-600 text-center">{error}</p>}

          {conversations.length > 0 && (
            <div className="mt-6 space-y-4 max-h-[400px] overflow-y-auto">
              {conversations.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-4 rounded-lg shadow-sm"
                >
                  <p className="font-semibold text-blue-800">You:</p>
                  <p className="mb-2 text-black-900 font-semibold whitespace-pre-line">{item.question}</p>
                  <p className="font-semibold text-green-800">AwareGuard:</p>
                  <p className="text-gray-900 font-semibold whitespace-pre-line">{item.answer}</p>
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

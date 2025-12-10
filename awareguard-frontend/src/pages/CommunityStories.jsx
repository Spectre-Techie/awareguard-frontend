import React, { useEffect, useState } from "react";

const BACKEND = "https://awareguard-backend.onrender.com/api/stories";

const initialForm = {
  name: "",
  title: "",
  category: "",
  content: "",
};

const categories = [
  "Job Scam",
  "Phishing Scam",
  "Loan App Scam",
  "Romance Scam",
  "Online Shopping Scam",
  "Investment Scam",
  "Other",
];

const CommunityStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(initialForm);
  const [showForm, setShowForm] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState("");
  const [commentText, setCommentText] = useState({});
  const [commentLoading, setCommentLoading] = useState({});
  const [likingId, setLikingId] = useState(null);

  // Fetch stories
  const loadStories = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BACKEND}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to fetch stories");

      setStories(data.stories);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStories();
  }, []);

  // Handle form submit
  const submitStory = async (e) => {
    e.preventDefault();

    setSubmitLoading(true);
    setError("");

    try {
      const res = await fetch(`${BACKEND}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit story");

      // Add new story to page
      setStories((prev) => [data.story, ...prev]);

      // Reset form
      setForm(initialForm);
      setShowForm(false);
    } catch (err) {
      setError(err.message || "Failed to submit story");
    } finally {
      setSubmitLoading(false);
    }
  };   // ✅ FIXED: submitStory now closes properly

  // Like story
  const likeStory = async (id) => {
    setLikingId(id);
    try {
      const res = await fetch(`${BACKEND}/${id}/like`, {
        method: "POST",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setStories((prev) =>
        prev.map((s) =>
          s._id === id ? { ...s, likesCount: data.likesCount } : s
        )
      );
    } catch (err) {
      alert(err.message);
    } finally {
      setLikingId(null);
    }
  };

  // Comment on story
  const addComment = async (id) => {
    const text = commentText[id];
    if (!text) return;

    setCommentLoading((prev) => ({ ...prev, [id]: true }));

    try {
      const res = await fetch(`${BACKEND}/${id}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setStories((prev) =>
        prev.map((s) =>
          s._id === id ? { ...s, comments: data.comments } : s
        )
      );

      setCommentText((prev) => ({ ...prev, [id]: "" }));
    } catch (err) {
      alert(err.message);
    } finally {
      setCommentLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
    <div className="min-h-screen bg-slate-200 text-gray-900 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2">Community Stories</h1>
        <p className="text-center text-gray-700 font-semibold mb-8">
          Real experiences from people who spotted, escaped, or prevented scams.
        </p>

        {/* Add story button */}
        <div className="text-right mb-6">
          <button
            className="bg-gray-900 text-white px-5 py-2 font-semibold rounded-full hover:bg-blue-900 transition"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Close Form" : "Share Your Story"}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <form
            onSubmit={submitStory}
            className="bg-white p-6 shadow-lg rounded-xl mb-8 space-y-4 border"
          >
            {error && (
              <p className="text-red-600 text-sm font-semibold">{error}</p>
            )}

            <input
              type="text"
              name="name"
              placeholder="Your name (optional)"
              className="w-full border p-2 rounded-md"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              type="text"
              name="title"
              placeholder="Story title"
              className="w-full border p-2 rounded-md font-semibold"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <select
              name="category"
              className="w-full border p-2 rounded-md font-semibold bg-white"
              required
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <textarea
              name="content"
              rows="4"
              placeholder="What happened?"
              className="w-full border p-2 rounded-md font-semibold resize-none"
              required
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
            />

            <button
              type="submit"
              disabled={submitLoading}
              className="bg-blue-900 text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-900 transition disabled:opacity-50"
            >
              {submitLoading ? "Submitting..." : "Submit Story"}
            </button>
          </form>
        )}

        {/* Stories List */}
        {loading ? (
          <p className="text-center text-gray-700 font-semibold">Loading stories...</p>
        ) : stories.length === 0 ? (
          <p className="text-center text-gray-700 font-semibold">
            No stories yet. Be the first to share!
          </p>
        ) : (
          <div className="space-y-6">
            {stories.map((story) => (
              <div
                key={story._id}
                className="bg-white p-6 rounded-xl shadow border space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {story.title}
                    </h2>
                    <p className="text-gray-700 font-semibold">
                      {story.name || "Anonymous"} • {story.category}
                    </p>
                  </div>

                  <button
                    onClick={() => likeStory(story._id)}
                    disabled={likingId === story._id}
                    className="px-3 py-1 rounded-full border bg-gray-100 hover:bg-gray-900 hover:text-white transition font-semibold text-sm"
                  >
                    👍 {story.likesCount}
                  </button>
                </div>

                <p className="text-gray-900 font-semibold">{story.content}</p>

                {/* Comments */}
                <div className="mt-2 space-y-2">
                  {story.comments?.map((c, i) => (
                    <div key={i} className="bg-gray-100 p-2 rounded-md text-sm">
                      <p className="font-semibold text-gray-900">{c.name}</p>
                      <p className="text-gray-800">{c.text}</p>
                    </div>
                  ))}

                  <div className="flex gap-2 mt-2">
                    <input
                      type="text"
                      placeholder="Write a comment"
                      className="flex-1 border p-2 rounded-md text-sm font-semibold"
                      value={commentText[story._id] || ""}
                      onChange={(e) =>
                        setCommentText({
                          ...commentText,
                          [story._id]: e.target.value,
                        })
                      }
                    />
                    <button
                      onClick={() => addComment(story._id)}
                      disabled={commentLoading[story._id]}
                      className="px-4 py-1 bg-gray-900 text-white rounded-full text-sm font-semibold hover:bg-blue-900 transition disabled:opacity-50"
                    >
                      {commentLoading[story._id] ? "..." : "Send"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityStories;

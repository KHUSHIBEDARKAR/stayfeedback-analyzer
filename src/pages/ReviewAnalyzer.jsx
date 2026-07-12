import { useEffect, useState } from "react";

export default function ReviewAnalyzer() {
  const [reviews, setReviews] = useState([]);
  const [text, setText] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = "http://localhost:5000";

  async function loadReviews() {
    try {
      const res = await fetch(`${API_URL}/api/reviews`);
      const data = await res.json();
      setReviews(data.data || []);
    } catch {
      setError("Failed to load reviews from backend");
    }
  }

  useEffect(() => {
    loadReviews();
  }, []);

  async function handleAnalyze() {
    if (!text.trim()) {
      setError("Please enter a review");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      setAnalysis(data.data);
      setText("");
      loadReviews();
    } catch {
      setError("Backend connection failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-teal-700 dark:text-teal-400 mb-6">
        AI Review Analyzer
      </h1>

      <textarea
        className="w-full rounded-xl p-4 mb-4 border border-gray-400 bg-white text-black placeholder-gray-500
        dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
        rows="5"
        placeholder="Paste guest review here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={handleAnalyze}
        className="bg-teal-700 text-white px-6 py-3 rounded-lg hover:bg-teal-800"
      >
        {loading ? "Analyzing..." : "Analyze Review"}
      </button>

      {error && (
        <p className="mt-4 text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      {analysis && (
        <div className="mt-8 bg-white dark:bg-gray-800 shadow rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">
            Analysis Result
          </h2>

          <p className="text-black dark:text-white">
            <b>Review:</b> {analysis.text}
          </p>

          <p className="text-black dark:text-white">
            <b>Sentiment:</b> {analysis.sentiment}
          </p>

          <p className="text-black dark:text-white">
            <b>Theme:</b> {analysis.theme}
          </p>

          <p className="text-black dark:text-white">
            <b>Suggested Response:</b> {analysis.response}
          </p>
        </div>
      )}

      <h2 className="text-2xl font-bold mt-10 mb-4 text-black dark:text-white">
        Reviews from Backend
      </h2>

      <div className="grid gap-4">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <p className="text-black dark:text-white">
              {review.text}
            </p>

            <p className="text-sm text-gray-600 dark:text-gray-300">
              {review.sentiment} | {review.theme}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
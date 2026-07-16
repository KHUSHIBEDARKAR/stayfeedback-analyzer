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
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const res = await fetch(`${API_URL}/api/reviews`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to load reviews");
      }

      setReviews(data.data || []);
    } catch (err) {
      setError(err.message || "Failed to load reviews from backend");
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
    setAnalysis(null);

    try {
      const res = await fetch(`${API_URL}/api/ai/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          review: text,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "AI analysis failed");
      }

      setAnalysis({
        review: text,
        ...data.data,
      });
    } catch (err) {
      setError(err.message || "Unable to connect to the AI service");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-teal-700 dark:text-teal-400">
          AI Homestay Review Intelligence
        </h1>

        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Analyze guest sentiment, identify the main theme, generate a
          professional response, and receive an improvement suggestion.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <label
          htmlFor="review"
          className="block mb-2 font-semibold text-black dark:text-white"
        >
          Guest Review
        </label>

        <textarea
          id="review"
          className="w-full rounded-xl p-4 mb-4 border border-gray-400 bg-white text-black placeholder-gray-500
          dark:bg-gray-900 dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
          rows="6"
          placeholder="Example: The room was clean and peaceful, but breakfast was served late."
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={loading}
        />

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="bg-teal-700 text-white px-6 py-3 rounded-lg hover:bg-teal-800 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Analyzing with AI..." : "Analyze Review"}
        </button>

        {loading && (
          <div className="mt-5 flex items-center gap-3 text-teal-700 dark:text-teal-400">
            <div className="h-6 w-6 rounded-full border-4 border-teal-200 border-t-teal-700 animate-spin" />
            <p>Gemini AI is analyzing the guest review...</p>
          </div>
        )}

        {error && (
          <p className="mt-4 rounded-lg bg-red-100 p-3 text-red-700 dark:bg-red-900 dark:text-red-200">
            {error}
          </p>
        )}
      </div>

      {analysis && (
        <div className="mt-8 bg-white dark:bg-gray-800 shadow rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-5 text-black dark:text-white">
            AI Analysis Result
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-gray-50 dark:bg-gray-900 p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Sentiment
              </p>
              <p className="text-lg font-semibold text-black dark:text-white">
                {analysis.sentiment}
              </p>
            </div>

            <div className="rounded-lg bg-gray-50 dark:bg-gray-900 p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Main Theme
              </p>
              <p className="text-lg font-semibold text-black dark:text-white">
                {analysis.theme}
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-lg bg-gray-50 dark:bg-gray-900 p-4">
            <p className="font-semibold text-black dark:text-white">
              Guest Review
            </p>
            <p className="mt-1 text-gray-700 dark:text-gray-300">
              {analysis.review}
            </p>
          </div>

          <div className="mt-4 rounded-lg bg-gray-50 dark:bg-gray-900 p-4">
            <p className="font-semibold text-black dark:text-white">
              AI Summary
            </p>
            <p className="mt-1 text-gray-700 dark:text-gray-300">
              {analysis.summary}
            </p>
          </div>

          <div className="mt-4 rounded-lg bg-teal-50 dark:bg-teal-950 p-4">
            <p className="font-semibold text-teal-800 dark:text-teal-300">
              Suggested Host Response
            </p>
            <p className="mt-1 text-gray-700 dark:text-gray-300">
              {analysis.hostResponse}
            </p>
          </div>

          <div className="mt-4 rounded-lg bg-yellow-50 dark:bg-yellow-950 p-4">
            <p className="font-semibold text-yellow-800 dark:text-yellow-300">
              Improvement Suggestion
            </p>
            <p className="mt-1 text-gray-700 dark:text-gray-300">
              {analysis.improvementSuggestion}
            </p>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold mt-10 mb-4 text-black dark:text-white">
        Saved Reviews
      </h2>

      <div className="grid gap-4">
        {reviews.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">
            No saved reviews available.
          </p>
        ) : (
          reviews.map((review) => (
            <div
              key={review._id}
              className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <p className="text-black dark:text-white">{review.text}</p>

              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                {review.sentiment} | {review.theme}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
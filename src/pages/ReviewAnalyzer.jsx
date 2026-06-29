import { useEffect, useState } from "react";

export default function ReviewAnalyzer() {
  const [reviews, setReviews] = useState([]);
  const [text, setText] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = "http://localhost:5000";

  useEffect(() => {
    fetch(`${API_URL}/api/reviews`)
      .then((res) => res.json())
      .then((data) => setReviews(data.data))
      .catch(() => setError("Failed to load reviews from backend"));
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
    } catch {
      setError("Backend connection failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-teal-700 mb-6">
        AI Review Analyzer
      </h1>

      <textarea
        className="w-full border rounded-xl p-4 mb-4"
        rows="5"
        placeholder="Paste guest review here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={handleAnalyze}
        className="bg-teal-700 text-white px-6 py-3 rounded-lg hover:bg-teal-800"
      >
        Analyze Review
      </button>

      {loading && <p className="mt-4 text-blue-600">Loading...</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}

      {analysis && (
        <div className="mt-8 bg-white shadow rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4">Analysis Result</h2>
          <p><b>Review:</b> {analysis.text}</p>
          <p><b>Sentiment:</b> {analysis.sentiment}</p>
          <p><b>Theme:</b> {analysis.theme}</p>
          <p><b>Suggested Response:</b> {analysis.response}</p>
        </div>
      )}

      <h2 className="text-2xl font-bold mt-10 mb-4">
        Reviews from Backend
      </h2>

      <div className="grid gap-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-gray-100 p-4 rounded-lg">
            <p>{review.text}</p>
            <p className="text-sm text-gray-600">
              {review.sentiment} | {review.theme}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
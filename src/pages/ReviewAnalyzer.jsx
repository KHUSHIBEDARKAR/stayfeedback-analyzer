import { useEffect, useMemo, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;
const MAX_CHARACTERS = 1000;

export default function ReviewAnalyzer() {
  const [reviews, setReviews] = useState([]);
  const [text, setText] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [error, setError] = useState("");
  const [copyMessage, setCopyMessage] = useState("");

  const remainingCharacters = MAX_CHARACTERS - text.length;

  const sentimentStyles = useMemo(() => {
    const sentiment = analysis?.sentiment?.toLowerCase();

    if (sentiment === "positive") {
      return "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300";
    }

    if (sentiment === "negative") {
      return "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300";
    }

    if (sentiment === "neutral") {
      return "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300";
    }

    return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200";
  }, [analysis]);

  async function loadReviews() {
    try {
      setReviewsLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        setReviews([]);
        return;
      }

      const response = await fetch(`${API_URL}/api/reviews`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to load saved reviews");
      }

      setReviews(Array.isArray(result) ? result : result.data || []);
    } catch (err) {
      setError(err.message || "Failed to load saved reviews");
    } finally {
      setReviewsLoading(false);
    }
  }

  useEffect(() => {
    loadReviews();
  }, []);

  async function handleAnalyze() {
    const trimmedReview = text.trim();

    if (!trimmedReview) {
      setError("Please enter a guest review before starting the analysis.");
      return;
    }

    if (trimmedReview.length < 10) {
      setError("Please enter a more descriptive review of at least 10 characters.");
      return;
    }

    setLoading(true);
    setError("");
    setCopyMessage("");
    setAnalysis(null);

    try {
      const response = await fetch(`${API_URL}/api/ai/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          review: trimmedReview,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "AI analysis failed");
      }

      setAnalysis({
        review: trimmedReview,
        ...result.data,
      });
    } catch (err) {
      setError(err.message || "Unable to connect to the AI service");
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setText("");
    setAnalysis(null);
    setError("");
    setCopyMessage("");
  }

  async function handleCopyResponse() {
    if (!analysis?.hostResponse) {
      return;
    }

    try {
      await navigator.clipboard.writeText(analysis.hostResponse);
      setCopyMessage("Host response copied successfully.");

      window.setTimeout(() => {
        setCopyMessage("");
      }, 2500);
    } catch {
      setCopyMessage("Unable to copy the response.");
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-300">
          Gemini-Powered Intelligence
        </p>

        <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
          AI Homestay Review Analyzer
        </h1>

        <p className="mt-3 max-w-3xl text-gray-600 dark:text-gray-300">
          Convert guest feedback into sentiment, themes, summaries, professional
          host responses, and practical service-improvement recommendations.
        </p>
      </section>

      <section className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Enter Guest Feedback
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Add a complete review for more accurate AI insights.
              </p>
            </div>

            <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 dark:bg-teal-950 dark:text-teal-300">
              AI Analysis
            </span>
          </div>

          <label
            htmlFor="review"
            className="mt-6 block text-sm font-semibold text-gray-800 dark:text-gray-200"
          >
            Guest review
          </label>

          <textarea
            id="review"
            rows="8"
            maxLength={MAX_CHARACTERS}
            placeholder="Example: The room was clean and peaceful, but breakfast was served late and the Wi-Fi connection was weak."
            value={text}
            onChange={(event) => {
              setText(event.target.value);
              setError("");
            }}
            disabled={loading}
            className="mt-2 w-full resize-none rounded-xl border border-gray-300 bg-white p-4 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-teal-600 focus:ring-4 focus:ring-teal-100 disabled:cursor-not-allowed disabled:opacity-70 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500 dark:focus:ring-teal-950"
          />

          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-gray-500 dark:text-gray-400">
              Minimum recommended length: 10 characters
            </span>

            <span
              className={
                remainingCharacters < 100
                  ? "font-semibold text-amber-600 dark:text-amber-400"
                  : "text-gray-500 dark:text-gray-400"
              }
            >
              {text.length}/{MAX_CHARACTERS}
            </span>
          </div>

          {error && (
            <div
              role="alert"
              className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300"
            >
              {error}
            </div>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={loading}
              className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white transition hover:bg-teal-800 focus:outline-none focus:ring-4 focus:ring-teal-200 disabled:cursor-not-allowed disabled:opacity-60 dark:focus:ring-teal-950"
            >
              {loading ? (
                <>
                  <span className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Analyzing with Gemini AI...
                </>
              ) : (
                "Analyze Review"
              )}
            </button>

            <button
              type="button"
              onClick={handleClear}
              disabled={loading || (!text && !analysis)}
              className="min-h-12 rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Clear
            </button>
          </div>

          {loading && (
            <div className="mt-6 rounded-xl border border-teal-200 bg-teal-50 p-4 dark:border-teal-900 dark:bg-teal-950/40">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 animate-pulse rounded-full bg-teal-200 dark:bg-teal-800" />

                <div>
                  <p className="font-semibold text-teal-800 dark:text-teal-300">
                    AI analysis in progress
                  </p>

                  <p className="mt-1 text-sm text-teal-700 dark:text-teal-400">
                    Detecting sentiment, theme, summary, and host response.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700 sm:p-7">
          {!analysis && !loading ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 px-6 text-center dark:border-gray-600">
              <div className="text-5xl">✨</div>

              <h2 className="mt-5 text-xl font-bold text-gray-900 dark:text-white">
                Your AI insights will appear here
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400">
                Enter a guest review and start the analysis to generate
                sentiment, themes, summaries, and a professional reply.
              </p>
            </div>
          ) : null}

          {loading && (
            <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
              <div className="h-14 w-14 animate-spin rounded-full border-4 border-teal-100 border-t-teal-700 dark:border-gray-700 dark:border-t-teal-400" />

              <h2 className="mt-5 text-xl font-bold text-gray-900 dark:text-white">
                Understanding guest feedback
              </h2>

              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Gemini AI is generating structured hospitality insights.
              </p>
            </div>
          )}

          {analysis && !loading && (
            <div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-300">
                    Completed
                  </p>

                  <h2 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                    AI Analysis Result
                  </h2>
                </div>

                <span
                  className={`self-start rounded-full px-4 py-2 text-sm font-bold capitalize ${sentimentStyles}`}
                >
                  {analysis.sentiment || "Unknown"}
                </span>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <ResultCard
                  label="Sentiment"
                  value={analysis.sentiment || "Not detected"}
                />

                <ResultCard
                  label="Main Theme"
                  value={analysis.theme || "Not detected"}
                />
              </div>

              <ResultSection
                title="Guest Review"
                content={analysis.review}
                className="mt-4 bg-gray-50 dark:bg-gray-900"
              />

              <ResultSection
                title="AI Summary"
                content={analysis.summary}
                className="mt-4 bg-blue-50 dark:bg-blue-950/30"
              />

              <div className="mt-4 rounded-xl border border-teal-200 bg-teal-50 p-5 dark:border-teal-900 dark:bg-teal-950/30">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="font-bold text-teal-800 dark:text-teal-300">
                    Suggested Host Response
                  </h3>

                  <button
                    type="button"
                    onClick={handleCopyResponse}
                    className="self-start rounded-lg border border-teal-300 bg-white px-3 py-2 text-xs font-semibold text-teal-700 transition hover:bg-teal-100 dark:border-teal-800 dark:bg-gray-900 dark:text-teal-300 dark:hover:bg-teal-950"
                  >
                    Copy Response
                  </button>
                </div>

                <p className="mt-3 leading-7 text-gray-700 dark:text-gray-300">
                  {analysis.hostResponse || "No response generated."}
                </p>

                {copyMessage && (
                  <p className="mt-3 text-sm font-medium text-teal-700 dark:text-teal-300">
                    {copyMessage}
                  </p>
                )}
              </div>

              <ResultSection
                title="Improvement Suggestion"
                content={analysis.improvementSuggestion}
                className="mt-4 bg-amber-50 dark:bg-amber-950/30"
              />
            </div>
          )}
        </div>
      </section>

      <section className="mt-10">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-300">
              Review History
            </p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
              Saved Reviews
            </h2>
          </div>

          <button
            type="button"
            onClick={loadReviews}
            disabled={reviewsLoading}
            className="self-start rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-60 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            {reviewsLoading ? "Loading..." : "Refresh Reviews"}
          </button>
        </div>

        {reviewsLoading ? (
          <div className="mt-6 flex items-center gap-3 rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-200 border-t-teal-700 dark:border-gray-600 dark:border-t-teal-400" />
            <p className="text-gray-600 dark:text-gray-300">
              Loading saved reviews...
            </p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="mt-6 rounded-2xl border-2 border-dashed border-gray-300 px-6 py-12 text-center dark:border-gray-600">
            <div className="text-4xl">🗂️</div>

            <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
              No saved reviews available
            </h3>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Saved MongoDB reviews will appear here after they are created.
            </p>
          </div>
        ) : (
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {reviews.map((review) => (
              <article
                key={review._id}
                className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-200 transition hover:-translate-y-0.5 hover:shadow-md dark:bg-gray-800 dark:ring-gray-700"
              >
                <p className="line-clamp-3 leading-7 text-gray-800 dark:text-gray-100">
                  {review.text}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <ReviewBadge text={review.sentiment || "Unknown"} />
                  <ReviewBadge text={review.theme || "General"} />
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function ResultCard({ label, value }) {
  return (
    <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-900">
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
        {label}
      </p>

      <p className="mt-2 text-lg font-bold capitalize text-gray-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}

function ResultSection({ title, content, className = "" }) {
  return (
    <div className={`rounded-xl p-5 ${className}`}>
      <h3 className="font-bold text-gray-900 dark:text-white">
        {title}
      </h3>

      <p className="mt-2 leading-7 text-gray-700 dark:text-gray-300">
        {content || "No information generated."}
      </p>
    </div>
  );
}

function ReviewBadge({ text }) {
  const normalized = text.toLowerCase();

  let classes =
    "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200";

  if (normalized === "positive") {
    classes =
      "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300";
  }

  if (normalized === "neutral") {
    classes =
      "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300";
  }

  if (normalized === "negative") {
    classes =
      "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300";
  }

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${classes}`}
    >
      {text}
    </span>
  );
}

import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Loader, Toast } from "../components/ui";

const API_URL = import.meta.env.VITE_API_URL;

export default function Dashboard() {
  const navigate = useNavigate();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [saving, setSaving] = useState(false);

  const [deletingId, setDeletingId] = useState(null);

  const loadReviews = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/api/reviews`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      if (!response.ok) {
        throw new Error(result.message || "Failed to load reviews");
      }

      setReviews(Array.isArray(result) ? result : result.data || []);
    } catch (err) {
      setError(err.message || "Unable to connect to the backend");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  const statistics = useMemo(() => {
    const total = reviews.length;

    const positive = reviews.filter(
      (item) => item.sentiment?.toLowerCase() === "positive"
    ).length;

    const neutral = reviews.filter(
      (item) => item.sentiment?.toLowerCase() === "neutral"
    ).length;

    const negative = reviews.filter(
      (item) => item.sentiment?.toLowerCase() === "negative"
    ).length;

    return {
      total,
      positive,
      neutral,
      negative,
    };
  }, [reviews]);

  const recentReviews = useMemo(() => {
    return [...reviews]
      .sort(
        (first, second) =>
          new Date(second.createdAt) - new Date(first.createdAt)
      )
      .slice(0, 5);
  }, [reviews]);

  function showSuccessToast(message) {
    setToast(message);

    window.setTimeout(() => {
      setToast("");
    }, 3000);
  }

  function handleOpenAnalyzer() {
    navigate("/analyzer");
  }

  function handleEdit(review) {
    setEditingId(review._id);
    setEditingText(review.text || "");
    setError("");
    setToast("");
  }

  function handleCancelEdit() {
    setEditingId(null);
    setEditingText("");
    setError("");
  }

  async function handleSaveEdit(id) {
    const trimmedText = editingText.trim();

    if (!trimmedText) {
      setError("Review text cannot be empty.");
      return;
    }

    if (trimmedText.length < 10) {
      setError("Review must contain at least 10 characters.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setToast("");

      const response = await fetch(`${API_URL}/api/reviews/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          text: trimmedText,
        }),
      });

      const result = await response.json();

      if (response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      if (!response.ok) {
        throw new Error(result.message || "Failed to update review");
      }

      const updatedReview = result.data || result;

      setReviews((currentReviews) =>
        currentReviews.map((review) =>
          review._id === id
            ? {
                ...review,
                ...updatedReview,
                text: updatedReview.text || trimmedText,
              }
            : review
        )
      );

      setEditingId(null);
      setEditingText("");
      showSuccessToast("Review updated successfully.");
    } catch (err) {
      setError(err.message || "Unable to update the review");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this review? This action cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setDeletingId(id);
      setError("");
      setToast("");

      const response = await fetch(`${API_URL}/api/reviews/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let result = {};

      try {
        result = await response.json();
      } catch {
        result = {};
      }

      if (response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete review");
      }

      setReviews((currentReviews) =>
        currentReviews.filter((review) => review._id !== id)
      );

      if (editingId === id) {
        setEditingId(null);
        setEditingText("");
      }

      showSuccessToast("Review deleted successfully.");
    } catch (err) {
      setError(err.message || "Unable to delete the review");
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <Loader />

        <p className="text-gray-600 dark:text-gray-300">
          Loading dashboard data...
        </p>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 dark:text-white sm:px-6 lg:px-8">
      <section className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-300">
            Review Intelligence
          </p>

          <h1 className="mt-1 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Dashboard
          </h1>

          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Monitor guest feedback and review insights from real data.
          </p>
        </div>

        <Button onClick={handleOpenAnalyzer}>Analyze New Review</Button>
      </section>

      {toast && (
        <div className="mb-6">
          <Toast message={toast} type="success" />
        </div>
      )}

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950/30">
          <p className="font-medium text-red-700 dark:text-red-300">
            {error}
          </p>

          <button
            type="button"
            onClick={loadReviews}
            className="mt-3 text-sm font-semibold text-red-700 underline dark:text-red-300"
          >
            Try again
          </button>
        </div>
      )}

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatisticCard
          label="Total Reviews"
          value={statistics.total}
          description="All saved guest reviews"
        />

        <StatisticCard
          label="Positive"
          value={statistics.positive}
          description="Guests with positive feedback"
          valueClassName="text-green-600 dark:text-green-400"
        />

        <StatisticCard
          label="Neutral"
          value={statistics.neutral}
          description="Balanced or mixed feedback"
          valueClassName="text-amber-600 dark:text-amber-400"
        />

        <StatisticCard
          label="Negative"
          value={statistics.negative}
          description="Reviews needing attention"
          valueClassName="text-red-600 dark:text-red-400"
        />
      </section>

      <section className="mt-8 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Recent Reviews
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Latest guest feedback stored in MongoDB.
            </p>
          </div>

          <button
            type="button"
            onClick={loadReviews}
            className="self-start rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            Refresh
          </button>
        </div>

        {recentReviews.length === 0 ? (
          <div className="mt-8 rounded-2xl border-2 border-dashed border-gray-300 px-5 py-12 text-center dark:border-gray-600">
            <div className="text-4xl">📝</div>

            <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
              No reviews yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500 dark:text-gray-400">
              Analyze and save your first guest review to start building
              meaningful homestay insights.
            </p>

            <div className="mt-5">
              <Button onClick={handleOpenAnalyzer}>
                Analyze First Review
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {recentReviews.map((item) => (
              <article
                key={item._id}
                className="rounded-xl border border-gray-200 p-4 transition hover:shadow-sm dark:border-gray-700"
              >
                {editingId === item._id ? (
                  <div>
                    <label
                      htmlFor={`edit-review-${item._id}`}
                      className="text-sm font-semibold text-gray-700 dark:text-gray-200"
                    >
                      Edit review
                    </label>

                    <textarea
                      id={`edit-review-${item._id}`}
                      rows={4}
                      value={editingText}
                      onChange={(event) =>
                        setEditingText(event.target.value)
                      }
                      disabled={saving}
                      className="mt-2 w-full resize-none rounded-xl border border-gray-300 bg-white p-3 text-gray-900 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:focus:ring-teal-950"
                    />

                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Minimum 10 characters
                      </p>

                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {editingText.length} characters
                      </p>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => handleSaveEdit(item._id)}
                        disabled={saving}
                        className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {saving ? "Saving..." : "Save Changes"}
                      </button>

                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        disabled={saving}
                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-gray-800 dark:text-gray-100">
                        {item.text}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <Badge text={item.sentiment || "Unknown"} />
                        <Badge text={item.theme || "General"} />
                      </div>
                    </div>

                    <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
                      <time className="text-xs text-gray-500 dark:text-gray-400">
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleDateString("en-IN")
                          : "Date unavailable"}
                      </time>

                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(item)}
                          disabled={deletingId === item._id}
                          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60 dark:focus:ring-blue-950"
                        >
                          ✏️ Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(item._id)}
                          disabled={deletingId === item._id}
                          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-200 disabled:cursor-not-allowed disabled:opacity-60 dark:focus:ring-red-950"
                        >
                          {deletingId === item._id
                            ? "Deleting..."
                            : "🗑 Delete"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function StatisticCard({
  label,
  value,
  description,
  valueClassName = "text-gray-900 dark:text-white",
}) {
  return (
    <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {label}
      </p>

      <p className={`mt-3 text-3xl font-bold ${valueClassName}`}>
        {value}
      </p>

      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        {description}
      </p>
    </article>
  );
}

function Badge({ text }) {
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
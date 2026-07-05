import { useState } from "react";
import { Button, Input, Loader, Modal, Toast } from "../components/ui";

export default function Dashboard() {
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");
  const [open, setOpen] = useState(false);

  function handleAnalyze() {
    if (!review.trim()) {
      setToast("Please enter a review first.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setToast("Review analyzed successfully!");
      setOpen(true);
    }, 1000);
  }

  return (
    <div className="max-w-6xl mx-auto p-8 dark:text-white">
      <h1 className="text-4xl font-bold mb-8 text-teal-700 dark:text-teal-300">
        Dashboard
      </h1>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h3 className="text-gray-500 dark:text-gray-300">
            Total Reviews
          </h3>
          <p className="text-3xl font-bold">1,250</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h3 className="text-gray-500 dark:text-gray-300">
            Positive Reviews
          </h3>
          <p className="text-3xl font-bold text-green-600">
            85%
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h3 className="text-gray-500 dark:text-gray-300">
            Negative Reviews
          </h3>
          <p className="text-3xl font-bold text-red-600">
            15%
          </p>
        </div>

      </div>

      {/* Week 3 Component Demo */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">

        <h2 className="text-2xl font-bold mb-4">
          Component Library Demo
        </h2>

        <Input
          label="Guest Review"
          placeholder="Write a review..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />

        <Button onClick={handleAnalyze}>
          Analyze Review
        </Button>

        {loading && <Loader />}

        <div className="mt-4">
          <Toast
            message={toast}
            type={toast.includes("Please") ? "error" : "success"}
          />
        </div>

        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Analysis Result"
        >
          <p>😊 Sentiment: Positive</p>
          <p>🏷 Theme: Experience</p>
          <p>
            💬 Suggested Response: Thank you for your valuable feedback!
          </p>
        </Modal>

      </div>

    </div>
  );
}
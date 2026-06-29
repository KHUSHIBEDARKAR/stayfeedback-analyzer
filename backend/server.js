const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());

let reviews = [
  {
    id: 1,
    text: "The host was helpful and the room was very clean.",
    sentiment: "Positive",
    theme: "host",
    response: "Thank you for your kind words. We are glad you enjoyed your stay.",
  },
  {
    id: 2,
    text: "The food was average but the location was peaceful.",
    sentiment: "Neutral",
    theme: "food",
    response: "Thank you for your feedback. We will work on improving our food service.",
  },
  {
    id: 3,
    text: "The bathroom was dirty and service was slow.",
    sentiment: "Negative",
    theme: "cleanliness",
    response: "We apologize for the inconvenience. We will improve our cleanliness standards.",
  },
];

function analyzeReview(text) {
  const lower = text.toLowerCase();

  let sentiment = "Neutral";

  if (
    lower.includes("good") ||
    lower.includes("great") ||
    lower.includes("excellent") ||
    lower.includes("clean") ||
    lower.includes("helpful") ||
    lower.includes("amazing") ||
    lower.includes("peaceful")
  ) {
    sentiment = "Positive";
  }

  if (
    lower.includes("bad") ||
    lower.includes("dirty") ||
    lower.includes("slow") ||
    lower.includes("poor") ||
    lower.includes("not clean")
  ) {
    sentiment = "Negative";
  }

  let theme = "experience";

  if (lower.includes("food") || lower.includes("breakfast")) theme = "food";
  else if (lower.includes("host") || lower.includes("staff")) theme = "host";
  else if (lower.includes("location") || lower.includes("view")) theme = "location";
  else if (lower.includes("clean") || lower.includes("dirty") || lower.includes("bathroom")) theme = "cleanliness";
  else if (lower.includes("price") || lower.includes("money") || lower.includes("value")) theme = "value";

  let response = "Thank you for your feedback. We appreciate your review.";

  if (sentiment === "Positive") {
    response = "Thank you for your kind words. We are glad you enjoyed your stay.";
  } else if (sentiment === "Negative") {
    response = "We apologize for the inconvenience. We will work to improve this experience.";
  }

  return { sentiment, theme, response };
}

app.get("/", (req, res) => {
  res.status(200).json({ message: "Homestay Review Classifier API is running" });
});

app.get("/api/reviews", (req, res) => {
  res.status(200).json({ success: true, data: reviews });
});

app.get("/api/reviews/search", (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({
      success: false,
      message: "Search query is required",
    });
  }

  const result = reviews.filter((review) =>
    review.text.toLowerCase().includes(query.toLowerCase())
  );

  res.status(200).json({ success: true, data: result });
});

app.get("/api/reviews/:id", (req, res) => {
  const id = Number(req.params.id);
  const review = reviews.find((item) => item.id === id);

  if (!review) {
    return res.status(404).json({
      success: false,
      message: "Review not found",
    });
  }

  res.status(200).json({ success: true, data: review });
});

app.post("/api/reviews", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({
      success: false,
      message: "Review text is required",
    });
  }

  const analysis = analyzeReview(text);

  const newReview = {
    id: reviews.length + 1,
    text,
    ...analysis,
  };

  reviews.push(newReview);

  res.status(201).json({ success: true, data: newReview });
});

app.put("/api/reviews/:id", (req, res) => {
  const id = Number(req.params.id);
  const { text } = req.body;

  const review = reviews.find((item) => item.id === id);

  if (!review) {
    return res.status(404).json({
      success: false,
      message: "Review not found",
    });
  }

  if (!text) {
    return res.status(400).json({
      success: false,
      message: "Review text is required",
    });
  }

  const analysis = analyzeReview(text);

  review.text = text;
  review.sentiment = analysis.sentiment;
  review.theme = analysis.theme;
  review.response = analysis.response;

  res.status(200).json({ success: true, data: review });
});

app.delete("/api/reviews/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = reviews.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Review not found",
    });
  }

  reviews.splice(index, 1);

  res.status(204).send();
});

app.post("/api/analyze", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({
      success: false,
      message: "Review text is required",
    });
  }

  const analysis = analyzeReview(text);

  res.status(200).json({
    success: true,
    data: {
      text,
      ...analysis,
    },
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

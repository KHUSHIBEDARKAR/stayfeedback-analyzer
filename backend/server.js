const express = require("express");
const cors = require("cors");
require("dotenv").config();

const passport = require("passport");
const session = require("express-session");
require("./config/passport");

const connectDB = require("./config/db");
const Review = require("./models/Review");
const authRoutes = require("./routes/authRoutes");
const aiRoutes = require("./routes/aiRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

const {
  verifyToken,
  verifyAdmin,
  verifyCustomer,
} = require("./middleware/verifyToken");

const app = express();

connectDB();

const PORT = process.env.PORT || 5000;

const FRONTEND_URL =
  process.env.FRONTEND_URL || "http://localhost:5173";

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "https://stayfeedback-analyzer.vercel.app",
  FRONTEND_URL,
];

// Remove duplicate origins
const uniqueOrigins = [...new Set(allowedOrigins)];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || uniqueOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error("CORS blocked:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use(express.json());

app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

/* =====================================================
   API ROUTES
===================================================== */

app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/analytics", analyticsRoutes);

/* =====================================================
   GOOGLE AUTHENTICATION
===================================================== */

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: true,
  }),
  (req, res) => {
    res.send("Google Login Successful");
  }
);

/* =====================================================
   REVIEW ANALYSIS
===================================================== */

function analyzeReview(text) {
  const lower = text.toLowerCase();

  let sentiment = "neutral";

  if (
    lower.includes("good") ||
    lower.includes("great") ||
    lower.includes("excellent") ||
    lower.includes("clean") ||
    lower.includes("helpful") ||
    lower.includes("amazing") ||
    lower.includes("peaceful")
  ) {
    sentiment = "positive";
  }

  if (
    lower.includes("bad") ||
    lower.includes("dirty") ||
    lower.includes("slow") ||
    lower.includes("poor") ||
    lower.includes("not clean")
  ) {
    sentiment = "negative";
  }

  let theme = "experience";

  if (
    lower.includes("food") ||
    lower.includes("breakfast")
  ) {
    theme = "food";
  } else if (
    lower.includes("host") ||
    lower.includes("staff")
  ) {
    theme = "host";
  } else if (
    lower.includes("location") ||
    lower.includes("view")
  ) {
    theme = "location";
  } else if (
    lower.includes("clean") ||
    lower.includes("dirty") ||
    lower.includes("bathroom")
  ) {
    theme = "cleanliness";
  } else if (
    lower.includes("price") ||
    lower.includes("money") ||
    lower.includes("value")
  ) {
    theme = "value";
  }

  let response =
    "Thank you for your feedback. We appreciate your review.";

  if (sentiment === "positive") {
    response =
      "Thank you for your kind words. We are glad you enjoyed your stay.";
  } else if (sentiment === "negative") {
    response =
      "We apologize for the inconvenience. We will work to improve this experience.";
  }

  return {
    sentiment,
    theme,
    response,
  };
}

/* =====================================================
   HEALTH CHECK
===================================================== */

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Homestay Review Classifier API is running",
  });
});

/* =====================================================
   REVIEW ROUTES
===================================================== */

app.get(
  "/api/reviews",
  verifyToken,
  async (req, res, next) => {
    try {
      const reviews = await Review.find().sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        data: reviews,
      });
    } catch (error) {
      next(error);
    }
  }
);

app.get(
  "/api/reviews/search",
  async (req, res, next) => {
    try {
      const query = req.query.q;

      if (!query) {
        return res.status(400).json({
          success: false,
          message: "Search query is required",
        });
      }

      const result = await Review.find({
        text: {
          $regex: query,
          $options: "i",
        },
      });

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
);

app.get(
  "/api/reviews/:id",
  async (req, res, next) => {
    try {
      const review = await Review.findById(req.params.id);

      if (!review) {
        return res.status(404).json({
          success: false,
          message: "Review not found",
        });
      }

      res.status(200).json({
        success: true,
        data: review,
      });
    } catch (error) {
      next(error);
    }
  }
);

app.post(
  "/api/reviews",
  async (req, res, next) => {
    try {
      const { text } = req.body;

      if (!text) {
        return res.status(400).json({
          success: false,
          message: "Review text is required",
        });
      }

      const analysis = analyzeReview(text);

      const newReview = await Review.create({
        text,
        ...analysis,
      });

      res.status(201).json({
        success: true,
        data: newReview,
      });
    } catch (error) {
      next(error);
    }
  }
);

app.put(
  "/api/reviews/:id",
  async (req, res, next) => {
    try {
      const { text } = req.body;

      if (!text) {
        return res.status(400).json({
          success: false,
          message: "Review text is required",
        });
      }

      const analysis = analyzeReview(text);

      const updatedReview =
        await Review.findByIdAndUpdate(
          req.params.id,
          {
            text,
            ...analysis,
          },
          {
            new: true,
            runValidators: true,
          }
        );

      if (!updatedReview) {
        return res.status(404).json({
          success: false,
          message: "Review not found",
        });
      }

      res.status(200).json({
        success: true,
        data: updatedReview,
      });
    } catch (error) {
      next(error);
    }
  }
);

app.delete(
  "/api/reviews/:id",
  async (req, res, next) => {
    try {
      const deletedReview =
        await Review.findByIdAndDelete(req.params.id);

      if (!deletedReview) {
        return res.status(404).json({
          success: false,
          message: "Review not found",
        });
      }

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
);

/* =====================================================
   ANALYZE ROUTE
===================================================== */

app.post(
  "/api/analyze",
  async (req, res, next) => {
    try {
      const { text } = req.body;

      if (!text) {
        return res.status(400).json({
          success: false,
          message: "Review text is required",
        });
      }

      const analysis = analyzeReview(text);

      const newReview = await Review.create({
        text,
        ...analysis,
      });

      res.status(201).json({
        success: true,
        data: newReview,
      });
    } catch (error) {
      next(error);
    }
  }
);

/* =====================================================
   404 HANDLER
===================================================== */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* =====================================================
   ERROR HANDLER
===================================================== */

app.use((err, req, res, next) => {
  console.error(err.message);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

/* =====================================================
   START SERVER
===================================================== */

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
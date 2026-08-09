const express = require("express");
const Review = require("../models/Review");
const { verifyToken } = require("../middleware/verifyToken");

const router = express.Router();

/*
  GET /api/analytics/dashboard

  Returns dashboard analytics:
  - Total reviews
  - Sentiment distribution
  - Theme distribution
  - Monthly review trend
*/

router.get("/dashboard", verifyToken, async (req, res) => {
  try {
    const [
      totalReviews,
      sentimentData,
      themeData,
      monthlyData,
    ] = await Promise.all([
      Review.countDocuments(),

      Review.aggregate([
        {
          $group: {
            _id: "$sentiment",
            count: { $sum: 1 },
          },
        },
      ]),

      Review.aggregate([
        {
          $group: {
            _id: "$theme",
            count: { $sum: 1 },
          },
        },
      ]),

      Review.aggregate([
        {
          $match: {
            createdAt: {
              $gte: new Date(
                new Date().getFullYear(),
                new Date().getMonth() - 5,
                1
              ),
            },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            count: { $sum: 1 },
          },
        },
        {
          $sort: {
            "_id.year": 1,
            "_id.month": 1,
          },
        },
      ]),
    ]);

    // Sentiment totals
    const sentiment = {
      positive: 0,
      neutral: 0,
      negative: 0,
    };

    sentimentData.forEach((item) => {
      const key = String(item._id || "").toLowerCase();

      if (Object.prototype.hasOwnProperty.call(sentiment, key)) {
        sentiment[key] = item.count;
      }
    });

    // Theme totals
    const themes = {
      food: 0,
      cleanliness: 0,
      location: 0,
      host: 0,
      value: 0,
      experience: 0,
    };

    themeData.forEach((item) => {
      const key = String(item._id || "").toLowerCase();

      if (Object.prototype.hasOwnProperty.call(themes, key)) {
        themes[key] = item.count;
      }
    });

    // Month names
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Last 6 months
    const monthlyTrend = [];
    const now = new Date();

    for (let i = 5; i >= 0; i--) {
      const date = new Date(
        now.getFullYear(),
        now.getMonth() - i,
        1
      );

      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      const found = monthlyData.find(
        (item) =>
          item._id.year === year &&
          item._id.month === month
      );

      monthlyTrend.push({
        month: monthNames[month - 1],
        year,
        count: found ? found.count : 0,
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        totalReviews,
        sentiment,
        themes,
        monthlyTrend,
      },
    });
  } catch (error) {
    console.error("Dashboard analytics error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to load dashboard analytics",
    });
  }
});

module.exports = router;
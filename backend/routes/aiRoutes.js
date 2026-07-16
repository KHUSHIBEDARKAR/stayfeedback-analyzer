const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/analyze", async (req, res) => {
  try {
    const { review } = req.body;

    if (!review || !review.trim()) {
      return res.status(400).json({
        success: false,
        message: "Review is required",
      });
    }

    const model = genAI.getGenerativeModel({
    model: "gemini-3.1-flash-lite-preview",
    });

    const prompt = `
You are an AI assistant for a homestay review management system.

Analyze the following guest review:

"${review}"

Return only valid JSON using this exact structure:

{
  "sentiment": "Positive, Neutral, or Negative",
  "theme": "food, host, location, cleanliness, value, or experience",
  "summary": "A concise one-sentence summary",
  "hostResponse": "A polite and professional response to the guest",
  "improvementSuggestion": "One practical improvement suggestion"
}
`;

    const result = await model.generateContent(prompt);
    let responseText = result.response.text();

    responseText = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const analysis = JSON.parse(responseText);

    return res.status(200).json({
      success: true,
      data: analysis,
    });
  } catch (error) {
    console.error("Gemini API error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to analyze the review using AI",
    });
  }
});

module.exports = router;
# Prompt Engineering Experiments

## Prompt Version 1

Analyze this homestay review.

Return:
- Sentiment
- Theme
- Summary
- Host Response
- Improvement Suggestion

---

## Prompt Version 2

You are an experienced hospitality manager.

Analyze the guest review professionally.

Generate:
- Guest sentiment
- Main theme
- One-line summary
- Professional host response
- Improvement suggestion

---

## Prompt Version 3 (Final Prompt)

You are an AI assistant for a Homestay Review Intelligence System.

Analyze the following guest review.

Return ONLY valid JSON in this format:

```json
{
  "sentiment": "",
  "theme": "",
  "summary": "",
  "hostResponse": "",
  "improvementSuggestion": ""
}
```

Do not return any explanation outside the JSON.
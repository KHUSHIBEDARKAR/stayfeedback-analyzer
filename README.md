# Homestay Review Analyzer

An AI-powered full-stack web application developed as part of the **TBI-GEU Summer Internship**.

The application analyzes homestay guest reviews, classifies sentiment and themes, generates AI-powered summaries and professional host responses, stores review data in MongoDB, and provides secure authentication using JWT.

---

## Project Overview

The Homestay Review Analyzer helps homestay owners understand guest feedback quickly.

Users can enter a guest review, and the application uses Google Gemini AI to generate:

- Sentiment
- Main review theme
- Short review summary
- Professional host response
- Practical improvement suggestion

The project also includes authentication, protected routes, MongoDB persistence, CRUD operations, responsive design, and dark/light mode.

---

## Features

### Review Analysis

- Analyze homestay reviews
- Detect sentiment:
  - Positive
  - Neutral
  - Negative
- Identify review themes
- Generate automatic responses
- Store analyzed reviews in MongoDB
- Display saved reviews

### AI Features — Week 7

The application uses **Google Gemini AI** to provide intelligent and actionable review analysis.

- Google Gemini AI integration
- AI sentiment analysis
- Theme detection
- AI-generated review summary
- Professional host response generation
- Practical improvement suggestions
- Real-time AI analysis
- Structured JSON output
- Loading state during AI processing
- Error handling for failed AI requests

### Authentication and Security

- User registration
- User login
- JWT authentication
- Protected frontend routes
- Protected backend API routes
- Password hashing using bcrypt
- Rate limiting
- Input validation
- Logout functionality
- Secure environment variables

### CRUD Operations

- Create review
- View all reviews
- View a single review
- Update review
- Delete review
- Search reviews

### User Interface

- Responsive React interface
- Tailwind CSS styling
- Dark mode
- Light mode
- Reusable UI components
- Loading indicator
- Error messages

---

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Tailwind CSS
- JavaScript
- Fetch API

### Backend

- Node.js
- Express.js
- REST API
- Google Gemini API

### Database

- MongoDB Atlas
- Mongoose

### Authentication and Security

- JSON Web Token
- bcryptjs
- express-validator
- express-rate-limit
- Passport.js
- Express Session

### Development Tools

- Git
- GitHub
- VS Code
- Postman
- Chrome DevTools

---

## Project Structure

```text
homestay-review-classifier
│
├── backend
│   ├── config
│   │   ├── db.js
│   │   └── passport.js
│   │
│   ├── middleware
│   │   └── verifyToken.js
│   │
│   ├── models
│   │   ├── Review.js
│   │   └── User.js
│   │
│   ├── routes
│   │   ├── authRoutes.js
│   │   └── aiRoutes.js
│   │
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── docs
│   └── schema.png
│
├── public
│
├── src
│   ├── assets
│   │
│   ├── components
│   │   ├── ui
│   │   ├── Card.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── context
│   │   └── ThemeContext.jsx
│   │
│   ├── pages
│   │   ├── About.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── ReviewAnalyzer.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── PROMPTS.md
├── README.md
├── package.json
└── vite.config.js
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive a JWT token |

### Reviews

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/reviews` | Get all reviews |
| GET | `/api/reviews/:id` | Get one review |
| POST | `/api/reviews` | Create a new review |
| PUT | `/api/reviews/:id` | Update a review |
| DELETE | `/api/reviews/:id` | Delete a review |
| GET | `/api/reviews/search?q=keyword` | Search reviews |
| POST | `/api/analyze` | Analyze and save a review using the basic analyzer |

### AI

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/ai/analyze` | Analyze a guest review using Google Gemini AI |

---

## AI Review Analysis

### Endpoint

```http
POST /api/ai/analyze
```

### Sample Request

```json
{
  "review": "The room was clean and peaceful, but the breakfast was served late."
}
```

### Sample Response

```json
{
  "success": true,
  "data": {
    "sentiment": "Neutral",
    "theme": "food",
    "summary": "The guest appreciated the clean and peaceful environment but experienced delays in breakfast service.",
    "hostResponse": "Thank you for your feedback. We are glad you enjoyed the cleanliness and peaceful atmosphere of our homestay. We sincerely apologize for the breakfast delay and will improve our morning service process.",
    "improvementSuggestion": "Introduce a breakfast scheduling process to improve preparation and delivery time."
  }
}
```

---

## AI Workflow

1. The user enters a homestay guest review.
2. The React frontend sends the review to the backend.
3. The backend receives the request at:

```http
POST /api/ai/analyze
```

4. The backend constructs a structured prompt.
5. The backend securely calls the Google Gemini API.
6. Gemini analyzes the guest review.
7. Gemini returns structured JSON.
8. The frontend displays:
   - Sentiment
   - Main theme
   - AI summary
   - Suggested host response
   - Improvement suggestion
9. A loading indicator appears while the AI request is processing.
10. An error message is shown if the request fails.

---

## Prompt Engineering

The project includes a `PROMPTS.md` file documenting:

- Three prompt variations
- Prompt structure
- Expected output
- Final selected prompt
- Reason for choosing the final prompt

The final prompt requests valid JSON so the frontend can display the AI result reliably.

---

## Security Features

- Passwords are hashed using bcrypt
- JWT tokens are used for authentication
- Protected backend routes verify bearer tokens
- Protected frontend routes redirect unauthenticated users
- Authentication endpoints use rate limiting
- Input validation is applied to authentication requests
- API keys are stored in `.env`
- `.env` is excluded from GitHub
- CORS is configured for allowed frontend origins
- Plain passwords and API keys are never returned to users

---

## Database Schema

### Review

| Field | Type | Description |
|---|---|---|
| `_id` | ObjectId | Unique review ID |
| `text` | String | Guest review text |
| `sentiment` | String | Positive, Neutral, or Negative |
| `theme` | String | Main review category |
| `response` | String | Suggested response |
| `createdAt` | Date | Creation timestamp |
| `updatedAt` | Date | Last update timestamp |

### User

| Field | Type | Description |
|---|---|---|
| `_id` | ObjectId | Unique user ID |
| `email` | String | User email |
| `password` | String | Hashed password |
| `createdAt` | Date | Creation timestamp |
| `updatedAt` | Date | Last update timestamp |

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/KHUSHIBEDARKAR/stayfeedback-analyzer.git
```

Move into the project folder:

```bash
cd stayfeedback-analyzer
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
```

---

## Environment Variables

Create a `.env` file inside the `backend` folder.

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
FRONTEND_URL=http://localhost:5173
JWT_SECRET=YOUR_SECRET_KEY
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
```

Do not commit the `.env` file to GitHub.

Create or update `backend/.env.example` using placeholder values only:

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
FRONTEND_URL=http://localhost:5173
JWT_SECRET=YOUR_SECRET_KEY
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
```

---

## Run the Application

You need two terminals.

### Terminal 1 — Run Backend

```bash
cd backend
npm run dev
```

Expected output:

```text
Server running on http://localhost:5000
MongoDB connected successfully
```

### Terminal 2 — Run Frontend

From the project root:

```bash
npm run dev
```

Open the frontend URL shown by Vite, usually:

```text
http://localhost:5173
```

---

## Authentication Flow

1. The user registers with an email and password.
2. The password is hashed before saving to MongoDB.
3. The user logs in.
4. The backend verifies the credentials.
5. A JWT token is returned.
6. The token is stored in local storage.
7. Protected routes require a valid token.
8. Logout removes the token.
9. The user is redirected to the login page when required.

---

## Review Analysis Flow

1. The user opens the Analyzer page.
2. The user enters a guest review.
3. The frontend sends the review to the backend.
4. Gemini analyzes the review.
5. The frontend displays the result.
6. The result includes sentiment, theme, summary, response, and improvement suggestion.

---

## Week 7 Deliverables

The following Week 7 requirements are implemented:

- AI feature functional on localhost
- Google Gemini API integrated
- API key securely stored in `.env`
- Backend AI service created
- Frontend connected to AI service
- Loading state implemented
- Error handling implemented
- AI API tested in Postman
- Browser Network tab shows `POST /api/ai/analyze` with `200 OK`
- Three prompt variations documented in `PROMPTS.md`
- Git commit created for the AI feature

Required screenshot PDF:

```text
W7_AIFeatureDemo_TBI-26101359.pdf
```

The PDF should contain:

1. User input screen
2. Loading state
3. Final AI-generated output
4. Browser Network tab showing `POST /api/ai/analyze` with status `200 OK`

---

## Key Learning Outcomes

- Full-stack application development
- React frontend development
- REST API design
- MongoDB integration
- JWT authentication
- Password security
- API key management
- Generative AI integration
- Prompt engineering
- AI response parsing
- Error handling
- Postman API testing
- Git and GitHub workflow

---

## Future Enhancements

- AI confidence score
- Urgency classification
- Multi-language review analysis
- Review analytics dashboard
- Sentiment distribution charts
- Theme-based filtering
- Admin dashboard
- Export reviews as CSV or PDF
- Email notifications
- AI response editing
- Batch review analysis
- Production deployment
- Unit and integration testing

---

## Resume Description

**AI-Powered Homestay Review Intelligence System**

Developed a full-stack AI application using React, Node.js, Express, MongoDB, and Google Gemini API. Implemented AI-powered sentiment analysis, theme detection, review summarization, professional host response generation, and improvement recommendations. Added JWT authentication, password hashing, protected routes, CRUD operations, responsive design, dark/light mode, secure environment-variable management, and REST API testing using Postman.

---

## Resume Bullet Points

- Built an AI-powered homestay review intelligence platform using React, Node.js, Express, MongoDB, and Google Gemini API.
- Integrated generative AI to classify sentiment, detect themes, summarize guest feedback, generate professional host responses, and recommend operational improvements.
- Implemented JWT authentication, bcrypt password hashing, protected routes, input validation, rate limiting, and secure API-key management.
- Developed and tested REST APIs for authentication, AI analysis, search, and complete review CRUD operations.
- Designed a responsive dark/light user interface using React, Vite, and Tailwind CSS.



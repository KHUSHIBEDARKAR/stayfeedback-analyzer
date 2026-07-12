# Homestay Review Analyzer

An AI-powered full-stack web application developed as part of the TBI-GEU Summer Internship. The application analyzes homestay reviews, classifies sentiment and themes, stores reviews in MongoDB, and provides secure user authentication using JWT and Google OAuth.

---

## Features

### Review Analysis
- Analyze homestay reviews
- Detect sentiment (Positive, Neutral, Negative)
- Identify review themes
- Generate automatic responses
- Store analyzed reviews in MongoDB

### Authentication & Security
- User Registration
- User Login
- JWT Authentication
- Google OAuth Login
- Protected Routes
- Password Hashing using bcrypt
- Rate Limiting
- Input Validation
- Logout Functionality

### CRUD Operations
- Create Review
- View Reviews
- Update Review
- Delete Review
- Search Reviews

---

## Tech Stack

### Frontend
- React
- Vite
- React Router
- Tailwind CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

### Authentication
- JWT
- bcryptjs
- Passport.js
- Google OAuth 2.0

---

## Project Structure

```
homestay-review-classifier
│
├── backend
│   ├── config
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── server.js
│   └── .env
│
├── src
│   ├── components
│   ├── context
│   ├── pages
│   ├── App.jsx
│   └── main.jsx
│
└── README.md
```

---

## API Endpoints

### Authentication

| Method | Endpoint |
|---------|----------|
| POST | /api/auth/register |
| POST | /api/auth/login |

### Reviews

| Method | Endpoint |
|---------|----------|
| GET | /api/reviews |
| GET | /api/reviews/:id |
| POST | /api/reviews |
| PUT | /api/reviews/:id |
| DELETE | /api/reviews/:id |
| GET | /api/reviews/search?q=keyword |
| POST | /api/analyze |

---

## Security Features

- JWT Authentication
- Password Hashing
- Google OAuth
- Protected Routes
- Input Validation
- Rate Limiting
- Secure Environment Variables

---

## Database Schema

### Review

- _id
- text
- sentiment
- theme
- response
- createdAt
- updatedAt

### User

- _id
- email
- password
- createdAt
- updatedAt

---

## Installation

### Clone Repository

```bash
git clone https://github.com/KHUSHIBEDARKAR/stayfeedback-analyzer.git
```

### Install Frontend

```bash
npm install
```

### Install Backend

```bash
cd backend
npm install
```

### Create .env

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
FRONTEND_URL=http://localhost:5173
JWT_SECRET=YOUR_SECRET_KEY
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
```

> Do **not** commit your `.env` file to GitHub.

---

## Run Frontend

```bash
npm run dev
```

---

## Run Backend

```bash
cd backend
npm run dev
```

---

## Authentication Flow

1. Register a new account.
2. Login using email and password.
3. JWT token is generated.
4. Token is stored in Local Storage.
5. Protected routes require authentication.
6. Google OAuth login is also supported.
7. Logout removes the token and redirects to the Login page.

---

## Author

**Khushi Bedarkar**

TBI-GEU Summer Internship

AI-Assisted Full Stack Web Development
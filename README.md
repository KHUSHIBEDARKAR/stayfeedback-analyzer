# Homestay Review Sentiment Classifier

A full-stack web application that analyzes homestay guest reviews, classifies their sentiment, identifies the review theme, and suggests a management response. Reviews are permanently stored in MongoDB Atlas for persistent data management.

---

## Features

- Analyze guest reviews
- Sentiment Classification (Positive, Neutral, Negative)
- Theme Detection (Food, Host, Location, Cleanliness, Value, Experience)
- AI-based Suggested Management Response
- MongoDB Atlas Database Integration
- Complete CRUD Operations
- Search Reviews
- Responsive React Frontend

---

## Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- React Router DOM

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose ODM

---

## Project Structure

```text
homestay-review-classifier/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
│
├── backend/
│   ├── config/
│   ├── models/
│   ├── .env.example
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## Database Choice

MongoDB Atlas was chosen because the application stores review data in a flexible document format. Mongoose ODM is used to define schemas and interact with the MongoDB database efficiently.

---

## Database Schema

The application uses a single MongoDB collection named **Review**.

### Review Schema

| Field | Type |
|------|------|
| _id | ObjectId |
| text | String |
| sentiment | String |
| theme | String |
| response | String |
| createdAt | Date |
| updatedAt | Date |

**Schema Diagram:** Refer to **W5_SchemaDiagram_TBI-26101359.pdf**.

---

## Backend Setup

### 1. Navigate to the backend folder

```bash
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

```env
PORT=5000
FRONTEND_URL=http://localhost:<VITE_PORT>
MONGO_URI=your_mongodb_connection_string
```

### 4. Start the backend server

```bash
npm run dev
```

Backend runs at:

```
http://localhost:5000
```

---

## Frontend Setup

From the project root directory:

```bash
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:<VITE_PORT>
```

> Replace `<VITE_PORT>` with the port displayed by Vite (for example: 5173, 5180, or 5181).

---

## API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/reviews` | Retrieve all reviews |
| GET | `/api/reviews/:id` | Retrieve a review by ID |
| POST | `/api/reviews` | Create a new review |
| PUT | `/api/reviews/:id` | Update an existing review |
| DELETE | `/api/reviews/:id` | Delete a review |
| GET | `/api/reviews/search?q=keyword` | Search reviews by keyword |
| POST | `/api/analyze` | Analyze and save a review |

---

## Environment Variables

Create a `.env` file inside the `backend` directory.

Example:

```env
PORT=5000
FRONTEND_URL=http://localhost:<VITE_PORT>
MONGO_URI=your_mongodb_connection_string
```

A sample configuration is also provided in `.env.example`.


---

## License

This project was developed as part of the AI Assisted Full Stack Web Development Summer Internship Program for educational purposes.
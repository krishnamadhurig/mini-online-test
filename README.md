# Mini Online Test App (MERN)

A small online test platform. Students sign up, take a timed 10-question multiple-choice test, see a detailed result, and review their past attempts. An admin can add new questions.

- **Live app:** https://mini-online-test-gold.vercel.app

- **API health check:** https://mini-online-test-z3we.onrender.com/api/health

- **GitHub:** https://github.com/krishnamadhurig/mini-online-test

> The API runs on a free Render instance that sleeps when idle. The first request can take up to a minute, so open the health check link first.

## Features

- Sign up and log in with email and password (bcrypt hashing, JWT)
- 10 random multiple-choice questions loaded from MongoDB
- 10-minute countdown that auto-submits at 00:00
- Refresh-safe: the timer and chosen answers survive a page reload
- Result page with score, right and wrong questions, and the correct answers
- History of past attempts with score and date
- Admin page to add and delete questions (bonus)

## Tech stack

| Layer | Tools |
| --- | --- |
| Database | MongoDB Atlas, Mongoose |
| Backend | Node.js, Express (MVC: models, views, controllers, routes) |
| Frontend | React, Vite, React Router, Axios |
| Auth | JWT, bcryptjs |

## Project structure

```
server/
  config/        database connection, test rules
  models/        User, Question, Attempt
  views/         JSON response shapes
  controllers/   auth, test, attempts, questions
  routes/        API routes
  middleware/    auth, async handler, error handler
  utils/         token helper
  app.js, server.js, seed.js
client/
  src/services/    API calls
  src/context/     auth state
  src/hooks/       useTest, useCountdown
  src/components/  Navbar, Timer, QuestionCard, ...
  src/pages/       Login, Dashboard, Test, Result, History, Admin
```

## Run locally

Requirements: Node.js 18 or newer and a MongoDB database (a free MongoDB Atlas cluster works).

### 1. Backend

```bash
cd server
cp .env.example .env     # on Windows: copy .env.example .env
npm install
npm run seed             # loads 12 sample questions
npm run dev              # http://localhost:5000
```

Fill in `server/.env`:

| Variable | Description |
| --- | --- |
| `PORT` | API port, default 5000 |
| `MONGO_URI` | MongoDB connection string.
| `JWT_SECRET` | Long random string used to sign tokens |
| `ADMIN_EMAIL` | Signing up with this email creates the admin account |
| `CLIENT_URL` | Frontend URL allowed by CORS,  `http://localhost:5173` |

### 2. Frontend

```bash
cd client
npm install
npm run dev              # http://localhost:5173
```

In development, Vite proxies `/api` to `http://localhost:5000`, so the frontend needs no environment file. For a deployed build, set `VITE_API_URL` to the API address (no trailing slash).

### 3. Use the app

1. Open http://localhost:5173 and create an account.
2. Click **Start test** and answer the 10 questions.
3. Submit, or wait for the timer to reach 00:00 to see the auto-submit.
4. Review the result, then open **History** to see past attempts.
5. To use the admin page, sign up with the email set in `ADMIN_EMAIL`, then open **Admin**.

## API

| Method | Route | Access | Description |
| --- | --- | --- | --- |
| POST | `/api/auth/signup` | Public | Register |
| POST | `/api/auth/login` | Public | Log in |
| GET | `/api/auth/me` | User | Current user |
| POST | `/api/test/start` | User | Start or resume a test |
| POST | `/api/test/:id/submit` | User | Submit answers and get graded |
| GET | `/api/attempts` | User | History |
| GET | `/api/attempts/:id` | User | Result with correct answers |
| GET, POST, DELETE | `/api/questions` | Admin | Manage questions |

## How the timer and scoring work

- When a test starts, the server saves the start time and sends 10 questions **without** the correct answers.
- The browser counts down from the time left and submits automatically at zero.
- Grading happens on the server. Answers that arrive more than 15 seconds after the 10-minute limit are ignored, so changing the browser timer gives no advantage.
- If a student refreshes mid-test, the server returns the same questions with the remaining time.

## Deployment

- **Database:** MongoDB Atlas (free M0 cluster)
- **API:** Render Web Service. Root directory `server`, build command `npm install`, start command `npm start`
- **Frontend:** Vercel. Root directory `client`, build command `npm run build`, output directory `dist`, environment variable `VITE_API_URL`
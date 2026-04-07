# EduCore

EduCore is a full-stack EdTech platform built with React, Tailwind CSS, Framer Motion, Express, and MongoDB. It includes student and admin flows, JWT authentication, course enrollment, lesson playback, quizzes, progress tracking, and seeded demo content.

## Project structure

- `frontend/` contains the Vite + React + Tailwind application
- `backend/` contains the Express + MongoDB API
- `scripts/` contains root-level developer helpers

## Feature set

- JWT auth with `student` and `admin` roles
- 10 demo courses with modules and quizzes
- Student dashboard with progress tracking and resume learning
- Stripe-ready checkout flow with demo fallback when keys are missing
- Cloudinary-ready admin media upload with in-memory fallback for local work
- PDF certificate generation for completed courses
- Admin course/module/quiz management

## Run locally

1. Install packages:

```bash
npm install
```

2. Copy `backend/.env.example` to `backend/.env` and update values if needed.

3. Optionally copy `frontend/.env.example` to `frontend/.env` if your frontend and backend are hosted on different domains.

4. Start the full stack app:

```bash
npm run dev
```

The Vite frontend runs on `http://127.0.0.1:5173` and the API runs on `http://localhost:8080`.

## Seed demo data

```bash
npm run seed
```

If MongoDB is unavailable, the backend still starts in demo memory mode so the UI remains explorable during development.

## Integrations

- Stripe:
  - Add `STRIPE_SECRET_KEY` in `backend/.env`
  - EduCore will switch from demo checkout mode to real Stripe Checkout sessions
- Cloudinary:
  - Add the Cloudinary keys in `backend/.env`
  - Admin uploads will return hosted Cloudinary URLs instead of in-memory data URLs

## Deployment

See [DEPLOYMENT.md](/Users/apple/Documents/All%20Projects/Git%20Projects/Edtech-Platform-2.0-main/DEPLOYMENT.md) for hosting notes.

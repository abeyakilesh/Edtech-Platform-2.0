# EduCore

EduCore is a full-stack EdTech platform with a premium glassmorphic UI, JWT authentication, interactive course learning flows, quizzes, progress tracking, admin management tools, and deployment-ready service integrations.

The project is built as a monorepo with separate `frontend/` and `backend/` apps.

## Highlights

- Premium React + Tailwind + Framer Motion interface
- Full-stack monorepo structure with separate frontend and backend folders
- JWT authentication with `student` and `admin` roles
- Course catalog, course detail, lesson playback, quizzes, and progress tracking
- Student dashboard with resume-learning flow
- Admin panel for course, module, and quiz management
- Stripe-ready checkout flow with demo fallback
- Cloudinary-ready upload flow with local fallback
- PDF certificate generation for completed courses
- MongoDB support with memory-mode fallback for local development

## Project structure

- `frontend/`:
  Vite + React + Tailwind CSS + Framer Motion
- `backend/`:
  Express + MongoDB/Mongoose + JWT auth + service integrations
- `scripts/`:
  root-level helpers, including the monorepo dev runner

## Tech stack

- Frontend:
  React, Vite, Tailwind CSS, Framer Motion, React Router
- Backend:
  Node.js, Express, MongoDB, Mongoose
- Authentication:
  JWT
- Integrations:
  Stripe, Cloudinary, PDFKit

## Core features

### Student

- Browse courses
- View course details
- Enroll through checkout flow
- Watch video lessons
- Take quizzes
- Track progress
- Resume learning
- Download completion certificates

### Admin

- Create courses
- Add modules
- Add quizzes
- Manage users
- Upload media assets

## Demo content

EduCore ships with demo content including:

- 10 demo courses
- 3 to 5 learning modules per course
- 5 quiz questions per course
- demo student and admin accounts

## Demo accounts

- Student:
  `student@educore.com / Password123!`
- Admin:
  `admin@educore.com / Password123!`

## Local setup

1. Install packages:

```bash
npm install
```

2. Create backend environment variables:

```bash
cp backend/.env.example backend/.env
```

3. Optionally create frontend environment variables:

```bash
cp frontend/.env.example frontend/.env
```

4. Start the full stack app:

```bash
npm run dev
```

The Vite frontend runs on `http://127.0.0.1:5173` and the API runs on `http://localhost:8080`.

## Available scripts

At the repo root:

```bash
npm run dev
npm run build
npm run lint
npm run start
npm run seed
```

## Seed demo data

```bash
npm run seed
```

If MongoDB is unavailable, the backend still starts in demo memory mode so the UI remains explorable during development.

## Environment variables

### Backend

Defined in `backend/.env`:

- `PORT`
- `CLIENT_URL`
- `MONGODB_URI`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

### Frontend

Defined in `frontend/.env`:

- `VITE_API_BASE_URL`

## Integrations status

- Stripe:
  add `STRIPE_SECRET_KEY` to enable real Stripe Checkout sessions
- Cloudinary:
  add Cloudinary credentials to enable hosted media uploads
- MongoDB:
  add `MONGODB_URI` to persist users, courses, payments, and progress in a real database

Without these keys, EduCore still works in local development using safe fallback behavior where applicable.

## Current status

Implemented:

- frontend and backend monorepo structure
- modern landing page and themed UI
- auth, dashboard, quizzes, progress, admin panel
- checkout flow, media upload flow, certificate generation

Still ideal to add for full production hardening:

- Stripe webhook verification
- forgot-password / reset-password flow
- email verification
- refresh-token/session hardening
- rate limiting and security middleware

## Deployment

See [DEPLOYMENT.md](/Users/apple/Documents/All%20Projects/Git%20Projects/Edtech-Platform-2.0-main/DEPLOYMENT.md) for deployment notes.

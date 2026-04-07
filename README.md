# EduCore

EduCore is a full-stack EdTech platform built with React, Tailwind CSS, Framer Motion, Express, and MongoDB. It includes student and admin flows, JWT authentication, course enrollment, lesson playback, quizzes, progress tracking, and seeded demo content.

## Run locally

1. Install packages:

```bash
npm install
```

2. Copy `.env.example` to `.env` and update values if needed.

3. Start the full stack app:

```bash
npm run dev
```

The Vite frontend runs on `http://localhost:5173` and the API runs on `http://localhost:8080`.

## Seed demo data

```bash
npm run seed
```

If MongoDB is unavailable, the backend still starts in demo memory mode so the UI remains explorable during development.

# EduCore Deployment Notes

## Frontend

- Framework: Vite + React
- Build command: `npm run build --workspace frontend`
- Output directory: `frontend/dist`
- Environment:
  - `VITE_API_BASE_URL=https://your-backend-domain.com`

## Backend

- Runtime: Node.js
- Start command: `npm run start --workspace backend`
- Required environment variables:
  - `PORT`
  - `CLIENT_URL`
  - `MONGODB_URI`
  - `JWT_SECRET`
  - `JWT_EXPIRES_IN`
- Optional integrations:
  - `STRIPE_SECRET_KEY`
  - `STRIPE_WEBHOOK_SECRET`
  - `CLOUDINARY_CLOUD_NAME`
  - `CLOUDINARY_API_KEY`
  - `CLOUDINARY_API_SECRET`

## Suggested hosting

1. Deploy `backend/` to Render, Railway, or Fly.io.
2. Deploy `frontend/` to Vercel or Netlify.
3. Set `VITE_API_BASE_URL` in the frontend deployment.
4. Update backend `CLIENT_URL` to the deployed frontend URL.
5. Add Stripe and Cloudinary keys when you want live payments and uploads.

# Deployment

This project is easiest to deploy as three services:

- MongoDB Atlas for the database
- Render Web Service for `BACKEND`
- Vercel or Netlify for `FRONTEND`

## 1. Create MongoDB Atlas database

1. Create a free MongoDB Atlas cluster.
2. Create a database user and password.
3. Add the deployment provider's IP access rule. For a quick deployment, use `0.0.0.0/0`; restrict it later when possible.
4. Copy the connection string and replace its username, password, and database name.

## 2. Deploy the backend on Render

Create a new **Web Service** from this repository with:

- Root directory: `BACKEND`
- Build command: `npm install`
- Start command: `npm start`
- Health check path: `/health`

Set these environment variables in Render:

```text
NODE_ENV=production
MONGO_URL=mongodb+srv://...
JWT_SECRET=<long-random-secret>
CLIENT_URL=https://<your-frontend-domain>
APP_URL=https://<your-backend-domain>
```

`APP_URL` must be the public backend URL because redirects and generated short links are served by the backend. `CLIENT_URL` must be the exact frontend origin, without a trailing slash.

After deployment, verify:

```text
https://<your-backend-domain>/health
```

It should return `{ "status": "ok" }`.

## 3. Deploy the frontend on Vercel

Import the same repository and set:

- Root directory: `FRONTEND`
- Build command: `npm run build`
- Output directory: `dist`

Add this environment variable:

```text
VITE_API_BASE_URL=https://<your-backend-domain>
```

Redeploy the frontend after adding the variable. Then update the backend's `CLIENT_URL` to the final frontend URL and redeploy the backend.

## 4. SPA routing

If refreshing `/auth` or `/dashboard` on Vercel gives a 404, add a `FRONTEND/vercel.json` file with:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

## Local production checks

Backend:

```powershell
cd BACKEND
npm install
npm start
```

Frontend:

```powershell
cd FRONTEND
npm install
npm run build
```
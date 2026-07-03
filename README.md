# ApexTrend

ApexTrend is a minimal trading intelligence assistant. It connects to broker data, scans supported Volatility Indices, validates opportunities, applies risk controls, and routes controlled demo execution through a broker gateway.

The current application is structured for GitHub deployment with a static frontend and a Node.js backend.

## Project Structure

```text
apextrend/
  frontend/       Static ApexTrend app
  server/         Node.js backend and Deriv OAuth foundation
  README.md
  .gitignore
```

## Frontend

The frontend is plain HTML, CSS, and JavaScript.

```powershell
cd frontend
```

For local preview, serve the folder with any static server. Example:

```powershell
npx serve .
```

No backend secrets are stored in the frontend.

## Backend

The backend is an Express server.

```powershell
cd server
npm install
npm start
```

Health check:

```text
GET http://127.0.0.1:8787/api/health
```

Expected response:

```json
{
  "status": "ok",
  "app": "ApexTrend"
}
```

## Environment

Do not commit `.env`.

Use `server/.env.example` as the template for backend configuration:

```env
PORT=8787
FRONTEND_ORIGIN=http://127.0.0.1:4173
SUPABASE_URL=SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY=SUPABASE_SERVICE_ROLE_KEY
DERIV_CLIENT_ID=YOUR_DERIV_CLIENT_ID
DERIV_REDIRECT_URI=http://127.0.0.1:8787/api/deriv/oauth/callback
DERIV_AUTH_URL=https://auth.deriv.com/oauth2/auth
DERIV_TOKEN_URL=https://auth.deriv.com/oauth2/token
DERIV_SCOPE=trade
DERIV_ACCOUNTS_URL=https://api.derivws.com/trading/v1/accounts
```

## Safety Status

Real account execution remains disabled. Demo execution must pass scanner, deployment, bot, risk, and broker checks before any controlled execution path can proceed.

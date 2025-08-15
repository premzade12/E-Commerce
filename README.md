# 🛍️ MERN E‑Commerce

> A production‑ready e‑commerce web app built with **MongoDB**, **Express**, **React (Vite)**, and **Node.js**. Includes authentication with JWT + HttpOnly cookies, products, cart, orders, and admin features.

<!-- Badges (optional) -->

<p align="left">
  <a href="#"><img alt="License" src="https://img.shields.io/badge/license-MIT-green"></a>
  <a href="#"><img alt="Build" src="https://img.shields.io/badge/CI-passing-success"></a>
  <a href="#"><img alt="PRs" src="https://img.shields.io/badge/PRs-welcome-blue"></a>
</p>

## ✨ Features

* 🔐 Auth with JWT (HttpOnly cookies), register/login/logout
* 👤 User profiles & protected routes (middleware)
* 🛒 Products listing, details, search & categories
* 🧺 Cart (add/remove/update), guest → auth merge (optional)
* 🧾 Checkout flow & orders
* 🗃️ MongoDB models with Mongoose
* ⚙️ Robust Express API with layered architecture
* 🧭 Client‑side routing (React Router) & state management
* ✅ Input validation & helpful error responses
* 🧪 Ready-to-extend test setup

## 🧱 Tech Stack

* **Frontend**: React + Vite, React Router
* **Backend**: Node.js, Express, Mongoose
* **DB**: MongoDB Atlas (or self‑hosted)
* **Auth**: JWT (HttpOnly cookie), bcrypt
* **Build/Dev**: Vite, Nodemon
* **Deployment**: Render/Netlify/Vercel (example configs below)

## 📦 Monorepo Layout

```
repo-root/
├─ frontend/              # Vite React app
│  ├─ src/
│  │  ├─ pages/           # Home, Product, Cart, Login, Register, Orders, Admin...
│  │  ├─ components/
│  │  ├─ hooks/
│  │  ├─ lib/
│  │  ├─ App.jsx
│  │  └─ main.jsx
│  ├─ index.html
│  ├─ vite.config.js
│  └─ package.json
├─ backend/               # Express API
│  ├─ src/
│  │  ├─ config/db.js
│  │  ├─ middleware/isAuth.js
│  │  ├─ controllers/
│  │  ├─ models/
│  │  ├─ routes/
│  │  │  ├─ authRoutes.js
│  │  │  ├─ userRoutes.js
│  │  │  ├─ productRoutes.js
│  │  │  ├─ cartRoutes.js
│  │  │  └─ orderRoutes.js
│  │  └─ index.js          # Express app entry
│  ├─ package.json
│  └─ .env.example
├─ README.md
└─ .gitignore
```

## 🚀 Quick Start

> Requires **Node.js 18+** and **npm** (or pnpm/yarn) installed.

1. **Clone & install**

```bash
git clone <your-repo-url>
cd <your-repo-folder>

# frontend
cd frontend
npm i

# backend
cd ../backend
npm i
```

2. **Environment variables**
   Create `backend/.env` from the example below (update values):

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority
JWT_SECRET=supersecret_change_me
NODE_ENV=development
CLIENT_URL=http://localhost:5173
CORS_ORIGIN=http://localhost:5173
COOKIE_NAME=token
COOKIE_SECURE=false
```

For the React app, create `frontend/.env`:

```env
VITE_API_BASE=http://localhost:5000/api
```

3. **Run the apps (dev)**

```bash
# backend (from backend/)
npm run dev
# Starts on http://localhost:5000

# frontend (from frontend/)
npm run dev
# Vite dev server on http://localhost:5173
```

> **Tip**: If requests are blocked by CORS or cookies aren’t set, double‑check `CORS_ORIGIN`, `CLIENT_URL`, and that your frontend uses `fetch(url, { credentials: 'include' })`.

## 🔐 Auth Flow (Cookies + JWT)

* On login/register, server signs a JWT and sets it as an **HttpOnly** cookie named `token`.
* Protected routes use middleware `isAuth` to read `req.cookies.token`, verify with `JWT_SECRET`, and attach `req.user`.
* Logout clears the cookie.

### Example `isAuth` middleware

```js
import jwt from 'jsonwebtoken';

export const isAuth = (req, res, next) => {
  try {
    const { token } = req.cookies || {};
    if (!token) return res.status(401).json({ message: 'No token' });
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
```

## 🛣️ API Overview

Base URL: `http://localhost:5000/api`

| Method | Endpoint         | Protected | Description          |
| -----: | ---------------- | :-------: | -------------------- |
|   POST | `/auth/register` |     ❌     | Create account       |
|   POST | `/auth/login`    |     ❌     | Login, sets cookie   |
|   POST | `/auth/logout`   |     ✅     | Clear cookie         |
|    GET | `/users/me`      |     ✅     | Current user profile |
|    GET | `/products`      |     ❌     | List products        |
|    GET | `/products/:id`  |     ❌     | Product details      |
|    GET | `/cart`          |     ✅     | Get user cart        |
|   POST | `/cart`          |     ✅     | Add/update cart item |
| DELETE | `/cart/:itemId`  |     ✅     | Remove cart item     |
|   POST | `/orders`        |     ✅     | Create order         |
|    GET | `/orders`        |     ✅     | List user orders     |

> Adjust to match your implementation.

## 🧩 Frontend Notes (Vite + React)

* Since Vite uses ESM, **import React only if you use JSX runtime classic**. With the new JSX transform, ensure `"jsx": "react-jsx"` in `tsconfig.json/jsconfig.json`, or import `react` explicitly if your tooling requires it.
* When making API calls with cookies:

```js
fetch(`${import.meta.env.VITE_API_BASE}/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({ email, password })
});
```

## ⚙️ NPM Scripts

**backend/package.json** (example)

```json
{
  "scripts": {
    "dev": "nodemon src/index.js",
    "start": "node src/index.js",
    "lint": "eslint .",
    "test": "NODE_ENV=test jest"
  }
}
```

**frontend/package.json** (example)

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview --port 5173"
  }
}
```

## 🐳 Docker (optional)

```yaml
# docker-compose.yml
version: '3.9'
services:
  api:
    build: ./backend
    ports: ["5000:5000"]
    env_file: backend/.env
    depends_on: [mongo]
  web:
    build: ./frontend
    ports: ["5173:5173"]
    environment:
      - VITE_API_BASE=http://localhost:5000/api
  mongo:
    image: mongo:7
    volumes:
      - mongo_data:/data/db
volumes:
  mongo_data:
```

## 🚀 Deployment Notes

### Render (Backend)

* Create a **Web Service** → Node
* Build: `npm i`
  Start: `node src/index.js`
* Add env vars from `.env` (use `COOKIE_SECURE=true` in production)
* Add `CORS_ORIGIN` to your deployed frontend URL

### Vercel/Netlify (Frontend)

* Set `VITE_API_BASE` to your deployed API base URL
* Enable **Cookies**/CORS to match backend

## 🧰 Troubleshooting

* **Cookie not set in browser**: Ensure backend response includes `Set-Cookie` with `HttpOnly`, correct `domain`, `path=/`, and `SameSite=None; Secure` when using cross‑site (HTTPS required). Frontend must send `credentials: 'include'`.
* **CORS errors**: `CORS_ORIGIN` must match the exact frontend origin. Include `credentials: true` in CORS middleware.
* **React runtime error `React is not defined`**: Import React or enable the new JSX transform correctly. In Vite, ensure plugin and `jsx` settings; or add `import React from 'react'` where needed.

## 🔧 Example CORS & Cookies (Express)

```js
import cors from 'cors';
import cookieParser from 'cookie-parser';

app.use(cookieParser());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});
```

## 🗺️ Roadmap

* Admin dashboard (orders, products, users)
* Payment gateway integration
* Inventory & reviews
* File uploads (e.g., Cloudinary)
* E2E tests (Playwright/Cypress)

## 🤝 Contributing

1. Fork the repo and create your branch: `git checkout -b feat/awesome`
2. Commit changes: `git commit -m "feat: add awesome"`
3. Push: `git push origin feat/awesome`
4. Open a PR 🚀

Special thanks to **Ayush** for contributing to this project 🙌


---

### 📣 Credits

Built with ❤️ using MERN. Replace placeholders (`<your-repo-url>`, env values) with your actual details.

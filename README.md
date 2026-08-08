# Admin Dashboard

A fully functional admin dashboard built with React, Redux Toolkit, and Redux-Saga. It features a mock authentication system with token lifecycle management, a data-rich dashboard view, and a clean UI styled after the Tabler admin template.

---

## Table of Contents

- [Aim and Objectives](#aim-and-objectives)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [How It Works — Step by Step](#how-it-works--step-by-step)
  - [1. Application Bootstrap](#1-application-bootstrap)
  - [2. Authentication Flow](#2-authentication-flow)
  - [3. Route Protection](#3-route-protection)
  - [4. Dashboard Data Loading](#4-dashboard-data-loading)
  - [5. Token Refresh Watchdog](#5-token-refresh-watchdog)
  - [6. Logout Flow](#6-logout-flow)
- [State Management Architecture](#state-management-architecture)
- [Component Breakdown](#component-breakdown)
- [Getting Started](#getting-started)

---

## Aim and Objectives

**Aim:** Build a production-pattern admin dashboard that demonstrates real-world React architecture — including protected routing, async state management with sagas, and an automatic token refresh mechanism — without requiring a live backend.

**Objectives:**

- Implement a complete user authentication cycle: registration, login, session persistence, token refresh, and logout.
- Demonstrate the Redux-Saga pattern for handling asynchronous side effects in a clean, testable way.
- Simulate a token expiry and silent refresh flow that mirrors how real JWT-based APIs behave.
- Present dashboard metrics, charts, and data tables driven entirely by Redux state.
- Provide a responsive, accessible UI built with Tailwind CSS that mirrors the Tabler design system.

---

## Tech Stack

| Layer | Library / Tool | Version |
|---|---|---|
| UI Framework | React | ^19 |
| Build Tool | Vite | ^7 |
| State Management | Redux Toolkit | ^2 |
| Async Side Effects | Redux-Saga | ^1.4 |
| Routing | React Router DOM | ^7 |
| Charts | Recharts | ^3 |
| Styling | Tailwind CSS | ^3 |
| Icons | Lucide React | ^0.577 |
| Utility | clsx, tailwind-merge | latest |

---

## Project Structure

```
src/
├── main.jsx                  # Entry point — mounts React with Redux Provider
├── App.jsx                   # Root router — defines routes and protected route guard
│
├── layouts/
│   └── MainLayout.jsx        # Persistent shell: header, nav bar, footer, <Outlet>
│
├── pages/
│   ├── LoginPage.jsx         # Login form, dispatches loginRequest
│   ├── RegisterPage.jsx      # Registration form, dispatches registerRequest
│   └── DashboardPage.jsx     # Main dashboard view, composes all widgets
│
├── components/
│   ├── StatsCard.jsx         # Single KPI card with trend indicator
│   ├── ActivityTable.jsx     # Area chart + user activity table with delete action
│   ├── ChartCard.jsx         # Reusable pie / donut chart card (Recharts)
│   └── DocsAlert.jsx         # Info banner component
│
└── store/
    ├── store.js              # Configures Redux store, attaches saga middleware
    ├── rootReducer.js        # Combines auth and dashboard reducers
    ├── rootSaga.js           # Combines auth and dashboard sagas
    ├── authSlice.js          # Auth state: tokens, user, loading, error flags
    ├── authSaga.js           # Sagas: register, login, logout, token refresh, apiWithAuth
    ├── dashboardSlice.js     # Dashboard state: stats, charts, users
    └── dashboardSaga.js      # Saga: fetches dashboard data through apiWithAuth watchdog
```

---

## Features

- **User Registration** — creates a new account stored in `localStorage`.
- **User Login** — validates credentials, generates mock JWT-style tokens with a 60-second TTL.
- **Session Persistence** — tokens and user profile survive page refresh via `localStorage`.
- **Protected Routes** — unauthenticated users are redirected to `/login` (or `/register` if no accounts exist yet).
- **Automatic Token Refresh** — a saga "watchdog" detects expiring tokens and silently refreshes them before any data fetch.
- **Dashboard Metrics** — six KPI cards showing tickets, earnings, followers, etc., each with a percentage trend.
- **Area Chart** — animated purchases-over-time chart using Recharts.
- **Pie & Donut Charts** — browser share and task completion charts.
- **Activity Table** — user commit history table with avatar support and row-level delete.
- **Sign Out** — clears all session data and redirects to login.

---

## How It Works — Step by Step

### 1. Application Bootstrap

```
index.html  →  main.jsx  →  App.jsx
```

1. Vite loads `index.html` and executes `main.jsx`.
2. `main.jsx` wraps the app in a Redux `<Provider>` passing the configured store. The store runs `sagaMiddleware.run(rootSaga)` at startup, activating all saga watchers before any user interaction.
3. `App.jsx` sets up the React Router with three routes: `/login`, `/register`, and `/` (the protected dashboard).

---

### 2. Authentication Flow

#### Registration

1. User fills in full name, email, and password on `/register` and submits.
2. The component dispatches `registerRequest({ fullName, email, password })`.
3. The `authSaga` catches this action via `takeLatest`.
4. The saga simulates a 1-second API call, then reads the `users` array from `localStorage`.
5. If the email is already taken, it dispatches `registerFailure` with an error message — the form shows the error inline.
6. If the email is free, it creates a new user object with a generated ID and pushes it into `localStorage`.
7. It dispatches `registerSuccess`. The component detects the success condition via a `useEffect` and navigates to `/login`.

#### Login

1. User enters email and password on `/login` and submits.
2. The component dispatches `loginRequest({ email, password })`.
3. The `authSaga` catches this via `takeLatest`, simulates a 1-second API delay, then looks up the user in `localStorage`.
4. If credentials do not match, `loginFailure` is dispatched — the form shows "Invalid email or password".
5. If credentials match:
   - A sanitised user object (no password) is built.
   - `generateTokens()` creates a mock `accessToken`, `refreshToken`, and an `expiresAt` timestamp 60 seconds in the future.
   - All four values are written to `localStorage` for persistence.
   - `loginSuccess` is dispatched with the user and tokens.
6. `authSlice` updates `isAuthenticated: true` in Redux state.
7. The `LoginPage` `useEffect` detects `isAuthenticated` and calls `navigate('/')`.

---

### 3. Route Protection

`App.jsx` wraps the `/` route in a `<ProtectedRoute>` component.

```
User visits "/"
   │
   ├─ isAuthenticated === true  →  renders <MainLayout> with <DashboardPage>
   │
   └─ isAuthenticated === false
          │
          ├─ users exist in localStorage  →  Navigate to "/login"
          └─ no users yet                 →  Navigate to "/register"
```

On page refresh, `authSlice`'s `initialState` reads `accessToken` and `user` directly from `localStorage`, so the session survives a refresh without re-logging in.

---

### 4. Dashboard Data Loading

1. `DashboardPage` mounts and calls `dispatch(fetchDashboardDataRequest())` inside a `useEffect`.
2. `dashboardSaga` catches this action via `takeLatest`.
3. Before fetching data, the saga calls `apiWithAuth(simulateDashboardApi)` — routing the request through the token watchdog (see step 5).
4. On success, `fetchDashboardDataSuccess` is dispatched with:
   - **`stats`** — six KPI objects (value + percentage change).
   - **`activityData`** — 11-day purchases array for the area chart.
   - **`users`** — three activity table rows.
   - **`pieData`** — browser market share breakdown.
   - **`donutData`** — task completion percentages.
5. `dashboardSlice` stores all of this in Redux state.
6. `DashboardPage` reads state via `useSelector` and renders all child components.
7. While loading, a centered spinner is shown. On error, an inline error message is shown.

---

### 5. Token Refresh Watchdog

Every API call in the app passes through `apiWithAuth`, a saga utility in `authSaga.js`.

```
apiWithAuth(apiFn, ...args)
     │
     ├─ Read expiresAt from localStorage
     ├─ currentTime >= expiresAt - 2s?
     │       │
     │       YES → dispatch refreshTokenRequest
     │             call handleRefreshToken
     │               ├─ Simulate 500ms API call
     │               ├─ Generate new accessToken
     │               ├─ Update localStorage (accessToken + new expiresAt)
     │               └─ dispatch refreshTokenSuccess
     │
     └─ Call the original apiFn normally
```

If the refresh itself fails (e.g. no refresh token found), `refreshTokenFailure` is dispatched, followed immediately by `logoutRequest` — forcing the user back to the login screen. This mirrors the standard interceptor pattern used with Axios or Fetch in real applications.

---

### 6. Logout Flow

1. User clicks "Sign out" in the header.
2. The header dispatches `{ type: 'auth/logoutRequest' }` via the global `window.store` reference.
3. `authSaga` catches `logoutRequest` via `takeLatest`.
4. The saga simulates a 400ms API call (e.g. hitting a `/logout` endpoint), then removes all keys from `localStorage`: `accessToken`, `refreshToken`, `expiresAt`, `user`.
5. `logoutSuccess` is dispatched.
6. `authSlice` sets `isAuthenticated: false` and clears user/token state.
7. The `<ProtectedRoute>` guard detects `isAuthenticated === false` and redirects to `/login`.

---

## State Management Architecture

```
Redux Store
├── auth (authSlice)
│   ├── isAuthenticated  — boolean, drives route protection
│   ├── user             — { id, name, email, role }
│   ├── accessToken      — current JWT-style token
│   ├── refreshToken     — long-lived token for silent refresh
│   ├── loading          — true during any async auth operation
│   └── error            — string or null, shown in form alerts
│
└── dashboard (dashboardSlice)
    ├── loading          — true while fetching
    ├── stats            — KPI values and change percentages
    ├── activityData     — array for area chart
    ├── users            — array for activity table
    ├── pieData          — pie chart data with fill colours
    ├── donutData        — donut chart data with fill colours
    └── error            — string or null

Sagas (run at startup via rootSaga)
├── authSaga
│   ├── takeLatest(registerRequest)      → handleRegister
│   ├── takeLatest(loginRequest)         → handleLogin
│   ├── takeLatest(logoutRequest)        → handleLogout
│   └── takeLatest(refreshTokenRequest)  → handleRefreshToken
│
└── dashboardSaga
    └── takeLatest(fetchDashboardDataRequest) → fetchDashboardData → apiWithAuth
```

---

## Component Breakdown

| Component | Props | Responsibility |
|---|---|---|
| `StatsCard` | `title`, `value`, `change` | Displays a single KPI with a green/red trend arrow |
| `ChartCard` | `title`, `data`, `type` | Renders a pie or donut chart; `type="donut"` adds an inner radius |
| `ActivityTable` | `activityData`, `users`, `onRemoveUser` | Area chart above a table; trash icon dispatches `removeUserRow` |
| `DocsAlert` | none | Static informational banner |
| `MainLayout` | none | Header + nav + `<Outlet>` + footer shell |

---

## Getting Started

**Prerequisites:** Node.js 18+ and npm.

**1. Install dependencies**

```bash
cd admin-dashboard
npm install
```

**2. Start the development server**

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

**3. First-time setup**

Because there is no seeded database, you must register before you can log in:

- Navigate to `http://localhost:5173` — you will be redirected to `/register` automatically.
- Fill in your full name, email, and a password of your choice.
- After registration you will be redirected to `/login`.
- Sign in with the same credentials.

**4. Build for production**

```bash
npm run build
```

Output is placed in `dist/`. Preview the production build locally with:

```bash
npm run preview
```

**5. Lint**

```bash
npm run lint
```

---

> **Note on localStorage:** All user accounts and session tokens are stored in the browser's `localStorage`. This is intentional for a mock/demo setup — no backend is required. Clearing browser storage will remove all registered accounts.

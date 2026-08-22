# ARCHITECTURE.md

Architectural reference for the **admin-dashboard-template** repository. The repository source code is the single source of truth; anything not evidenced by the code is marked accordingly.

---

## 1. Project Identification

| Field | Value |
| --- | --- |
| Project Name | admin-dashboard-template |
| Repository URL | Unknown - not identified in repository analysis (working copy is not a git repository). |
| Primary Team | Unknown - not identified in repository analysis. |
| Date of Last Update | 2026-08-22 |

---

## 2. Architecture Style

The application is a **client-side rendered Single Page Application (SPA)** organized in a **feature-module / layered** structure. There is no server, no backend services, and no microservices — all data is served by an in-browser mock layer (MSW). Evidence:

- `src/main.tsx` bootstraps a React app directly into `#root`; no server framework is present.
- `src/mocks/` provides the entire API surface via Mock Service Worker.
- Layers are separated: `pages/` (routing/screens) → `components/` (UI) → `features/` (state + API) → `lib/` (data access) → `mocks/` (mock backend).

Classification: **Modular Frontend Monolith (SPA)**. Not event-driven, not microservices, not serverless.

---

## 3. Project Structure

```text
admin-dashboard-template/
├── public/
│   ├── mockServiceWorker.js     # MSW service worker (mock API in the browser)
│   └── favicon.svg
├── src/
│   ├── main.tsx                 # App bootstrap; starts MSW worker in dev/test
│   ├── app/
│   │   ├── app.tsx              # Root component → AppRouter
│   │   ├── providers.tsx        # React Query, Router, Theme, Auth, Toaster wiring
│   │   ├── router.tsx           # Route table (lazy routes + protected routes)
│   │   └── query-client.ts      # TanStack Query client configuration
│   ├── components/
│   │   ├── ui/                  # shadcn/ui primitives (button, card, dialog, ...)
│   │   ├── layout/              # AppShell, SidebarNav, Topbar, nav-items
│   │   ├── shared/              # KPI cards, tables, state panels, page header
│   │   ├── users/               # UsersTable
│   │   └── settings/            # SettingsForm
│   ├── features/
│   │   ├── auth/                # AuthProvider, auth-api, protected-route
│   │   ├── theme/               # ThemeProvider, theme-config
│   │   ├── overview/            # overview-api (dashboard data access)
│   │   ├── users/               # users-api
│   │   ├── settings/            # settings-api
│   │   ├── billing/             # billing-api (plans, subscription, invoices)
│   │   ├── analytics/           # analytics-api (funnel, channels, cohorts, mrr)
│   │   ├── team/                # team-api (members, invites, roles)
│   │   ├── notifications/       # notifications-api (read state)
│   │   ├── transactions/        # transactions-api (ledger)
│   │   ├── integrations/        # integrations-api (apps + api keys)
│   │   └── support/             # support-api (tickets)
│   ├── lib/                     # http() fetch wrapper, cn() util, formatters
│   ├── mocks/                   # MSW handlers, browser worker, mock data
│   ├── pages/                   # Route components (one per module + login + not-found)
│   ├── test/                    # Vitest setup, node MSW server, test-app, tests
│   ├── types/                   # Shared domain TypeScript types
│   └── styles.css               # Tailwind v4 entry + CSS theme variables
├── index.html                   # HTML shell; loads Google Fonts + /src/main.tsx
├── vite.config.ts               # Vite + Vitest + Tailwind + @/ path alias
├── tsconfig*.json               # Project-references TypeScript config
├── components.json              # shadcn/ui configuration
└── package.json                 # Scripts and dependencies
```

---

## 4. High-Level System Diagram

```text
[Browser]
   |
   |  GET /                (index.html → /src/main.tsx)
   v
[React SPA]
   |
   |-- AppProviders
   |     ├── QueryClientProvider (TanStack Query)
   |     ├── BrowserRouter (React Router v7)
   |     ├── ThemeProvider (localStorage-driven theme)
   |     ├── AuthProvider  (session in localStorage)
   |     └── Toaster (sonner)
   |
   |-- AppRouter (lazy routes, grouped sidebar nav)
   |     ├── /login              → LoginPage (public)
   |     ├── /app/overview       → OverviewPage  (protected, Dashboard)
   |     ├── /app/analytics      → AnalyticsPage (protected, Dashboard)
   |     ├── /app/users          → UsersPage     (protected, Manage)
   |     ├── /app/team           → TeamPage       (protected, Manage)
   |     ├── /app/billing        → BillingPage    (protected, Manage)
   |     ├── /app/transactions   → TransactionsPage (protected, Manage)
   |     ├── /app/notifications  → NotificationsPage (protected, Engage)
   |     ├── /app/support        → SupportPage    (protected, Engage)
   |     ├── /app/integrations   → IntegrationsPage (protected, Engage)
   |     ├── /app/settings       → SettingsPage   (protected, Settings)
   |     └── *                   → NotFoundPage
   |
   |  API calls via lib/http.ts (fetch)
   v
[Mock Service Worker]  intercept  /api/*  requests
   |
   +--> /api/auth/session | login | logout
   +--> /api/dashboard/overview
   +--> /api/users
   +--> /api/settings
   |
   v
[In-memory mock state]  (src/mocks/handlers.ts + data.ts; resets per test)
```

No network backend exists. Every `/api/*` request is intercepted and served from in-memory mock state.

---

## 5. Core Components

| Name | Description | Technologies | Deployment |
| --- | --- | --- | --- |
| `AppProviders` | Composition root wiring React Query, Router, Theme, Auth, and Toaster contexts. | React, TanStack Query, React Router | Bundled SPA |
| `AppRouter` | Declarative route table; lazy-loads pages; enforces `ProtectedRoute` for `/app/*`. | React Router v7 | Bundled SPA |
| `AuthProvider` / `auth-api` | Client-side session state; reads/writes session to `localStorage`; calls mock auth endpoints. | React Context, `lib/http.ts` | Bundled SPA |
| `ProtectedRoute` | Guards `/app/*`; redirects unauthenticated users to `/login`. | React Router | Bundled SPA |
| `ThemeProvider` / `theme-config` | Theme selection persisted in `localStorage`; sets `data-theme` on `<html>`. | React Context | Bundled SPA |
| MSW Mock Layer (`src/mocks`) | Full fake API surface (`handlers.ts`, `browser.ts` worker, `data.ts`). | MSW v2 | Bundled, dev/test only |
| `lib/http.ts` | Thin `fetch` wrapper; sets JSON headers; throws on non-2xx. | Fetch API | Bundled SPA |
| shadcn/ui primitives (`src/components/ui`) | Button, Card, Dialog, DropdownMenu, Input, Switch, Avatar, Badge, Label. | Radix UI, Tailwind, CVA | Bundled SPA |
| Pages (`src/pages`) | Login, Overview, Analytics, Users, Team, Billing, Transactions, Notifications, Support, Integrations, Settings, NotFound. | React, Recharts, RHF+Zod | Bundled SPA |
| `DataTable` / `DetailDrawer` | Reusable generic table (`data-table.tsx`) and right-side detail panel + `DefinitionList` (`detail-drawer.tsx`). | React | Bundled SPA |
| Vitest test harness (`src/test`) | Node MSW server, jsdom env, `renderApp` helper, routing + module smoke tests. | Vitest, Testing Library | Test only |

---

## 6. Technologies

### Frontend
- React 19 + TypeScript 5 (strict, project references via `tsc -b`).
- Vite 6 (build/dev) with `@vitejs/plugin-react` and `@tailwindcss/vite`.
- React Router v7 (client-side routing).
- TanStack Query v5 (server-state caching) + React Query Devtools.
- Tailwind CSS v4 (CSS-first config in `src/styles.css`; no `tailwind.config.js`).
- shadcn/ui (style `new-york`, `rsc: false`) built on Radix UI primitives.
- React Hook Form + Zod (+ `@hookform/resolvers`) for forms/validation.
- Recharts (charts on the Overview page).
- sonner (toast notifications).
- lucide-react (icons).

### Backend
- None. The repository contains no server, API, or backend framework. The API is mocked entirely client-side by MSW.

### Data Stores
- No persistent/server data store. Data is in-memory mock state (`src/mocks/handlers.ts`), resettable per test.
- Browser `localStorage` is used for client-side session (`admin-dashboard-template:session`) and theme (`admin-dashboard-theme`). See section 9.

### Infrastructure
- None. No cloud provider, container, IaC, or orchestration files exist in the repository.

### Observability
- None. No logging, metrics, tracing, or monitoring tooling is present.

---

## 7. External Integrations

| Service Name | Purpose | Integration Method |
| --- | --- | --- |
| Google Fonts | Loads `Fraunces` and `Manrope` typefaces for the UI. | `<link>` tags in `index.html` (no API key/auth). |

There are no backend, payment, auth-provider, or third-party SDK integrations. All `/api/*` traffic is intercepted locally by MSW.

---

## 8. Security

- **Authentication (mock):** A `Session` object (with `isAuthenticated`) is stored in `localStorage` under `admin-dashboard-template:session`. `AuthProvider` reads it on init; `ProtectedRoute` redirects to `/login` when absent/invalid. This is a client-side mock only — there is no real credential verification or backend auth.
- **Authorization:** Role strings exist in the `Session` (`Owner`/`Admin`/`Manager`) and `UserRecord` (`Owner`/`Admin`/`Support`/`Analyst`) types, but no RBAC enforcement is implemented in code.
- **Transport:** `lib/http.ts` only adds JSON `Content-Type` headers; no tokens, signing, or encryption are applied.
- **Secrets management:** None present; no environment variables or secret files are used.
- **Security middleware:** None (no server). The only boundary is the client-side `ProtectedRoute`.

> Note: Because the app ships with mocked auth and a mocked API, the security posture is representative only and not production-ready.

---

## 9. Data Stores

### In-memory mock state
- **Type:** In-memory (module-level variables in `src/mocks/handlers.ts`).
- **Purpose:** Serves as the fake backend for sessions and settings; supports search filtering for users.
- **Key state:** `activeSession` (from `defaultSession`), `activeSettings` (from `settingsPayload`). Reset via `resetMockState()` (called in test `afterEach`).

### Browser `localStorage`
- **Type:** Client-side key-value storage.
- **Purpose:** Persists auth session and UI theme across reloads.
- **Keys / schemas:**
  - `admin-dashboard-template:session` → JSON `Session` (`{ user: {id,name,email,role,organization}, isAuthenticated }`).
  - `admin-dashboard-theme` → `ThemeId` string (`"oneui-ash"` default, or `"midnight-ops"`).

No database, cache, object store, or queue is used.

---

## 10. Deployment

- **Build:** `pnpm build` runs `tsc -b` (typecheck via project references) then `vite build`, emitting static assets to `dist/`.
- **Serve:** `pnpm preview` serves the built `dist/`; `pnpm dev` runs the Vite dev server (auto-starting the MSW worker).
- **CI/CD:** Unknown - not identified in repository analysis (no GitHub Actions, GitLab CI, Jenkins, or pipeline files present).
- **Infrastructure / hosting:** Unknown - not identified in repository analysis (no Docker, Kubernetes, Terraform, or cloud manifests present). The output is a static SPA that can be hosted on any static file host.

---

## 11. Future Considerations

- The entire data and auth layer is mocked via MSW (`src/mocks/`). To become production-ready, a real backend must replace the `/api/*` handlers, and the client-side `localStorage` session model must be replaced with server-issued credentials (cookie/session/token) and real auth verification.
- `localStorage` is used to store the session; this is not secure for real credentials and should be reconsidered before production use.
- No automated lint or format scripts exist in `package.json` (only `dev`, `build`, `preview`, `test`, `test:watch`); a lint/format step is likely needed as the project grows.
- No TODO/FIXME markers, deprecated modules, or migration plans were found in the source.

No explicit roadmap or architectural debt (beyond the mock-backend substitution noted above) identified in repository analysis.

---

## 12. Glossary

| Term | Definition |
| --- | --- |
| SPA | Single Page Application — client-rendered app with no server-side routing. |
| MSW | Mock Service Worker — intercepts `fetch`/`XMLHttpRequest` to serve mock API responses in browser and Node. |
| shadcn/ui | Copy-in React component collection built on Radix UI; configured via `components.json` (style `new-york`). |
| Tailwind v4 CSS-first | Tailwind configuration expressed in CSS via `@import "tailwindcss"` rather than a JS config file. |
| TanStack Query | Async server-state data-fetching/caching library used for `/api/*` reads/writes. |
| RHF + Zod | React Hook Form paired with Zod schemas for typed form validation. |
| `@/` alias | Path alias (via Vite + `tsconfig`) mapping to `src/`. |
| Session | Client-side auth object persisted in `localStorage` under `admin-dashboard-template:session`. |
| ThemeId | Identifier for a UI theme (`oneui-ash` default light, `midnight-ops` dark), persisted under `admin-dashboard-theme`. |
| ProtectedRoute | Route guard that redirects unauthenticated users to `/login`. |
| `http()` | Thin fetch wrapper in `src/lib/http.ts` that throws on non-2xx responses. |
| `renderApp` | Test helper in `src/test/test-app.tsx` that renders the app with a configurable router history. |
| `defaultSession` | Seed session fixture in `src/mocks/data.ts`, used to authenticate tests. |
| BillingPayload | Mock aggregate of `subscription` + `plans` + `invoices` served at `/api/billing`. |
| TeamMember | Roster entry with `role` (Owner/Admin/Member/Billing) and `status`; served at `/api/team`. |
| Transaction | Ledger entry (status succeeded/pending/failed/refunded, method card/ach/paypal) at `/api/transactions`. |
| Integration / ApiKey | Connected third-party app and programmatic key, served at `/api/integrations` and `/api/integrations/api-keys`. |
| Ticket | Support item with `priority` (low/medium/high/urgent) and `status` (open/pending/closed) at `/api/support/tickets`. |
| `DataTable` | Generic column-based table helper (`src/components/shared/data-table.tsx`) used by module pages. |
| `DetailDrawer` | Right-side detail panel + `DefinitionList` (`src/components/shared/detail-drawer.tsx`). |

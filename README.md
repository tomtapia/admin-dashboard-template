# Admin Dashboard Template

A production-shaped **React 19 + Vite 6 + TypeScript** admin dashboard starter. It ships with a full set of SaaS module pages, a themeable design system, role-aware navigation, and a mock API layer so it runs with zero backend dependencies — then drops cleanly onto a real API when you are ready.

![Example](./Admin-Dashboard-Template-Example.png)

## Features

- **11 module pages** wired through lazy routes and a protected shell: Overview, Analytics, Users, Team, Billing, Transactions, Notifications, Support, Integrations, Settings, plus Login and 404.
- **Themeable design system** with four presets (Core Light, Midnight Ops, Sunset Ember, Forest Deep) driven by CSS variables; selection persists in `localStorage`.
- **Role-based access control** — nav items and protected routes are gated by the signed-in user's role (Owner / Admin / Manager) via a shared `canAccess` helper and `RoleRoute`.
- **Mock API via MSW** — the entire `/api/*` surface is served from in-browser mocking, with per-test reset. Swap in a real backend with a single env var (see [Going to production](#going-to-production)).
- **Resilient UI** — global + route-level error boundaries, loading/empty/error states on every module page, and centralized mutation error toasts.
- **Accessible** — skip link, focus-visible rings, semantic headings, and jest-axe checks in CI.
- **Tooling** — ESLint (flat config), Prettier, Husky pre-commit, and a GitHub Actions CI pipeline (typecheck → lint → test → build).

## Tech stack

React 19 · TypeScript 5 (strict, project references) · Vite 6 · React Router v7 · TanStack Query v5 · Tailwind CSS v4 (CSS-first) · shadcn/ui (Radix) · React Hook Form + Zod · Recharts · MSW · Vitest.

## Quickstart

```bash
pnpm install      # install dependencies
pnpm dev          # start the Vite dev server (auto-starts the MSW worker)
pnpm build        # tsc -b (typecheck) + vite build -> dist/
pnpm preview      # serve the production build
pnpm test         # run the Vitest suite once
pnpm lint         # eslint
pnpm format       # prettier --write .
```

Requires Node 22+ and pnpm 11+.

## Project structure

```text
src/
├── app/            # AppProviders, AppRouter, AppShell, ErrorBoundary, QueryClient
├── components/
│   ├── ui/         # shadcn/ui primitives (button, card, dialog, ...)
│   ├── layout/     # AppShell, SidebarNav, Topbar, nav-items
│   ├── shared/     # PageHeader, SectionCard, DataTable, DetailDrawer, StatePanel, EmptyState, KpiCard
│   ├── users/      # UsersTable
│   └── settings/   # SettingsForm
├── features/       # per-module context + data-access (auth, theme, users, billing, ...)
├── lib/            # http() fetch wrapper, cn(), rbac, notify
├── mocks/          # MSW handlers, browser worker, seed data
├── pages/          # route components (one per module + login + not-found)
├── test/           # Vitest setup, node MSW server, renderApp, tests
├── types/          # shared domain types
└── styles.css      # Tailwind v4 entry + theme CSS variables
```

Path alias: `@/` → `src/`. Always import via the alias.

## Theming

Themes are defined in `src/features/theme/theme-config.ts` and backed by CSS variable blocks in `src/styles.css` (`[data-theme="..."]`). To add a theme:

1. Add a variable set under `:root[data-theme="your-theme"]` in `styles.css`.
2. Register it in `themeDefinitions` with a `label`, `mode`, and three `preview` swatches.

## Role-based access control

- Add `roles?: AppRole[]` to a nav item in `src/components/layout/nav-items.ts` to restrict visibility.
- Wrap a protected route in `<RoleRoute roles={[...]}>` in `src/app/router.tsx` to redirect unauthorized roles to `/app/overview`.
- `canAccess(role, allowed)` (in `src/lib/rbac.ts`) is the single source of truth used by both the nav and the route guard.

> RBAC here is client-side and runs against the mock session. Enforcing real authorization still requires server-side checks when you connect a backend.

## Going to production

The template is backend-free by default. To point it at a real API:

1. Copy `.env.example` to `.env` (or `.env.local`) and set `VITE_API_BASE_URL` to your API origin, e.g. `https://api.example.com`.
2. Ensure your backend exposes the same `/api/*` paths the MSW handlers use (see `src/mocks/handlers.ts`).
3. Build and deploy the static SPA (`pnpm build` → `dist/`). In a production build the MSW worker is not started, so requests go straight to your backend.
4. Replace the mock `AuthProvider`/session model with real credential handling and add server-side authorization — the client RBAC is a UI convenience only.

## Contributing

- Commits follow [Conventional Commits](https://www.conventionalcommits.org/).
- A Husky pre-commit hook runs `lint-staged` (ESLint + Prettier) on changed files.
- PRs run the CI pipeline: typecheck, lint, tests, and build.
- See `AGENTS.md` for the agent-oriented development conventions and `ARCHITECTURE.md` for the full architectural reference.

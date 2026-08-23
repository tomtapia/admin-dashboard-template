## v0.4.0 (2026-08-23)

### Feat

- **a11y**: text alternatives for charts
- **a11y**: announce route changes and move focus to page heading
- **theme**: default to system color scheme when no preference stored
- **users**: profile drawer, resend invite and suspend access with undo
- **data-table**: keyboard-accessible rows, sortable columns and pagination
- **overview**: working period selector and chart-series filters
- **filters**: functional role chips, working exports and empty-state actions
- **users**: invite flow with mock endpoint and csv export utility
- **ui**: checkbox item for dropdown menus
- **layout**: wire search trigger, live notifications dropdown and unread badge; drop dead mail button
- **search**: add cmdk command palette with pages, themes and account actions
- **auth**: pending feedback on mock sign-in button
- **ui**: retryable error states across module pages
- **ui**: add alert dialog and confirm dialog primitives
- **ui**: add skeleton primitives for stable loading layouts

### Fix

- **i18n**: nest nav group labels so translations resolve
- **layout**: grouped scrollable mobile nav with working active states
- **theme**: raise muted-foreground contrast to wcag aa on all palettes
- **ui**: 44px touch targets for icon buttons on mobile
- **ui**: stable keys for static skeleton cells
- **settings**: inline validation, labelled switches and unsaved-changes guard
- **styles**: respect prefers-reduced-motion across animations

### Refactor

- **pages**: swap spinner panels for layout-stable skeletons

## v0.3.0 (2026-08-22)

### Feat

- **observability**: add error tracking and monitoring foundation
- **i18n**: add react-i18next with locale switcher and translated UI
- **auth**: add token refresh, session expiry, and 401 retry
- **tenancy**: add tenant context, switcher, and API scoping

## v0.2.1 (2026-08-22)

### Fix

- **deps**: upgrade dependencies and resolve deprecation warnings

## v0.2.0 (2026-08-22)

### Feat

- add sunset-ember and forest-deep theme presets
- enforce role-based access in nav and routes
- make api base url configurable for real backends
- add global and route-level error boundaries
- expand template with 7 SaaS modules (billing, analytics, team, notifications, transactions, integrations, support)

### Fix

- render card titles as h2 to preserve heading order
- configure pnpm v11 workspace so pnpm dev runs

### Refactor

- remove unused variables and quiet false-positive lint rules
- centralize mutation error toasts

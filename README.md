# OpenChainGuard Client

OpenChainGuard Client is a Vite + React dashboard for supervising AI-agent governance workflows. It combines a marketing and docs surface at `/` with an operator console under `/console` for monitoring agents, reviewing approvals, and managing policy controls.

## Tech Stack

- React 18 + TypeScript
- Vite (React SWC plugin)
- Tailwind CSS + shadcn/ui (Radix primitives)
- React Router
- TanStack Query
- Forms: React Hook Form + Zod
- Charts: Recharts; animations: Framer Motion; toasts: Sonner; theming: `next-themes`
- Vitest + Testing Library; Playwright is available as a dev dependency for E2E

## Getting Started

### Prerequisites

- Node.js and npm (LTS recommended)

### 1) Install dependencies

```bash
npm install
```

### 2) Run locally

```bash
npm run dev
```

The dev server uses Vite’s default URL (typically [http://localhost:5173](http://localhost:5173)).

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build |
| `npm run build:dev` | Build with Vite `development` mode |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |
| `npm run test` | Run unit tests once (Vitest) |
| `npm run test:watch` | Run Vitest in watch mode |

## Routes (high level)

- **Public:** `/` (landing), `/docs`, `/protocol-overview`, `/about`, `/contact`, `/privacy`, `/terms`
- **Console (app shell):** `/console` (home; includes agent directory), `/agent/:id`, `/policy`, `/approvals`, `/audit`, `/stats`, `/leaderboard`, `/profile`
- **Fallback:** unknown paths under the app layout resolve to the not-found page

## Project Structure

- `src/app` — providers, route composition (`routes.tsx`)
- `src/components/ui` — shadcn-style primitives
- `src/components/layout` — shell, sidebar, top nav
- `src/components/landing` — marketing landing sections
- `src/components/shared` — cross-feature widgets (e.g. status, risk gauge)
- `src/pages` — feature pages (`home`, `agent-detail`, `approval-queue`, `policy-editor`, etc.)
- `src/lib` — utilities (`utils.ts`) and mock data (`mockData.ts`)
- `src/hooks` — shared hooks
- `src/test` — Vitest setup and tests

## Notes

- Demo flows use mock data in `src/lib/mockData.ts`.
- Path alias: `@/` → `src/` (see `vite.config.ts`).
- The UI is built to work on desktop and smaller viewports.

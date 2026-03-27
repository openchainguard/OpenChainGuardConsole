# OpenChainGuard Client

OpenChainGuard Client is a Vite + React dashboard for supervising AI-agent governance workflows.
It provides a clean operator console for monitoring agents, reviewing approvals, and managing policy controls.

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS + shadcn/ui
- React Router
- TanStack Query
- Vitest + Testing Library

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Run locally

```bash
npm run dev
```

The app runs on Vite default local URL (typically `http://localhost:5173`).

## Available Scripts

- `npm run dev` - start Vite development server
- `npm run build` - build production assets
- `npm run preview` - preview production build locally
- `npm run lint` - run ESLint checks
- `npm run test` - run unit tests with Vitest

## Project Structure

- `src/app` - app bootstrap, providers, and route definitions
- `src/components` - shared UI primitives and layout components
- `src/pages` - feature-based pages (`agent-directory`, `agent-detail`, `approval-queue`, etc.)
- `src/lib` - mock data and shared utilities
- `src/test` - test setup and test files

## Notes

- The current UI uses mock data for demo flows.
- The dashboard is responsive across desktop and mobile layouts.

# Repository Guidelines

## Project Structure & Module Organization
The workspace is flat: every React component, hook, and style lives in `src/`. Organize features in folders such as `src/features/prompt-editor/PromptEditor.tsx`, stash shared media or JSON under `src/assets/`, and leave `src/main.tsx` as the only place that calls `createRoot`. Tests live in `src/__tests__/` or beside the component they cover, static assets stay in `public/`, builds write to `dist/`, and compiler/runtime knobs sit in `tsconfig*.json` plus `vite.config.ts`.

## Build, Test, and Development Commands
- `npm run dev` — launch Vite with hot reload on http://localhost:5173.
- `npm run build` — execute `tsc -b` then `vite build`, producing `dist/` assets.
- `npm run preview` — serve the built bundle locally for production parity.
- `npm run lint` — run ESLint with the React Hooks and TypeScript configs.

## Coding Style & Naming Conventions
Write TypeScript-first React 19 components with 2-space indentation, no trailing semicolons, and props typed near their usage. Components and contexts stay PascalCase (`PromptSidebar.tsx`), hooks/utilities use camelCase (`usePromptSync.ts`), and features should be decomposed so reusable logic lives in hooks while UI fragments become focused subcomponents. Styling relies on Tailwind CSS 4; keep utility classes in JSX, fall back to local CSS files only when necessary, and stick to the light black/white/gray palette with subtle shadow borders for elevation. When introducing new tokens, update the Tailwind config instead of hardcoding colors, and extend shared lint rules via `eslint.config.js` rather than scattering overrides.

## Testing Guidelines
Future work should add Vitest + React Testing Library specs mirroring component names (`PromptSidebar.test.tsx`) or living under `src/__tests__/<Feature>.test.tsx`, covering hook logic plus the primary UI states. Until a `test` script exists, run manual QA with `npm run dev` and document the exercised scenarios inside each pull request.

## Commit & Pull Request Guidelines
Adopt Conventional Commits (`feat: add generator presets`, `fix: debounce sheet export`) with subjects under 72 characters and present-tense bodies describing rationale plus commands run (`dev`, `build`, `lint`). Pull requests need a summary, linked issues, affected routes, visual evidence for UI changes, and a verification checklist, and they should ship only after CI passes; coordinate before force-pushing after review.

## Security & Configuration Tips
Store API keys or third-party tokens in `.env.local` with `VITE_` prefixes, mirror them in `.env.example`, and never commit private PDFs or secrets. Gate `jspdf` or `html2canvas` downloads behind explicit user actions and note new permissions inside the pull request template.

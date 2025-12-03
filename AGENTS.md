# Repository Guidelines

## Project Structure & Module Organization
The Vite workspace is flat: `src/` holds all React components, hooks, and styles, while static files that must ship untouched live in `public/` (e.g., `public/vite.svg`). `src/main.tsx` bootstraps the React tree and should be the only place that calls `createRoot`. Feature code should sit in dedicated folders in `src/` (`src/features/prompt-editor/PromptEditor.tsx`), and shared icons or JSON belong under `src/assets/`. Entry HTML is `index.html`, and build behaviour is defined by `vite.config.ts` with TypeScript options in `tsconfig.*.json`.

## Build, Test, and Development Commands
Install dependencies once with `npm install`. Use `npm run dev` for hot-reload development at `http://localhost:5173`. `npm run build` runs `tsc -b` and then `vite build`, producing `dist/`; run it before opening a pull request. `npm run preview` serves the built assets locally to mirror production. Lint staged files with `npm run lint` so ESLint catches TypeScript or hooks rule violations before CI.

## Coding Style & Naming Conventions
Write TypeScript first, with 2-space indentation and semicolon-free formatting to match existing files. Components and context providers use PascalCase filenames (`PromptSidebar.tsx`), hooks and helpers stay camelCase (`usePromptSync.ts`). Keep styles colocated (`App.css`, `index.css`) and prefer CSS custom properties over inline styles. Run ESLint before pushes and extend rules in `eslint.config.js` instead of scattering `eslint-disable` comments. Keep components pure and colocate one-off helper types with their component.

## Testing Guidelines
No automated tests exist yet, but new work should include Vitest + React Testing Library specs. Create `src/__tests__/<Feature>.test.tsx` or colocated `Component.test.tsx` files that mirror component names. When adding a test script, ensure hooks and UI states are both covered and document the command in `package.json`. Until Vitest is wired, perform manual QA through `npm run dev` and describe the exercised flows in the pull request.

## Commit & Pull Request Guidelines
The repo currently lacks history, so adopt Conventional Commits (`feat: add generator presets`, `fix: debounce sheet export`). Keep subject lines under 72 characters and write present-tense bodies describing rationale and testing. Every pull request needs a short summary, screenshots or clips for UI changes, affected routes, linked issues, and a checklist of commands run (dev, build, lint, future tests). Request review after CI is green and avoid force-pushing once review starts unless coordinated with the reviewer.

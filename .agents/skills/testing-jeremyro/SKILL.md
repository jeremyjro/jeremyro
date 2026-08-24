---
name: testing-jeremyro
description: How to run and end-to-end test the jeremyro Next.js site (public routes, no auth).
---

## Quick start

The jeremyro repo is a Next.js app in `/home/ubuntu/repos/jeremyro`.

1. Install dependencies: `npm install`
2. Start the dev server: `npm run dev` (uses port 3000)
3. Open `http://localhost:3000` in a browser
4. No login or secrets are required; public routes such as `/crosby` render without auth.

## Testing routes

- Copy/content changes live in `app/<route>/page.tsx`.
- Verify the server-rendered HTML with `curl -s http://localhost:3000/<route>`.
- Use the browser's find (`Ctrl+F`) to locate and highlight changed strings on the rendered page.

## Testing the hero ASCII-reveal hover text

- The hero text is rendered by `AsciiRevealText` inside `.heroCenter` (which has `pointer-events: none`), so the text span itself has `pointer-events: auto`.
- The span is small and centered; the tool coordinate space (1024x768) is scaled to the actual display, so eyeballing the cursor position is unreliable.
- Calibrate by running `document.querySelector('span').getBoundingClientRect()` in the console, then convert client coordinates to tool coordinates with the live display scale. As a quick reference on a 1600x1200 display, the text center is near tool coordinate `(512, 400)` (the span is small, so calibrate per session).
- If a single `mouse_move` to the span does not trigger `mouseenter`, approach from just above the span (e.g., `(512, 200)` → `(512, 400)`) so the cursor visibly crosses the element boundary.

## Devin Secrets Needed

None for public routes.

---
name: testing-jeremyro
description: How to run and end-to-end test the jeremyro Next.js site (public routes, no auth; admin-gated components via probe route).
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

## Admin-gated components (TipTap editor, Excalidraw canvas)

- `/admin` renders a Supabase email/password login (app/admin/page.tsx). The
  TipTap `Editor` and `ExcalidrawCanvas` only mount after a real sign-in, and no
  test credentials exist in the Devin environment.
- Without a `.env.local`, `getSupabaseBrowser()` throws ("supabaseUrl is
  required"). Writing `.env.local` with *any* well-formed
  `NEXT_PUBLIC_SUPABASE_URL`/`NEXT_PUBLIC_SUPABASE_ANON_KEY` makes the login
  form render; submit then shows a fetch/invalid-credentials error — enough to
  prove the form works. Turbopack picks up the env file automatically
  ("Reload env") — no restart needed.
- To exercise the components themselves, create a temporary probe route
  (e.g. `app/deps-probe/page.tsx`) that mounts `../admin/editor` (needs
  `value`/`onChange` props) and `../admin/excalidraw-canvas` (self-contained,
  localStorage) directly. Delete it afterward.

## Exercising the lodash-es dep tree

- The excalidraw "Mermaid to Excalidraw" feature (toolbar → "More tools" →
  "Mermaid to Excalidraw") runs @mermaid-js/parser → langium → chevrotain →
  lodash-es at runtime. The dialog renders a live preview — if the preview
  draws, the whole lodash-es path works. Click "Insert" to place the diagram on
  the canvas as end-to-end proof.

## Browser navigation gotchas on this machine

- The Chrome omnibox inline-autocompletes typed prefixes to the most-visited
  URL, so typing `localhost:3000/` can silently navigate to e.g.
  `localhost:3000/admin`. Type full unique paths, or append `?v=N` to force the
  typed URL to win.
- Do NOT use `127.0.0.1:3000` to dodge this — Next.js blocks dev resources
  (`/_next/hmr`) cross-origin, so client chunks never hydrate and pages render
  without interactive elements (0 canvases/videos). Always use
  `localhost:3000`.
- Click directly on the URL text in the omnibox to focus+select it; clicks in
  empty omnibox regions are unreliable.

## Testing the hero ASCII-reveal hover text

- The hero text is rendered by `AsciiRevealText` inside `.heroCenter` (which has `pointer-events: none`), so the text span itself has `pointer-events: auto`.
- The span is small and centered; the tool coordinate space (1024x768) is scaled to the actual display, so eyeballing the cursor position is unreliable.
- Calibrate by running `document.querySelector('span').getBoundingClientRect()` in the console, then convert client coordinates to tool coordinates with the live display scale. As a quick reference on a 1600x1200 display, the text center is near tool coordinate `(512, 400)` (the span is small, so calibrate per session).
- If a single `mouse_move` to the span does not trigger `mouseenter`, approach from just above the span (e.g., `(512, 200)` → `(512, 400)`) so the cursor visibly crosses the element boundary.

## Dev-server artifacts to clean up after testing

- Next 16 `next dev` rewrites `next-env.d.ts` (build paths `.next/types` →
  dev paths `.next/dev/types`) and generates `AGENTS.md`/`CLAUDE.md` in the repo
  root. `git checkout next-env.d.ts && rm -f AGENTS.md CLAUDE.md` restores a
  clean tree.
- Browser console errors appear in the dev-server log as `[browser] ...` lines —
  `grep '\[browser\]'` on the dev log is a quick console-error sweep.

## Devin Secrets Needed

None for public routes. `/admin` sign-in needs real Supabase user credentials
(not available); use the probe-route technique above for the components behind it.

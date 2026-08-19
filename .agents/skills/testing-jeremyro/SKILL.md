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

## Devin Secrets Needed

None for public routes.

---
name: jeremyro-frontend-testing
description: Local build, serve, and screenshot workflow for the jeremyjro/jeremyro Next.js portfolio site.
---

# jeremyro Frontend Testing

## How to run locally
1. Install dependencies: `npm install` (uses `patch-package` in `postinstall`).
2. Build the app: `npm run build`.
3. Start the production server: `nohup npm run start > /tmp/server.log 2>&1 &` (defaults to port 3000).
4. Verify it responds: `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/` should return `200`.

## Important build hygiene
- Next.js/Turbopack in this repo does not appear to remove stale `.next` artifacts between builds. If you switch CSS or other static assets, always `rm -rf .next` before `npm run build` to avoid stale chunks being served.
- The browser may cache hashed `_next/static` CSS/JS aggressively; when capturing screenshots or computed styles via CDP, disable the HTTP cache with `Network.setCacheDisabled({cacheDisabled: true})`.

## Automated screenshots / computed-style measurements
- A Chrome CDP endpoint is exposed at `http://localhost:29229`.
- Create a new target with `PUT http://localhost:29229/json/new?url=<encoded-url>` and connect with `chrome-remote-interface` (or Puppeteer with `browserWSEndpoint`).
- Use `Emulation.setDeviceMetricsOverride` to set exact viewport sizes. The hero `.heroSaying` element is the `<p>` containing `AVDE·SEMEL` (see `app/page.tsx` and `app/page.module.css`).
- Example measurement script (install `chrome-remote-interface` first):

```js
// scripts/cdp-screenshot.mjs
import CDP from 'chrome-remote-interface';
import http from 'http';
import fs from 'fs';

const args = process.argv.slice(2);
const url = args[0] || 'http://localhost:3000/';
const width = parseInt(args[1] || '1280');
const height = parseInt(args[2] || '720');
const mobile = args[3] === 'true';
const out = args[4] || '/tmp/cdp-screenshot.png';

function newTarget(url) {
  return new Promise((resolve, reject) => {
    const req = http.request({host:'localhost', port:29229, path:`/json/new?${encodeURIComponent(url)}`, method:'PUT'}, (res) => {
      let data='';
      res.on('data', c=>data+=c);
      res.on('end', ()=>{
        const obj = JSON.parse(data);
        resolve(obj.webSocketDebuggerUrl);
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function run() {
  const ws = await newTarget('about:blank');
  const client = await CDP({host:'localhost', port:29229, target: ws});
  const {Page, Runtime, Emulation, Network} = client;
  await Page.enable();
  await Runtime.enable();
  await Network.enable();
  await Network.setCacheDisabled({cacheDisabled: true});
  await Emulation.setDeviceMetricsOverride({width, height, deviceScaleFactor: mobile?2:1, mobile, fitWindow:false});
  await Page.navigate({url});
  await Page.loadEventFired();
  await new Promise(r=>setTimeout(r,2500));
  const {result} = await Runtime.evaluate({
    expression: `(()=>{
      const el = [...document.querySelectorAll('p')].find(e=>e.textContent.includes('AVDE·SEMEL'));
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const s = getComputedStyle(el);
      return {
        text: el.textContent,
        fontSize: s.fontSize,
        clientWidth: document.documentElement.clientWidth,
        innerWidth: window.innerWidth,
        rect: {x:rect.x, y:rect.y, width:rect.width, height:rect.height, top:rect.top, right:rect.right, bottom:rect.bottom, left:rect.left}
      };
    })()`,
    returnByValue: true
  });
  console.log('MEASUREMENT', JSON.stringify(result.value));
  const {data} = await Page.captureScreenshot({format:'png'});
  fs.writeFileSync(out, Buffer.from(data,'base64'));
  console.log('SCREENSHOT', out);
  await client.close();
}
run().catch(err=>{console.error(err); process.exit(1);});
```

## Useful paths
- Hero text CSS: `app/page.module.css` (`.heroSaying` desktop rule and `@media (max-width: 640px)` mobile rule).
- Hero markup: `app/page.tsx`.

## Devin Secrets Needed
None for the static homepage. Other routes (e.g. `/essays`, `/admin`) may require `NIGEL_DATABASE_URL` or Supabase credentials if they load data at runtime.

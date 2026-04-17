# svelte-hello-world-app

Minimal SvelteKit app compiled to static output via `adapter-static`, built by Node.js and served as static files by Zerops Nginx with SPA fallback.

## Zerops service facts

- HTTP port: `5173` (dev server) / `80` (prod nginx)
- Siblings: —
- Runtime base: `nodejs@22` (dev) / `static` (prod)

## Zerops dev

`setup: dev` idles on `zsc noop --silent`; the agent starts the dev server.

- Dev command: `npm run dev`
- In-container rebuild without deploy: `npm run build`

**All platform operations (start/stop/status/logs of the dev server, deploy, env / scaling / storage / domains) go through the Zerops development workflow via `zcp` MCP tools. Don't shell out to `zcli`.**

## Notes

- Build-time env vars only: `PUBLIC_*` vars are baked into static output via prod `build.envVariables`. There is no runtime process — setting vars under `run.envVariables` for prod has no effect.
- Prod deploy strips the `build/` prefix so SvelteKit's output becomes the Nginx document root.

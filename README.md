# Svelte Hello World Recipe App

<!-- #ZEROPS_EXTRACT_START:intro# -->
Minimal [SvelteKit](https://kit.svelte.dev) application deployed as static output on [Zerops](https://zerops.io), demonstrating build-time environment variable injection via the `PUBLIC_*` convention. Used within [Svelte Hello World recipe](https://app.zerops.io/recipes/svelte-hello-world) for [Zerops](https://zerops.io) platform.
<!-- #ZEROPS_EXTRACT_END:intro# -->

⬇️ **Full recipe page and deploy with one-click**

[![Deploy on Zerops](https://github.com/zeropsio/recipe-shared-assets/blob/main/deploy-button/light/deploy-button.svg)](https://app.zerops.io/recipes/svelte-hello-world?environment=small-production)

![Svelte cover](https://github.com/zeropsio/recipe-shared-assets/blob/main/covers/svg/cover-svelte.svg)

## Integration Guide

<!-- #ZEROPS_EXTRACT_START:integration-guide# -->

### 1. Adding `zerops.yaml`

Place this file at the root of your repository. It tells Zerops how to build, deploy, and run your SvelteKit application.

```yaml
zerops:
  # 'prod' builds optimized static assets served by Nginx.
  # 'dev' deploys full source for live development via SSH.
  - setup: prod
    build:
      # Build with Node.js (npm/npx), serve with Nginx.
      # The build container compiles SvelteKit into static
      # HTML/CSS/JS — Node.js is NOT present at runtime.
      base: nodejs@22

      buildCommands:
        - npm ci
        - npm run build

      deployFiles:
        # Strip 'build/' prefix — contents become the Nginx root.
        # 'build/index.html' becomes '/index.html'.
        - build/~

      cache:
        - node_modules

      envVariables:
        # Baked into static output at build time — no runtime
        # process reads env vars after Nginx starts serving files.
        # SvelteKit exposes PUBLIC_* vars via $env/static/public.
        # Use the RUNTIME_ prefix to forward runtime env vars here:
        # e.g. set APP_ENV at runtime → read as RUNTIME_APP_ENV.
        PUBLIC_APP_ENV: production

    run:
      # Nginx serves the compiled static assets.
      # Built-in SPA fallback: unmatched routes → index.html.
      # No routing config needed for standard SPA deployments.
      base: static

  - setup: dev
    build:
      base: nodejs@22
      os: ubuntu

      buildCommands:
        # npm install (not npm ci) — dev may lack a lock file.
        - npm install

      # Deploy full source so the developer has everything via SSH.
      deployFiles: ./

      cache:
        - node_modules

    run:
      # Node.js runtime so the developer can run 'npm run dev'
      # or other SvelteKit CLI tools via SSH.
      base: nodejs@22
      os: ubuntu

      # Keep container alive — developer starts dev server manually
      # via SSH with 'npm run dev' (binds to 0.0.0.0 for access).
      start: zsc noop --silent
```

### 2. SvelteKit static adapter

Install `@sveltejs/adapter-static` and configure `svelte.config.js`:

```js
import adapter from '@sveltejs/adapter-static';

const config = {
  kit: {
    adapter: adapter({
      fallback: 'index.html' // SPA fallback for client-side routing
    })
  }
};
export default config;
```

Enable prerendering in your root layout:

```ts
// src/routes/+layout.ts
export const prerender = true;
```

### 3. Build-time environment variables

SvelteKit's `$env/static/public` module exposes `PUBLIC_*` variables baked in at build time. Set them in `zerops.yaml` under `build.envVariables` — **not** `run.envVariables`, since there is no runtime process in a static deployment.

```ts
import { PUBLIC_APP_ENV } from '$env/static/public';
```

<!-- #ZEROPS_EXTRACT_END:integration-guide# -->

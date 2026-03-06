import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      // Serve index.html for any route not matched by a static file.
      // Zerops Static has built-in SPA fallback — this aligns with it.
      fallback: 'index.html'
    })
  }
};

export default config;

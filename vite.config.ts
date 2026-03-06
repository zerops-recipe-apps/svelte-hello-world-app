import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  define: {
    // Inject build timestamp as a global constant at compile time.
    // New value on every build — proves the rebuild pipeline works.
    __BUILD_TIME__: JSON.stringify(new Date().toISOString())
  }
});

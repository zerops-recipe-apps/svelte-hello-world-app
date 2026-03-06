<script lang="ts">
  // PUBLIC_* variables are baked into the static output at build
  // time by SvelteKit — there is no runtime process to read them.
  // Set PUBLIC_APP_ENV in zerops.yaml build.envVariables.
  import { PUBLIC_APP_ENV } from '$env/static/public';

  const env = PUBLIC_APP_ENV || 'development';
  const buildTime = new Date(__BUILD_TIME__).toUTCString();
</script>

<svelte:head>
  <title>Svelte Hello World — Zerops</title>
</svelte:head>

<main>
  <header>
    <h1>Hello from Zerops!</h1>
    <p class="subtitle">SvelteKit · Static Deployment</p>
  </header>

  <section class="cards">
    <div class="card">
      <span class="label">Framework</span>
      <span class="value">SvelteKit</span>
    </div>
    <div class="card">
      <span class="label">Environment</span>
      <span class="value">{env}</span>
    </div>
    <div class="card">
      <span class="label">Built at</span>
      <span class="value">{buildTime}</span>
    </div>
  </section>
</main>

<style>
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: #0f0f0f;
    color: #e0e0e0;
  }

  main {
    max-width: 600px;
    margin: 5rem auto;
    padding: 0 1.5rem;
  }

  header {
    margin-bottom: 2.5rem;
  }

  h1 {
    font-size: 2.5rem;
    margin: 0 0 0.5rem;
    color: #ff3e00;
  }

  .subtitle {
    margin: 0;
    color: #888;
    font-size: 1rem;
  }

  .cards {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .card {
    background: #1a1a1a;
    border: 1px solid #2a2a2a;
    border-radius: 8px;
    padding: 0.875rem 1.25rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .label {
    color: #666;
    font-size: 0.875rem;
  }

  .value {
    font-weight: 600;
    color: #ff3e00;
    font-size: 0.9rem;
  }
</style>

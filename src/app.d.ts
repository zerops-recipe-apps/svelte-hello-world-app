// See https://svelte.dev/docs/kit/types#app.d.ts
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }

  // Injected by vite.config.ts define — build timestamp constant.
  const __BUILD_TIME__: string;
}

export {};

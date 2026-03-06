// Disable SSR — adapter-static serves this app as a SPA.
// Zerops Static has built-in SPA fallback (unmatched routes
// → index.html), which pairs with adapter-static's fallback option.
export const ssr = false;

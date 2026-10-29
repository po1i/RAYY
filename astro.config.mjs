import { defineConfig } from 'astro/config';

// Until revealayouthfulyou.com points at GitHub Pages the site is served from
// https://po1i.github.io/RAYY/. The deploy workflow passes the real origin and
// base path; switch SITE_URL / SITE_BASE there once the custom domain is live.
const site = process.env.SITE_URL ?? 'https://revealayouthfulyou.com';
const base = process.env.SITE_BASE ?? '/';

export default defineConfig({
  site,
  base,
  output: 'static',
  // Legacy WordPress URLs end in a slash; keep them identical so existing
  // search rankings and bookmarks land on the new pages.
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
});

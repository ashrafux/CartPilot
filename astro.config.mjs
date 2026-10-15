// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://cartpilot.ai',
  output: 'static',

  // Same URLs as the live site: /pricing/, /features/ …
  trailingSlash: 'always',

  build: {
    // Each route becomes <route>/index.html, so any static host serves clean URLs.
    format: 'directory',
    // Keep the page CSS in <style> tags exactly where the pages put them.
    inlineStylesheets: 'never'
  },

  // Pages and assets are hand-tuned already; don't let Astro rewrite markup.
  compressHTML: false,

  devToolbar: { enabled: false },
  integrations: [sitemap()]
});
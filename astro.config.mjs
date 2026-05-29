// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
// Mantén esta URL sincronizada con src/config/site.ts
export default defineConfig({
  site: 'https://tudominio.com',
  integrations: [mdx(), sitemap()],
});
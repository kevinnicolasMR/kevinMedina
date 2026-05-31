// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { loadPublishedArticleSitemapEntries } from './scripts/load-article-sitemap-meta.mjs';
import { buildSitemapMetaByPath, normalizeSitemapPath } from './src/lib/sitemap-meta.ts';

// Mantén esta URL sincronizada con src/config/site.ts (sin barra final)
const SITE = 'https://kevinmedinarobles.com';

const articleEntries = loadPublishedArticleSitemapEntries();
const sitemapMetaByPath = buildSitemapMetaByPath(articleEntries);

/** @param {import('@astrojs/sitemap').SitemapItem} item */
function serializeSitemapItem(item) {
  const pathname = normalizeSitemapPath(new URL(item.url).pathname);
  const meta = sitemapMetaByPath.get(pathname);

  if (meta) {
    return {
      url: item.url,
      lastmod: meta.lastmod,
      changefreq: meta.changefreq,
      priority: meta.priority,
    };
  }

  return {
    url: item.url,
    changefreq: 'monthly',
    priority: 0.7,
  };
}

export default defineConfig({
  site: SITE,
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/draft/'),
      serialize: serializeSitemapItem,
    }),
  ],
});

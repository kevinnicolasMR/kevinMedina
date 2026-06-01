export type SitemapPageMeta = {
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
};

export type ArticleSitemapEntry = {
  path: string;
  lastmod: string;
};

/** Normaliza rutas al formato con barra final (como las genera Astro). */
export function normalizeSitemapPath(pathname: string): string {
  if (pathname === '/') return '/';
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

/**
 * Construye metadatos del sitemap para todas las URLs públicas del sitio.
 */
export function buildSitemapMetaByPath(
  articles: ArticleSitemapEntry[] = [],
): Map<string, SitemapPageMeta> {
  const meta = new Map<string, SitemapPageMeta>();

  meta.set('/', {
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: 1,
  });

  meta.set('/sql/', {
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: 0.9,
  });

  meta.set('/carrera/', {
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: 0.9,
  });

  meta.set('/java/', {
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: 0.9,
  });

  const pillarLatestMod = new Map<string, Date>();

  for (const article of articles) {
    const path = normalizeSitemapPath(article.path);
    const modified = new Date(article.lastmod);
    const pillar = path.split('/').filter(Boolean)[0];

    if (pillar) {
      const current = pillarLatestMod.get(pillar);
      if (!current || modified > current) {
        pillarLatestMod.set(pillar, modified);
      }
    }

    meta.set(path, {
      lastmod: article.lastmod,
      changefreq: 'monthly',
      priority: 0.8,
    });
  }

  for (const [pillar, modified] of pillarLatestMod) {
    meta.set(`/${pillar}/`, {
      lastmod: modified.toISOString(),
      changefreq: 'weekly',
      priority: 0.9,
    });
  }

  return meta;
}

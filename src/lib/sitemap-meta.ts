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

  let latestArticleMod = new Date(0);

  for (const article of articles) {
    const path = normalizeSitemapPath(article.path);
    const modified = new Date(article.lastmod);

    if (modified > latestArticleMod) {
      latestArticleMod = modified;
    }

    meta.set(path, {
      lastmod: article.lastmod,
      changefreq: 'monthly',
      priority: 0.8,
    });
  }

  if (latestArticleMod.getTime() > 0) {
    const pillarLastmod = latestArticleMod.toISOString();
    meta.set('/sql/', {
      lastmod: pillarLastmod,
      changefreq: 'weekly',
      priority: 0.9,
    });
    meta.set('/carrera/', {
      lastmod: pillarLastmod,
      changefreq: 'weekly',
      priority: 0.9,
    });
  }

  return meta;
}

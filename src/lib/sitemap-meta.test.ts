import { describe, expect, it } from 'vitest';
import { buildSitemapMetaByPath, normalizeSitemapPath } from './sitemap-meta';

describe('normalizeSitemapPath', () => {
  it('keeps root as slash only', () => {
    expect(normalizeSitemapPath('/')).toBe('/');
  });

  it('adds trailing slash to paths', () => {
    expect(normalizeSitemapPath('/sql/instalando-sql-server-management-2026')).toBe(
      '/sql/instalando-sql-server-management-2026/',
    );
  });
});

describe('buildSitemapMetaByPath', () => {
  it('includes static pages and articles', () => {
    const meta = buildSitemapMetaByPath([
      {
        path: '/sql/instalando-sql-server-management-2026/',
        lastmod: '2026-05-29T00:00:00.000Z',
      },
    ]);

    expect(meta.get('/')?.priority).toBe(1);
    expect(meta.get('/sql/')?.priority).toBe(0.9);
    expect(meta.get('/sql/instalando-sql-server-management-2026/')?.priority).toBe(0.8);
  });
});

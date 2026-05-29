import { describe, expect, it } from 'vitest';
import { getRelatedArticles, type ArticleLike } from './related-articles';
import { articlePath, absoluteUrl } from './urls';
import { getArticleThumbnail } from './articles';
import {
  buildArticleSchema,
  buildVideoObjectSchema,
  buildBreadcrumbSchema,
} from './schema';

function createArticle(
  overrides: Partial<ArticleLike['data']> = {},
): ArticleLike {
  return {
    data: {
      title: 'Artículo de prueba',
      description: 'Descripción de prueba',
      pillar: 'sql',
      slug: 'articulo-prueba',
      publishedDate: new Date('2026-05-29'),
      keywords: ['sql'],
      relatedSlugs: [],
      draft: false,
      ...overrides,
    },
  };
}

describe('urls', () => {
  it('builds article paths', () => {
    expect(articlePath('sql', 'mi-articulo')).toBe('/sql/mi-articulo');
  });

  it('builds absolute URLs', () => {
    expect(absoluteUrl('/sql')).toBe('https://tudominio.com/sql');
  });
});

describe('related articles', () => {
  it('returns related articles by slug', () => {
    const current = createArticle({ slug: 'actual', relatedSlugs: ['otro'] });
    const related = createArticle({ slug: 'otro', title: 'Otro artículo' });
    const all = [current, related];

    const result = getRelatedArticles(current, all);
    expect(result).toHaveLength(1);
    expect(result[0]?.data.slug).toBe('otro');
  });

  it('falls back to same pillar articles', () => {
    const current = createArticle({ slug: 'actual' });
    const samePillar = createArticle({ slug: 'vecino', title: 'Vecino' });
    const otherPillar = createArticle({
      slug: 'python',
      pillar: 'python',
    });

    const result = getRelatedArticles(current, [current, samePillar, otherPillar]);
    expect(result).toHaveLength(1);
    expect(result[0]?.data.slug).toBe('vecino');
  });
});

describe('article thumbnails', () => {
  it('uses cover image when provided', () => {
    const article = createArticle({ coverImage: '/images/custom.jpg' });
    expect(getArticleThumbnail(article)).toBe('/images/custom.jpg');
  });

  it('uses youtube thumbnail when video id exists', () => {
    const article = createArticle({ youtubeVideoId: 'abc123' });
    expect(getArticleThumbnail(article)).toContain('abc123');
  });

  it('falls back to placeholder', () => {
    const article = createArticle();
    expect(getArticleThumbnail(article)).toBe('/images/video-placeholder.svg');
  });
});

describe('schema', () => {
  it('builds breadcrumb schema', () => {
    const schema = buildBreadcrumbSchema([
      { label: 'Inicio', href: '/' },
      { label: 'SQL', href: '/sql' },
    ]);

    expect(schema['@type']).toBe('BreadcrumbList');
    expect(schema.itemListElement).toHaveLength(2);
  });

  it('builds article schema', () => {
    const article = createArticle();
    const schema = buildArticleSchema(article, '/sql/articulo-prueba');

    expect(schema['@type']).toBe('Article');
    expect(schema.headline).toBe('Artículo de prueba');
  });

  it('builds video schema when video id exists', () => {
    const article = createArticle({ youtubeVideoId: 'abc123' });
    const schema = buildVideoObjectSchema(article, '/sql/articulo-prueba');

    expect(schema?.['@type']).toBe('VideoObject');
    expect(schema?.embedUrl).toContain('abc123');
  });

  it('skips video schema without video id', () => {
    const article = createArticle();
    expect(buildVideoObjectSchema(article, '/sql/articulo-prueba')).toBeNull();
  });
});

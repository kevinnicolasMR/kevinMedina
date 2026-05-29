import type { ArticleLike } from './related-articles';
import { site } from '../config/site';
import { absoluteUrl, articlePath } from './urls';

interface BreadcrumbItem {
  label: string;
  href: string;
}

export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    description: site.description,
    url: site.url,
    inLanguage: site.lang,
    publisher: {
      '@type': 'Person',
      name: site.author.name,
      url: site.author.url,
    },
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  };
}

export function buildArticleSchema(
  article: ArticleLike,
  canonicalPath: string,
) {
  const url = absoluteUrl(canonicalPath);

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.data.title,
    description: article.data.description,
    datePublished: article.data.publishedDate.toISOString(),
    dateModified: (article.data.updatedDate ?? article.data.publishedDate).toISOString(),
    author: {
      '@type': 'Person',
      name: site.author.name,
      url: site.author.url,
    },
    publisher: {
      '@type': 'Person',
      name: site.author.name,
      url: site.author.url,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    url,
    keywords: article.data.keywords.join(', '),
    inLanguage: site.lang,
  };
}

export function buildVideoObjectSchema(
  article: ArticleLike,
  canonicalPath: string,
) {
  const videoId = article.data.youtubeVideoId;
  if (!videoId) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: article.data.title,
    description: article.data.description,
    uploadDate: article.data.publishedDate.toISOString(),
    thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
    contentUrl: `https://www.youtube.com/watch?v=${videoId}`,
    url: absoluteUrl(canonicalPath),
    publisher: {
      '@type': 'Person',
      name: site.author.name,
      url: site.author.url,
    },
  };
}

export function buildVideoObjectSchemaFromEmbed(
  videoId: string,
  title: string,
  description: string,
  pagePath: string,
  uploadDate?: Date,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: title,
    description,
    uploadDate: uploadDate?.toISOString(),
    thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
    contentUrl: `https://www.youtube.com/watch?v=${videoId}`,
    url: absoluteUrl(pagePath),
    publisher: {
      '@type': 'Person',
      name: site.author.name,
      url: site.author.url,
    },
  };
}

export function buildArticleBreadcrumbs(article: ArticleLike): BreadcrumbItem[] {
  const pillar = article.data.pillar;
  const pillarLabel = pillar.toUpperCase();

  return [
    { label: 'Inicio', href: '/' },
    { label: pillarLabel, href: `/${pillar}` },
    {
      label: article.data.title,
      href: articlePath(pillar, article.data.slug),
    },
  ];
}

import { getCollection, type CollectionEntry } from 'astro:content';
import { articlePath } from './urls';
import { getRelatedArticles } from './related-articles';
import type { ArticleLike } from './related-articles';

export type ArticleEntry = CollectionEntry<'articles'>;

export async function getPublishedArticles(): Promise<ArticleEntry[]> {
  const articles = await getCollection('articles');
  return articles
    .filter((article) => !article.data.draft)
    .sort(
      (a, b) =>
        b.data.publishedDate.getTime() - a.data.publishedDate.getTime(),
    );
}

export async function getArticlesByPillar(
  pillar: string,
): Promise<ArticleEntry[]> {
  const articles = await getPublishedArticles();
  return articles.filter((article) => article.data.pillar === pillar);
}

export { getRelatedArticles };

export function getArticleUrl(article: ArticleEntry): string {
  return articlePath(article.data.pillar, article.data.slug);
}

export function getArticleThumbnail(article: ArticleLike): string {
  if (article.data.coverImage) {
    return article.data.coverImage;
  }

  const videoId = article.data.youtubeVideoId;
  if (videoId) {
    return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  }

  return '/images/video-placeholder.svg';
}

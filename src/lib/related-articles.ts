export interface ArticleData {
  title: string;
  description: string;
  pillar: string;
  slug: string;
  publishedDate: Date;
  updatedDate?: Date;
  keywords: string[];
  youtubeVideoId?: string;
  coverImage?: string;
  relatedSlugs: string[];
  draft: boolean;
}

export interface ArticleLike {
  data: ArticleData;
}

export function getRelatedArticles<T extends ArticleLike>(
  article: T,
  allArticles: T[],
): T[] {
  const { relatedSlugs, pillar, slug } = article.data;

  if (relatedSlugs.length > 0) {
    return relatedSlugs
      .map((relatedSlug) =>
        allArticles.find((item) => item.data.slug === relatedSlug),
      )
      .filter((item): item is T => Boolean(item))
      .filter((item) => item.data.slug !== slug);
  }

  return allArticles
    .filter(
      (item) => item.data.pillar === pillar && item.data.slug !== slug,
    )
    .slice(0, 3);
}

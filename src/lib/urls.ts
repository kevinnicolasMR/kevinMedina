import { site } from '../config/site';

export function articlePath(pillar: string, slug: string): string {
  return `/${pillar}/${slug}`;
}

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return new URL(normalized, site.url).href;
}

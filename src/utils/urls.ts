import { site } from '../config/site';

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return new URL(normalized, site.url).toString();
}

export function articlePath(pillar: string, slug: string): string {
  return `/${pillar}/${slug}`;
}

export function pillarPath(pillar: string): string {
  return `/${pillar}`;
}

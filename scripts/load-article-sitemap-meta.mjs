import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ARTICLES_DIR = join(__dirname, '../src/content/articles');

/**
 * @param {string} frontmatter
 * @param {string} key
 */
function readYamlValue(frontmatter, key) {
  const match = frontmatter.match(
    new RegExp(`^${key}:\\s*['"]?([^'"\n]+)['"]?\\s*$`, 'm'),
  );
  return match?.[1]?.trim() ?? null;
}

/**
 * @returns {{ path: string, lastmod: string }[]}
 */
export function loadPublishedArticleSitemapEntries() {
  let files = [];

  try {
    files = readdirSync(ARTICLES_DIR).filter((name) => /\.(md|mdx)$/i.test(name));
  } catch (error) {
    console.warn('Sitemap: no se encontró la carpeta de artículos.', error);
    return [];
  }

  /** @type {{ path: string, lastmod: string }[]} */
  const entries = [];

  for (const file of files) {
    const raw = readFileSync(join(ARTICLES_DIR, file), 'utf8');
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);

    if (!match) continue;

    const frontmatter = match[1];

    if (/^draft:\s*true\s*$/m.test(frontmatter)) continue;

    const slug = readYamlValue(frontmatter, 'slug');
    const pillar = readYamlValue(frontmatter, 'pillar');

    if (!slug || !pillar) continue;

    const published = readYamlValue(frontmatter, 'publishedDate');
    const updated = readYamlValue(frontmatter, 'updatedDate');
    const lastmodSource = updated ?? published;

    const lastmod = lastmodSource
      ? new Date(lastmodSource).toISOString()
      : new Date().toISOString();

    const path = `/${pillar}/${slug}/`;
    entries.push({ path, lastmod });
  }

  return entries;
}

import type { Article, ArticleTag } from '../types';

const DATE_FORMATTER = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
});

/**
 * Format a date string to a localized format
 * @param dateString - The date string to format
 * @returns The formatted date string
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return DATE_FORMATTER.format(date);
}

const ORDERED_TAGS = ['crypto', 'defi', 'bitcoin', 'ethereum', 'solana'] as const;
type OrderedTag = (typeof ORDERED_TAGS)[number];
const TAG_ORDER = new Map(ORDERED_TAGS.map((tag, index) => [tag, index]));

/**
 * Sort tags in a predefined order
 * @param tags - The array of tags to sort
 * @returns The sorted array of tags
 */
export function sortTags(tags: readonly ArticleTag[]): ArticleTag[] {
  if (!tags.length) return [];

  const orderedTags: ArticleTag[] = [];
  const remainingTags: ArticleTag[] = [];

  for (const tag of tags) {
    if (TAG_ORDER.has(tag as OrderedTag)) {
      orderedTags.push(tag);
    } else {
      remainingTags.push(tag);
    }
  }

  orderedTags.sort(
    (a, b) => (TAG_ORDER.get(a as OrderedTag) ?? 0) - (TAG_ORDER.get(b as OrderedTag) ?? 0)
  );
  remainingTags.sort();

  return [...orderedTags, ...remainingTags];
}

export function filterArticlesByCategory(
  articles: readonly Article[],
  category: string | null
): Article[] {
  if (!category) return [...articles];
  return articles.filter((article) => article.category === category);
}

export function sortArticlesByDate(articles: readonly Article[]): Article[] {
  return [...articles].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

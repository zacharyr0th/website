/** Core article types and configurations */

/** Image metadata for articles */
export interface ArticleImage {
  readonly src: string;
  readonly alt: string;
}

/** Allowed categories and tags */
export const CATEGORIES = ['technology', 'finance', 'music'] as const;
export const TAGS = [
  'crypto',
  'aptos',
  'solana',
  'sui',
  'bitcoin',
  'ethereum',
  'technology',
  'finance',
  'defi',
  'kernels',
  'theory'
] as const;

/** Core configuration for article management */
export const ARTICLE_CONFIG = {
  directory: 'public/articles',
  limits: {
    title: 100,
    description: 200,
  },
  cache: {
    revalidate: 5 * 60 * 1000, // 5 minutes
    staleWhileRevalidate: 24 * 60 * 60 * 1000, // 24 hours
  },
  pagination: {
    pageSize: 100,
    featuredCount: 3,
  },
} as const;

export type ArticleCategory = (typeof CATEGORIES)[number];
export type ArticleTag = (typeof TAGS)[number];

/** Frontmatter metadata for articles */
export interface ArticleFrontmatter {
  readonly title: string;
  readonly date: string;
  readonly description: string;
  readonly category: ArticleCategory | null;
  readonly tags: readonly ArticleTag[];
  readonly image: ArticleImage | null;
  readonly featured: boolean;
  readonly draft: boolean;
  readonly takeaways: readonly string[] | null;
}

/** Complete article data structure */
export interface Article {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly content: string;
  readonly link: string;
  readonly frontmatter: ArticleFrontmatter;
  readonly description: string;
  readonly date: string;
  readonly category: ArticleCategory | null;
  readonly tags: readonly ArticleTag[];
  readonly image: ArticleImage | null;
  readonly takeaways: readonly string[] | null;
}

/** Raw frontmatter before processing */
export interface RawFrontmatter {
  readonly title: string;
  readonly date?: string;
  readonly description?: string;
  readonly subtitle?: string;
  readonly category?: string;
  readonly tags?: readonly string[];
  readonly image?: string | ArticleImage;
  readonly featured?: boolean;
  readonly draft?: boolean;
  readonly takeaways?: readonly string[];
}

/** Cache structure for articles */
export interface ArticleCache {
  readonly articles: readonly Article[];
  readonly timestamp: number;
}

/** Options for fetching articles */
export interface FetchArticlesOptions {
  readonly featured?: boolean;
  readonly category?: ArticleCategory;
  readonly tag?: ArticleTag;
  readonly limit?: number;
  readonly excludeDrafts?: boolean;
  readonly signal?: AbortSignal;
  readonly cache?: RequestCache;
}

/** Props for article content component */
export interface ArticleContentProps {
  article: Article;
  contentHtml: string;
  nextArticle: Article | null;
  prevArticle: Article | null;
}

/** Props for archive section component */
export interface ArchiveSectionProps {
  articles: Article[];
}

/** Image metadata for articles */
export interface ArticleImage {
  readonly src: string;
  readonly alt: string;
}

/** Core configuration for article management */
export const ARTICLE_CONFIG = {
  directory: 'public/articles',
  maxTitleLength: 100,
  maxDescriptionLength: 200,
  allowedCategories: ['technology', 'finance', 'music'] as const,
  allowedTags: [
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
  ] as const,
  cacheConfig: {
    revalidateInterval: 5 * 60 * 1000, // 5 minutes
    staleWhileRevalidate: 24 * 60 * 60 * 1000, // 24 hours
  },
  pagination: {
    defaultPageSize: 100,
    featuredCount: 3,
  },
} as const;

export type ArticleCategory = (typeof ARTICLE_CONFIG.allowedCategories)[number];
export type ArticleTag = (typeof ARTICLE_CONFIG.allowedTags)[number];

/** Frontmatter metadata for articles */
export type ArticleFrontmatter = {
  readonly title: string;
  readonly date: string;
  readonly description?: string | undefined;
  readonly category?: ArticleCategory | undefined;
  readonly tags?: readonly ArticleTag[] | undefined;
  readonly image?: ArticleImage | undefined;
  readonly featured: boolean;
  readonly draft: boolean;
  readonly takeaways?: readonly string[] | undefined;
};

/** Complete article data structure */
export type Article = {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly content: string;
  readonly link: string;
  readonly frontmatter: ArticleFrontmatter;
  readonly description: string | undefined;
  readonly date: string | undefined;
  readonly category: ArticleCategory | undefined;
  readonly tags: readonly ArticleTag[] | undefined;
  readonly image: ArticleImage | undefined;
  readonly takeaways: readonly string[] | undefined;
};

/** Raw frontmatter before processing */
export type RawFrontmatter = Readonly<{
  title: string;
  date?: string;
  description?: string;
  subtitle?: string;
  category?: string;
  tags?: readonly string[];
  image?: string | ArticleImage;
  featured?: boolean;
  draft?: boolean;
  takeaways?: readonly string[];
}>;

/** Props for article content component */
export interface ArticleContentProps {
  article: Article;
  contentHtml: string;
  nextArticle?: Article | undefined;
  prevArticle?: Article | undefined;
}

/** Props for archive section component */
export interface ArchiveSectionProps {
  readonly articles: readonly Article[];
}

/** Cache structure for articles */
export interface ArticleCache {
  readonly articles: readonly Article[];
  readonly timestamp: number;
}

/** Options for fetching articles */
export interface FetchArticlesOptions {
  readonly signal?: AbortSignal;
  readonly cache?: RequestCache;
}

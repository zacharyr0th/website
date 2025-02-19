/** Core article types and configurations */

/** Image metadata for articles */
export interface ArticleImage {
  readonly src: string;
  readonly alt: string;
}

/** Allowed categories and tags */
export const CATEGORIES = ['tech', 'finance', 'music'] as const;
export const TAGS = ['crypto', 'computing', 'theory', 'ai', 'trading'] as const;

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
  readonly slug: string;
  readonly title: string;
  readonly date: string;
  readonly content: string;
  readonly description: string;
  readonly category: ArticleCategory | null;
  readonly tags: readonly ArticleTag[];
  readonly image: ArticleImage | null;
  readonly featured: boolean;
  readonly draft: boolean;
  readonly takeaways: readonly string[] | null;
  readonly link: string;
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
  [slug: string]: {
    frontmatter: ArticleFrontmatter;
    content: string;
    processedContent?: string;
    timestamp: number;
  };
}

/** Options for fetching articles */
export interface FetchArticlesOptions {
  readonly featured?: boolean | undefined;
  readonly category?: ArticleCategory | undefined;
  readonly tag?: ArticleTag | undefined;
  readonly limit?: number | undefined;
  readonly excludeDrafts?: boolean | undefined;
  readonly signal?: AbortSignal | undefined;
  readonly cache?: RequestCache | undefined;
  readonly offset?: number;
}

/** Props for article content component */
export interface ArticleContentProps {
  article: {
    slug: string;
    title: string;
    date: string;
    content: string;
    description: string;
    category?: ArticleCategory;
    tags: ArticleTag[];
    image?: ArticleImage;
    featured?: boolean;
  };
  contentHtml: string;
  nextArticle: ArticleContentProps['article'] | null;
  prevArticle: ArticleContentProps['article'] | null;
}

/** Props for archive section component */
export interface ArchiveSectionProps {
  articles: Article[];
}

export interface ArticleProps {
  article: Article;
  contentHtml: string;
  nextArticle?: Article | null;
  prevArticle?: Article | null;
}

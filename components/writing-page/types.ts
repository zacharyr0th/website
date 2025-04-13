/**
 * Core article types and configurations for the writing section
 */

/** Image metadata for articles */
export interface ArticleImage {
  readonly src: string;
  readonly alt: string;
  readonly caption?: string;
}

/** Allowed categories and tags */
export const CATEGORIES = ['technology', 'finance', 'music'] as const;
export const TAGS = [
  'react',
  'typescript',
  'nextjs',
  'web',
  'ai',
  'guitar',
  'crypto',
  'computing',
  'theory',
  'trading',
] as const;

export type ArticleCategory = (typeof CATEGORIES)[number];
export type ArticleTag = (typeof TAGS)[number];

// Category display names
export const CATEGORY_DISPLAY_NAMES: Record<ArticleCategory, string> = {
  technology: 'Technology',
  finance: 'Finance',
  music: 'Music',
} as const;

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
  readonly featured?: boolean;
  readonly category?: ArticleCategory;
  readonly tag?: ArticleTag;
  readonly limit?: number;
  readonly excludeDrafts?: boolean;
  readonly signal?: AbortSignal;
  readonly cache?: RequestCache;
  readonly offset?: number;
  readonly concurrent?: boolean;
}

/**
 * Mutable version of FetchArticlesOptions for internal use
 * @internal
 */
export type MutableFetchArticlesOptions = {
  -readonly [P in keyof FetchArticlesOptions]: FetchArticlesOptions[P];
};

/**
 * Animation variants type for container animations
 */
export type AnimationVariants = {
  hidden: object;
  visible: object;
  exit: object;
};

/** Props for article content component */
export interface ArticleContentProps {
  article: Article;
  nextArticle: Article | null;
  prevArticle: Article | null;
  children?: React.ReactNode;
  containerVariants?: AnimationVariants;
}

/** Props for archive section component */
export interface ArchiveSectionProps {
  articles: Article[];
}

export interface ArticleImage {
  src: string;
  alt: string;
}

export const ARTICLE_CONFIG = {
  directory: 'public/articles',
  maxTitleLength: 100,
  maxDescriptionLength: 200,
  allowedCategories: ['technology', 'crypto', 'finance', 'development', 'personal'] as const,
  allowedTags: ['crypto', 'technology', 'finance', 'defi', 'development', 'personal'] as const,
  cacheConfig: {
    revalidateInterval: 5 * 60 * 1000, // 5 minutes
    staleWhileRevalidate: 24 * 60 * 60 * 1000, // 24 hours
  },
  pagination: {
    defaultPageSize: 100,
    featuredCount: 3,
  },
} as const;

export type ArticleCategory = typeof ARTICLE_CONFIG.allowedCategories[number];
export type ArticleTag = typeof ARTICLE_CONFIG.allowedTags[number];

export type ArticleFrontmatter = {
  title: string;
  date?: string;
  description?: string;
  category?: ArticleCategory;
  tags?: ArticleTag[];
  image?: ArticleImage;
  featured?: boolean;
  draft?: boolean;
};

export type Article = {
  id: string;
  slug: string;
  title: string;
  content: string;
  description?: string | undefined;
  date?: string | undefined;
  link: string;
  category?: ArticleCategory | undefined;
  tags?: ArticleTag[] | undefined;
  image?: ArticleImage | undefined;
  frontmatter: ArticleFrontmatter;
};

export type RawFrontmatter = {
  title: string;
  date?: string;
  description?: string;
  subtitle?: string;
  category?: string;
  tags?: string[];
  image?: string | ArticleImage;
  featured?: boolean;
  draft?: boolean;
};

export interface ArticleContentProps {
  article: Article;
  contentHtml: string;
}

export interface ArchiveSectionProps {
  articles: Article[];
}

export interface ArticleCache {
  articles: Article[];
  timestamp: number;
}

export interface FetchArticlesOptions {
  signal?: AbortSignal;
  cache?: RequestCache;
}

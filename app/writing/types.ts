// Article Types
export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  content: string;
  image: {
    src: string;
    alt: string;
  };
  category: string;
  date: string;
  tags?: string[];
  link: string;
  frontmatter: ArticleFrontmatter;
  adjacentArticles?: {
    prev: AdjacentArticle | null;
    next: AdjacentArticle | null;
  };
}

export interface ArticleFrontmatter {
  title: string;
  date: string;
  featured: boolean;
  subtitle?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  category?: string;
  tags?: string[];
}

export interface AdjacentArticle {
  slug: string;
  title: string;
  date: string;
}

// Component Props Types
export interface ArticleContentProps {
  article: Article;
}

export interface HeroProps {
  primaryArticle: Article;
  featuredArticles: Article[];
  onRefresh: () => void;
}

export interface ArchiveSectionProps {
  tags: string[];
  selectedTag: string;
  onTagChange: (tag: string) => void;
  content: Article[];
}

export interface ArticleCardProps {
  article: Article;
}

// Hook Return Types
export interface UseArticlesReturn {
  articles: Article[];
  isLoading: boolean;
  error: Error | null;
  refreshArticles: () => Promise<void>;
}

export interface UseRandomArticlesReturn {
  randomArticles: Article[];
  refreshRandomArticles: () => void;
}

// Server Component Types
export interface WritingPageServerReturn {
  allArticles: Article[];
  error: string | null;
}

// Error Boundary Types
export interface ErrorFallbackProps {
  error: Error;
}

export interface ArticleImage {
  src: string;
  alt: string;
}

export interface ArticleFrontmatter {
  title: string;
  date: string;
  description?: string;
  category?: string;
  tags?: string[];
  image?: ArticleImage;
  featured?: boolean;
  draft?: boolean;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  content: string;
  date: string;
  description?: string;
  category?: string;
  tags?: string[];
  image?: ArticleImage;
  link: string;
  frontmatter: ArticleFrontmatter;
}

export interface RawFrontmatter {
  title?: string;
  date?: string;
  description?: string;
  subtitle?: string;
  category?: string;
  tags?: string[];
  image?: string | { src: string; alt?: string };
  featured?: boolean;
  draft?: boolean;
}

export interface ArticleContentProps {
  article: Article;
  contentHtml: string;
}

export interface ArchiveSectionProps {
  articles: Article[];
}

export const ARTICLE_CONFIG = {
  directory: 'public/articles',
  maxDescriptionLength: 200,
  maxTitleLength: 100,
  maxFileSize: 1024 * 1024 * 5, // 5MB max file size
  defaultImage: '/misc/placeholder.webp',
  excerptLength: 150,
  allowedCategories: [
    'technology',
    'finance',
    'blockchain',
    'development',
    'tutorial',
    'crypto',
    'defi',
    'analysis',
  ] as const,
  allowedTags: [
    'web3',
    'blockchain',
    'defi',
    'programming',
    'tutorial',
    'guide',
    'analysis',
    'opinion',
    'crypto',
    'finance',
    'technology',
    'development',
  ] as const,
} as const;

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Types
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

interface RawFrontmatter {
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

// Configuration
export const ARTICLE_CONFIG = {
  directory: path.join(process.cwd(), 'public/articles'),
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

// Utility Functions
export function validateFrontmatter(data: unknown): ArticleFrontmatter {
  console.log('Validating frontmatter:', data);

  const rawData = data as RawFrontmatter;

  const transformImage = (
    image: string | { src: string; alt?: string } | undefined,
    defaultAlt: string
  ): { src: string; alt: string } | undefined => {
    if (!image) return undefined;
    if (typeof image === 'string') {
      return {
        src: image,
        alt: defaultAlt,
      };
    }
    return {
      src: image.src,
      alt: image.alt || defaultAlt,
    };
  };

  const frontmatter: ArticleFrontmatter = {
    title: rawData.title || 'Untitled',
    date: rawData.date || new Date().toISOString(),
    featured: rawData.featured || false,
    draft: rawData.draft || false,
  };

  if (rawData.description || rawData.subtitle) {
    frontmatter.description = rawData.description || rawData.subtitle || '';
  }

  if (rawData.category) {
    frontmatter.category = rawData.category;
  }

  if (rawData.tags) {
    frontmatter.tags = rawData.tags;
  }

  const transformedImage = transformImage(rawData.image, rawData.title || 'Article image');
  if (transformedImage) {
    frontmatter.image = transformedImage;
  }

  // Validate title length
  if (frontmatter.title.length > ARTICLE_CONFIG.maxTitleLength) {
    console.warn(`Title exceeds maximum length: ${frontmatter.title}`);
    frontmatter.title = frontmatter.title.slice(0, ARTICLE_CONFIG.maxTitleLength);
  }

  // Validate description length if present
  if (
    frontmatter.description &&
    frontmatter.description.length > ARTICLE_CONFIG.maxDescriptionLength
  ) {
    console.warn(`Description exceeds maximum length: ${frontmatter.description}`);
    frontmatter.description = frontmatter.description.slice(0, ARTICLE_CONFIG.maxDescriptionLength);
  }

  // Convert tags to lowercase and remove duplicates
  frontmatter.tags = Array.from(new Set((frontmatter.tags || []).map((tag) => tag.toLowerCase())));

  return frontmatter;
}

export function createArticleFromFrontmatter(
  frontmatter: ArticleFrontmatter,
  content: string,
  slug: string
): Article {
  // Validate title length
  if (frontmatter.title.length > 100) {
    throw new Error('Title is too long (max 100 characters)');
  }

  const article: Article = {
    id: slug,
    slug,
    title: frontmatter.title,
    content,
    date: frontmatter.date,
    link: `/writing/${slug}`,
    frontmatter,
  };

  if (frontmatter.description) {
    article.description = frontmatter.description;
  }

  if (frontmatter.category) {
    article.category = frontmatter.category;
  }

  if (frontmatter.tags) {
    article.tags = frontmatter.tags;
  }

  if (frontmatter.image) {
    article.image = frontmatter.image;
  }

  return article;
}

// Core Functions
export async function getArticles(): Promise<Article[]> {
  try {
    console.log('Reading articles from:', ARTICLE_CONFIG.directory);
    const fileNames = fs.readdirSync(ARTICLE_CONFIG.directory);
    console.log('Found files:', fileNames);

    const articles = fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => {
        try {
          console.log('Processing article:', fileName);
          const slug = fileName.replace(/\.md$/, '');
          const fullPath = path.join(ARTICLE_CONFIG.directory, fileName);
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          const { data, content } = matter(fileContents);
          console.log('Article frontmatter:', data);

          const validatedFrontmatter = validateFrontmatter(data);

          // Skip draft articles in production
          if (process.env.NODE_ENV === 'production' && validatedFrontmatter.draft) {
            console.log('Skipping draft article:', fileName);
            return null;
          }

          const article = createArticleFromFrontmatter(validatedFrontmatter, content, slug);
          console.log('Successfully processed article:', slug);
          return article;
        } catch (error) {
          console.error(`Error processing article ${fileName}:`, error);
          return null;
        }
      })
      .filter((article): article is Article => article !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    console.log('Total articles processed:', articles.length);
    return articles;
  } catch (error) {
    console.error('Error reading articles:', error);
    return [];
  }
}

export async function getFeaturedArticles(): Promise<Article[]> {
  const articles = await getArticles();
  return articles.filter((article) => article.frontmatter.featured).slice(0, 3);
}
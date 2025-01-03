import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Article, ArticleFrontmatter, RawFrontmatter, ARTICLE_CONFIG } from './types';

const articlesDirectory = path.join(process.cwd(), ARTICLE_CONFIG.directory);

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
        alt: `Featured image for article: ${defaultAlt}`,
      };
    }
    return {
      src: image.src,
      alt: image.alt || `Featured image for article: ${defaultAlt}`,
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

// Add memoization for getArticles
let cachedArticles: Article[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getArticles(): Promise<Article[]> {
  const now = Date.now();
  if (cachedArticles && now - lastFetchTime < CACHE_DURATION) {
    return cachedArticles;
  }

  try {
    const fileNames = fs.readdirSync(articlesDirectory);
    const articles = fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => {
        try {
          const slug = fileName.replace(/\.md$/, '');
          const fullPath = path.join(articlesDirectory, fileName);
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          const { data, content } = matter(fileContents);
          const validatedFrontmatter = validateFrontmatter(data);

          if (process.env.NODE_ENV === 'production' && validatedFrontmatter.draft) {
            return null;
          }

          return createArticleFromFrontmatter(validatedFrontmatter, content, slug);
        } catch (error) {
          console.error(`Error processing article ${fileName}:`, error);
          return null;
        }
      })
      .filter((article): article is Article => article !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    cachedArticles = articles;
    lastFetchTime = now;
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

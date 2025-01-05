/**
 * Article Management System
 * 
 * This file handles all article-related operations including:
 * - Reading and parsing markdown files from the articles directory
 * - Validating frontmatter with type safety
 * - Transforming and validating categories and tags
 * - Managing article caching for performance
 * - Sorting articles by date
 * - Filtering featured articles
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { 
  Article, 
  ArticleFrontmatter, 
  RawFrontmatter, 
  ARTICLE_CONFIG,
  ArticleCache,
  ArticleImage,
  ArticleCategory,
  ArticleTag
} from '../writing/types';

// In-memory cache
let articleCache: ArticleCache | null = null;

export function validateFrontmatter(data: unknown): ArticleFrontmatter {
  const rawData = data as RawFrontmatter;
  
  const transformImage = (
    image: string | { src: string; alt?: string } | undefined,
    defaultAlt: string
  ): ArticleImage | undefined => {
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

  // Build the frontmatter object immutably
  return {
    title: rawData.title || 'Untitled',
    date: rawData.date || new Date().toISOString(),
    description: rawData.description || rawData.subtitle || undefined,
    category: rawData.category && 
      ARTICLE_CONFIG.allowedCategories.includes(rawData.category as ArticleCategory) ? 
      rawData.category as ArticleCategory : 
      undefined,
    tags: rawData.tags && Array.isArray(rawData.tags) ? 
      Array.from(new Set(
        rawData.tags
          .filter((tag): tag is string => typeof tag === 'string')
          .map(tag => tag.toLowerCase())
          .filter((tag): tag is ArticleTag => 
            ARTICLE_CONFIG.allowedTags.map(t => t.toLowerCase()).includes(tag)
          )
      )) : 
      undefined,
    image: transformImage(rawData.image, rawData.title || 'Article image'),
    featured: rawData.featured || false,
    draft: rawData.draft || false,
  };
}

export function createArticle(
  frontmatter: ArticleFrontmatter,
  content: string,
  slug: string
): Article {
  return {
    id: slug,
    slug,
    title: frontmatter.title,
    content,
    date: frontmatter.date,
    link: `/writing/${slug}`,
    description: frontmatter.description,
    category: frontmatter.category,
    tags: frontmatter.tags,
    image: frontmatter.image,
    frontmatter,
  };
}

export async function getArticles(forceRefresh = false): Promise<readonly Article[]> {
  // Check cache first
  const now = Date.now();
  if (
    !forceRefresh &&
    articleCache &&
    now - articleCache.timestamp < ARTICLE_CONFIG.cacheConfig.revalidateInterval
  ) {
    return articleCache.articles;
  }

  try {
    const articlesDirectory = path.join(process.cwd(), ARTICLE_CONFIG.directory);
    const fileNames = fs.readdirSync(articlesDirectory);
    
    const articles = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => {
        try {
          const slug = fileName.replace(/\.md$/, '');
          const fullPath = path.join(articlesDirectory, fileName);
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          const { data, content } = matter(fileContents);
          
          const validatedFrontmatter = validateFrontmatter(data);

          // Skip draft articles in production
          if (process.env.NODE_ENV === 'production' && validatedFrontmatter.draft) {
            return null;
          }

          return createArticle(validatedFrontmatter, content, slug);
        } catch (error) {
          console.error(`Error processing article ${fileName}:`, error);
          return null;
        }
      })
      .filter((article): article is Article => article !== null)
      .sort((a, b) => {
        if (a.date && b.date) {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        return a.title.localeCompare(b.title);
      });

    // Update cache
    articleCache = { articles, timestamp: now };
    return articles;
  } catch (error) {
    console.error('Error reading articles:', error);
    return [];
  }
}

export async function getFeaturedArticles(): Promise<readonly Article[]> {
  const articles = await getArticles();
  return articles
    .filter(article => article.frontmatter.featured)
    .slice(0, ARTICLE_CONFIG.pagination.featuredCount);
}


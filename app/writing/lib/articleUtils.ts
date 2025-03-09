/**
 * Article utility functions
 * Core functions for fetching and processing articles
 */

import path from 'path';
import matter from 'gray-matter';
import type {
  Article,
  ArticleCategory,
  ArticleTag,
  ArticleFrontmatter,
  FetchArticlesOptions,
  RawFrontmatter,
  ArticleCache,
} from '../types';
import { ARTICLE_CONFIG } from '../types';

// In-memory cache for articles
const articleCache: ArticleCache = {};

// Mock data for client-side rendering
const MOCK_ARTICLES: Article[] = [
  // Add a few mock articles for development if needed
];

// Conditionally import fs only on the server side
const getFs = async () => {
  // Only import fs on the server side
  if (typeof window === 'undefined') {
    const fs = await import('fs');
    return fs.default;
  }
  return null;
};

/**
 * Get a list of all article files
 * This is a server-side only function that will be called via getStaticProps
 */
export const getArticleFiles = async () => {
  // In browser environments, return empty array or mock data
  if (typeof window !== 'undefined') {
    return [];
  }

  // In server environments, use dynamic import to load fs
  try {
    const fs = await getFs();
    if (!fs) return [];

    const articlesDirectory = path.join(process.cwd(), ARTICLE_CONFIG.directory);
    return fs
      .readdirSync(articlesDirectory)
      .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'));
  } catch (error) {
    console.error('Error reading article directory:', error);
    return [];
  }
};

/**
 * Process frontmatter data and validate it
 */
export const processFrontmatter = (rawFrontmatter: RawFrontmatter): ArticleFrontmatter => {
  return {
    title: rawFrontmatter.title.substring(0, ARTICLE_CONFIG.limits.title),
    date: rawFrontmatter.date || new Date().toISOString(),
    description: (rawFrontmatter.description || rawFrontmatter.subtitle || '').substring(
      0,
      ARTICLE_CONFIG.limits.description
    ),
    category: (rawFrontmatter.category as ArticleCategory) || null,
    tags: (rawFrontmatter.tags as ArticleTag[]) || [],
    image:
      typeof rawFrontmatter.image === 'string'
        ? { src: rawFrontmatter.image, alt: rawFrontmatter.title }
        : rawFrontmatter.image || null,
    featured: rawFrontmatter.featured || false,
    draft: rawFrontmatter.draft || false,
    takeaways: rawFrontmatter.takeaways || null,
  };
};

/**
 * Parse an article file and extract its metadata and content
 * This is a server-side only function
 */
export const parseArticleFile = async (fileName: string): Promise<Article | null> => {
  // In browser environments, return null or mock data
  if (typeof window !== 'undefined') {
    return null;
  }

  try {
    const fs = await getFs();
    if (!fs) return null;

    const articlesDirectory = path.join(process.cwd(), ARTICLE_CONFIG.directory);
    const fullPath = path.join(articlesDirectory, fileName);

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const slug = fileName.replace(/\.mdx?$/, '');

    const frontmatter = processFrontmatter(data as RawFrontmatter);

    // Update cache
    articleCache[slug] = {
      frontmatter,
      content,
      timestamp: Date.now(),
    };

    return {
      id: slug,
      slug,
      title: frontmatter.title,
      content,
      link: `/writing/${slug}`,
      frontmatter,
      description: frontmatter.description,
      date: frontmatter.date,
      category: frontmatter.category,
      tags: frontmatter.tags,
      image: frontmatter.image,
      takeaways: frontmatter.takeaways,
    };
  } catch (error) {
    console.error(`Error parsing article file ${fileName}:`, error);
    return null;
  }
};

/**
 * Get all articles, optionally filtered by options
 * This function works both client and server side by using pre-fetched data
 */
export const getArticles = async (options: FetchArticlesOptions = {}): Promise<Article[]> => {
  const { featured = false, category, tag, limit, excludeDrafts = true, offset = 0 } = options;

  // In browser environments during development, return mock data
  if (typeof window !== 'undefined') {
    return MOCK_ARTICLES;
  }

  const files = await getArticleFiles();
  const articlesPromises = files.map((file) => parseArticleFile(file));
  const articlesResults = await Promise.all(articlesPromises);
  let articles = articlesResults.filter((article): article is Article => article !== null);

  // Apply filters
  if (excludeDrafts) {
    articles = articles.filter((article) => !article.frontmatter.draft);
  }

  if (featured) {
    articles = articles.filter((article) => article.frontmatter.featured);
  }

  if (category) {
    articles = articles.filter((article) => article.category === category);
  }

  if (tag) {
    articles = articles.filter((article) => article.tags.includes(tag));
  }

  // Sort by date (newest first)
  articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Apply pagination
  if (offset > 0) {
    articles = articles.slice(offset);
  }

  if (limit) {
    articles = articles.slice(0, limit);
  }

  return articles;
};

/**
 * Article utilities and formatting functions
 */

import { cache } from 'react';
import type { Article, FetchArticlesOptions } from './types';

const ARTICLES_CACHE = new Map<string, Article[]>();

// Get all articles with optional filtering
export const getArticles = cache(async (options: FetchArticlesOptions = {}): Promise<Article[]> => {
  try {
    // Create cache key based on options
    const cacheKey = JSON.stringify(options);

    // Check cache first
    if (ARTICLES_CACHE.has(cacheKey)) {
      return ARTICLES_CACHE.get(cacheKey)!;
    }

    // Build query parameters
    const params = new URLSearchParams();
    if (options.featured) params.append('featured', 'true');
    if (options.category) params.append('category', options.category);
    if (options.tag) params.append('tag', options.tag);
    if (options.excludeDrafts) params.append('excludeDrafts', 'true');
    if (options.limit) params.append('limit', options.limit.toString());
    if (options.offset) params.append('offset', options.offset.toString());

    // Fetch articles from API
    const response = await fetch(`/api/articles?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch articles: ${response.statusText}`);
    }

    const articles = await response.json();

    // Cache the results
    ARTICLES_CACHE.set(cacheKey, articles);

    return articles;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
});

// Get a single article
export const getArticle = cache(async (slug: string): Promise<Article | null> => {
  if (!slug) return null;

  try {
    const articles = await getArticles();
    return articles.find((article) => article.slug === slug) || null;
  } catch (error) {
    console.error(`Error fetching article ${slug}:`, error);
    return null;
  }
});

// Get featured articles
export const getFeaturedArticles = cache(async (limit?: number): Promise<Article[]> => {
  return getArticles({ featured: true, limit });
});

// Format date for display
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Extract table of contents from content
export function getTocFromContent(
  content: string
): Array<{ text: string; id: string; level: number }> {
  const headings = content.match(/^#{1,6}\s+(.+)$/gm) || [];
  return headings.map((heading) => {
    const level = heading.match(/^#+/)?.[0].length || 1;
    const text = heading.replace(/^#+\s+/, '');
    const id = text.toLowerCase().replace(/[^\w]+/g, '-');
    return { text, id, level };
  });
}

// Calculate reading time in minutes
export function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Get adjacent articles
export async function getAdjacentArticles(
  currentSlug: string
): Promise<{ next: Article | null; prev: Article | null }> {
  try {
    const articles = await getArticles({ excludeDrafts: true });
    const sortedArticles = articles.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const currentIndex = sortedArticles.findIndex((article) => article.slug === currentSlug);
    if (currentIndex === -1) return { next: null, prev: null };

    const nextArticle = currentIndex > 0 ? sortedArticles[currentIndex - 1] : null;
    const prevArticle =
      currentIndex < sortedArticles.length - 1 ? sortedArticles[currentIndex + 1] : null;

    return {
      next: nextArticle ?? null,
      prev: prevArticle ?? null,
    };
  } catch (error) {
    console.error('Error getting adjacent articles:', error);
    return { next: null, prev: null };
  }
}

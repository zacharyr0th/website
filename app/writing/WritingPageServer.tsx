import type { Article, FetchArticlesOptions } from './types';
import { headers } from 'next/headers';

const FETCH_TIMEOUT_MS = 5000; // 5 seconds timeout
const CACHE_REVALIDATE_SECONDS = 3600; // 1 hour cache

// Add memoization for the base URL construction
const getBaseUrl = (headers: Headers): string => {
  const host = headers.get('host') || 'localhost:3000';
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  return `${protocol}://${host}`;
};

async function getArticles(options: FetchArticlesOptions = {}): Promise<Article[]> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  
  try {
    const headersList = await headers();
    const baseUrl = getBaseUrl(headersList);
    const response = await fetch(`${baseUrl}/api/articles`, {
      next: { revalidate: CACHE_REVALIDATE_SECONDS, tags: ['articles'] },
      signal: options.signal || controller.signal,
      cache: options.cache || 'default',
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!Array.isArray(data)) {
      throw new TypeError('API response is not an array');
    }

    return data.filter((article): article is Article => {
      const isValid = article.id && article.title;
      if (!isValid) {
        console.warn('Article missing required fields:', article);
      }
      return isValid;
    });
  } catch (error) {
    if (error instanceof Error) {
      const message = error.name === 'AbortError'
        ? `Failed to load articles: Request timed out after ${FETCH_TIMEOUT_MS}ms`
        : `Failed to load articles: ${error.message}`;
      console.error(message);
      throw new Error(message);
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

export default async function WritingPageServer() {
  try {
    const allArticles = await getArticles();
    return {
      allArticles,
      error: allArticles.length === 0 ? 'Unable to load articles. Please try again later.' : null,
    };
  } catch (error) {
    console.error('Error in WritingPageServer:', error);
    return {
      allArticles: [],
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

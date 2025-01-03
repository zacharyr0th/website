import type { Article } from './types';
import { headers } from 'next/headers';

const FETCH_TIMEOUT_MS = 5000; // 5 seconds timeout
const CACHE_REVALIDATE_SECONDS = 3600; // 1 hour cache

interface FetchArticlesOptions {
  signal?: AbortSignal;
  cache?: RequestCache;
}

async function getArticles(options: FetchArticlesOptions = {}): Promise<Article[]> {
  const headersList = await headers();
  const host = headersList.get('host') || 'localhost:3000';
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const url = `${protocol}://${host}/api/articles`;

  // Create abort controller for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      next: {
        revalidate: CACHE_REVALIDATE_SECONDS,
        tags: ['articles'],
      },
      signal: options.signal || controller.signal,
      cache: options.cache || 'default',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    // Type guard to ensure we have an array of articles
    if (!Array.isArray(data)) {
      throw new TypeError('API response is not an array');
    }

    // Validate each article has required fields
    const articles = data.map((article) => {
      if (!article.id || !article.title) {
        console.warn('Article missing required fields:', article);
      }
      return article;
    });

    return articles;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.error('Request timed out after', FETCH_TIMEOUT_MS, 'ms');
        throw new Error('Failed to load articles: Request timed out');
      }
      console.error('Error fetching articles:', error.message);
    } else {
      console.error('Unknown error fetching articles:', error);
    }
    return [];
  } finally {
    clearTimeout(timeoutId);
  }
}

export default async function WritingPageServer(): Promise<{
  allArticles: Article[];
  error: string | null;
}> {
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

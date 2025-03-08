import type { Article, FetchArticlesOptions } from './components/articles/types';

const FETCH_TIMEOUT_MS = 5000; // 5 seconds timeout
const CACHE_REVALIDATE_SECONDS = 3600; // 1 hour cache

// Simplified base URL construction without relying on headers
const getBaseUrl = (): string => {
  // Use environment variables or default to localhost in development
  const isProduction = process.env.NODE_ENV === 'production';
  const protocol = isProduction ? 'https' : 'http';
  const host = isProduction
    ? process.env.PRODUCTION_HOST || 'zacharyr0th.com'
    : `${process.env.DEVELOPMENT_HOST || 'localhost'}:${process.env.DEVELOPMENT_PORT || '3000'}`;

  return new URL(`${protocol}://${host}`).toString();
};

async function getArticles(options: FetchArticlesOptions = {}): Promise<Article[]> {
  const controller = new AbortController();
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => {
      controller.abort();
      reject(new Error(`Request timed out after ${FETCH_TIMEOUT_MS}ms`));
    }, FETCH_TIMEOUT_MS)
  );

  try {
    const response = await Promise.race([
      fetch(`${getBaseUrl()}/api/articles`, {
        next: { revalidate: CACHE_REVALIDATE_SECONDS, tags: ['articles'] },
        signal: options.signal || controller.signal,
        cache: options.cache || 'default',
        headers: { Accept: 'application/json' },
      }),
      timeout,
    ]);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new TypeError('API response is not an array');
    }

    return data.filter((article): article is Article => {
      const isValid = article?.slug && article?.title;
      if (!isValid) console.warn('Skipping invalid article:', article);
      return isValid;
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
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

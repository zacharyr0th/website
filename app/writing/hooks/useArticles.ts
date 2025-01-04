import useSWR from 'swr';
import { ARTICLE_CONFIG } from '../types';
import type { Article } from '../types';

const CACHE_CONFIG = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  refreshInterval: ARTICLE_CONFIG.cacheConfig.revalidateInterval,
  dedupingInterval: ARTICLE_CONFIG.cacheConfig.staleWhileRevalidate,
} as const;

async function fetchArticles(): Promise<Article[]> {
  const response = await fetch('/api/articles', {
    headers: {
      Accept: 'application/json',
    },
    next: {
      revalidate: ARTICLE_CONFIG.cacheConfig.revalidateInterval / 1000, // Convert to seconds for Next.js
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  if (!Array.isArray(data)) {
    throw new Error('Invalid response format');
  }

  return data;
}

export function useArticles() {
  const { data, error, isLoading, mutate } = useSWR<Article[], Error>(
    '/api/articles',
    fetchArticles,
    CACHE_CONFIG
  );

  return {
    articles: data || [],
    isLoading,
    error,
    refreshArticles: () => mutate(),
    lastUpdated: data ? new Date() : null,
  };
}

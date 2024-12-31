import useSWR from 'swr';
import type { Article } from '@/app/lib/types/types';

const CACHE_CONFIG = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  refreshInterval: 0,
} as const;

async function fetchArticles(): Promise<Article[]> {
  const response = await fetch('/api/articles', {
    headers: {
      Accept: 'application/json',
      'Cache-Control': 'no-cache',
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

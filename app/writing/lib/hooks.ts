'use client';

import { useCallback, useMemo } from 'react';
import useSWRImmutable from 'swr/immutable';
import type { Article } from '../types';

const CACHE_CONFIG = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  dedupingInterval: 3600000, // 1 hour
  errorRetryCount: 3,
  errorRetryInterval: 5000, // 5 seconds
} as const;

async function fetchArticles(): Promise<Article[]> {
  const response = await fetch('/api/articles', {
    headers: { Accept: 'application/json' },
    next: { tags: ['articles'] },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new TypeError('API response is not an array');
  }

  return data.filter((article): article is Article => {
    const isValid = Boolean(article?.id && article?.title && article?.slug);
    if (!isValid) {
      console.warn('Invalid article data:', article);
    }
    return isValid;
  });
}

export function useArticles() {
  const {
    data: articles,
    error,
    isLoading,
    mutate,
  } = useSWRImmutable<Article[], Error>('/api/articles', fetchArticles, CACHE_CONFIG);

  const sortedArticles = useMemo(() => {
    if (!articles) return [];
    return [...articles].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [articles]);

  const refresh = useCallback(() => {
    return mutate(undefined, { revalidate: true });
  }, [mutate]);

  return {
    articles: sortedArticles,
    isLoading,
    error,
    refresh,
  };
}

export const seededShuffle = <T>(array: T[], seed: number): T[] => {
  const shuffled = [...array];
  let currentIndex = shuffled.length;
  const seededRandom = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  while (currentIndex !== 0) {
    const randomIndex = Math.floor(seededRandom() * currentIndex);
    currentIndex -= 1;
    [shuffled[currentIndex], shuffled[randomIndex]] = [
      shuffled[randomIndex]!,
      shuffled[currentIndex]!,
    ];
  }

  return shuffled;
};

'use client';

import useSWRImmutable from 'swr/immutable';
import { useMemo, useCallback } from 'react';
import type { Article } from '../types';
import { ARTICLE_CACHE_CONFIG } from '@/lib/swr-config';
import { ARTICLE_CONFIG } from '../types';

const fetchArticles = async (): Promise<Article[]> => {
  const response = await fetch('/api/articles', {
    headers: { Accept: 'application/json' },
    next: { revalidate: ARTICLE_CACHE_CONFIG.dedupingInterval / 1000 },
  });

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const data = await response.json();
  if (!Array.isArray(data)) throw new Error('Invalid response format');
  return data;
};

export const useArticles = () => {
  const { data, error, isLoading, mutate } = useSWRImmutable<Article[], Error>(
    typeof window !== 'undefined' ? '/api/articles' : null,
    fetchArticles,
    ARTICLE_CACHE_CONFIG
  );

  return {
    articles: data || [],
    isLoading,
    error,
    refreshArticles: () => mutate(),
    lastUpdated: data ? new Date() : null,
  };
};

const seededShuffle = <T>(array: T[], seed: number): T[] => {
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

const filterArticles = (articles: Article[], primaryArticleId: string): Article[] =>
  articles.filter(
    (article) =>
      !article.frontmatter.featured && article.id !== primaryArticleId && !article.frontmatter.draft
  );

export const useRandomArticles = (articles: Article[], primaryArticleId: string) => {
  const availableArticles = useMemo(
    () => filterArticles(articles, primaryArticleId),
    [articles, primaryArticleId]
  );

  const getRandomArticles = useCallback(
    (seed: number = Date.now()) => {
      if (availableArticles.length === 0) {
        console.warn('No articles available for randomization');
        return [];
      }

      return seededShuffle(availableArticles, seed).slice(
        0,
        Math.min(ARTICLE_CONFIG.pagination.featuredCount, availableArticles.length)
      );
    },
    [availableArticles]
  );

  return {
    randomArticles: useMemo(() => getRandomArticles(), [getRandomArticles]),
    refreshRandomArticles: () => getRandomArticles(Date.now()),
    isLoading: false,
  };
};

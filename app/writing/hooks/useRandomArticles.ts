import { useMemo, useCallback } from 'react';
import type { Article } from '../types';

const RANDOM_ARTICLES_CONFIG = {
  count: 3,
} as const;

function seededShuffle<T>(array: T[], seed: number): T[] {
  const shuffled = [...array];
  let currentIndex = shuffled.length;

  // Generate random numbers based on seed
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
}

function filterArticles(articles: Article[], primaryArticleId: string): Article[] {
  return articles.filter(
    (article) =>
      !article.frontmatter?.featured &&
      article.id !== primaryArticleId &&
      !article.frontmatter?.draft
  );
}

export function useRandomArticles(articles: Article[], primaryArticleId: string) {
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

      const shuffled = seededShuffle(availableArticles, seed);
      return shuffled.slice(0, Math.min(RANDOM_ARTICLES_CONFIG.count, shuffled.length));
    },
    [availableArticles]
  );

  const initialRandomArticles = useMemo(() => getRandomArticles(), [getRandomArticles]);

  return {
    randomArticles: initialRandomArticles,
    refreshRandomArticles: () => getRandomArticles(Date.now()),
    isLoading: false,
  };
}

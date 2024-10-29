import { useState, useCallback, useMemo } from 'react';
import { Article } from '@/lib/types';

export function useRandomArticles(articles: Article[], count: number) {
  const [randomArticles, setRandomArticles] = useState<Article[]>([]);

  const getRandomArticles = useCallback(() => {
    const nonFeaturedArticles = articles.filter(
      (article) => !article.frontmatter?.featured
    );
    const shuffled = [...nonFeaturedArticles].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, shuffled.length));
  }, [articles, count]);

  const refreshRandomArticles = useCallback(() => {
    setRandomArticles(getRandomArticles());
  }, [getRandomArticles]);

  // Initialize random articles when articles change
  useMemo(() => {
    refreshRandomArticles();
  }, [articles, refreshRandomArticles]);

  return { randomArticles, refreshRandomArticles };
}
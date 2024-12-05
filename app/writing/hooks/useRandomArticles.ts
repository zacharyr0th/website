import { useState, useCallback, useEffect } from 'react';
import { Article } from '../types';

export function useRandomArticles(
  articles: Article[],
  primaryArticleId: string
): { randomArticles: Article[]; refreshRandomArticles: () => void } {
  const [randomArticles, setRandomArticles] = useState<Article[]>([]);

  const getRandomArticles = useCallback(() => {
    const availableArticles = articles.filter(
      (article) => !article.frontmatter?.featured && article.id !== primaryArticleId
    );

    const shuffleArray = (array: Article[]) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = shuffled[i]!;
        shuffled[i] = shuffled[j]!;
        shuffled[j] = temp;
      }
      return shuffled;
    };

    const FIXED_COUNT = 3;
    const shuffled = shuffleArray(availableArticles);

    const result: Article[] = [];
    for (let i = 0; i < FIXED_COUNT; i++) {
      result.push(shuffled[i % shuffled.length]!);
    }

    return result;
  }, [articles, primaryArticleId]);

  useEffect(() => {
    setRandomArticles(getRandomArticles());
  }, [getRandomArticles]);

  const refreshRandomArticles = useCallback(() => {
    setRandomArticles(getRandomArticles());
  }, [getRandomArticles]);

  return { randomArticles, refreshRandomArticles };
}

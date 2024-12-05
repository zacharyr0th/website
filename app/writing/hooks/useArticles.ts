import { useState, useEffect, useCallback } from 'react';
import { Article } from '../types';

export function useArticles(): {
  articles: Article[];
  isLoading: boolean;
  error: Error | null;
  refreshArticles: () => Promise<void>;
} {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchArticles = useCallback(async () => {
    try {
      const cached = sessionStorage.getItem('articles');
      if (cached) {
        setArticles(JSON.parse(cached));
        setIsLoading(false);
        return;
      }

      const response = await fetch('/api/articles');
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();

      sessionStorage.setItem('articles', JSON.stringify(data));
      setArticles(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch articles'));
      sessionStorage.removeItem('articles');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const refreshArticles = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    sessionStorage.removeItem('articles');
    await fetchArticles();
  }, [fetchArticles]);

  return { articles, isLoading, error, refreshArticles };
}

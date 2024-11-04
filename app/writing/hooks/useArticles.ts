import { useState, useEffect } from 'react';
import { Article } from '@/lib/types';

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch('/api/articles');
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Fetched articles:', data);
        setArticles(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch articles'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchArticles();
  }, []);

  return { articles, isLoading, error };
}

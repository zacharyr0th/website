import { Article } from './types';
import { headers } from 'next/headers';

async function getArticles(): Promise<Article[]> {
  const headersList = headers();
  const host = headersList.get('host') || 'localhost:3000';
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';

  try {
    const response = await fetch(`${protocol}://${host}/api/articles`, {
      next: {
        revalidate: 3600,
        tags: ['articles'], // Add cache tag for better invalidation control
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching articles:', error);
    return []; // Return empty array instead of throwing
  }
}

export default async function WritingPageServer(): Promise<{
  allArticles: Article[];
  error: string | null;
}> {
  const allArticles = await getArticles();

  return {
    allArticles,
    error: allArticles.length === 0 ? 'Failed to load articles' : null,
  };
}

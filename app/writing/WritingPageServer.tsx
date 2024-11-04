import { Article } from '@/lib/types';

async function getArticles(): Promise<Article[]> {
  try {
    const res = await fetch('http://localhost:3000/api/articles', {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch articles: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
}

export default async function WritingPageServer() {
  try {
    const allArticles = await getArticles();
    return { allArticles };
  } catch (error) {
    console.error('Error in WritingPageServer:', error);
    return { allArticles: [], error: 'Failed to load articles' };
  }
}
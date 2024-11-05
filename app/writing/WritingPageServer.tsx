import { Article } from '@/lib/types';

async function getArticles(): Promise<Article[]> {
  try {
    // Determine the base URL based on the environment
    const baseUrl =
      process.env.NODE_ENV === 'production' ? 'https://zacharyr0th.com' : 'http://localhost:3000';

    const response = await fetch(`${baseUrl}/api/articles`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }

    const articles = await response.json();
    return articles;
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

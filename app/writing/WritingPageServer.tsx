import { getArticles } from './lib/articles';

export default async function WritingPageServer() {
  try {
    const allArticles = await getArticles();
    return {
      allArticles,
      error: allArticles.length === 0 ? 'Unable to load articles. Please try again later.' : null,
    };
  } catch (error) {
    console.error('Error in WritingPageServer:', error);
    return {
      allArticles: [],
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

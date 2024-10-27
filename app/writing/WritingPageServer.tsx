import { Article } from '@/lib/types';

async function getArticles(): Promise<Article[]> {
  const res = await fetch('/api/articles', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch articles');
  }
  return res.json();
}

export default async function WritingPageServer() {
  const allArticles = await getArticles();
  return { allArticles };
}

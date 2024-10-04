import ArticlesArchive from './articles-archive/ArticlesArchive';
import { getContentItems } from '@/lib/content';
import type { ContentItem } from '@/lib/types';

export const revalidate = 3600; // Revalidate every hour

export default async function ArticlesPage() {
  const articles: ContentItem[] = await getContentItems('article');
  return <ArticlesArchive initialArticles={articles} />;
}

export async function generateStaticParams() {
  return [{}];
}

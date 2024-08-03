import ArticlesArchive from '../articles-archive/ArticlesArchive';
import { getContentItems } from '@/lib/content';
import type { ContentItem } from '@/lib/types';

export default async function ArticlesPage() {
  const articles: ContentItem[] = await getContentItems('article');
  return <ArticlesArchive initialArticles={articles} />;
}

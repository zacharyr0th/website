import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import WritingPageClient from './fe-be/WritingPageClient';
import { getContentItems } from '../../lib/content';
import { ContentItem, ContentType, WritingPageClientProps, WritingContentType } from '@/lib/types';

// Add this definition
const validContentTypes: ContentType[] = ['review', 'article', 'interview'];

export const metadata: Metadata = {
  title: 'Writing | Zachary Roth',
  description:
    'Articles, reviews, and interviews by Zachary Roth on technology, finance, and more.',
};

export default async function WritingPage({ searchParams }: { searchParams: { type?: string } }) {
  const contentType = searchParams.type as WritingContentType;

  const allContent = await getContentItems(
    contentType === 'all' ? undefined : (contentType as 'article' | 'review' | 'interview')
  );

  if (allContent.length === 0) {
    notFound();
  }

  const filteredContent = allContent.filter(
    (item): item is Extract<ContentItem, { type: ContentType }> =>
      validContentTypes.includes(item.type as ContentType)
  );

  const props: WritingPageClientProps = {
    initialContent: filteredContent,
  };

  return <WritingPageClient {...props} />;
}

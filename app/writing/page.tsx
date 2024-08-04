import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import WritingPageClient from './WritingPageClient';
import { getContentItems } from '../../lib/content';
import { ContentItem } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Writing | Zachary Roth',
  description:
    'Articles, reviews, and interviews by Zachary Roth on technology, finance, and more.',
};

export default async function WritingPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const contentType = searchParams.type as
    | 'article'
    | 'review'
    | 'interview'
    | 'sheet-music'
    | undefined;
  const allContent = await getContentItems(contentType);

  if (allContent.length === 0) {
    notFound();
  }

  return <WritingPageClient contentType={contentType} allContent={allContent as ContentItem[]} />;
}

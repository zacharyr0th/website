import { Metadata } from 'next';
import WritingPageClient from './WritingPageClient';
import { getContentItems } from '../../lib/content';

export const metadata: Metadata = {
  title: 'Writing | Zachary Roth',
  description:
    'Articles, reviews, and interviews by Zachary Roth on technology, finance, and more.',
};

export default function WritingPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const contentType = searchParams.type as 'article' | 'review' | 'interview' | undefined;
  const allContent = getContentItems(contentType);

  return <WritingPageClient contentType={contentType} allContent={allContent} />;
}

import { Suspense } from 'react';
import InterviewsArchive from './interviews-archive/InterviewsArchive';
import { getContentItems } from '@/lib/content';
import type { ContentItem } from '@/lib/types';

export default async function InterviewsPage() {
  const interviews = await getContentItems('interview');

  return (
    <Suspense fallback={<LoadingPlaceholder />}>
      <InterviewsArchive initialInterviews={interviews} />
    </Suspense>
  );
}

function LoadingPlaceholder() {
  return <div>Loading interviews...</div>;
}

import InterviewsArchive from '../interviews-archive/InterviewsArchive';
import { getContentItems } from '@/lib/content';
import type { ContentItem } from '@/lib/types';

export default async function InterviewsPage() {
  const interviews = await getContentItems('interview');
  return <InterviewsArchive initialInterviews={interviews} />;
}
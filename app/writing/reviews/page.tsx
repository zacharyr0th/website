import { Suspense } from 'react';
import ReviewsArchive from './reviews-archive/ReviewsArchive';
import { getReviewItems } from '@/lib/content';
import type { ContentItem } from '@/lib/types';

export default async function ReviewsPage() {
  const reviews = await getReviewItems();

  if (reviews.length === 0) {
    return <NoReviewsFound />;
  }

  return (
    <Suspense fallback={<LoadingPlaceholder />}>
      <ReviewsArchive initialReviews={reviews} />
    </Suspense>
  );
}

function NoReviewsFound() {
  return (
    <div className="min-h-screen bg-inherit text-gray-300 flex items-center justify-center">
      <p className="text-xl">No reviews found. Please check the console for more information.</p>
    </div>
  );
}

function LoadingPlaceholder() {
  return <div>Loading...</div>;
}

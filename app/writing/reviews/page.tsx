import { Suspense } from 'react';
import ReviewsArchive from '../reviews-archive/ReviewsArchive';
import { getReviewItems } from '@/lib/content';
import type { ContentItem } from '@/lib/types';

export default async function ReviewsPage() {
  let reviews: ContentItem[] = [];
  try {
    reviews = await getReviewItems();
    console.log('Fetched reviews:', reviews.length);
  } catch (error) {
    console.error('Error fetching reviews:', error);
  }

  if (reviews.length === 0) {
    return (
      <div className="min-h-screen bg-inherit text-gray-300 flex items-center justify-center">
        <p className="text-xl">No reviews found. Please check the console for more information.</p>
      </div>
    );
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReviewsArchive initialReviews={reviews} />
    </Suspense>
  );
}
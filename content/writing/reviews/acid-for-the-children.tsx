import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'acid-for-the-children',
  slug: 'acid-for-the-children',
  title: 'Acid for the Children',
  subtitle: 'A Memoir by Red Hot Chili Peppers Bassist Flea',
  image: '/images/reviews/acid-for-the-children-cover.webp',
  imageCaption: 'Book cover of Acid for the Children by Flea',
  pageViews: 0,
  type: 'review',
  description: 'A review of Flea\'s raw and honest memoir about his wild youth and the formation of the Red Hot Chili Peppers.',
  content: '', // Add the full review content here
  author: 'Zachary Roth',
  date: '2023-01-15',
  tags: ['Music', 'Autobiography'],
  readTime: 2,
  likes: 0,
  comments: 0,
  shares: 0,
  bookAuthor: 'Flea',
};

const AcidForTheChildren: React.FC = () => {
  return (
    <article>
      <h1>{metadata.title}</h1>
      <h2>{metadata.subtitle}</h2>
      <p>{metadata.description}</p>
      {/* Add more content for the review here */}
    </article>
  );
};

export default AcidForTheChildren;
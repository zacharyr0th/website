import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'alchemy-of-finance',
  slug: 'alchemy-of-finance',
  title: 'Alchemy of Finance',
  subtitle: 'Understanding the World of High Finance',
  image: '/images/reviews/alchemy-of-finance-cover.webp',
  imageCaption: 'Book cover of Alchemy of Finance',
  pageViews: 0,
  type: 'review',
  description: 'A deep dive into the complex world of financial markets and investment strategies.',
  content: '', // Add full review content here
  author: 'Emily Johnson',
  date: '2023-09-10',
  tags: ['Finance', 'Economics', 'Investing'],
  readTime: 6,
  likes: 0,
  comments: 0,
  shares: 0,
  bookAuthor: '', // Add book author name here
};

const AlchemyOfFinance: React.FC = () => {
  return (
    <article>
      <h1>{metadata.title}</h1>
      <h2>{metadata.subtitle}</h2>
      <p>{metadata.description}</p>
      {/* Add more content for the review here */}
    </article>
  );
};

export default AlchemyOfFinance;
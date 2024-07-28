import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'alchemy-of-finance',
  slug: 'alchemy-of-finance',
  title: 'The Alchemy of Finance',
  subtitle: 'Understanding the World of High Finance',
  image: '/images/reviews/alchemy-of-finance.webp',
  imageCaption: 'Book cover of Alchemy of Finance',
  pageViews: 0,
  type: 'review',
  description: 'A deep dive into the complex world of financial markets and investment strategies.',
  content: '', 
  author: 'Zachary Roth',
  date: '2023-09-10',
  tags: ['Finance'],
  readTime: 6,
  likes: 0,
  comments: 0,
  shares: 0,
  bookAuthor: 'George Soros',
};

const AlchemyOfFinance: React.FC = () => {
  return (
    <article>
    </article>
  );
};

export default AlchemyOfFinance;
import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'autobiography-of-benjamin-franklin',
  slug: 'autobiography-of-benjamin-franklin',
  title: 'The Autobiography of Benjamin Franklin',
  subtitle: 'An American Life',
  image: '/images/reviews/autobiography-of-benjamin-franklin.webp',
  imageCaption: 'Book cover of The Autobiography of Benjamin Franklin: An American Life',
  pageViews: 0,
  type: 'review',
  description: 'A review of Benjamin Franklin\'s autobiography of one of America\'s founding fathers.',
  content: '',
  author: 'Zachary Roth',
  bookAuthor: 'Benjamin Franklin',
  date: '2024-01-10',
  tags: ['Autobiography'],
  readTime: 5,
  likes: 0,
  comments: 0,
  shares: 0,
};

const BenFranklin: React.FC = () => {
  return (
    <article>
    </article>
  );
};

export default BenFranklin;
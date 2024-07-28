import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'ben-franklin',
  slug: 'ben-franklin',
  title: 'The Autobiography of Ben Franklin',
  subtitle: 'An American Life',
  image: '/placeholder.webp',
  imageCaption: 'Book cover of Ben Franklin: An American Life',
  pageViews: 0,
  type: 'review',
  description: 'A review of Walter Isaacson\'s biography of one of America\'s founding fathers.',
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
import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'ascent-of-money',
  slug: 'ascent-of-money',
  title: 'Ascent of Money',
  subtitle: 'A Financial History of the World',
  image: '/placeholder.webp',
  imageCaption: 'Book cover of Ascent of Money',
  pageViews: 0,
  type: 'review',
  description: 'A comprehensive look at the evolution of financial systems throughout human history.',
  content: '', 
  author: 'Zachary Roth',
  bookAuthor: 'Nial Ferguson',
  date: 'Aug 2022',
  tags: ['Finance', 'History'],
  readTime: 6,
  likes: 0,
  comments: 0,
  shares: 0,
};

const AscentOfMoney: React.FC = () => {
  return (
    <article>
    </article>
  );
};

export default AscentOfMoney;
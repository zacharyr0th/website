import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'born-standing-up',
  slug: 'born-standing-up',
  title: 'Born Standing Up',
  subtitle: 'A Comic\'s Life',
  image: '/images/reviews/born-standing-up.webp',
  imageCaption: 'Book cover of Born Standing Up by Steve Martin',
  pageViews: 0,
  type: 'review',
  description: 'A review of Steve Martin\'s memoir about his early years in comedy.',
  content: '', 
  author: 'Zachary Roth',
  bookAuthor: 'Steve Martin',
  date: 'Oct 2022',
  tags: ['Autobiography', 'Comedy'],
  readTime: 4,
  likes: 0,
  comments: 0,
  shares: 0,
};

const BornStandingUp: React.FC = () => {
  return (
    <article>
    </article>
  );
};

export default BornStandingUp;
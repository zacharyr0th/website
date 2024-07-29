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
  date: 'Aug 2022',
  tags: ['Autobiography'],
  readTime: 5,
  likes: 0,
  comments: 0,
  shares: 0,
};

const BenFranklin: React.FC = () => {
  return (
    <article>
      <p>It is refreshing to read the personal account of someone level-headed during a time when humanity was not. Meditations by Marcus Aurelius is similar, but that book was boring.</p>

      <p>I'm no Benjamin Franklin historian, but I know he was a frisky individual and a powerful freemason - this book doesn't get into that at all (why would it). It mainly highlights the thought processes of a revolutionary polymath who impacted the trajectory of history.</p>

      <p>You'll like this one if you're into period pieces and history.</p>
    </article>
  );
};

export default BenFranklin;
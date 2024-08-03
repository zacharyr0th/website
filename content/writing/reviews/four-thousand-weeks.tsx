import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'four-thousand-weeks',
  slug: 'four-thousand-weeks',
  title: 'Four Thousand Weeks',
  subtitle: 'Time Management for Mortals',
  image: '/images/reviews/four-thousand-weeks.webp',
  imageCaption: 'Book cover of Four Thousand Weeks by Oliver Burkeman',
  pageViews: 0,
  type: 'review',
  description:
    "A review of Oliver Burkeman's book on time management and the finite nature of human life.",
  content: '',
  author: 'Zachary Roth',
  bookAuthor: 'Oliver Burkeman',
  date: 'Dec 2023',
  tags: ['Philosophy'],
  readTime: 2,
  likes: 0,
  comments: 0,
  shares: 0,
};

const FourThousandWeeks: React.FC = () => {
  return (
    <article>
      <p>
        This was my last audiobook of the year, so it only fits that it's the last book on this
        list.
      </p>

      <p>
        Four Thousand Weeks is a heavy title for a heavy book about death. That number is scary and
        limiting if you think about it, but it is what it is. It's not a bad number; there are no
        bad numbers.
      </p>

      <p>
        Because of that, you never know if you'll get to do everything you want to do. Actually, you
        do know that you will never get to do everything that you want to do. This book highlights
        that fact in its main thesis and rides down the yellow brick road with insights into why
        this situation feels the way it does and why it's important to single out what matters.
      </p>
    </article>
  );
};

export default FourThousandWeeks;

import React from 'react';
import { ContentItem } from '../../../lib/types';
import Image from 'next/image';

export const metadata: ContentItem = {
  id: 'autobiography-of-benjamin-franklin',
  slug: 'autobiography-of-benjamin-franklin',
  title: 'The Autobiography of Benjamin Franklin',
  subtitle: 'Benjamin Franklin',
  image: '/images/reviews/autobiography-of-benjamin-franklin.webp',
  imageCaption: 'Book cover of The Autobiography of Benjamin Franklin: An American Life',
  pageViews: 0,
  type: 'review',
  description:
    "A review of Benjamin Franklin's autobiography of one of America's founding fathers.",
  content: '',
  author: 'Zachary Roth',
  bookAuthor: 'Benjamin Franklin',
  date: 'Aug 2022',
  tags: ['Autobiography', 'History'],
  readTime: 2,
  likes: 0,
  comments: 0,
  shares: 0,
  language: 'en',
};

const BenFranklin: React.FC = () => {
  return (
    <article>
      <Image
        src="/images/reviews/autobiography-of-benjamin-franklin.webp"
        alt="Book cover of The Autobiography of Benjamin Franklin"
        width={500}
        height={300}
      />
      <p>
        It is refreshing to read the personal account of a level-headed individual during a time
        when humanity was not. Meditations by Marcus Aurelius is similar, but this one is funny.
      </p>
      <p>
        I'm no Benjamin Franklin historian, but I know he was a frisky individual and a powerful
        freemason - this book doesn't get into that at all, as it mainly highlights the thought
        processes of a revolutionary polymath who impacted the trajectory of history.
      </p>
      <p>You'll like this one if you're into history.</p>
    </article>
  );
};

export default BenFranklin;

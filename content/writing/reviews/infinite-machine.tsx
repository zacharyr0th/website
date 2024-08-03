import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'infinite-machine',
  slug: 'infinite-machine',
  title: 'The Infinite Machine',
  subtitle: 'How an Army of Crypto-hackers Is Building the Next Internet with Ethereum',
  image: '/images/reviews/infinite-machine.webp',
  imageCaption: 'Book cover of The Infinite Machine by Camila Russo',
  pageViews: 0,
  type: 'review',
  description: "A review of Camila Russo's account of Ethereum's creation and early days.",
  content: '',
  author: 'Zachary Roth',
  bookAuthor: 'Camila Russo',
  date: 'Apr 2023',
  tags: ['Technology', 'History'],
  readTime: 2,
  likes: 0,
  comments: 0,
  shares: 0,
};

const InfiniteMachine: React.FC = () => {
  return (
    <article>
      <p>
        I hold Camila in high regard and have followed the work of her publication Defiant, for some
        time. Infinite Machine is required reading for crypto people. Tech and finance people should
        read it too. It details the origins of Ethereum as observed by people there at the time.
      </p>

      <p>
        The writing is smart and subtle in its delivery, and ample research supports the content.
      </p>

      <p>
        I audiobooked Jobs by Walter Isaacson a few years ago, and all the parts about Steve were
        amazing, but I got sick of hearing about the crew of people surrounding him - which Walter
        spent too much time on. Camila doesn't do that with Ethereum. Vitalik, Charles, Gavin, and
        all the main characters have appropriate amounts of writing allotted to them.
      </p>
    </article>
  );
};

export default InfiniteMachine;

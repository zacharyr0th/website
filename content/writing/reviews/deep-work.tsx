import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'deep-work',
  slug: 'deep-work',
  title: 'Deep Work',
  subtitle: 'Cal Newport',
  image: '/images/reviews/deep-work1.webp',
  imageCaption: 'Book cover of Deep Work by Cal Newport',
  pageViews: 0,
  type: 'review',
  description:
    "A review of Cal Newport's book on the importance of focused, distraction-free work.",
  content: '',
  author: 'Zachary Roth',
  bookAuthor: 'Cal Newport',
  date: 'Nov 2023',
  tags: ['Productivity'],
  readTime: 2,
  likes: 0,
  comments: 0,
  shares: 0,
  language: 'en',
};

const DeepWork: React.FC = () => {
  return (
    <article>

      <p>Good but it's a little too boomery.</p>

      <p>
        Although Cal isn't even a boomer (he was born in 1982), he is very smart; he does succeed in
        imparting a stale perspective on the masses and their technological addictions. Some of what
        I listened to was refreshing, but most of it was obvious - use the least amount of
        technology you need to.
      </p>

      <figure className="my-8">
        <img
          src="/images/reviews/deep-work.webp"
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </figure>

      <p> </p>

      <p>It's a good book, but you don't need to read it.</p>
    </article>
  );
};

export default DeepWork;

import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'hustle-harder-hustle-smarter',
  slug: 'hustle-harder-hustle-smarter',
  title: 'Hustle Harder, Hustle Smarter',
  subtitle: 'Life Lessons from 50 Cent',
  image: '/images/reviews/hustle-harder-hustle-smarter.webp',
  imageCaption: 'Book cover of Hustle Harder, Hustle Smarter by 50 Cent',
  pageViews: 0,
  type: 'review',
  description: "A review of 50 Cent's book on success and personal growth.",
  content: '',
  author: 'Zachary Roth',
  bookAuthor: '50 Cent',
  date: 'May 2023',
  tags: ['Biography'],
  readTime: 2,
  likes: 0,
  comments: 0,
  shares: 0,
};

const HustleHarderHustleSmarter: React.FC = () => {
  return (
    <article>
      <p>
        I started this after finishing a few financial books that burnt me out. This was a good
        in-between book, but I didn't take much away from it. I also skipped around because it was
        getting repetitive.
      </p>

      <p>Then my burnt-out factor wore off - so I was ready to move on to a new book.</p>

      <p>
        I recommend reading this one if you like 50 or know nothing about him, but it's in no way
        required reading. It's a kind of self-help book. Fun fact: my uncle produced a movie that
        starred 50 Cent.
      </p>

      <p>Straight to DVD.</p>
    </article>
  );
};

export default HustleHarderHustleSmarter;

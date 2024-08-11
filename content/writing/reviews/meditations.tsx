import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'meditations',
  slug: 'meditations',
  title: 'Meditations',
  subtitle: 'A Stoic Philosophy Classic',
  image: '/images/reviews/meditations.webp',
  imageCaption: 'Book cover of Meditations by Marcus Aurelius',
  pageViews: 0,
  type: 'review',
  description: "A review of Marcus Aurelius' classic work on Stoic philosophy.",
  content: '',
  author: 'Zachary Roth',
  bookAuthor: 'Marcus Aurelius',
  date: 'May 2023',
  tags: ['Philosophy'],
  readTime: 2,
  likes: 0,
  comments: 0,
  shares: 0,
  language: 'en',
};

const Meditations: React.FC = () => {
  return (
    <article>
      <p>
        I listened to this when I traveled to the Permissionless crypto conference in May. Maybe it
        was the airports or Miami, but I didn't enjoy the experience, although it was likely
        worthwhile.
      </p>

      <p>
        Rather than a book, this content is best delivered in small tidbits, like Buddhist kōans… or
        as a calendar… 😆.
      </p>
    </article>
  );
};

export default Meditations;

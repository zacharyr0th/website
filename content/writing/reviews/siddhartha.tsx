import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'siddhartha',
  slug: 'siddhartha',
  title: 'Siddhartha',
  subtitle: 'An Indian Tale',
  image: '/images/reviews/siddhartha.webp',
  imageCaption: 'Book cover of Siddhartha by Hermann Hesse',
  pageViews: 0,
  type: 'review',
  description: 'A review of Hermann Hesse\'s novel about the spiritual journey of self-discovery.',
  content: '', 
  author: 'Zachary Roth',
  bookAuthor: 'Hermann Hesse',
  date: 'Aug 2023',
  tags: ['Fiction', 'Philosophy', 'Buddhism'],
  readTime: 3,
  likes: 0,
  comments: 0,
  shares: 0,
};

const Siddhartha: React.FC = () => {
  return (
    <article>
      <p>
        I don't have anything novel to say about this book, but it was pretty good. If you like Buddhism but don't know much about it, this would be a good introductory, semi-fictional account for you to wrap your head around - but if you're an avid student of Buddhism, you'll be bored.
      </p>

      <p>
        It's written well for a younger audience. It would be a good required book for high or middle-schoolers. Just replace Metamorphasis with Siddhartha in all the school curriculums out there, and there would probably be more peace in America.
      </p>

      <p>
        Zen and the Art of Motorcycle Maintenance is a better adult exploration of Buddhist thought. I recommend reading that one if you are already familiar with the fundamental principles. 
      </p>
    </article>
  );
};

export default Siddhartha;
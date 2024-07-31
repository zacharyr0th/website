import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'tribes',
  slug: 'tribes',
  title: 'Tribes',
  subtitle: 'We Need You to Lead Us',
  image: '/images/reviews/tribes.webp',
  imageCaption: 'Book cover of Tribes by Seth Godin',
  pageViews: 0,
  type: 'review',
  description: 'A critical review of Seth Godin\'s book on leadership and marketing.',
  content: '', 
  author: 'Zachary Roth',
  bookAuthor: 'Seth Godin',
  date: 'Aug 2023',
  tags: ['Marketing', 'Leadership'],
  readTime: 2,
  likes: 0,
  comments: 0,
  shares: 0,
};

const Tribes: React.FC = () => {
  return (
    <article>
      <p>
        Seth is a marketer and a leader in the field of marketing. Marketers make me roll my eyes, and his catch-all way of explaining things is not my favorite. It's as if he abstracts away the nuance involved and dumbs things down to a point where they become universally valueless.
      </p>

      <p>
        I don't recommend reading Tribes.
      </p>
    </article>
  );
};

export default Tribes;
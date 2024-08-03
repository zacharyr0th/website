import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'liars-poker',
  slug: 'liars-poker',
  title: "Liar's Poker",
  subtitle: 'Rising Through the Wreckage on Wall Street',
  image: '/images/reviews/liars-poker.webp',
  imageCaption: "Book cover of Liar's Poker by Michael Lewis",
  pageViews: 0,
  type: 'review',
  description: "A review of Michael Lewis's insider account of Wall Street culture in the 1980s.",
  content: '',
  author: 'Zachary Roth',
  bookAuthor: 'Michael Lewis',
  date: 'Mar 2023',
  tags: ['Finance'],
  readTime: 2,
  likes: 0,
  comments: 0,
  shares: 0,
};

const LiarsPoker: React.FC = () => {
  return (
    <article>
      <p>
        I wouldn't read this again, but it put Michael Lewis out there, and the world (and
        Hollywood) has benefited from that. It makes me want to write a book, and it should be
        required reading for any finance person.
      </p>
    </article>
  );
};

export default LiarsPoker;

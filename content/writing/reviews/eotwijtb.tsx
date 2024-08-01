import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'eotwijtb',
  slug: 'eotwijtb',
  title: 'The End of the World is Just the Beginning',
  subtitle: 'Mapping the Collapse of Globalization',
  image: '/images/reviews/eotwijtb.webp',
  imageCaption: 'Book cover of The End of the World is Just the Beginning by Peter Zeihan',
  pageViews: 0,
  type: 'review',
  description: 'A review of Peter Zeihan\'s book on the potential collapse of globalization.',
  content: '', 
  author: 'Zachary Roth',
  bookAuthor: 'Peter Zeihan',
  date: 'Jul 2023',
  tags: ['Geopolitics'],
  readTime: 2,
  likes: 0,
  comments: 0,
  shares: 0,
};

const EOTWIJTB: React.FC = () => {
  return (
    <article>
      <p>
        I probably would not have read this book if it was the first of a series. This is because the title reminds me of titles written by James Dale Davidson - one of the authors of the Sovereign Individual, which I reviewed in 40 Audiobooks: Part 1. It seems doomsayery. and that's a red flag to me, BUT, it's a good book.
      </p>

      <p>
        It's an extension of the theses laid out in Peter Zeihan's previous three books, and having read all of them in a row - I was burnt out when I finished this book. If you're into his work and want to read his most up-to-date analysis, subscribe to his newsletter and read The End of the World is Just the Beginning.
      </p>
    </article>
  );
};

export default EOTWIJTB;
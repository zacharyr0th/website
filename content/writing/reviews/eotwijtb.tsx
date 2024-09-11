import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'eotwijtb',
  slug: 'eotwijtb',
  title: 'The End of the World is Just the Beginning',
  subtitle: 'Peter Zeihan',
  image: '/images/reviews/eotwijtb.webp',
  imageCaption: 'Book cover of The End of the World is Just the Beginning by Peter Zeihan',
  pageViews: 0,
  type: 'review',
  description: "A review of Peter Zeihan's book on the potential collapse of globalization.",
  content: '',
  author: 'Zachary Roth',
  bookAuthor: 'Peter Zeihan',
  date: 'Jul 2023',
  tags: ['Geopolitics'],
  readTime: 2,
  likes: 0,
  comments: 0,
  shares: 0,
  language: 'en',
};

const EOTWIJTB: React.FC = () => {
  return (
    <article>
      <p>
        I probably would not have read this book if it was the first of a series. This is because
        the title reminds me of titles written by James Dale Davidson - one of the authors of the
        Sovereign Individual, which I reviewed in 40 Audiobooks: Part 1. It seems doomsayery, and
        that's a red flag to me, BUT, it's a good book.
      </p>

      <p>
        It's an extension of the theses laid out in Peter Zeihan's previous three books, and having
        read all of them in a row - I was burnt out when I finished this book. If you're into his
        work and want to read his most up-to-date analysis, subscribe to his newsletter and read The
        End of the World is Just the Beginning.
      </p>
      <table>
        <thead>
          <tr>
            <th>Book</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><a href="/writing/accidental-superpower">The Accidental Superpower</a></td>
            <td>How the USA found itself in such a dominant position</td>
          </tr>
          <tr>
            <td><a href="/writing/absent-superpower">The Absent Superpower</a></td>
            <td>How the USA began to resign from global affairs and what the world would look like if it removed itself entirely</td>
          </tr>
          <tr>
            <td><a href="/writing/disunited-nations">Disunited Nations</a></td>
            <td>The best of the series. This book details interesting historical events and modern relationships that have occurred between countries other than the US, such as Angola, Argentina, Turkey, and more.</td>
          </tr>
          <tr>
            <td><a href="/writing/eotwijtb">The End of the World is Just the Beginning</a></td>
            <td>This book outlays where Peter thinks the world is going from here.</td>
          </tr>
        </tbody>
      </table>
    </article>
  );
};

export default EOTWIJTB;

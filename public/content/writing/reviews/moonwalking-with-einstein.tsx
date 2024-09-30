import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'moonwalking-with-einstein',
  slug: 'moonwalking-with-einstein',
  title: 'Moonwalking with Einstein',
  subtitle: 'Joshua Foer',
  image: '/images/reviews/moonwalking-with-einstein.webp',
  imageCaption: 'Book cover of Moonwalking with Einstein by Joshua Foer',
  pageViews: 0,
  type: 'review',
  description:
    "A review of Joshua Foer's journey into the world of memory competitions and techniques.",
  content: '',
  author: 'Zachary Roth',
  bookAuthor: 'Joshua Foer',
  date: 'Jan 2023',
  tags: ['Autobiography'],
  readTime: 2,
  likes: 0,
  comments: 0,
  shares: 0,
  language: 'en',
};

const MoonwalkingWithEinstein: React.FC = () => {
  return (
    <article>
      <p>
        In MwE, Joshua Foer breaks down the process of reporting on a memory competition and winning
        it the next year. These competitions involve people memorizing thousands of digits of pi,
        hundreds of pages of poetry, decks of cards (in 1 minute), and more.
      </p>

      <p>
        It's a crazy sport and a crazy reality that people can attain those abilities. I tried using
        the technique of Loci mentioned in this book. I could easily memorize 24 Greek gods and
        goddesses by placing them imaginarily around my apartment and then remembering where they
        were - but I haven't expanded beyond that yet.
      </p>

      <p>
        For more info on that type of thing, check out the official Art of Memory website. If you
        like what you see, read the book. The content is 4/5; the execution is 3/5.
      </p>
    </article>
  );
};

export default MoonwalkingWithEinstein;

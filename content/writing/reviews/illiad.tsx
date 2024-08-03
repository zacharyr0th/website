import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'illiad',
  slug: 'illiad',
  title: 'The Iliad',
  subtitle: 'An Ancient Greek Epic Poem',
  image: '/images/reviews/illiad.webp',
  imageCaption: 'Artistic representation of a scene from The Iliad',
  pageViews: 0,
  type: 'review',
  description: "A review of Homer's ancient Greek epic poem, The Iliad.",
  content: '',
  author: 'Zachary Roth',
  bookAuthor: 'Homer',
  date: 'Sep 2023',
  tags: ['Classic'],
  readTime: 2,
  likes: 0,
  comments: 0,
  shares: 0,
};

const Illiad: React.FC = () => {
  return (
    <article>
      <p>Similar to Dante's Inferno, this was tough to get through.</p>

      <p>
        I'm not an old English or classical literature major, have mercy. Nonetheless, I enjoyed
        what I did listen to, and I gained a greater respect for Homer and all the bards who told
        this epic poem at fire and brimstone meetings.
      </p>

      <p>
        Although I would fail a test on this book, I do feel I have enough of a foundation to see
        its influence on our world today. Maybe I'll read (skim) the Odyssey sometime.
      </p>
    </article>
  );
};

export default Illiad;

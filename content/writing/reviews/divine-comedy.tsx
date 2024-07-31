import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'divine-comedy',
  slug: 'divine-comedy',
  title: 'The Divine Comedy',
  subtitle: '',
  image: '/images/reviews/divine-comedy.webp',
  imageCaption: 'Book cover of The Divine Comedy by Dante Alighieri',
  pageViews: 0,
  type: 'review',
  description: 'A review of Dante Alighieri\'s epic poem.',
  content: '', 
  author: 'Zachary Roth',
  bookAuthor: 'Dante Alighieri',
  date: 'Oct 2023',
  tags: ['Poetry','Classic'],
  readTime: 4,
  likes: 0,
  comments: 0,
  shares: 0,
};

const DivineComedy: React.FC = () => {
  return (
    <article>
      <p>I tried my best to get through this whole thing, but it's a lot.</p>

      <p>Very creepy and good. Historically significant and impressive. This used to be memorized and told over fire and brimstone by bards. They would implement the techniques detailed in Moonwalking with Einstein (40 Audiobooks: Part 2).</p>

      <p>Imagine being present at one of those.</p>
    </article>
  );
};

export default DivineComedy;
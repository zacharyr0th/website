import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'metamorphosis',
  slug: 'metamorphosis',
  title: 'The Metamorphosis',
  subtitle: 'Franz Kafka',
  image: '/images/reviews/metamorphosis.webp',
  imageCaption: 'Book cover of The Metamorphosis by Franz Kafka',
  pageViews: 0,
  type: 'review',
  description: "A critical review of Franz Kafka's surrealist novella, The Metamorphosis.",
  content: '',
  author: 'Zachary Roth',
  bookAuthor: 'Franz Kafka',
  date: 'Aug 2023',
  tags: ['Fiction', 'Classic'],
  readTime: 2,
  likes: 0,
  comments: 0,
  shares: 0,
  language: 'en',
};

const Metamorphosis: React.FC = () => {
  return (
    <article>
      <p>
        This book was not fun. I wanted it to end as soon as I started, and it made me feel like I
        was wasting my time. The symbolism does nothing for me. The most I've ever felt like this
        before was when I read Bob Dylan's book Tarantula, but that was a few years ago so it's not
        included on this list. Tarantula is probably the worst book I've ever read.
      </p>

      <p>
        With that said, Franz seemed like an interesting person, and he died far too young. He was a
        lawyer by day, a writer by night, and he never became famous until after his death. RIP.
      </p>
    </article>
  );
};

export default Metamorphosis;

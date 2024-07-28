// anti-mimetics.tsx

import React from 'react';

export const metadata = {
  id: 'anti-mimetics',
  title: 'Anti-Mimetics',
  subtitle: 'The Science of Resisting Imitation',
  author: 'Sarah Lee',
  date: '2023-11-20',
  image: '/images/reviews/placeholder.jpg',
  imageCaption: 'Book cover of Anti-Mimetics',
  description: 'An exploration of how to resist unconscious imitation in a world of social influence.',
  tags: ['Sci-Fi'],
  readTime: 5,
  likes: 0,
  comments: 0,
  shares: 0,
  type: 'review',
  slug: 'anti-mimetics',
};

const AntiMimetics: React.FC = () => {
  return (
    <article>
      <h1>{metadata.title}</h1>
      <h2>{metadata.subtitle}</h2>
      <p>{metadata.description}</p>
    </article>
  );
};

export default AntiMimetics;
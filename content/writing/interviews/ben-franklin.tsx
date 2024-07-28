// ben-franklin.tsx

import React from 'react';

export const metadata = {
  id: 'ben-franklin',
  title: 'Ben Franklin',
  subtitle: 'An American Life',
  author: 'Lisa Wong',
  bookAuthor: 'Be',
  date: '2024-01-10',
  image: '/images/reviews/placeholder.jpg',
  imageCaption: 'Book cover of Ben Franklin: An American Life',
  description: 'A review of Walter Isaacson\'s biography of one of America\'s founding fathers.',
  tags: ['Biography', 'American History'],
  readTime: 5,
  likes: 0,
  comments: 0,
  shares: 0,
  type: 'review',
  slug: 'ben-franklin',
};

const BenFranklin: React.FC = () => {
  return (
    <article>
      <h1>{metadata.title}</h1>
      <h2>{metadata.subtitle}</h2>
      <p>{metadata.description}</p>
    </article>
  );
};

export default BenFranklin;
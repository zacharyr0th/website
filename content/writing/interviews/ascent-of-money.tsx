// ascent-of-money.tsx

import React from 'react';

export const metadata = {
  id: 'ascent-of-money',
  title: 'Ascent of Money',
  subtitle: 'A Financial History of the World',
  author: 'Zachary Roth',
  bookAuthor: 'Nial Ferguson',
  date: '2023-12-05',
  image: '/placeholder.jpg',
  imageCaption: 'Book cover of Ascent of Money',
  description: 'A comprehensive look at the evolution of financial systems throughout human history.',
  tags: ['Finance', 'History', 'Economics'],
  readTime: 6,
  likes: 0,
  comments: 0,
  shares: 0,
  type: 'review',
  slug: 'ascent-of-money',
};

const AscentOfMoney: React.FC = () => {
  return (
    <article>
      <h1>{metadata.title}</h1>
      <h2>{metadata.subtitle}</h2>
      <p>{metadata.description}</p>
    </article>
  );
};

export default AscentOfMoney;
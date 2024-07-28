// born-standing-up.tsx

import React from 'react';

export const metadata = {
  id: 'born-standing-up',
  title: 'Born Standing Up',
  subtitle: 'A Comic\'s Life',
  author: 'Rachel Green',
  bookAuthor: 'Steve Martin',
  date: '2024-04-01',
  image: '/images/reviews/placeholder.jpg',
  imageCaption: 'Book cover of Born Standing Up by Steve Martin',
  description: 'A review of Steve Martin\'s memoir about his early years in comedy.',
  tags: ['Autobiography', 'Comedy'],
  readTime: 4,
  likes: 0,
  comments: 0,
  shares: 0,
  type: 'review',
  slug: 'born-standing-up',
};

const BornStandingUp: React.FC = () => {
  return (
    <article>
      <h1>{metadata.title}</h1>
      <h2>{metadata.subtitle}</h2>
      <p>{metadata.description}</p>
    </article>
  );
};

export default BornStandingUp;
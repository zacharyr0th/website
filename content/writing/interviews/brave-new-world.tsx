// brave-new-world.tsx

import React from 'react';

export const metadata = {
  id: 'brave-new-world',
  title: 'Brave New World',
  subtitle: 'Aldous Huxley\'s Vision of a Dystopian Future',
  author: 'Zachary Roth',
  bookAuthor: 'Aldous Huxley',
  date: '2024-04-15',
  image: '/images/reviews/placeholder.jpg',
  imageCaption: 'Book cover of Brave New World by Aldous Huxley',
  description: 'A review of Huxley\'s classic novel about a genetically engineered utopian society.',
  tags: ['Literature', 'Science Fiction', 'Dystopia'],
  readTime: 6,
  likes: 0,
  comments: 0,
  shares: 0,
  type: 'review',
  slug: 'brave-new-world',
};

const BraveNewWorld: React.FC = () => {
  return (
    <article>
      <h1>{metadata.title}</h1>
      <h2>{metadata.subtitle}</h2>
      <p>{metadata.description}</p>
    </article>
  );
};

export default BraveNewWorld;
// animal-farm.tsx

import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'animal-farm',
  title: 'Animal Farm',
  subtitle: 'A Political Allegory by George Orwell',
  author: 'Michael Brown',
  date: '2023-10-15',
  image: '/images/reviews/animal-farm-cover.webp',
  imageCaption: 'Book cover of Animal Farm by George Orwell',
  description: 'A review of Orwell\'s classic novel that uses farm animals to satirize totalitarian regimes.',
  tags: ['Satire', 'Classic'],
  readTime: 4,
  likes: 0,
  comments: 0,
  shares: 0,
  type: 'review',
  slug: 'animal-farm',
  pageViews: 0, // Added this line
  content: '', // Added this line
  bookAuthor: 'George Orwell',
};

const AnimalFarm: React.FC = () => {
  return (
    <article>
      <h1>{metadata.title}</h1>
      <h2>{metadata.subtitle}</h2>
      <p>{metadata.description}</p>
      {/* Add more content for the review here */}
    </article>
  );
};

export default AnimalFarm;
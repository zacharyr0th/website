import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'absent-superpower',
  slug: 'absent-superpower',
  title: 'Absent Superpower',
  subtitle: 'An Analysis of Global Power Dynamics',
  image: '/images/reviews/absent-superpower-cover.webp',
  imageCaption: 'Book cover of Absent Superpower',
  pageViews: 0,
  type: 'review',
  description: 'A review of the geopolitical implications of shifting global power structures.',
  content: '', // Add the full review content here
  author: 'Jane Doe',
  date: '2023-07-20',
  tags: ['Politics', 'International Relations'],
  readTime: 4,
  likes: 0,
  comments: 0,
  shares: 0,
  bookAuthor: 'Author Name', // Add the book's author name here
};

const AbsentSuperpower: React.FC = () => {
  return (
    <article>
      <h1>{metadata.title}</h1>
      <h2>{metadata.subtitle}</h2>
      <p>{metadata.description}</p>
      {/* Add more content for the review here */}
    </article>
  );
};

export default AbsentSuperpower;
import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'accidental-superpower',
  slug: 'accidental-superpower',
  title: 'Accidental Superpower',
  subtitle: 'The Unexpected Rise of a Global Force',
  image: '/images/reviews/accidental-superpower-cover.webp',
  imageCaption: 'Book cover of Accidental Superpower',
  pageViews: 0,
  type: 'review',
  description: 'An exploration of how unforeseen circumstances led to the emergence of a new global superpower.',
  content: '', // Add the full review content here
  author: 'John Smith',
  date: '2023-08-05',
  tags: ['Geopolitics', 'History'],
  readTime: 5,
  likes: 0,
  comments: 0,
  shares: 0,
  bookAuthor: 'Author Name', // Add the book's author name here
};

const AccidentalSuperpower: React.FC = () => {
  return (
    <article>
      <h1>{metadata.title}</h1>
      <h2>{metadata.subtitle}</h2>
      <p>{metadata.description}</p>
      {/* Add more content for the review here */}
    </article>
  );
};

export default AccidentalSuperpower;
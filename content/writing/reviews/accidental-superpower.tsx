import React from 'react';
import { ContentItem } from '../../../lib/types';

export const reviewData: ContentItem = {
  id: 'accidental-superpower',
  slug: 'accidental-superpower',
  title: 'The Accidental Superpower',
  subtitle: 'The Unexpected Rise of a Global Force',
  image: '/images/reviews/accidental-superpower.webp',
  imageCaption: 'Prompt: of Accidental Superpower',
  pageViews: 0,
  type: 'review',
  description: 'An exploration of how unforeseen circumstances led to the emergence of a new global superpower.',
  content: '', 
  author: 'Zachary Roth',
  date: 'May 2022',
  tags: ['Geopolitics'],
  readTime: 5,
  likes: 0,
  comments: 0,
  shares: 0,
  bookAuthor: 'Peter Zeihan', 
};

export default function AccidentalSuperpower() {
  return (
    <article>
    </article>
  );
}
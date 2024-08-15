import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'animal-farm',
  slug: 'animal-farm',
  title: 'Animal Farm',
  subtitle: 'George Orwell',
  image: '/images/reviews/animal-farm.webp',
  imageCaption: 'Book cover of Animal Farm by George Orwell',
  pageViews: 0,
  type: 'review',
  description:
    "A review of Orwell's classic novel that uses farm animals to satirize totalitarian regimes.",
  content: '',
  author: 'Zachary Roth',
  date: 'Oct 2022',
  tags: ['Satire', 'Classic'],
  readTime: 2,
  likes: 0,
  comments: 0,
  shares: 0,
  bookAuthor: 'George Orwell',
  language: 'en',
};

const AnimalFarm: React.FC = () => {
  return <article></article>;
};

export default AnimalFarm;

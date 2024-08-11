import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'life-after-google',
  slug: 'life-after-google',
  title: 'Life After Google',
  subtitle: 'The Fall of Big Data and the Rise of the Blockchain Economy',
  image: '/images/reviews/life-after-google.webp',
  imageCaption: 'Book cover of Life After Google by George Gilder',
  pageViews: 0,
  type: 'review',
  description:
    "A review of George Gilder's book on the future of the internet and blockchain technology.",
  content: '',
  author: 'Zachary Roth',
  bookAuthor: 'George Gilder',
  date: 'Oct 2023',
  tags: ['Technology', 'Economics'],
  readTime: 3,
  likes: 0,
  comments: 0,
  shares: 0,
  language: 'en',
};

const LifeAfterGoogle: React.FC = () => {
  return <article>{/* Add your review content here */}</article>;
};

export default LifeAfterGoogle;

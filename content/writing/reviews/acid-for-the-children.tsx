import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'acid-for-the-children',
  slug: 'acid-for-the-children',
  title: 'Acid for the Children',
  subtitle: 'A Memoir by Red Hot Chili Peppers Bassist Flea',
  image: '/images/reviews/acid-for-the-children.webp',
  imageCaption: 'Book cover of Acid for the Children by Flea',
  pageViews: 0,
  type: 'review',
  description:
    "A review of Flea's raw and honest memoir about his wild youth and the formation of the Red Hot Chili Peppers.",
  content: '',
  author: 'Zachary Roth',
  date: 'Jan 2023',
  tags: ['Autobiography', 'Music'],
  readTime: 2,
  likes: 0,
  comments: 0,
  shares: 0,
  bookAuthor: 'Flea',
  language: 'en',
};

const AcidForTheChildren: React.FC = () => {
  return <article></article>;
};

export default AcidForTheChildren;

import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'musicIDE',
  slug: 'musicIDE',
  title: 'MusicIDE',
  subtitle: 'Revolutionizing Music Production with Integrated Development Environments',
  image: '/images/articles/musicIDE-0.webp',
  imageCaption: 'Conceptual image of a music production interface',
  pageViews: 0,
  type: 'article',
  description:
    'An exploration of my annoyances and how Integrated Development Environments will transform the landscape of music production.',
  content: '',
  author: 'Zachary Roth',
  date: 'Aug 2024',
  tags: ['Music', 'Technology'],
  readTime: 10,
  likes: 0,
  comments: 0,
  shares: 0,
  language: 'en',
};

const MusicIDE: React.FC = () => {
  return <article></article>;
};

export default MusicIDE;

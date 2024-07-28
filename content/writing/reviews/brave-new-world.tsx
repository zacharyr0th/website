import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'brave-new-world',
  slug: 'brave-new-world',
  title: 'Brave New World',
  subtitle: 'Aldous Huxley\'s Vision of a Dystopian Future',
  image: '/placeholder.webp',
  imageCaption: 'Book cover of Brave New World by Aldous Huxley',
  pageViews: 0,
  type: 'review',
  description: 'A review of Huxley\'s classic novel about a genetically engineered utopian society.',
  content: '', 
  author: 'Zachary Roth',
  bookAuthor: 'Aldous Huxley',
  date: '2024-04-15',
  tags: ['Dystopia', 'Classic'],
  readTime: 6,
  likes: 0,
  comments: 0,
  shares: 0,
};

const BraveNewWorld: React.FC = () => {
  return (
    <article>
    </article>
  );
};

export default BraveNewWorld;
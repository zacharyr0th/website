import React from 'react';
import { ContentItem } from '../../../lib/types';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: ContentItem = {
  id: 'flash-boys',
  slug: 'flash-boys',
  title: 'Flash Boys',
  subtitle: 'Michael Lewis',
  image: '/images/reviews/flash-boys.webp',
  imageCaption: 'Book cover of Flash Boys by Michael Lewis',
  pageViews: 0,
  type: 'review',
  description: "A review of Michael Lewis's exploration of high-frequency trading on Wall Street.",
  content: '',
  author: 'Zachary Roth',
  bookAuthor: 'Michael Lewis',
  date: 'Jun 2023',
  tags: ['Finance', 'Technology'],
  readTime: 2,
  likes: 0,
  comments: 0,
  shares: 0,
  language: 'en',
};

const FlashBoys: React.FC = () => {
  return (
    <article>
      <p>
        The best book I've read by Michael Lewis. Flash Boys looks deeply into the history and
        infrastructure of the world's quantitative trading networks. Before you could program a
        Python script to trade for you 1000s of times per second, Wall Street had to adopt the
        infrastructure for you to do so.
      </p>

      <p>
        The stories involved in doing that are very interesting, and if you are trying to be a
        trader and don't know about the insights in this book, you're in trouble.
      </p>
    </article>
  );
};

export default FlashBoys;

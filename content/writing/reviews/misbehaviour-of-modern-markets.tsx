import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'misbehaviour-of-modern-markets',
  slug: 'misbehaviour-of-modern-markets',
  title: 'The (Mis)behaviour of Markets',
  subtitle: 'A Fractal View of Risk, Ruin, and Reward',
  image: '/images/reviews/misbehaviour-of-modern-markets.webp',
  imageCaption: 'Book cover of The (Mis)behaviour of Markets by Benoit Mandelbrot',
  pageViews: 0,
  type: 'review',
  description: 'A review of Benoit Mandelbrot\'s application of fractal geometry to financial markets.',
  content: '', 
  author: 'Zachary Roth',
  bookAuthor: 'Benoit Mandelbrot',
  date: 'Feb 2023',
  tags: ['Finance', 'Mathematics'],
  readTime: 3,
  likes: 0,
  comments: 0,
  shares: 0,
};

const MisbehaviourOfModernMarkets: React.FC = () => {
  return (
    <article>
      <p>
        Benoit is one of the world's foremost mathematicians specializing in fractal geometry. He applies his methods to all fields, and algorithms based on his work have found novel patterns in financial markets.
      </p>

      <p>
        This book is pretty dry, but Benoit is so smart that you will regret not coming across it earlier. I read this about ten months ago and don't recall much, but I remember being engaged throughout.
      </p>
    </article>
  );
};

export default MisbehaviourOfModernMarkets;
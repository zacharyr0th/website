import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'seeing-like-a-state',
  slug: 'seeing-like-a-state',
  title: 'Seeing Like a State',
  subtitle: 'How Certain Schemes to Improve the Human Condition Have Failed',
  image: '/images/reviews/slas-0.webp',
  imageCaption: 'Book cover of Seeing Like a State by James C. Scott',
  pageViews: 0,
  type: 'review',
  description: 'A critical review of James C. Scott\'s analysis of state-driven social engineering projects.',
  content: '', 
  author: 'Zachary Roth',
  bookAuthor: 'James C. Scott',
  date: 'Jul 2023',
  tags: ['Politics', 'Sociology'],
  readTime: 3,
  likes: 0,
  comments: 0,
  shares: 0,
};

const SeeingLikeAState: React.FC = () => {
  return (
    <article>
      <p>
        In similar ways to the Sovereign Individual - reviewed in my first issue, Seeing Like a State has worthwhile content but is flawed by the author's arrogance. I don't know if the narrator made it worse, but I did not like the author's narrative voice. No tin foil hat, but definitely elbow patches.
      </p>

      <p>
        There is constant reference to the same example in the book. I was amazed. I would skip to the middle of a chapter, and the author would still be iterating the same points about something from a previous chapter. I was very engaged in the first half of this book but skipped around - and I feel like I lost nothing doing that.
      </p>

      <p>
        Watch a high-quality YouTube video about this book instead of reading it.
      </p>
    </article>
  );
};

export default SeeingLikeAState;
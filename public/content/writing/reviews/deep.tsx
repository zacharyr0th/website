import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'deep',
  slug: 'deep',
  title: 'Deep',
  subtitle: 'James Nestor',
  image: '/images/reviews/deep.webp',
  imageCaption: 'Book cover of Deep by James Nestor',
  pageViews: 0,
  type: 'review',
  description: "A review of James Nestor's exploration of freediving and deep ocean exploration.",
  content: '',
  author: 'Zachary Roth',
  bookAuthor: 'James Nestor',
  date: 'Aug 2023',
  tags: ['Science'],
  readTime: 2,
  likes: 0,
  comments: 0,
  shares: 0,
  language: 'en',
};

const Deep: React.FC = () => {
  return (
    <article>
      <figure className="my-8">
        <img src="/images/reviews/deep.webp" className="w-full h-auto rounded-lg shadow-lg" />
      </figure>
      <p>
        Deep is an interesting deep dive into humanity's relation to different depth levels of the
        oceans.
      </p>
      <p>
        The chapters are titled -30ft, -600ft, etc, and explain what's happening at that depth as
        well as how humans have adapted to it. The first few chapters focus on freediving and the
        limits of what a human body can do underwater. After that, you journey to the bottom of the
        ocean in a submarine.
      </p>
      <p>
        The freediving sections are the best part because you learn about the sparsely reported,
        niche content that the author is so good at bringing to light. He does the same in Breath.
        Freediving was so under-reported that the author became a go to person for the information
        and he comments that he was percieved as an expert in the field even though he had never
        done it himself.
      </p>
      <p>
        Another highlight is the story of James Cameron, the director of Avatar, who visits the
        bottom of an ocean by himself in a submarine. Thats crazy.
      </p>
    </article>
  );
};

export default Deep;

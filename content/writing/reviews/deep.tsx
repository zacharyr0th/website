import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'deep',
  slug: 'deep',
  title: 'Deep',
  subtitle: 'Freediving, Renegade Science, and What the Ocean Tells Us about Ourselves',
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
};

const Deep: React.FC = () => {
  return (
    <article>
      <p>
        This book works well when listened to shortly after Breath - a book also on this list by the
        same author. Breath is more clinical, while Deep is more theoretical.
      </p>

      <p>
        The chapters are titled -30ft, -600ft, etc., and explain what's happening at that depth. The
        first few chapters on freediving explore the absolute limits of what a human body can do
        underwater. After that, you journey to the bottom of the ocean in a submarine.
      </p>

      <p>
        I got Scuba certified in Thailand (2nd cheapest place in the world to do that), so I'm
        familiar with diving and the ocean's wonders, but freediving is a whole other thing. I was
        predisposed to like this book.
      </p>

      <p>
        Freediving to relatively shallow depths sounds amazing, but the competition for people to go
        deeper than others should be discouraged - very scary, dumb, and sad stories come about. The
        freediving sections are the best part of the book because you learn about the sparsely
        reported, niche content that the author is so good at bringing to light. He does the same in
        Breath.
      </p>

      <p>
        Another highlight is the story of James Cameron, the director of Avatar, visiting the bottom
        of an ocean in a submarine by himself. It would make sense if he went there to research or
        find inspiration for Avatar 2.
      </p>

      <p>It mostly takes place under the ocean.</p>
    </article>
  );
};

export default Deep;

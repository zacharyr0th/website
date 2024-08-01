import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'accidental-superpower',
  slug: 'accidental-superpower',
  title: 'The Accidental Superpower',
  subtitle: 'The Next Generation of American Preeminence and the Coming Global Disorder',
  image: '/images/reviews/accidental-superpower.webp',
  imageCaption: 'Prompt: of Accidental Superpower',
  pageViews: 0,
  type: 'review',
  description: 'An exploration of how unforeseen circumstances led to the emergence of a new global superpower.',
  content: '',
  author: 'Zachary Roth',
  date: 'May 2022',
  tags: ['Geopolitics'],
  readTime: 2,
  likes: 0,
  comments: 0,
  shares: 0,
  bookAuthor: 'Peter Zeihan',
};

const AccidentalSuperpower: React.FC = () => {
  return (
    <article>
      <h1>{metadata.title}</h1>
      <h2>{metadata.subtitle}</h2>
      <p>{metadata.description}</p>
      <p>
        Peter is a strong and persuasive speaker. So much so that I think it prevents some people from taking his work seriously because he is, in their mind, too confident in his position to the point of being smarmy. This confidence also shines through his writing and may turn people who disagree with his conclusions off.
      </p>
      <p>
        With that said, I thoroughly enjoyed listening to all four of his books. They felt like a modern history of the relevant economic world, and Peter is insanely well-read. Not just well-read from the perspective of books but also from the perspective of understanding how many Destroyers the US has on a specific body of water at any given time or how many gallons of oil would make any country a net exporter.
      </p>
      <p>
        That's enough of an introduction to his work - the next reviews will be more topical.
      </p>
    </article>
  );
};

export default AccidentalSuperpower;
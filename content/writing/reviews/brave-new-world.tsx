import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'brave-new-world',
  slug: 'brave-new-world',
  title: 'Brave New World',
  subtitle: "Aldous Huxley's Vision of a Dystopian Future",
  image: '/images/reviews/brave-new-world.webp',
  imageCaption: "A monochrome dystopia representing the plot of 'Brave New World'",
  pageViews: 0,
  type: 'review',
  description: "A review of Huxley's classic novel about a genetically engineered utopian society.",
  content: '',
  author: 'Zachary Roth',
  bookAuthor: 'Aldous Huxley',
  date: '2023-05-15',
  tags: ['Dystopia', 'Classic'],
  readTime: 2,
  likes: 0,
  comments: 0,
  shares: 0,
};

const BraveNewWorld: React.FC = () => {
  return (
    <article>
      <p>
        Of the 40 books on this list, Brave New World is the only one I've read before this year. I
        had to read it in high school - I barely did, and I cheated on the test - and then I decided
        to read it again in college because I learned more about how amazing Aldous was.
      </p>

      <p>
        This was my third time reading it, and it was the best one yet. Aldous is one of my favorite
        thinkers - I put his writing ability in the same arena as Keith Jarrett's piano ability -
        and Keith is the best musician of all time.
      </p>

      <p>
        Aldous published this in 1931, and it will still be relevant in 3131 and beyond. While the
        story may seem derivative (since everyone copies him), there's no doubt he ascends to levels
        that C.S. Lewis and company could only dream of.
      </p>
    </article>
  );
};

export default BraveNewWorld;

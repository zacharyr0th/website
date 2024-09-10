import React from 'react';
import { ContentItem } from '../../../lib/types';
import Image from 'next/image';
export const metadata: ContentItem = {
  id: 'brave-new-world',
  slug: 'brave-new-world',
  title: 'Brave New World',
  subtitle: 'Aldous Huxley',
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
  language: 'en',
};

const BraveNewWorld: React.FC = () => {
  return (
    <article>
      <Image
        src="/images/reviews/brave-new-world.webp"
        alt="Book cover of Brave New World by Aldous Huxley"
        width={500}
        height={300}
      />
      <p>
        Brave New World is one of the few books that I've read multiple times. I had to read it in
        high school - I barely did - and then I decided to read it again in college because I
        learned more about how ahead of his time Aldous Huxley was. Now having read it for the third
        time, I can say that it's a must read for anyone.
      </p>
      <p>
        Aldous published this in 1931, and it will still be relevant in 3131 and beyond. While the
        story may seem derivative because everyone copies him, he hit the nail on the head with this
        one.
      </p>
      <p>I suggest jumping to The Island after you finish.</p>
    </article>
  );
};

export default BraveNewWorld;

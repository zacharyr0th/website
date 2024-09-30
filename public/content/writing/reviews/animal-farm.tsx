import React from 'react';
import { ContentItem } from '../../../lib/types';
import Image from 'next/image';

export const metadata: ContentItem = {
  id: 'animal-farm',
  slug: 'animal-farm',
  title: 'Animal Farm',
  subtitle: 'George Orwell',
  image: '/images/reviews/animal-farm.webp',
  imageCaption: 'Book cover of Animal Farm by George Orwell',
  pageViews: 0,
  type: 'review',
  description:
    "A review of Orwell's classic novel that uses farm animals to satirize totalitarian regimes.",
  content: '',
  author: 'Zachary Roth',
  date: 'Oct 2022',
  tags: ['Satire', 'Classic'],
  readTime: 2,
  likes: 0,
  comments: 0,
  shares: 0,
  bookAuthor: 'George Orwell',
  language: 'en',
};

const AnimalFarm: React.FC = () => {
  return (
    <article>
      <Image
        src="/images/reviews/animal-farm.webp"
        alt="Animal Farm by George Orwell"
        width={500}
        height={500}
      />
      <p>
        Animal Farm is a must-read for anyone who wants to understand how power and propaganda work.
        This book is never not timely because what's being satirized is always present somewhere in
        the world.
      </p>
      <p>
        I won't go into much detail here because there are thousands of reviews of this elsewhere ,
        and many people read it in high school. I listened to this as an audiobook and finished it
        in one day.
      </p>
      <p> It's fun, funny, and scary. That's all I'll say.</p>
    </article>
  );
};

export default AnimalFarm;

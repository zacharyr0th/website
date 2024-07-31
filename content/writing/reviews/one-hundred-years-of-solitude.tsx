import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'one-hundred-years-of-solitude',
  slug: 'one-hundred-years-of-solitude',
  title: 'One Hundred Years of Solitude',
  subtitle: 'A Masterpiece of Magical Realism',
  image: '/images/reviews/one-hundred-years-of-solitude.webp',
  imageCaption: 'Book cover of One Hundred Years of Solitude by Gabriel García Márquez',
  pageViews: 0,
  type: 'review',
  description: 'A review of Gabriel García Márquez\'s epic novel spanning seven generations of a family.',
  content: '', 
  author: 'Zachary Roth',
  bookAuthor: 'Gabriel García Márquez',
  date: 'Oct 2023',
  tags: ['Fiction', 'Magical Realism'],
  readTime: 4,
  likes: 0,
  comments: 0,
  shares: 0,
};

const OneHundredYearsOfSolitude: React.FC = () => {
  return (
    <article>
      <p>
        Exhausting but so good. This was in my top 5 this year - and maybe of all time for fiction, but I'll likely never listen to/read it again. It's fantastical, written for an adult audience, and is so imaginative - like a constant barrage of colorfully translated words. Even the family name is colorful, and nearly every character has a 3 part name that rolls off the tongue. It's rhythmically written.
      </p>

      <p>
        The story follows 7 generations of a single family, and so often, when a character is brought up, their full name is spoken, which in audiobook form - is a lot - but it works. The story gets repetitive, but it has a nice button ending and contains interesting descriptors of the external and internal human condition.
      </p>

      <p>
        For fiction enjoyers, this is a must-read.
      </p>
    </article>
  );
};

export default OneHundredYearsOfSolitude;
import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'disunited-nations',
  slug: 'disunited-nations',
  title: 'Disunited Nations',
  subtitle: 'The Scramble for Power in an Ungoverned World',
  image: '/images/reviews/disunited-nations.webp',
  imageCaption: 'Book cover of Disunited Nations by Peter Zeihan',
  pageViews: 0,
  type: 'review',
  description:
    "A review of Peter Zeihan's geopolitical analysis of world powers and their interconnections.",
  content: '',
  author: 'Zachary Roth',
  bookAuthor: 'Peter Zeihan',
  date: 'Jun 2023',
  tags: ['Geopolitics'],
  readTime: 2,
  likes: 0,
  comments: 0,
  shares: 0,
};

const DisunitedNations: React.FC = () => {
  return (
    <article>
      <p>
        If you don't have the capacity for four geopolitical books that build on a singular theme,
        just read this one. Disunited Nations is the least America-focused of the four and paints
        interesting pictures of world powers and their connections to each other.
      </p>

      <p>
        One chapter will be about Argentina; one will be about Turkey; one will be about Angola,
        etc. The book is enlightening because I wasn't aware of most of the facts that Peter Zeihan
        wrote about most of the countries in this book. As I said, there are so many facts so let
        them just come in one ear and see if they stay. Just make sure not to confuse them with the
        conclusions.
      </p>
    </article>
  );
};

export default DisunitedNations;

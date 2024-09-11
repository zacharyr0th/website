import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'disunited-nations',
  slug: 'disunited-nations',
  title: 'Disunited Nations',
  subtitle: 'Peter Zeihan',
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
  language: 'en',
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
      <table>
  <thead>
    <tr>
      <th>Book</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="/writing/reviews/accidental-superpower">The Accidental Superpower</a></td>
      <td>How the USA found itself in such a dominant position</td>
    </tr>
    <tr>
      <td><a href="/writing/reviews/absent-superpower">The Absent Superpower</a></td>
      <td>How the USA began to resign from global affairs and what the world would look like if it removed itself entirely</td>
    </tr>
    <tr>
      <td><a href="/writing/reviews/disunited-nations">Disunited Nations</a></td>
      <td>The best of the series. This book details interesting historical events and modern relationships that have occurred between countries other than the US, such as Angola, Argentina, Turkey, and more.</td>
    </tr>
    <tr>
      <td><a href="/writing/reviews/eotwijtb">The End of the World is Just the Beginning</a></td>
      <td>This book outlays where Peter thinks the world is going from here.</td>
    </tr>
  </tbody>
</table>
    </article>
  );
};

export default DisunitedNations;

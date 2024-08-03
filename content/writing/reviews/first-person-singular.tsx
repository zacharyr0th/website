import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'first-person-singular',
  slug: 'first-person-singular',
  title: 'First Person Singular',
  subtitle: 'Stories',
  image: '/images/reviews/first-person-singular.webp',
  imageCaption: 'Book cover of First Person Singular by Haruki Murakami',
  pageViews: 0,
  type: 'review',
  description: "A review of Haruki Murakami's collection of short stories.",
  content: '',
  author: 'Zachary Roth',
  bookAuthor: 'Haruki Murakami',
  date: 'Jul 2023',
  tags: ['Fiction', 'Short Stories'],
  readTime: 2,
  likes: 0,
  comments: 0,
  shares: 0,
};

const FirstPersonSingular: React.FC = () => {
  return (
    <article>
      <p>
        Haruki is extremely skilled. I was amazed when I read his 1985 novel Hard-boiled Wonderland
        and the End of the World. That book is easily a 5/5 and will forever be in my top 5 fiction
        list.
      </p>

      <p>
        This one, on the other hand, didn't do it for me. Short stories must be punchy, existential,
        or something - but these felt stale. After the first few, I skipped through the rest and
        moved on to the next book.
      </p>

      <p>
        I'm giving 3 stars instead of 2 because Hard-Boiled Wonderland and the End of the World is
        so good.
      </p>
    </article>
  );
};

export default FirstPersonSingular;

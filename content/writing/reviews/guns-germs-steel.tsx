import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'guns-germs-steel',
  slug: 'guns-germs-steel',
  title: 'Guns, Germs, and Steel',
  subtitle: 'The Fates of Human Societies',
  image: '/images/reviews/guns-germs-steel.webp',
  imageCaption: 'Book cover of Guns, Germs, and Steel by Jared Diamond',
  pageViews: 0,
  type: 'review',
  description:
    "A review of Jared Diamond's analysis of how geography and environment shaped human societies.",
  content: '',
  author: 'Zachary Roth',
  bookAuthor: 'Jared Diamond',
  date: 'Sep 2023',
  tags: ['History'],
  readTime: 2,
  likes: 0,
  comments: 0,
  shares: 0,
};

const GunsGermsSteel: React.FC = () => {
  return (
    <article>
      <p>
        I listened to this about four months after finishing all of Peter's books, and it is very
        similar in some areas and very different in others. Jared is more conservative in his
        conclusions than Peter and a more boring author overall. That's not necessarily bad, but its
        not my favorite.
      </p>

      <p>
        So many authors are writing about the topics brought up in this book. I have to give Jared
        credit because I think he started a trend - its economic analysis mixed geopolitics and
        anthropology. The conclusions it reaches are sometimes too clear of a picture for me.
      </p>

      <p>
        This problem reminds me of the famous forest image from Seeing Like a State, a book I
        reviewed in 40 Audiobooks: Part 2.
      </p>
    </article>
  );
};

export default GunsGermsSteel;

import React from 'react';
import { ContentItem } from '../../../lib/types';
import Image from 'next/image';

export const metadata: ContentItem = {
  id: 'breath',
  slug: 'breath',
  title: 'Breath',
  subtitle: 'James Nestor',
  image: '/images/reviews/breath-0.webp',
  imageCaption: 'Book cover of Breath by James Nestor',
  pageViews: 0,
  type: 'review',
  description: "A review of James Nestor's exploration of the science and importance of breathing.",
  content: '',
  author: 'Zachary Roth',
  bookAuthor: 'James Nestor',
  date: 'Jul 2023',
  tags: ['Science', 'Health'],
  readTime: 2,
  likes: 0,
  comments: 0,
  shares: 0,
  language: 'en',
};

const Breath: React.FC = () => {
  return (
    <article>
      <Image
        src="/images/reviews/breath-0.webp"
        alt="Book cover of Breath by James Nestor"
        width={500}
        height={300}
      />
      <p>
        Not once have I been recommended by a teacher, doctor, or wellness resource to nose breathe,
        yet everyone knows that mouth breathing is wrong.
      </p>
      <p>
        James Nestor found out and went above and beyond to explain the importance of nose
        breathing. Unfortunately, modern medical science isn't more focused on this. I've never
        heard about it from a teacher or doctor, even though there is so much proven value in
        breathing correctly. This book details the disastrous effects of mouth breathing and does a
        great job of scaring you into caring. The TLDR is - every time you breathe out of your
        mouth, you're breathing inferior air than if you were to breathe through your nose, and you
        will probably die sooner.
      </p>
      <p>
        The first book by James Nestor, Deep, was described as "renegade science," which gives you
        an idea of how to expect some of it to come across. It gets gross but not too clinical,
        which is helpful because some books about science feel like textbooks and lose the reader.
        This one is an easy listen/read, and it's become a bit of a cult classic with an annual
        Breath retreat in Costa Rica.
      </p>
      <Image
        src="/images/reviews/breath-1.webp"
        alt="Book cover of Breath by James Nestor"
        width={500}
        height={300}
      />
    </article>
  );
};

export default Breath;

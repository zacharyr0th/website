import React from 'react';
import { ContentItem } from '../../../lib/types';
import Image from 'next/image';

export const metadata: ContentItem = {
  id: 'born-standing-up',
  slug: 'born-standing-up',
  title: 'Born Standing Up',
  subtitle: 'Steve Martin',
  image: '/images/reviews/born-standing-up.webp',
  imageCaption: 'Book cover of Born Standing Up by Steve Martin',
  pageViews: 0,
  type: 'review',
  description: "A review of Steve Martin's memoir about his early years in comedy.",
  content: '',
  author: 'Zachary Roth',
  bookAuthor: 'Steve Martin',
  date: 'Oct 2022',
  tags: ['Autobiography'],
  readTime: 2,
  likes: 0,
  comments: 0,
  shares: 0,
  language: 'en',
};

const BornStandingUp: React.FC = () => {
  return (
    <article>
      <Image
        src="/images/reviews/born-standing-up.webp"
        alt="Book cover of Born Standing Up by Steve Martin"
        width={500}
        height={300}
      />
      <p>
        Steve Martin is a legend, but his humor is not always hilarious. I like his personality and
        respect his artistry, so I thought this would be a nice quick autobiography - and it was.
      </p>
      <p>
        As the author and narrator of the audiobook, Steve effectively leads you through the various
        stages of his life in a very empathetic way. He wasn't always a legend, and he's clear about
        that. It's interesting listening to the entire arc where he went from a nobody to being the
        number 1 comedian in the world for some time.
      </p>
      <p>
        He's also a good banjo player as heard{' '}
        <a href="https://www.youtube.com/watch?v=waeO_S928aU&list=RDEMFvT-gsXxdi4UkntJcCJmjg&start_radio=1">
          here
        </a>
        , and he introduces the book with some banjo sounds. If you're a big Steve Martin fan, this
        ones for you.
      </p>
    </article>
  );
};

export default BornStandingUp;

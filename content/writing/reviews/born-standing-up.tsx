import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'born-standing-up',
  slug: 'born-standing-up',
  title: 'Born Standing Up',
  subtitle: 'A Comic\'s Life',
  image: '/images/reviews/born-standing-up.webp',
  imageCaption: 'Book cover of Born Standing Up by Steve Martin',
  pageViews: 0,
  type: 'review',
  description: 'A review of Steve Martin\'s memoir about his early years in comedy.',
  content: '', 
  author: 'Zachary Roth',
  bookAuthor: 'Steve Martin',
  date: 'Oct 2022',
  tags: ['Autobiography', 'Comedy'],
  readTime: 4,
  likes: 0,
  comments: 0,
  shares: 0,
};

const BornStandingUp: React.FC = () => {
  return (
    <article>
      <h1>{metadata.title}</h1>
      <h2>{metadata.subtitle}</h2>
      <p>{metadata.description}</p>
      <p>
        Steve Martin is a legend, but his humor is not hilarious to me. I like his personality and respect his artistry, so I thought this would be a nice quick autobiography - and it was.
      </p>
      <p>
        As the author and narrator, Steve effectively leads you through the various stages of his life in a very empathetic way. He wasn't always a legend, and he's clear about that. It's interesting listening to the entire arc where he went from a nobody to being the number 1 comedian in the world for some time.
      </p>
      <p>
        He also plays banjo, and you can hear it throughout the book, or maybe just at the beginning and end - I don't remember.
      </p>
    </article>
  );
};

export default BornStandingUp;
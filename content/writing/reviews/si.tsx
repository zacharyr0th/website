import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'sovereign-individual',
  slug: 'sovereign-individual',
  title: 'The Sovereign Individual',
  subtitle: 'Mastering the Transition to the Information Age',
  image: '/placeholder.webp',
  imageCaption:
    'Book cover of The Sovereign Individual by James Dale Davidson and William Rees-Mogg',
  pageViews: 0,
  type: 'review',
  description:
    'A critical review of The Sovereign Individual and its predictions about technology and society.',
  content: '',
  author: 'Zachary Roth',
  bookAuthor: 'James Dale Davidson and William Rees-Mogg',
  date: 'Jun 2023',
  tags: ['Technology', 'Philosophy'],
  readTime: 2,
  likes: 0,
  comments: 0,
  shares: 0,
};

const SovereignIndividual: React.FC = () => {
  return (
    <article>
      <p>
        The Sovereign Individual is an important piece of literature with insights everyone should
        know, but it's also a long-winded essay by eurocentric, paranoid doomsayers. Many viewpoints
        about technology's future relationship with humanity have been proven true, or at least
        partially true - which is why the book has so much staying power.
      </p>

      <p>
        It's difficult to say if this resulted from the authors' foresight or if they succeeded at
        landing a few punches while throwing a kitchen sink of ideas at the reader. Most of the book
        is written as a prediction, but claim after claim without evidence is a tiring pursuit.
        Occasionally, the authors venture to theoretical conclusions that have since been proven
        false. An example is all of what they said about Y2K.
      </p>

      <p>
        Having worked in crypto for a few years now, it's clear why this book is so heavily
        relatable to the libertarian ethos in the industry. Crypto enables self-custody, which is a
        central tenet of self-sovereignty, and much of this book centers around that mindset - which
        is great. I myself have written ad nauseam about self-custody here, here, here, here, here,
        and here.
      </p>

      <p>
        It's a good mental exercise and framework to view the world with the mindsets detailed in
        the book, but be wary of the author's vision. You can occasionally feel the elbow patches on
        their suits clash with the tin foil in their hats.
      </p>

      <p>
        To further explain my take on the paranoia perspective, look at Nostradamus' other books.
      </p>

      <p>
        Overall, The Sovereign Individual was a good book worth the read because some of the
        concepts included are profound and ahead of their time. It highlights how technology can
        open doors that didn't exist before, and this book unlocks many of those doors in the
        reader's mind.
      </p>
    </article>
  );
};

export default SovereignIndividual;

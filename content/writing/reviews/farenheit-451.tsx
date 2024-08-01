import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'farenheit-451',
  slug: 'farenheit-451',
  title: 'Fahrenheit 451',
  subtitle: 'A Novel',
  image: '/images/reviews/farenheit-451.webp',
  imageCaption: 'Book cover of Fahrenheit 451 by Ray Bradbury',
  pageViews: 0,
  type: 'review',
  description: 'A critical review of Ray Bradbury\'s dystopian novel.',
  content: '', 
  author: 'Zachary Roth',
  bookAuthor: 'Ray Bradbury',
  date: 'Aug 2023',
  tags: ['Fiction'],
  readTime: 2,
  likes: 0,
  comments: 0,
  shares: 0,
};

const Farenheit451: React.FC = () => {
  return (
    <article>
      <p>Fahrenheit 451 disgracefully fails at trying to be Brave New World. Fahrenheit 451 is a busted Brave New World.</p>

      <p>I don't know what Ray Bradbury was thinking.</p>

      <p>This book came out 22 years after Brave New World and was absolute heresy. I'm being dramatic, but I read this shortly after Brave New World, and I was appalled at how pathetic it was in comparison. The themes are the exact same but dumbed down. The characters are simps, and the story is predictable.</p>

      <p>This book should have been thrown in the fires it talks about.</p>
    </article>
  );
};

export default Farenheit451;
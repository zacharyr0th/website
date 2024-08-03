import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'life-ascending',
  slug: 'life-ascending',
  title: 'Life Ascending',
  subtitle: 'The Ten Great Inventions of Evolution',
  image: '/placeholder.webp',
  imageCaption: 'Book cover of Life Ascending by Nick Lane',
  pageViews: 0,
  type: 'review',
  description:
    "A review of Nick Lane's exploration of the major evolutionary innovations in life's history.",
  content: '',
  author: 'Zachary Roth',
  bookAuthor: 'Nick Lane',
  date: 'Feb 2023',
  tags: ['Science'],
  readTime: 2,
  likes: 0,
  comments: 0,
  shares: 0,
};

const LifeAscending: React.FC = () => {
  return (
    <article>
      <p>
        Nick Lane is a world-class biochemist, and I got a D in chemistry in high school. As a
        result, I had to really pay attention to this one. Each chapter is about an hour long and is
        a dissertation on a complex concept that has naturally evolved, like the eukaryotic cell,
        movement, sex, etc.
      </p>

      <p>
        I came across Nick Lane when I listened to Andrei Karpathy's interview on the Lex Friedman
        podcast. He seems to be deeply influencing Andrei, and that connection is interesting.
        Andrei and the AI world are in some way creating life, or at least entities - and Nick Lane
        is at the top of his field for studying the origin of life. Insights from biochemistry will
        likely fuel AI development.
      </p>

      <p>
        One other note - Nick Lane has repeatedly mentioned the Krebs Cycle as one of the most
        mysterious and purposeful events in the known universe. To my understanding, all biology
        begins with the Krebs Cycle.
      </p>

      <p>
        Well, another fun fact, when I learned about the Krebs Cycle in a 2010 freshman-year high
        school biology class - the granddaughter of the scientist whom it was named after was in my
        class.
      </p>
    </article>
  );
};

export default LifeAscending;

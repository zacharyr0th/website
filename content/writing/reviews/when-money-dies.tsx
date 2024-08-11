import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'when-money-dies',
  slug: 'when-money-dies',
  title: 'When Money Dies',
  subtitle: 'The Nightmare of Deficit Spending, Devaluation, and Hyperinflation in Weimar Germany',
  image: '/images/reviews/when-money-dies.webp',
  imageCaption: 'Book cover of When Money Dies by Adam Fergusson',
  pageViews: 0,
  type: 'review',
  description:
    "A review of Adam Fergusson's book on the hyperinflation in Weimar Germany and its implications.",
  content: '',
  author: 'Zachary Roth',
  bookAuthor: 'Adam Fergusson',
  date: 'Oct 2023',
  tags: ['Finance', 'History'],
  readTime: 2,
  likes: 0,
  comments: 0,
  shares: 0,
  language: 'en',
};

const WhenMoneyDies: React.FC = () => {
  return (
    <article>
      <p>
        Next year I'm going to read Range and Mastery simultaneously. I like reading two books that
        talk about two extremes of one topic. That's what I did with When Money Dies, and it's
        enlightening to see both sides of something play out. I read this alongside The Ascent of
        Money, which is reviewed later.
      </p>

      <p>
        Money means different things to different people, but when it breaks, it's broken. If you're
        in crypto or finance, you should at least skim When Money Dies to see the absolute mayhem
        that ensues when a central bank unabashedly devalues its currency.
      </p>
    </article>
  );
};

export default WhenMoneyDies;

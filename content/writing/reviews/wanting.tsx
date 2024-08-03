import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'wanting',
  slug: 'wanting',
  title: 'Wanting',
  subtitle: 'The Power of Mimetic Desire in Everyday Life',
  image: '/placeholder.webp',
  imageCaption: 'Book cover of Wanting by Luke Burgis',
  pageViews: 0,
  type: 'review',
  description:
    "A review of Luke Burgis's exploration of mimetic desire and its influence on our choices and behaviors.",
  content: '',
  author: 'Zachary Roth',
  bookAuthor: 'Luke Burgis',
  date: 'Dec 2022',
  tags: ['Philosophy'],
  readTime: 2,
  likes: 0,
  comments: 0,
  shares: 0,
};

const Wanting: React.FC = () => {
  return (
    <article>
      <p>
        Wanting provides a comprehensive exploration of mimetic desire, a concept introduced by René
        Girard. Luke Burgis does an excellent job of explaining this complex idea in accessible
        terms, illustrating how our desires are often shaped by the desires of others around us.
      </p>

      <p>
        The book delves into various aspects of life where mimetic desire plays a significant role,
        from career choices to consumer behavior. Burgis offers insights on how to recognize and
        navigate these influences, potentially leading to more authentic decision-making.
      </p>

      <p>
        While the concept is fascinating, at times the book feels repetitive, hammering home the
        same point across different scenarios. Nevertheless, it's a thought-provoking read that
        challenges readers to examine the origins of their own wants and aspirations.
      </p>

      <p>
        Overall, Wanting is a valuable contribution to our understanding of human behavior and
        motivation. It's particularly relevant in our age of social media and constant comparison,
        offering a framework to understand and potentially resist the mimetic pressures we face
        daily.
      </p>
    </article>
  );
};

export default Wanting;

import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'doom',
  slug: 'doom',
  title: 'Doom: The Politics of Catastrophe',
  subtitle: '',
  image: '/images/reviews/doom.webp',
  imageCaption: 'Book cover of Doom: The Politics of Catastrophe by Niall Ferguson',
  pageViews: 0,
  type: 'review',
  description: 'A review of Niall Ferguson\'s book on the politics of disasters.',
  content: '', 
  author: 'Zachary Roth',
  bookAuthor: 'Niall Ferguson',
  date: 'Sep 2023',
  tags: ['Politics', 'History'],
  readTime: 3,
  likes: 0,
  comments: 0,
  shares: 0,
};

const Doom: React.FC = () => {
  return (
    <article>
      <p>Love the title and the author, but the content was so repetitive.</p>

      <p>The book is about the politics of disaster, but it seemed like he just talked about Covid 19 the whole time and made the same points repeatedly. I tried and failed to get through this one. I think I'm not alone in being burnt out on that topic.</p>
    </article>
  );
};

export default Doom;
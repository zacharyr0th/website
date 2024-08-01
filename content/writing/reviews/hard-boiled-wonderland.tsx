import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'hard-boiled-wonderland',
  slug: 'hard-boiled-wonderland',
  title: 'Hard-Boiled Wonderland and the End of the World',
  subtitle: 'A Novel',
  image: '/placeholder.webp',
  imageCaption: 'Book cover of Hard-Boiled Wonderland and the End of the World by Haruki Murakami',
  pageViews: 0,
  type: 'review',
  description: 'A review of Haruki Murakami\'s surrealist novel blending cyberpunk with fantasy.',
  content: '', 
  author: 'Zachary Roth',
  bookAuthor: 'Haruki Murakami',
  date: 'Nov 2023',
  tags: ['Fiction', 'Surrealism'],
  readTime: 4,
  likes: 0,
  comments: 0,
  shares: 0,
};

const HardBoiledWonderland: React.FC = () => {
  return (
    <article>
      <p>
        This book is a masterpiece. I read it in 2019 and have been recommending it ever since. I'm not sure if I should have included it on this list because I didn't listen to it this year, but I did read it, and it's too good not to mention.
      </p>

      <p>
        Haruki Murakami is a genius, and this book is his best work. It's a surrealist novel that blends cyberpunk with fantasy. The story is told in alternating chapters between two parallel narratives. One is set in a dystopian Tokyo, and the other is set in a strange, dreamlike world.
      </p>

      <p>
        The way the two narratives intertwine and eventually converge is mind-bending. The themes of consciousness, identity, and reality are explored in depth. It's a book that will stay with you long after you've finished it.
      </p>

      <p>
        If you're looking for a truly unique and thought-provoking read, I can't recommend this book enough.
      </p>
    </article>
  );
};

export default HardBoiledWonderland;

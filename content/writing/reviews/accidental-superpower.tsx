import React from 'react';
import { ContentItem } from '../../../lib/types';
import Link from 'next/link';

export const metadata: ContentItem = {
  id: 'accidental-superpower',
  slug: 'accidental-superpower',
  title: 'The Accidental Superpower',
  subtitle: 'The Next Generation of American Preeminence and the Coming Global Disorder',
  image: '/images/reviews/accidental-superpower.webp',
  imageCaption: 'Prompt: of Accidental Superpower',
  pageViews: 0,
  type: 'review',
  description:
    'An exploration of how unforeseen circumstances led to the emergence of a new global superpower.',
  content: '',
  author: 'Zachary Roth',
  date: 'May 2022',
  tags: ['Geopolitics'],
  readTime: 2,
  likes: 0,
  comments: 0,
  shares: 0,
  bookAuthor: 'Peter Zeihan',
  language: 'en',
};

const AccidentalSuperpower: React.FC = () => {
  return (
    <article>
      <p>
        Peter Zeihan is a well-known speaker and writer with both private sector and public sector experience. 
        He is a strong and persuasive speaker. So much so that I think it prevents some people
        from taking his work seriously because he is, in their mind, too confident in his position
        to the point of being smarmy and maybe even part of the deep-state depending on the content intake of the reviewer. 
        This confidence is present throughout his writing and may turn people who disagree with his conclusions off. 
        Peter deals a lot in the context of the USA and its relation to the world as well as historical events that have made things how they are. 
        Throughout, he makes conclusive statements that may not always tell the full story or consider the full context of the situation. 
        It makes sense from his perspective as he has a vast knowledge and doesn't have time to get into the details 
        that support each conclusion on every topic because his books would be too long. I don't know enough about most of the topics he covers 
        to have a definitive opinion on his accuracy but nonetheless, he's a good storyteller and has a team of 
        researchers working with him - so I choose to view his work as a representation of a certain school of thought.
      </p>

      <p>
        Peter loudly concludes that the USA is positioned to dominate society for the foreseeable future. With no 
        military threats to the North or South, the strongest natural defense barriers in the world - the Pacific and 
        Atlantic Oceans to the West and East, and the untapped shale beneath its feet, he has some solid arguments. 
        This book is the first of four which are all following the same train of thought and at times, 
        it feels like the counter arguments are not being considered because every road leads to the supremacy 
        of the USA. While it's possible, there are a lot of variables and unknown unknowns that could lead to a different outcome. 
      </p>
      
      <p>
        With that said, I enjoyed listening to all four of his books. They felt like a modern history of the economic world and Peter 
        will drop a lot of interesting facts in between his conclusions. Reviews of each of his books are in this website and below are their TL;DRs. 
      </p>

      <ul>
        <li>
          <Link href="/writing/reviews/accidental-superpower">The Accidental Superpower</Link>
          <p>How the USA found itself in such a dominant position</p>
        </li>
        <li>
          <Link href="/writing/reviews/absent-superpower">The Absent Superpower</Link>
          <p>How the USA began to resign from global affairs and what the world would look like if it removed itself entirely</p>
        </li>
        <li>
          <Link href="/writing/reviews/disunited-nations">Disunited Nations</Link>
          <p>The best of the series. This details interesting historical events and modern relationships that have occurred between countries other than the US, such as Angola, Argentina, Turkey, and more.</p>
        </li>
        <li>
          <Link href="/writing/reviews/eotwijtb">The End of the World is Just the Beginning</Link>
          <p>Where he thinks the world is going from here.</p>
        </li>
      </ul>

      <p>That's enough of an introduction to his work - the next reviews will be more topical.</p>

    </article>
  );
};

export default AccidentalSuperpower;
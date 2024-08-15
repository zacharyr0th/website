import React from 'react';
import { ContentItem } from '../../../lib/types';
import Link from 'next/link';

export const metadata: ContentItem = {
  id: 'accidental-superpower',
  slug: 'accidental-superpower',
  title: 'The Accidental Superpower',
  subtitle: 'Peter Zeihan',
  image: '/images/reviews/accidental-superpower-.webp',
  imageCaption: 'Prompt: of Accidental Superpower',
  pageViews: 0,
  type: 'review',
  description:
    'An exploration of how unforeseen circumstances led to the emergence of a new global superpower.',
  content: '',
  author: 'Zachary Roth',
  date: 'May 2022',
  tags: ['Geopolitics'],
  readTime: 5,
  likes: 0,
  comments: 0,
  shares: 0,
  bookAuthor: 'Peter Zeihan',
  language: 'en',
};

// fix photo
// fix links to other reviews
// add a photo of him

const AccidentalSuperpower: React.FC = () => {
  return (
    <article>
      <p>
        Peter Zeihan is a well-known speaker and writer with private and public-sector experience.
        He is a strong and persuasive speaker to the point where it prevents some people from taking
        his work seriously because he is, in their mind, too confident in his position. He's also
        said some innacurate things about Bitcoin and is considered smarmy at best and even part of
        the deep state at worst, depending on the content intake of the reviewer. This confidence is
        also present throughout his writing and may turn people who disagree with his conclusions
        off. Peter deals a lot with the context of the USA and its relation to the world, as well as
        historical events that have made things what they are. Throughout, he makes conclusive
        statements that don't seem to tell the whole story or consider the full context of the
        situation. It makes sense from his perspective as he has vast knowledge and doesn't have
        time to get into the details that support each conclusion on every topic because his books
        would be too long. I need to learn more about most of the issues he covers to have a
        definitive opinion on his accuracy. Still, he's a good storyteller and has a team of
        researchers working with him - so I choose to view his work as representing a particular
        school of thought.
      </p>
      <p>
        Peter loudly concludes that the USA is positioned to dominate society for the foreseeable
        future. With no military threats to the North or South, the most potent natural defense
        barriers in the world - the Pacific and Atlantic Oceans, and the untapped shale beneath its
        feet - he has some solid arguments. This book is the first of a four-part series, all
        following the same train of thought and, at times, I'd prefer that more counterarguments
        were considered because every road led to the supremacy of the USA. While it's possible and
        maybe even likely, there are a lot of variables and unknown unknowns that could lead to a
        different outcome.
      </p>
      <p>
        With that said, I enjoyed listening to all four of his books. They feel like a modern
        history of the economic world, and Peter drops a lot of exciting facts between his
        conclusions. He also has expansive datasets and interesting charts to support his arguments
        which are available for free on his webiste. I go into more detail into some of those charts
        in later reviews. Check out my reviews of his other books below.
      </p>
      <ul>
        <li>
          <Link href="/writing/reviews/accidental-superpower">The Accidental Superpower</Link>
          <p>How the USA found itself in such a dominant position</p>
        </li>
        <li>
          <Link href="/writing/reviews/absent-superpower">The Absent Superpower</Link>
          <p>
            How the USA began to resign from global affairs and what the world would look like if it
            removed itself entirely
          </p>
        </li>
        <li>
          <Link href="/writing/reviews/disunited-nations">Disunited Nations</Link>
          <p>
            The best of the series. This details interesting historical events and modern
            relationships that have occurred between countries other than the US, such as Angola,
            Argentina, Turkey, and more.
          </p>
        </li>
        <li>
          <Link href="/writing/reviews/eotwijtb">The End of the World is Just the Beginning</Link>
          <p>Where he thinks the world is going from here.</p>
        </li>
      </ul>
      https://www.youtube.com/watch?v=IkuSHOPYQDU
    </article>
  );
};

export default AccidentalSuperpower;

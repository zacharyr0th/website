import React from 'react';
import { ContentItem } from '../../../lib/types';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: ContentItem = {
  id: 'alchemy-of-finance',
  slug: 'alchemy-of-finance',
  title: 'The Alchemy of Finance',
  subtitle: 'George Soros',
  image: '/images/reviews/alchemy-of-finance.webp',
  imageCaption: 'Book cover of Alchemy of Finance',
  pageViews: 0,
  type: 'review',
  description: 'A deep dive into the complex world of financial markets and investment strategies.',
  content: '',
  author: 'Zachary Roth',
  date: 'Sep 2022',
  tags: ['Finance'],
  readTime: 5,
  likes: 0,
  comments: 0,
  shares: 0,
  bookAuthor: 'George Soros',
  language: 'en',
};

const AlchemyOfFinance: React.FC = () => {
  return (
    <article>
      <Image
        src="/images/reviews/alchemy-of-finance.webp"
        alt="Alchemy of Finance by Niall Ferguson"
        width={500}
        height={500}
      />
      <p>
        Alchemy of Finance is a collection of George Soros' essays. It was pretty boring aside from
        the thesis that there exists a reflexivity principle in financial markets, meaning that
        they're self-correcting and that the actions of investors are self-fulfilling prophecies.
        You can probably skip this one and watch a YouTube video instead.
      </p>
      <p>
        I expected to read this book and access the secrets of one of the most controversial
        investors ever. Instead, I was left thinking George was trying things out like the rest of
        us; he's just had more Time and is very intelligent. He is a master macro investor, and
        macro is a specific style of investing that seems easy on the surface but is probably the
        most complicated way to make money in the long run because it takes a lot of knowledge of a
        lot of things to be successful, and also a bit of luck.
      </p>
      <p>
        George has been lucky, but he's also been around. His risk tolerance is high, his predictive
        abilities are strong, and time in the market is better than timing the market.
      </p>

      <h3>Reflexivity</h3>
      <p>
        One thing to note about reflexivity: George discusses an idea called the Participation
        Function, aka 'The Observer Effect.'
      </p>
      <Image
        src="/images/reviews/alchemy-of-finance-1.webp"
        alt="Alchemy of Finance"
        width={500}
        height={500}
      />
      <p>
        The observer affects the observed. In finance, this means that the observations investors
        make affect the market. If many people think a stock will go up, they will buy it, causing
        the price to go up. In conjunction with ideas like mimetic desire, which I go into detail on
        in my review of Luke Burgis' <Link href="/writing/reviews/wanting">Wanting</Link> - this is
        a powerful force.
      </p>

      <h3>Final Thoughts</h3>
      <p>
        Overall, this was forgettable, and I'm unsure what I learned from it. Maybe I wasn't paying
        enough attention
      </p>
    </article>
  );
};

export default AlchemyOfFinance;

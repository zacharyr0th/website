import React from 'react';
import { ContentItem } from '../../../lib/types';
import Image from 'next/image';

export const metadata: ContentItem = {
  id: 'ascent-of-money',
  slug: 'ascent-of-money',
  title: 'Ascent of Money',
  subtitle: 'Niall Ferguson',
  image: '/images/reviews/ascent-of-money.webp',
  imageCaption: 'Book cover of Ascent of Money',
  pageViews: 0,
  type: 'review',
  description:
    'A comprehensive look at the evolution of financial systems throughout human history.',
  content: '',
  author: 'Zachary Roth',
  bookAuthor: 'Nial Ferguson',
  date: 'Aug 2022',
  tags: ['Finance', 'History'],
  readTime: 2,
  likes: 0,
  comments: 0,
  shares: 0,
  language: 'en',
};

const AscentOfMoney: React.FC = () => {
  return (
    <article>
      <Image
        src="/images/reviews/ascent-of-money.webp"
        alt="Ascent of Money by Niall Ferguson"
        width={500}
        height={500}
      />
      <p>
        Niall provides a coherent narrative with interesting historical tidbits sprinkled
        throughout. It would be a good book for an economics or history class.
      </p>
      <p>
        This book gives you some talking points for networking with your banking friends and is a
        good entryway for someone interested in finance. Niall goes into the ramifications of
        historical events, like how the British Empire got rich off of the slave trade and how
        hysterias like tulip mania and the South Sea bubble pop up time and again.
      </p>
      <p>
        It might be advanced for the uninitiated, but it's a great overview of how our monetary
        system has evolved. It was published during the heart of the financial crisis in 2008, so a
        valid question would be, "evolved into what?" It doesn't dabble into any crypto-related
        topics since Bitcoin didn't exist for another year, but cryptocurrency - be that of the
        permissionless or CBDC flavor - is clearly what's next on the menu.
      </p>
    </article>
  );
};

export default AscentOfMoney;

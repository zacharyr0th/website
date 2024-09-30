import React from 'react';
import { ContentItem } from '../../../lib/types';
import Image from 'next/image';
export const metadata: ContentItem = {
  id: 'blockchain-chicken-farm',
  slug: 'blockchain-chicken-farm',
  title: 'Blockchain Chicken Farm',
  subtitle: 'Xiaowei Wang',
  image: '/images/reviews/blockchain-chicken-farm.webp',
  imageCaption: 'Illustration of a high-tech chicken farm',
  pageViews: 0,
  type: 'review',
  description:
    'A review of the book exploring the intersection of advanced technology and rural development in China.',
  content: '',
  author: 'Zachary Roth',
  bookAuthor: 'Xiaowei Wang',
  date: 'June 2022',
  tags: ['Technology'],
  readTime: 5,
  likes: 0,
  comments: 0,
  shares: 0,
  language: 'en',
};

const BlockchainChickenFarm: React.FC = () => {
  return (
    <article>
      <Image
        src="/images/reviews/blockchain-chicken-farm.webp"
        alt="Book cover of Blockchain Chicken Farm"
        width={500}
        height={300}
      />
      <p>
        Depending on how it's used, technology can be viewed as a root of many problems. Rural
        Chinese populations have historically had that mindset but this book provides several
        examples to refute this idea. Farmers are implementing novel solutions, such as using a
        blockchain to maintain the accounting system for a chicken farm, but there is a deeper
        theme.
      </p>
      <p>
        According to the author, those who live in or strive to live in one of the many Chinese
        megapolises are more focused on the future and how technology will solve humanity's problems
        than they are in the present moment or the planet. This contrasts with those deciding to
        live or stay in rural China, where there may be 100-300 million people in a single region.
        The dynamic between the rural Chinese population and the progressive city-dwellers has
        reached a point where mindsets are blending.
      </p>
      <p>
        Historically, Chinese farmers have seen those in the cities wanting to move too fast for
        their good, and the city-dweller have seen the farmers as living too slowly. The farmer's
        perspective was that the planet was already perfect, and it was the farmer's job to maintain
        it while city dwellers worked towards a utopian future. As more city-dwellers have burnt out
        and returned to the country, and the rural population has adopted more technology, the
        mental divide between the two groups lessens.
      </p>
      <p>Both sides have valid points.</p>
      <p>
        The title is a bit click-baitey since there are only a few references to blockchains, but
        nonetheless, it was worth the read.
      </p>
    </article>
  );
};

export default BlockchainChickenFarm;

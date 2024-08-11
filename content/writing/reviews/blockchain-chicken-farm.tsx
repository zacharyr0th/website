import React from 'react';
import { ContentItem } from '../../../lib/types';

export const metadata: ContentItem = {
  id: 'blockchain-chicken-farm',
  slug: 'blockchain-chicken-farm',
  title: 'Blockchain Chicken Farm',
  subtitle: 'Technology and Rural Innovation in China',
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
  readTime: 2,
  likes: 0,
  comments: 0,
  shares: 0,
  language: 'en',
};

const BlockchainChickenFarm: React.FC = () => {
  return (
    <article>
      <p>
        Depending on how it's used, technology can be more of a problem than a solution, and the
        rural Chinese populations have historically had that mindset. This book outlays several
        examples to push back on that claim. Farmers are implementing novel solutions - like using a
        blockchain to maintain the accounting system for a chicken farm, but there is a deeper
        theme.
      </p>

      <p>
        The dynamic between the rural Chinese population and the progressive city-dwellers has
        evolved to the point where mindsets are blending. According to the author, those who live in
        or strive to live in one of the many Chinese megapolises are more focused on the future and
        how technology will solve humanity's problems than they are on the present moment or the
        planet. This contrasts with those growing up in rural China, where there may be 100-300
        million people in a single region. Many are forced to ration food because they must produce
        so much for the cities - a situation that is out of scope for this review but will likely
        turn dire this century.
      </p>

      <p>
        These are generalizations, but the Chinese farmers historically saw those in the cities
        wanting to move too fast for their own good, and the city-dweller saw the farmers as living
        too slowly. The farmer's perspective was that the planet was already perfect, and it was the
        farmer's job to maintain it. As the city-dwellers burn out and return to the country, and
        the rural population adopts technology, the mental divide between the two groups lessens.
        Both sides have valid points, and it's up to the reader to decide if technology is more of a
        problem or a solution.
      </p>

      <p>
        The title is a bit click-baitey since there are only a few references to blockchains, but
        nonetheless, it was worth the read.
      </p>
    </article>
  );
};

export default BlockchainChickenFarm;

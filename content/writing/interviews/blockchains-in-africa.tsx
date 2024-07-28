// blockchains-in-africa.tsx

import React from 'react';

export const metadata = {
  id: 'blockchains-in-africa',
  title: 'Blockchains in Africa',
  subtitle: 'The Impact of Distributed Ledger Technology on the Continent',
  author: 'Kwame Osei',
  date: '2024-03-15',
  image: '/images/reviews/placeholder.jpg',
  imageCaption: 'Book cover of Blockchains in Africa',
  description: 'An analysis of how blockchain technology is transforming various sectors in African countries.',
  tags: ['Technology', 'Africa', 'Blockchain'],
  readTime: 5,
  likes: 0,
  comments: 0,
  shares: 0,
  type: 'review',
  slug: 'blockchains-in-africa',
};

const BlockchainsInAfrica: React.FC = () => {
  return (
    <article>
      <h1>{metadata.title}</h1>
      <h2>{metadata.subtitle}</h2>
      <p>{metadata.description}</p>
    </article>
  );
};

export default BlockchainsInAfrica;
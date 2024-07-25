import { Content } from './types';

export const hardcodedFeaturedArticles: Content[] = [
  {
    id: 'forty-audiobooks',
    slug: 'forty-audiobooks',
    title: 'Forty Audiobooks',
    image: '/writing/new.jpg',
    pageViews: 1000,
    type: 'article'
  },
  {
    id: 'blockchains-in-africa',
    slug: 'blockchains-in-africa',
    title: "Blockchains in Africa",
    image: '/writing/blockchains-in-africa.jpg',
    pageViews: 1000,
    type: 'article'
  },
  {
    id: 'derivatives',
    slug: 'derivatives',
    title: "Derivatives Markets and Spot Prices",
    image: '/writing/derivatives.jpg',
    pageViews: 1000,
    type: 'article'
  }
];

export const CATEGORY_DESCRIPTIONS: { [key: string]: string } = {
  Articles: 'Technology & Finance',
  Reviews: 'Books & Products',
  Interviews: 'Founders & Builders'
};

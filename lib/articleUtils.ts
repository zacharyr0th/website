import { Article } from '@/lib/types';

const dummyArticles: Article[] = [
  {
    id: '1',
    title: 'Featured Article 1',
    excerpt: 'This is a featured article about technology.',
    content: 'Full content here...',
    image: 'https://via.placeholder.com/800x400?text=Featured+Article+1',
    category: 'Technology',
    date: '2023-05-01',
    slug: 'featured-article-1',
    link: '/writing/featured-article-1',
  },
  {
    id: '2',
    title: 'Side Article 1',
    excerpt: 'This is a side article about design.',
    content: 'Full content here...',
    image: 'https://via.placeholder.com/400x300?text=Side+Article+1',
    category: 'Design',
    date: '2023-04-28',
    slug: 'side-article-1',
    link: '/writing/side-article-1',
  },
  {
    id: '3',
    title: 'Side Article 2',
    excerpt: 'This is another side article about programming.',
    content: 'Full content here...',
    image: 'https://via.placeholder.com/400x300?text=Side+Article+2',
    category: 'Programming',
    date: '2023-04-25',
    slug: 'side-article-2',
    link: '/writing/side-article-2',
  },
  {
    id: '4',
    title: 'Regular Article',
    excerpt: 'This is a regular article about web development.',
    content: 'Full content here...',
    image: 'https://via.placeholder.com/400x300?text=Regular+Article',
    category: 'Web Development',
    date: '2023-04-22',
    slug: 'regular-article',
    link: '/writing/regular-article',
  },
];

export function getFeaturedArticles(): Article[] {
  // Return the first 3 articles as featured
  return dummyArticles.slice(0, 3);
}

export function getAllArticles(): Article[] {
  // Placeholder implementation
  return [];
}

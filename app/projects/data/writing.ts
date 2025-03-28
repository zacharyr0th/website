import type { Base, WritingCategory } from '../types/types';

export const WRITING_CATEGORIES: Readonly<Record<WritingCategory, string>> = Object.freeze({
  technical: 'Technical',
  research: 'Research',
});

export interface WritingProject extends Omit<Base, 'category'> {
  readonly publishDate: string;
  readonly readTime: number;
  readonly category: WritingCategory;
  readonly link: string;
}

export const WRITING_PROJECTS: ReadonlyArray<WritingProject> = Object.freeze([
  {
    id: 'birdseye-view',
    title: 'A Birdseye View',
    description: 'Seeing the forest through the trees.',
    link: '/writing/birdseye-view',
    publishDate: '2023-12-01',
    tags: ['technology', 'development'] as const,
    readTime: 5,
    category: 'technical',
    lastUpdated: '2023-12-01',
  },
  {
    id: 'easy-money',
    title: 'Easy Money & Veblen Goods',
    description: 'The reflexivity of value.',
    link: '/writing/easy-money-and-veblen-goods',
    publishDate: '2023-11-15',
    tags: ['blockchain', 'analysis'] as const,
    readTime: 8,
    category: 'research',
    lastUpdated: '2023-11-15',
  },
  {
    id: 'search-engine',
    title: 'Search Engine Turbulence',
    description: 'LLMs and the tumultuous future of search engines.',
    link: '/writing/search-engine-turbulence',
    publishDate: '2023-10-30',
    tags: ['technology', 'ai'] as const,
    readTime: 6,
    category: 'technical',
    lastUpdated: '2023-10-30',
  },
]);

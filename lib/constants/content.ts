import { ContentType, AudioType, WritingCategory } from '../types';

export const ContentTypes: readonly ContentType[] = ['article', 'review', 'project'];
export const AudioTypes: readonly AudioType[] = ['composition', 'dataset', 'recording', 'theory'];

export const writingProjects = [
  {
    id: 'birdseye-view',
    title: 'A Birdseye View',
    description: 'Seeing the forest through the trees.',
    link: '/writing/birdseye-view',
  },
  {
    id: 'easy-money',
    title: 'Easy Money & Veblen Goods',
    description: 'Second order effects of money printing.',
    link: '/writing/easy-money-and-veblen-goods',
  },
  {
    id: 'search-engine',
    title: 'Search Engine Turbulence',
    description: 'LLMs and the tumultuous future of search engines.',
    link: '/writing/search-engine-turbulence',
  },
] as const;

export const WRITING_CATEGORIES: WritingCategory[] = [
  { id: 'tech', name: 'Technology', slug: 'tech' },
  { id: 'blockchain', name: 'Blockchain', slug: 'blockchain' },
  { id: 'finance', name: 'Finance', slug: 'finance' },
  { id: 'music', name: 'Music', slug: 'music' },
] as const;

export const CONFIG = {
  maxContentLength: 1000,
  supportedFileTypes: ['mp3', 'wav', 'ogg'] as const,
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },
  visibleProjects: 6,
} as const; 
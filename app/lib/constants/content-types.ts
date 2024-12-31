import type {
  ContentType,
  AudioType,
  WritingCategory,
  ProjectCategory,
} from '@/app/lib/types/types';

export const ContentTypes: readonly ContentType[] = ['article', 'review', 'project', 'audio'];
export const AudioTypes: readonly AudioType[] = [
  'composition',
  'dataset',
  'recording',
  'theory',
  'song',
  'album',
  'playlist',
];

export const WRITING_CATEGORIES: WritingCategory[] = [
  { id: 'tech', name: 'Technology', slug: 'tech' },
  { id: 'blockchain', name: 'Blockchain', slug: 'blockchain' },
  { id: 'finance', name: 'Finance', slug: 'finance' },
  { id: 'music', name: 'Music', slug: 'music' },
  { id: 'development', name: 'Development', slug: 'development' },
  { id: 'tutorial', name: 'Tutorial', slug: 'tutorial' },
  { id: 'analysis', name: 'Analysis', slug: 'analysis' },
] as const;

export const PROJECT_CATEGORIES: Record<ProjectCategory, string> = {
  web: 'Web Development',
  mobile: 'Mobile Development',
  blockchain: 'Blockchain',
  ai: 'Artificial Intelligence',
  system: 'System Programming',
  tools: 'Developer Tools',
  other: 'Other Projects',
} as const;

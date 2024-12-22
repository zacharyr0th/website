export const ContentTypes: readonly ContentType[] = ['article', 'review', 'project'];
export const AudioTypes: readonly AudioType[] = ['composition', 'dataset', 'recording', 'theory'];

export const WRITING_CATEGORIES: WritingCategory[] = [
  { id: 'tech', name: 'Technology', slug: 'tech' },
  { id: 'blockchain', name: 'Blockchain', slug: 'blockchain' },
  { id: 'finance', name: 'Finance', slug: 'finance' },
  { id: 'music', name: 'Music', slug: 'music' },
] as const; 
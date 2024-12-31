import path from 'path';

export const ARTICLE_CONFIG = {
  directory: path.join(process.cwd(), 'public/articles'),
  maxDescriptionLength: 200,
  maxTitleLength: 100,
  maxFileSize: 1024 * 1024 * 5, // 5MB max file size
  allowedCategories: [
    'technology',
    'finance',
    'blockchain',
    'development',
    'tutorial',
    'crypto',
    'defi',
    'analysis',
  ] as const,
  allowedTags: [
    'web3',
    'blockchain',
    'defi',
    'programming',
    'tutorial',
    'guide',
    'analysis',
    'opinion',
    'crypto',
    'finance',
    'technology',
    'development',
  ] as const,
} as const;

export type Category = 'crypto' | 'ai' | 'systems' | 'devtools' | 'webdev';

export interface Base {
  id: string;
  title: string;
  description: string;
  tags: readonly string[];
  lastUpdated: string;
}

export interface Learning extends Base {
  technologies: readonly string[];
  features: readonly string[];
  status: 'functional' | 'in-progress';
  highlight?: boolean;
  githubLink?: string;
  articleLink?: string;
  demoLink?: string;
  link?: string;
  category: Category;
}

export interface Writing extends Base {
  link: string;
  publishDate: string;
  readTime: number;
  category?: WritingCategory;
}

export type WritingCategory = 'technical' | 'research';

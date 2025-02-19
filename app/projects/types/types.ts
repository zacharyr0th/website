export type ProjectCategory = 'crypto' | 'ai' | 'tools' | 'web';
export type WritingCategory = 'technical' | 'research';

export interface Base {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly tags: ReadonlyArray<string>;
  readonly lastUpdated?: string;
}

export interface BaseProject {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly tags: ReadonlyArray<string>;
  readonly status: 'completed' | 'in-progress' | 'planned' | 'Functional' | 'WiP';
  readonly link?: string;
  readonly publishDate?: string;
  readonly githubLink?: string;
  readonly articleLink?: string;
  readonly demoLink?: string;
  readonly categories: ReadonlyArray<ProjectCategory>;
}

export const PROJECT_CATEGORIES: Readonly<Record<ProjectCategory, string>> = {
  crypto: 'Crypto',
  ai: 'AI',
  tools: 'Tools',
  web: 'Web',
} as const;

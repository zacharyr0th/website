import { z } from 'zod';

// Constants
export const PROJECT_CATEGORIES = {
  CRYPTO: 'crypto',
  AI: 'ai',
  TOOLS: 'tools',
  WEB: 'web',
} as const;

export const PROJECT_STATUS = {
  COMPLETED: 'completed',
  IN_PROGRESS: 'in-progress',
  PLANNED: 'planned',
  FUNCTIONAL: 'Functional',
  WIP: 'WiP',
} as const;

// Types
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[keyof typeof PROJECT_CATEGORIES];
export type ProjectStatus = (typeof PROJECT_STATUS)[keyof typeof PROJECT_STATUS];

export interface BaseProject {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly tags: ReadonlyArray<string>;
  readonly status: ProjectStatus;
  readonly link?: string;
  readonly publishDate?: string;
  readonly githubLink?: string;
  readonly articleLink?: string;
  readonly demoLink?: string;
  readonly categories: ReadonlyArray<ProjectCategory>;
}

// Validation Schema
export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  status: z.enum([
    PROJECT_STATUS.COMPLETED,
    PROJECT_STATUS.IN_PROGRESS,
    PROJECT_STATUS.PLANNED,
    PROJECT_STATUS.FUNCTIONAL,
    PROJECT_STATUS.WIP,
  ]),
  link: z.string().url().optional(),
  publishDate: z.string().optional(),
  githubLink: z.string().url().optional(),
  articleLink: z.string().optional(),
  demoLink: z.string().url().optional(),
  categories: z.array(
    z.enum([
      PROJECT_CATEGORIES.CRYPTO,
      PROJECT_CATEGORIES.AI,
      PROJECT_CATEGORIES.TOOLS,
      PROJECT_CATEGORIES.WEB,
    ])
  ),
});

// Category Display Names
export const CATEGORY_DISPLAY_NAMES: Record<ProjectCategory, string> = {
  [PROJECT_CATEGORIES.CRYPTO]: 'Crypto',
  [PROJECT_CATEGORIES.AI]: 'AI',
  [PROJECT_CATEGORIES.TOOLS]: 'Tools',
  [PROJECT_CATEGORIES.WEB]: 'Web',
};

// Projects Data
export const PROJECTS = Object.freeze([
  {
    id: 'chrome-console',
    title: 'Chrome Console',
    description: 'A secure MCP Server connecting Chrome console logs to your IDE.',
    tags: ['MCP', 'Debugging'],
    githubLink: 'https://github.com/zacharyr0th/chrome-console',
    demoLink: '',
    status: PROJECT_STATUS.FUNCTIONAL,
    categories: [PROJECT_CATEGORIES.TOOLS, PROJECT_CATEGORIES.WEB, PROJECT_CATEGORIES.AI],
  },
  {
    id: 'webgl-patterns',
    title: 'WebGL Patterns',
    description: 'Shaders with interactive elements.',
    tags: ['WebGL', 'Animation'],
    githubLink: 'https://github.com/zacharyr0th/glsl-portfolio',
    demoLink: '',
    status: PROJECT_STATUS.FUNCTIONAL,
    categories: [PROJECT_CATEGORIES.WEB, PROJECT_CATEGORIES.TOOLS],
  },
  {
    id: 'crypto-repos',
    title: 'Crypto Repos',
    description: 'A directory of open source crypto projects.',
    tags: ['GraphQL', 'Hasura'],
    githubLink: 'https://github.com/zacharyr0th/crypto-repos',
    demoLink: 'https://www.crypto-repos.com/',
    status: PROJECT_STATUS.WIP,
    categories: [PROJECT_CATEGORIES.CRYPTO, PROJECT_CATEGORIES.WEB],
  },
  {
    id: 'FinSync',
    title: 'FinSync',
    description: 'A unified financial dashboard.',
    tags: ['Auth', 'Fintech'],
    githubLink: 'https://github.com/zacharyr0th/finsync',
    demoLink: '',
    status: PROJECT_STATUS.WIP,
    categories: [PROJECT_CATEGORIES.WEB],
  },
  {
    id: 'zacharyr0th-com',
    title: 'zacharyr0th.com',
    description: 'A feature-rich personal website.',
    link: 'https://zacharyr0th.com',
    tags: ['Blog', 'Streaming'],
    githubLink: 'https://github.com/zacharyr0th/website',
    demoLink: '',
    status: PROJECT_STATUS.FUNCTIONAL,
    categories: [PROJECT_CATEGORIES.WEB],
  },
  {
    id: 'toml-tools',
    title: 'TOML Tools',
    description: 'A data visualization toolkit.',
    tags: ['Python', 'Web Scraping'],
    githubLink: 'https://github.com/zacharyr0th/toml-tools',
    demoLink: '',
    status: PROJECT_STATUS.FUNCTIONAL,
    categories: [PROJECT_CATEGORIES.TOOLS],
  },
  {
    id: 'simple-os',
    title: 'SimpleOS',
    description: 'The basics of an x86 operating system.',
    tags: ['C', 'Assembly', 'Kernels'],
    githubLink: 'https://github.com/zacharyr0th/simple-os',
    demoLink: '',
    articleLink: '/writing/simple-os',
    status: PROJECT_STATUS.FUNCTIONAL,
    categories: [PROJECT_CATEGORIES.TOOLS],
  },
  {
    id: 'music-ide',
    title: 'MusicIDE',
    description: 'A music development and research environment.',
    tags: ['Music Theory', 'NLP'],
    githubLink: '',
    demoLink: '',
    articleLink: '/writing/musicide',
    status: PROJECT_STATUS.WIP,
    categories: [PROJECT_CATEGORIES.AI, PROJECT_CATEGORIES.TOOLS],
  },
  {
    id: 'casino-time',
    title: 'CasinoTime',
    description: 'Trustless gambling.',
    tags: ['Aptos', 'Gaming', 'Three.JS'],
    githubLink: '',
    demoLink: '',
    status: PROJECT_STATUS.WIP,
    categories: [PROJECT_CATEGORIES.CRYPTO],
  },
] as const) satisfies ReadonlyArray<BaseProject>;

// Utility Functions
export const getFeaturedProjects = (limit = 6): ReadonlyArray<BaseProject> => {
  return PROJECTS.slice(0, limit);
};

// Type guard
export const isValidProject = (project: unknown): project is BaseProject => {
  return ProjectSchema.safeParse(project).success;
};

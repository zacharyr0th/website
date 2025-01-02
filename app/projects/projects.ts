export type ProjectCategory = 'crypto' | 'ai' | 'systems' | 'devtools' | 'webdev';
export type WritingCategory = 'technical' | 'research';

export interface BaseProject {
  id: string;
  title: string;
  description: string;
  tags: string[];
  technologies: string[];
  status: 'completed' | 'in-progress' | 'planned' | 'Functional' | 'WIP';
  link?: string;
  lastUpdated?: string;
  publishDate?: string;
  githubLink?: string;
  articleLink?: string;
  demoLink?: string;
  features?: string[];
}

export interface LearningProject extends BaseProject {
  type: 'learning';
  category: ProjectCategory;
}

export interface WritingProject extends BaseProject {
  type: 'writing';
  readTime: string;
  category: WritingCategory;
}

export type ProjectType = LearningProject | WritingProject;

export const PROJECT_CATEGORIES: Readonly<Record<ProjectCategory, string>> = {
  crypto: 'Crypto',
  ai: 'AI',
  systems: 'Systems',
  devtools: 'DevTools',
  webdev: 'Web Dev',
};

export const WRITING_CATEGORIES: Readonly<Record<WritingCategory, string>> = {
  technical: 'Technical',
  research: 'Research',
};

export const PROJECTS: LearningProject[] = [
  {
    id: 'zacharyr0th-com',
    title: 'zacharyr0th.com',
    description: 'A modern, responsive personal website built with Next.js and TypeScript.',
    link: 'https://zacharyr0th.com',
    tags: ['Next.js', 'TypeScript', 'React', 'TailwindCSS'],
    technologies: ['Next.js', 'TypeScript', 'React', 'TailwindCSS'],
    features: ['Server-side rendering', 'Dark mode', 'Responsive design'],
    githubLink: 'https://github.com/zacharyr0th/website',
    lastUpdated: '2024-03-20',
    status: 'Functional',
    category: 'webdev',
    type: 'learning',
  },
  {
    id: 'simple-os',
    title: 'SimpleOS',
    description: 'An x86 operating system implementation featuring core OS components.',
    tags: ['C', 'Assembly', 'Kernels'],
    technologies: ['C', 'Assembly', 'QEMU'],
    features: ['Bootloader', 'Kernel', 'Basic shell', 'Memory management', 'Interrupt handling'],
    githubLink: 'https://github.com/zacharyr0th/simple-os',
    demoLink: '',
    lastUpdated: '2023-03-20',
    articleLink: '/writing/simple-os',
    status: 'Functional',
    category: 'systems',
    type: 'learning',
  },
  {
    id: 'toml-tools',
    title: 'TOML Tools',
    description:
      'Analytics toolkit for parsing and visualizing ecosystem data from Electric Capital.',
    tags: ['Python', 'Data Analysis'],
    technologies: ['Python', 'Web Scraping', 'Data Analysis'],
    features: ['TOML parsing', 'Interactive visualizations', 'Automated reporting'],
    githubLink: 'https://github.com/zacharyr0th/toml-tools',
    demoLink: '',
    lastUpdated: '2023-04-10',
    status: 'Functional',
    category: 'devtools',
    type: 'learning',
  },
  {
    id: 'music-ide',
    title: 'MusicIDE',
    description:
      'AI-powered music development environment combining intelligent suggestions with interactive visualization and theory analysis.',
    tags: ['Next.js', 'TypeScript', 'Music Theory'],
    technologies: ['Next.js', 'TypeScript', 'Music Theory'],
    features: [
      'Real-time AI assistance',
      'Theory analysis',
      'Interactive notation',
      'Knowledge graph',
    ],
    githubLink: '',
    demoLink: '',
    lastUpdated: '2023-03-10',
    articleLink: '/writing/musicide',
    status: 'WIP',
    category: 'ai',
    type: 'learning',
  },
  {
    id: 'privvy',
    title: 'Privvy',
    description:
      'Privacy-first DEX built on Aleo leveraging zero-knowledge proofs to enable confidential trading while maintaining decentralization.',
    tags: ['Aleo', 'Zero-knowledge', 'DeFi'],
    technologies: ['Aleo', 'Next.js', 'TypeScript'],
    features: ['Private transactions', 'AMM pools', 'Cross-chain bridges', 'Proof generation'],
    githubLink: '',
    demoLink: '',
    lastUpdated: '2023-02-28',
    status: 'WIP',
    category: 'crypto',
    type: 'learning',
  },
  {
    id: 'casino-time',
    title: 'CasinoTime',
    description:
      'Trustless gambling platform on Aptos combining verifiable randomness with zero-knowledge proofs for transparent, fair gaming.',
    tags: ['Aptos', 'Gaming'],
    technologies: [
      'Move',
      'React',
      'Aptos Typescript SDK',
      'Aptos Randomness',
      'Zero-knowledge proofs',
    ],
    features: [
      'Verifiable randomness',
      'Multi-game support',
      'P2P poker rooms',
      'Automated payouts',
    ],
    githubLink: '',
    demoLink: '',
    lastUpdated: '2023-04-01',
    status: 'WIP',
    category: 'crypto',
    type: 'learning',
  },
] as const;

export const writingProjects: WritingProject[] = [
  {
    id: 'simple-os-article',
    title: 'Building a Simple OS from Scratch',
    description: 'A deep dive into operating system fundamentals through hands-on implementation.',
    tags: ['OS Development', 'C', 'Assembly'],
    technologies: [],
    status: 'completed',
    type: 'writing',
    category: 'technical',
    readTime: '15 min',
  },
  {
    id: 'music-theory',
    title: 'Computational Music Theory',
    description: 'Exploring the intersection of computer science and music theory.',
    link: '/writing/music-theory',
    publishDate: '2023-04-15',
    tags: ['Music Theory', 'Computer Science', 'AI'],
    technologies: [],
    status: 'completed',
    category: 'technical',
    type: 'writing',
    readTime: '12 min',
  },
];

export const WRITING_PROJECTS: readonly WritingProject[] = [
  {
    id: 'search-engine-turbulence',
    title: 'Search Engine Turbulence',
    description: 'LLMs and the Future of Search Engines',
    tags: ['AI', 'Search', 'LLMs'],
    technologies: ['GPT-4', 'Claude', 'Bing'],
    status: 'completed',
    category: 'technical',
    type: 'writing',
    readTime: '5 min',
  },
];

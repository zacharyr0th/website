export type ProjectCategory = 'crypto' | 'ai' | 'tools' | 'web';

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

export const PROJECT_CATEGORIES: Readonly<Record<ProjectCategory, string>> = Object.freeze({
  crypto: 'Crypto',
  ai: 'AI',
  tools: 'Tools',
  web: 'Web',
});

export const PROJECTS: ReadonlyArray<BaseProject> = Object.freeze([
  {
    id: 'zacharyr0th-com',
    title: 'zacharyr0th.com',
    description: 'A modern personal website built with Next.js and TypeScript.',
    link: 'https://zacharyr0th.com',
    tags: ['Next.js', 'TypeScript', 'Tailwind'],
    githubLink: 'https://github.com/zacharyr0th/website',
    status: 'Functional',
    categories: ['web'],
  },
  {
    id: 'simple-os',
    title: 'SimpleOS',
    description: 'An x86 operating system implementation featuring core OS components.',
    tags: ['C', 'Assembly', 'Kernels'],
    githubLink: 'https://github.com/zacharyr0th/simple-os',
    demoLink: '',
    articleLink: '/writing/simple-os',
    status: 'Functional',
    categories: ['tools'],
  },
  {
    id: 'toml-tools',
    title: 'TOML Tools',
    description:
      'Analytics toolkit for parsing and visualizing ecosystem data from Electric Capital.',
    tags: ['Python', 'Data Analysis'],
    githubLink: 'https://github.com/zacharyr0th/toml-tools',
    demoLink: '',
    status: 'Functional',
    categories: ['crypto', 'tools'],
  },
  {
    id: 'music-ide',
    title: 'MusicIDE',
    description:
      'AI-powered music development environment combining intelligent suggestions with interactive visualization and theory analysis.',
    tags: ['Next.js', 'TypeScript', 'Music Theory'],
    githubLink: '',
    demoLink: '',
    articleLink: '/writing/musicide',
    status: 'WiP',
    categories: ['ai', 'tools'],
  },
  {
    id: 'privvy',
    title: 'Privvy',
    description:
      'Privacy-first DEX built on Aleo leveraging zero-knowledge proofs to enable confidential trading while maintaining decentralization.',
    tags: ['Aleo', 'Zero-knowledge', 'DeFi'],
    githubLink: '',
    demoLink: '',
    status: 'WiP',
    categories: ['crypto'],
  },
  {
    id: 'casino-time',
    title: 'CasinoTime',
    description:
      'Trustless gambling platform on Aptos combining verifiable randomness with zero-knowledge proofs for transparent, fair gaming.',
    tags: ['Aptos', 'Gaming'],
    githubLink: '',
    demoLink: '',
    status: 'WiP',
    categories: ['crypto'],
  },
]);

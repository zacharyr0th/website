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
    id: 'portfolio',
    title: 'Portfolio',
    description: 'A dashboard integrating banks, brokers, CEXes, and blockchains.',
    tags: ['Next.js', 'Blockchains', 'Plaid'],
    githubLink: 'https://github.com/zacharyr0th/portfolio',
    demoLink: '',
    status: 'WiP',
    categories: ['crypto', 'web'],
  },
  {
    id: 'crypto-repos',
    title: 'Crypto Repos',
    description: 'A directory of over 125,000 crypto projects and resources.',
    tags: ['Next.js', 'TypeScript', 'Tailwind'],
    githubLink: '',
    demoLink: '',
    status: 'WiP',
    categories: ['crypto', 'web'],
  },
  {
    id: 'casino-time',
    title: 'CasinoTime',
    description:
      'Trustless gambling on Aptos, combining randomness with zero-knowledge proofs.',
    tags: ['Aptos', 'Gaming'],
    githubLink: '',
    demoLink: '',
    status: 'WiP',
    categories: ['crypto'],
  },
  {
    id: 'privvy',
    title: 'Privvy',
    description:
      'Privacy-first DEX built on the zk-forward Aleo blockchain.',
    tags: ['Aleo', 'Zero-knowledge', 'DeFi'],
    githubLink: '',
    demoLink: '',
    status: 'WiP',
    categories: ['crypto'],
  },
  {
    id: 'music-ide',
    title: 'MusicIDE',
    description:
      'AI-powered music development and research environment.',
    tags: ['Next.js', 'TypeScript', 'Theory'],
    githubLink: '',
    demoLink: '',
    articleLink: '/writing/musicide',
    status: 'WiP',
    categories: ['ai', 'tools'],
  },
]);

// Get the featured projects for the home page (limited to 6)
export const getFeaturedProjects = (): ReadonlyArray<BaseProject> => {
  // First get completed and functional projects
  const completedProjects = PROJECTS.filter(
    project => project.status === 'completed' || project.status === 'Functional'
  );

  // If we have 6 or more completed projects, return first 6
  if (completedProjects.length >= 6) {
    return completedProjects.slice(0, 6);
  }

  // Otherwise, get additional WiP projects to fill the remaining slots
  const wipProjects = PROJECTS.filter(
    project => project.status === 'WiP' || project.status === 'in-progress'
  );

  // Combine completed and WiP projects, taking only enough WiP projects to reach 6 total
  return [
    ...completedProjects,
    ...wipProjects.slice(0, 6 - completedProjects.length)
  ];
};

import type { LearningProject, WritingProject } from '@/app/lib/types/types';

export const PROJECTS: LearningProject[] = [
  {
    id: 'zacharyr0th-com',
    title: 'Personal Website',
    description: 'A modern, responsive personal website built with Next.js and TypeScript.',
    link: 'https://zacharyr0th.com',
    tags: ['Next.js', 'TypeScript', 'React', 'TailwindCSS'],
    technologies: ['Next.js', 'TypeScript', 'React', 'TailwindCSS'],
    features: ['Server-side rendering', 'Dark mode', 'Responsive design'],
    githubLink: 'https://github.com/zacharyr0th/website',
    lastUpdated: '2024-03-20',
  },
  {
    id: 'simple-os',
    title: 'SimpleOS',
    description:
      'Educational x86 operating system implementation featuring core OS components built from scratch to explore systems programming fundamentals.',
    tags: ['C', 'Assembly', 'Operating Systems', 'Systems Programming'],
    technologies: ['C', 'Assembly', 'QEMU', 'Make'],
    features: ['Bootloader', 'Kernel', 'Basic shell', 'Memory management', 'Interrupt handling'],
    githubLink: 'https://github.com/zacharyr0th/simple-os',
    demoLink: '',
    lastUpdated: '2023-03-20',
    articleLink: '/writing/simple-os',
  },
  {
    id: 'toml-tools',
    title: 'TOML Tools',
    description:
      'Analytics toolkit for parsing and visualizing cryptocurrency ecosystem data from Electric Capital, enabling data-driven insights.',
    tags: ['Python', 'Data Analysis', 'TOML'],
    technologies: ['Python', 'TOML', 'Data Analysis'],
    features: ['TOML parsing', 'Interactive visualizations', 'Automated reporting'],
    githubLink: 'https://github.com/zacharyr0th/toml-tools',
    demoLink: '',
    lastUpdated: '2023-04-10',
  },
  {
    id: 'music-ide',
    title: 'MusicIDE',
    description:
      'AI-powered music composition environment combining intelligent suggestions with interactive visualization and theory analysis.',
    tags: ['Electron', 'React', 'AI', 'Music'],
    technologies: ['Electron', 'React', 'TensorFlow.js', 'Web Audio API', 'TypeScript'],
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
  },
  {
    id: 'privvy',
    title: 'Privvy',
    description:
      'Privacy-first DEX built on Aleo leveraging zero-knowledge proofs to enable confidential trading while maintaining decentralization.',
    tags: ['Blockchain', 'Zero-knowledge', 'DeFi'],
    technologies: ['Aleo', 'Zero-knowledge proofs', 'React', 'TypeScript'],
    features: ['Private transactions', 'AMM pools', 'Cross-chain bridges', 'Proof generation'],
    githubLink: '',
    demoLink: '',
    lastUpdated: '2023-02-28',
  },
  {
    id: 'casino-time',
    title: 'CasinoTime',
    description:
      'Trustless gambling platform on Aptos combining verifiable randomness with zero-knowledge proofs for transparent, fair gaming.',
    tags: ['Blockchain', 'Gaming', 'Zero-knowledge'],
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
  },
] as const;

export const writingProjects: WritingProject[] = [
  {
    id: 'simple-os-article',
    title: 'Building a Simple OS from Scratch',
    description: 'A deep dive into operating system fundamentals through hands-on implementation.',
    link: '/writing/simple-os',
    publishDate: '2023-03-20',
    tags: ['Systems Programming', 'OS Development', 'C', 'Assembly'],
    readTime: 15,
  },
  {
    id: 'music-theory',
    title: 'Computational Music Theory',
    description: 'Exploring the intersection of computer science and music theory.',
    link: '/writing/music-theory',
    publishDate: '2023-04-15',
    tags: ['Music Theory', 'Computer Science', 'AI'],
    readTime: 12,
  },
];

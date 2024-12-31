import { LearningProject } from '@/app/lib/types/types';

export const learningProjects: LearningProject[] = [
  {
    id: 'zacharyr0th-com',
    title: 'zacharyr0th.com',
    description:
      'Modern, open-source portfolio showcasing Next.js best practices with dynamic content management and theme customization.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    features: ['Responsive design', 'Dynamic theming', 'SEO optimization', 'Markdown-based CMS'],
    githubLink: 'https://github.com/zacharyr0th/website',
    demoLink: '',
    lastUpdated: '2023-04-15',
  },
  {
    id: 'simple-os',
    title: 'SimpleOS',
    description:
      'Educational x86 operating system implementation featuring core OS components built from scratch to explore systems programming fundamentals.',
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
];

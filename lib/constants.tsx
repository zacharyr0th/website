import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import {
  Theme,
  ContentType,
  AudioType,
  NavItem,
  LearningProject,
  ButtonProps,
  NavButtonProps,
} from './types';

export const THEMES: readonly Theme[] = ['light', 'dark'];
export const THEME_ICONS: Record<Theme, React.ReactElement> = {
  light: <FaSun />,
  dark: <FaMoon />,
};

export const ContentTypes: readonly ContentType[] = ['article', 'review', 'project'];
export const AudioTypes: readonly AudioType[] = ['composition', 'dataset', 'recording', 'theory'];

export const navItems: NavItem[] = [
  { label: 'Projects', href: '/projects' },
  { label: 'Writing', href: '/writing' },
  { label: 'Audio', href: '/audio' },
];

export const learningProjects: LearningProject[] = [
  {
    id: 'zacharyr0th-com',
    title: 'zacharyr0th.com',
    description:
      'This portfolio website is fully open-sourced and showcases modern web development practices. Fork it on Github, its easy to edit.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    features: [
      'Responsive design',
      'Multiple Color Schemes',
      'SEO optimization',
      'Content management',
    ],
    articleLink: 'https://zacharyr0th.com/projects/website',
    githubLink: 'https://github.com/zacharyr0th/website',
    demoLink: '',
    lastUpdated: '2023-04-15',
  },
  {
    id: 'simple-os',
    title: 'SimpleOS',
    description:
      'A minimalist operating system built from scratch. The intention was to better understand low-level system architecture.',
    technologies: ['C', 'Assembly', 'QEMU', 'Make'],
    features: ['Bootloader', 'Kernel', 'Basic shell', 'Memory management', 'Interrupt handling'],
    articleLink: 'https://zacharyr0th.com/projects/simple-os',
    githubLink: 'https://github.com/zacharyr0th/simple-os',
    demoLink: '',
    lastUpdated: '2023-03-20',
  },
  {
    id: 'casino-time',
    title: 'CasinoTime',
    description:
      'Provably fair, permissionless gambling platform on the Aptos blockchain featuring verifiable randomness, zero-knowledge proofs and more.',
    technologies: [
      'Move',
      'React',
      'Aptos Typescript SDK',
      'Aptos Randomness',
      'Zero-knowledge proofs',
    ],
    features: [
      'Smart contracts',
      'Randomness',
      'User-friendly interface',
      'Blackjack, Slots, Roullette',
      'Multi-player Poker',
    ],
    articleLink: 'https://zacharyr0th.com/projects/casino-time',
    githubLink: '',
    demoLink: '',
    lastUpdated: '2023-04-01',
  },
  {
    id: 'music-ide',
    title: 'MusicIDE',
    description:
      'An AI-assisted IDE for practicing, researching, and composing music. Think Cursor + Musescore + Synthesia.',
    technologies: ['Electron', 'React', 'TensorFlow.js', 'Web Audio API', 'TypeScript'],
    features: [
      'AI-powered suggestions',
      'Advanced Music Theory',
      'Sheet music visualization',
      'Music Knowledge Base',
    ],
    articleLink: 'https://zacharyr0th.com/projects/music-ide',
    githubLink: '',
    demoLink: '',
    lastUpdated: '2023-03-10',
  },
  {
    id: 'privvy',
    title: 'Privvy',
    description:
      'A decentralized exchange (DEX) with private transactions implemented by default on the Aleo blockchain.',
    technologies: ['Aleo', 'Zero-knowledge proofs', 'React', 'TypeScript'],
    features: ['Private swaps', 'Liquidity pools'],
    articleLink: 'https://zacharyr0th.com/projects/privvy',
    githubLink: '',
    demoLink: '',
    lastUpdated: '2023-02-28',
  },
  {
    id: 'toml-tools',
    title: 'TOML Tools',
    description:
      "Various utilities for working with the .toml files in Electric Capital's crypto-ecosystems repository.",
    technologies: ['Python', 'TOML', 'Data Analysis'],
    features: ['TOML parsing', 'Data visualization', 'Report Generation'],
    articleLink: 'https://zacharyr0th.com/projects/toml-tools',
    githubLink: 'https://github.com/zacharyroth/toml-tools',
    demoLink: '',
    lastUpdated: '2023-04-10',
  },
];

export const writingProjects = [
  {
    title: 'A Birdseye View',
    description: 'Seeing the forest through the trees when it comes to blockchain adoption.',
    link: 'https://zacharyr0th.com/birdseye-view',
  },
  {
    title: 'Easy Money & Veblen Goods',
    description: 'Second order effects of money printing.',
    link: 'https://example.com/minimalist-os',
  },
  {
    title: 'Search Engine Turbulence',
    description: 'LLMs and the tumultuous future of search engines.',
    link: 'https://example.com/privacy-defi',
  },
];

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

// API and content-related constants
export const API_ENDPOINTS = {
  content: '/api/content',
  projects: '/api/projects',
  audio: '/api/audio',
};

export const MAX_CONTENT_LENGTH = 1000;
export const SUPPORTED_FILE_TYPES = ['mp3', 'wav', 'ogg'];

// Social media links
export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/zacharyr0th',
  github: 'https://github.com/zacharyr0th',
  linkedin: 'https://linkedin.com/in/zacharyr0th',
};

export const getTextColor = (backgroundColor: string): string => {
  // Define an array of light background colors
  const lightColors = [
    'var(--color-background)',
    'var(--color-surface)',
    'var(--color-muted)',
    'var(--color-subtle)',
    'var(--color-privvy)',
  ];

  // Define an array of medium background colors
  const mediumColors = ['var(--color-border)', 'var(--color-input)'];

  if (lightColors.includes(backgroundColor)) {
    return 'text-gray-900 dark:text-gray-100';
  } else if (mediumColors.includes(backgroundColor)) {
    return 'text-gray-100 dark:text-gray-900';
  } else {
    // For dark colors and any other colors not explicitly handled
    return 'text-gray-100';
  }
};

export const heroContent = {
  name: 'Zachary Roth',
  title: 'Head of Growth, DeFi & AI @ ',
  aptosLink: 'https://aptoslabs.com/',
  sections: [
    {
      title: 'Ecosystem Analyst',
      content:
        'Curious analyst and builder with experience across the Bitcoin, Ethereum, Solana, and Aptos ecosystems.',
      backgroundColor: 'var(--color-primary)',
    },
    {
      title: 'Market Strategist',
      content:
        'My focus involves identifying market opportunities and advising teams on how to utilize on-chain solutions to improve their products and services.',
      backgroundColor: 'var(--color-secondary)',
    },
    {
      title: 'Writer',
      content:
        'I write about technology and finance, bringing a wide-ranging perspective to each topic. My articles and book reviews can be found here.',
      backgroundColor: 'var(--color-accent)',
    },
  ],
  chainLogos: ['bitcoin', 'ethereum', 'solana', 'aptos'],
};

export const Button: React.FC<ButtonProps> = ({ primary, secondary, children }) => (
  <button
    className={`px-6 py-2 rounded-full transition-colors duration-300 ${
      primary
        ? 'bg-primary text-[var(--color-white)] shadow-[var(--box-shadow)]'
        : secondary
        ? 'bg-surface text-text-secondary border border-secondary'
        : 'bg-background text-text-primary'
    }`}
    style={
      {
        '--box-shadow': 'var(--box-shadow)',
        '--border-radius': 'var(--border-radius-md)',
      } as React.CSSProperties
    }
  >
    {children}
  </button>
);

export const NavButton: React.FC<NavButtonProps> = ({ variant, children, ...props }) => (
  <button
    className={`px-4 py-2 rounded-full transition-all duration-300 ${
      variant === 'primary'
        ? 'bg-primary text-[var(--color-white)]'
        : variant === 'secondary'
        ? 'bg-surface text-text-secondary'
        : 'bg-background text-text-primary'
    } hover:opacity-90`}
    style={{
      backgroundColor: `var(--color-${
        variant === 'primary' ? 'primary' : variant === 'secondary' ? 'surface' : 'background'
      })`,
      color:
        variant === 'primary'
          ? 'var(--color-white)'
          : `var(--color-text-${variant === 'secondary' ? 'secondary' : 'primary'})`,
      boxShadow: 'var(--box-shadow)',
    }}
    {...props}
  >
    {children}
  </button>
);

export const VISIBLE_PROJECTS = 6;

export const colorVariables = [
  'var(--color-primary)',
  'var(--color-secondary)',
  'var(--color-accent)',
  'var(--color-text-primary)',
  'var(--color-text-secondary)',
  'var(--color-surface)',
] as const;

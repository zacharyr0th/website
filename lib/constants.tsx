import React from 'react';
import { FaSun, FaMoon, FaUmbrellaBeach, FaAdjust } from 'react-icons/fa';
import { Theme, NavItem } from './types';
import { ButtonProps, NavButtonProps } from '@/lib/types';

export const THEME_ICONS: Record<Theme, React.ReactElement> = {
  light: <FaSun />,
  dark: <FaMoon />,
  sepia: <FaUmbrellaBeach />,
  'high-contrast': <FaAdjust />,
};

export const THEMES = ['light', 'dark', 'sepia', 'high-contrast'] as const;

export const ContentTypes = ['article', 'review', 'interview'] as const;
export const AudioTypes = ['composition', 'dataset', 'recording', 'theory'] as const;

export const navItems: NavItem[] = [
  { label: 'Projects', href: '/projects' },
  { label: 'Writing', href: '/writing' },
  { label: 'Audio', href: '/audio' },
];

export const learningProjects = [
  {
    title: 'zacharyr0th.com',
    description: 'This website is fully open sourced and built with Next.js.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    features: ['Responsive design', 'Dark mode', 'SEO optimization'],
    articleLink: 'https://example.com/article1',
    githubLink: 'https://github.com/yourusername/zacharyr0th.com',
  },
  {
    title: 'simple-os',
    description: 'A minimalist operating system built from scratch.',
    technologies: ['C', 'Assembly', 'QEMU'],
    features: ['Bootloader', 'Kernel', 'Basic shell'],
    articleLink: 'https://example.com/article2',
    githubLink: 'https://github.com/yourusername/simple-os',
  },
  {
    title: 'casino-time',
    description: 'Provably fair, permissionless gambling on the Aptos blockchain.',
    technologies: ['Move', 'React', 'Aptos SDK'],
    features: ['Smart contracts', 'Random number generation', 'User-friendly interface'],
    articleLink: 'https://example.com/article3',
  },
  {
    title: 'muisc-ide',
    description: 'An ai-assisted IDE for practicing, researching, and composing music.',
    technologies: ['Electron', 'React', 'TensorFlow.js', 'Web Audio API'],
    features: ['AI-powered suggestions', 'Real-time audio processing', 'Sheet music visualization'],
    articleLink: 'https://example.com/article4',
    githubLink: 'https://github.com/yourusername/muisc-ide',
  },
  {
    title: 'privvy',
    description: 'A DEX with private transactions by default on the Aleo blockchain.',
    technologies: ['Aleo', 'Zero-knowledge proofs', 'React'],
    features: ['Private swaps', 'Liquidity pools', 'Decentralized order book'],
    articleLink: 'https://example.com/article5',
  },
  {
    title: 'toml-tools',
    description: "Utilities for working with Electric Capital's crypto-ecosystems repo.",
    technologies: ['Python', 'TOML', 'Git'],
    features: ['TOML parsing', 'Ecosystem data analysis', 'Automated updates'],
    articleLink: 'https://example.com/article6',
    githubLink: 'https://github.com/yourusername/toml-tools',
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
    description: 'Second order effects of printing money.',
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

export const API_ENDPOINTS = {
  content: '/api/content',
  projects: '/api/projects',
  audio: '/api/audio',
};

export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/yourusername',
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourusername',
};

export const MAX_CONTENT_LENGTH = 1000;
export const DEFAULT_LANGUAGE = 'en';
export const SUPPORTED_FILE_TYPES = ['mp3', 'wav', 'ogg'];

export const heroContent = {
  name: 'Zachary Roth',
  title: 'Head of Growth, DeFi & AI @ ',
  aptosLink: 'https://aptoslabs.com/',
  sections: [
    {
      title: 'Ecosystem Analyst',
      content:
        'Seasoned analyst and builder with experience across multiple hyper-growth blockchain ecosystems including Bitcoin, Ethereum, Solana, and Aptos.',
    },
    {
      title: 'Market Strategist',
      content:
        'My work involves identifying market opportunities and guiding DeFi and AI teams on leveraging on-chain solutions to enhance their products and services. ',
    },
    {
      title: 'Writer',
      content:
        'I write about technology and finance, aiming to explain complex topics in an accessible way. You can find my articles here, alongside a few book reviews.',
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

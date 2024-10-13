import React from 'react';
import { FaSun, FaMoon, FaUmbrellaBeach, FaAdjust } from 'react-icons/fa';
import { Theme, NavItem, Project } from './types';
import { ButtonProps } from '@/lib/types';
import { NavButtonProps } from '@/lib/types';

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
    articleLink: 'https://example.com/article1',
    githubLink: 'https://github.com/yourusername/zacharyr0th.com',
  },
  {
    title: 'simple-os',
    description: 'A minimalist operating system built from scratch.',
    articleLink: 'https://example.com/article2',
    githubLink: 'https://github.com/yourusername/simple-os',
  },
  {
    title: 'casino-time',
    description: 'Provably fair, permissionless gambling on the Aptos blockchain.',
    articleLink: 'https://example.com/article3',
  },
  {
    title: 'muisc-ide',
    description: 'An ai-assisted IDE for practicing, researching, and composing music.',
    articleLink: 'https://example.com/article4',
    githubLink: 'https://github.com/yourusername/muisc-ide',
  },
  {
    title: 'privvy',
    description: 'A DEX with private transactions by default on the Aleo blockchain.',
    articleLink: 'https://example.com/article5',
  },
  {
    title: 'toml-tools',
    description: "Utilities for working with Electric Capital's crypto-ecosystems repo.",
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
      title: 'Cross-chain Experience',
      content:
        "Having been involved in crypto since 2019, I've had the privilege to work in 4 of the highest-growing ecosystems of our time - Bitcoin, Ethereum, Solana, and Aptos.",
    },
    {
      title: 'Product Market Fit',
      content:
        'As a builder, power user, and seasoned investor, I specialize in identifying product-market fit and advising on how to use on-chain technology to build superior products and services.',
    },
    {
      title: 'High Signal',
      content:
        'Occasionally, I turn complex technological and financial concepts into actionable insights which you can read about here.',
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

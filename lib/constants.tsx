import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import {
  ContentType,
  AudioType,
  NavItem,
  LearningProject,
  ButtonProps,
  NavButtonProps,
  ProjectCategory,
  ThemeColors,
  WritingCategory,
} from './types';

// Use const assertions for better type inference
export const THEMES = ['light', 'dark'] as const;
export const THEME_ICONS = {
  light: <FaSun />,
  dark: <FaMoon />,
} as const;

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
      'Modern, open-source portfolio showcasing Next.js best practices with dynamic content management and theme customization.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    features: ['Responsive design', 'Dynamic theming', 'SEO optimization', 'Markdown-based CMS'],
    githubLink: '',
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

export const writingProjects = [
  {
    id: 'birdseye-view',
    title: 'A Birdseye View',
    description: 'Seeing the forest through the trees.',
    link: '/writing/birdseye-view',
  },
  {
    id: 'easy-money',
    title: 'Easy Money & Veblen Goods',
    description: 'Second order effects of money printing.',
    link: '/writing/easy-money-and-veblen-goods',
  },
  {
    id: 'search-engine',
    title: 'Search Engine Turbulence',
    description: 'LLMs and the tumultuous future of search engines.',
    link: '/writing/search-engine-turbulence',
  },
] as const;

// Consolidate related constants into objects
export const CONFIG = {
  maxContentLength: 1000,
  supportedFileTypes: ['mp3', 'wav', 'ogg'] as const,
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },
  visibleProjects: 6,
} as const;

// Social media links
export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/zacharyr0th',
  github: 'https://github.com/zacharyr0th',
  linkedin: 'https://linkedin.com/in/zacharyr0th',
  email: 'mailto:zacharyroth@pm.me',
} as const;

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
        'I write about technology and finance, bringing a wide-ranging perspective to each topic.',
      backgroundColor: 'var(--color-accent)',
    },
  ],
  chainLogos: ['bitcoin', 'ethereum', 'solana', 'aptos'],
};

export const Button: React.FC<ButtonProps> = ({
  primary = false,
  secondary = false,
  children,
  onClick,
  className = '',
}) => (
  <button
    onClick={onClick}
    className={`px-6 py-2 rounded-full transition-colors duration-300 ${
      primary
        ? 'bg-primary text-[var(--color-white)] shadow-[var(--box-shadow)]'
        : secondary
        ? 'bg-surface text-text-secondary border border-secondary'
        : 'bg-background text-text-primary'
    } ${className}`}
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

// Memoize components that don't need frequent updates
export const RefreshIcon = React.memo((props: React.SVGProps<SVGSVGElement>) => (
  <span style={{ display: 'inline-block', paddingRight: '8px', verticalAlign: 'middle' }}>
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      width="24px"
      height="24px"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  </span>
));
RefreshIcon.displayName = 'RefreshIcon';

// Add color scheme constants
export const COLORS: ThemeColors = {
  primary: 'var(--color-primary)',
  secondary: 'var(--color-secondary)',
  accent: 'var(--color-accent)',
  background: 'var(--color-background)',
  surface: 'var(--color-surface)',
  muted: 'var(--color-muted)',
  subtle: 'var(--color-subtle)',
  privvy: 'var(--color-privvy)',
} as const;

// Add layout constants
export const LAYOUT = {
  maxWidth: 'max-w-7xl',
  containerPadding: 'px-4 sm:px-6 lg:px-8',
  sectionSpacing: 'py-12 md:py-16 lg:py-20',
  borderRadius: {
    sm: 'var(--border-radius-sm)',
    md: 'var(--border-radius-md)',
    lg: 'var(--border-radius-lg)',
    full: 'var(--border-radius-full)',
  },
} as const;

// Add media query helpers
export const MEDIA_QUERIES = {
  sm: `(min-width: ${CONFIG.breakpoints.sm}px)`,
  md: `(min-width: ${CONFIG.breakpoints.md}px)`,
  lg: `(min-width: ${CONFIG.breakpoints.lg}px)`,
  xl: `(min-width: ${CONFIG.breakpoints.xl}px)`,
} as const;

// Add writing categories
export const WRITING_CATEGORIES: WritingCategory[] = [
  { id: 'tech', name: 'Technology', slug: 'tech' },
  { id: 'blockchain', name: 'Blockchain', slug: 'blockchain' },
  { id: 'finance', name: 'Finance', slug: 'finance' },
  { id: 'music', name: 'Music', slug: 'music' },
] as const;

// Add project categories
export const PROJECT_CATEGORIES: Record<ProjectCategory, string> = {
  web: 'Web Development',
  blockchain: 'Blockchain',
  ai: 'Artificial Intelligence',
  system: 'System Programming',
  tools: 'Developer Tools',
} as const;

// Add animation constants
export const ANIMATIONS = {
  fadeIn: 'animate-fadeIn',
  slideIn: 'animate-slideIn',
  transition: 'transition-all duration-300',
} as const;

// Add SEO defaults
export const SEO_DEFAULTS = {
  titleTemplate: '%s | Zachary Roth',
  defaultTitle: 'Zachary Roth - Technologist, Writer, & Musician',
  defaultDescription:
    'Personal portfolio and blog featuring projects, articles, and audio content.',
  siteUrl: 'https://zacharyr0th.com',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    site_name: 'Zachary Roth',
  },
} as const;

// Add bio page constants
export const BIO_DATA = {
  name: 'Zachary Roth',
  title: 'Technologist, Writer, & Musician',
  intro:
    "Since 2019, I've been involved with projects across multiple hyper-growth blockchain ecosystems including Bitcoin, Ethereum, Solana, and Aptos. My work involves identifying market opportunities and guiding DeFi and AI teams on leveraging on-chain solutions to enhance their products and services on Aptos, the world's highest performing blockchain.",

  experience: [
    {
      date: '2023 onwards',
      title: 'Building DeFi & AI @ Aptos Labs',
      company: 'Aptos Labs',
      description: [
        'Leading growth initiatives to bring DeFi and AI capabilities to the Aptos ecosystem.',
      ],
    },
    {
      date: '2021 - 2023',
      title: 'Product @ Solrise Finance',
      company: 'Solrise Finance',
      description: [
        'Created educational content to make DeFi more accessible',
        'Led comprehensive user interviews',
        'Managed product roadmaps and technical documentation',
      ],
    },
    {
      date: '2020 - 2023',
      title: 'Senior Analyst',
      company: 'N2 Communications',
      description: [
        'Helped companies navigate the intersection of traditional finance and crypto, from capital formation to regulatory compliance',
        'Analyzed market opportunities across both digital assets and physical commodities',
        'Supporting over $2B in fundraising initiatives',
      ],
    },
  ] as const,

  skills: [
    {
      category: 'Programming & Development',
      skills: ['Python', 'TypeScript', 'C', 'Next.js', 'React', 'Tailwind CSS', 'SCAMP', 'Git'],
    },
    {
      category: 'Blockchain & DeFi',
      skills: ['Move', 'Solidity', 'Rust', 'DeFi Architecture', 'Analytics'],
    },
    {
      category: 'Business & Communication',
      skills: [
        'Technical Writing',
        'Strategic Planning',
        'Partnership Development',
        'Product Management',
      ],
    },
  ] as const,
} as const;

// Move the blur class definition to constants
export const NAV_BLUR_CLASSES = {
  scrolled: 'bg-background/80 backdrop-blur-lg',
  transparent: 'bg-transparent',
} as const;

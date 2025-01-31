import { SOCIAL_LINKS } from '../lib/social';
import type { SkillGroup } from './types';

export const BIO_SOCIAL_LINKS = [
  {
    icon: SOCIAL_LINKS.github.icon,
    href: SOCIAL_LINKS.github.url,
    label: SOCIAL_LINKS.github.label,
  },
  {
    icon: SOCIAL_LINKS.linkedin.icon,
    href: SOCIAL_LINKS.linkedin.url,
    label: SOCIAL_LINKS.linkedin.label,
  },
  {
    icon: SOCIAL_LINKS.twitter.icon,
    href: SOCIAL_LINKS.twitter.url,
    label: SOCIAL_LINKS.twitter.label,
  },
] as const;

export const GROUPED_SKILLS: Record<string, readonly SkillGroup[]> = {
  'Programming & Development': [
    {
      title: 'LANGUAGES',
      skills: ['Python', 'TypeScript', 'C'],
    },
    {
      title: 'FRONTEND',
      skills: ['Next.js', 'React', 'Tailwind CSS'],
    },
    {
      title: 'BACKEND & TOOLS',
      skills: ['SCAMP', 'Git', 'GraphQL', 'REST APIs'],
    },
  ],
  'Blockchain & DeFi': [
    {
      title: 'SMART CONTRACTS',
      skills: ['Move', 'Solidity', 'Rust'],
    },
    {
      title: 'ARCHITECTURE',
      skills: ['DeFi Architecture', 'Protocol Design', 'Smart Contract Development'],
    },
    {
      title: 'ANALYSIS',
      skills: ['Analytics', 'Tokenomics'],
    },
  ],
  'Business & Communication': [
    {
      title: 'TECHNICAL',
      skills: ['Technical Writing', 'Technical Documentation', 'Developer Relations'],
    },
    {
      title: 'STRATEGY',
      skills: ['Strategic Planning', 'Partnership Development', 'Product Management'],
    },
    {
      title: 'LEADERSHIP',
      skills: ['Public Speaking', 'Team Leadership'],
    },
  ],
} as const;

export const BIO = {
  name: 'Zachary Roth',
  title: 'Analyst, Strategist, Writer',
  location: 'San Francisco Bay Area',
  intro: `Since 2019, I've been involved with projects across multiple hyper-growth blockchain ecosystems including Bitcoin, Ethereum, Solana, and Aptos. My work involves identifying market opportunities and guiding DeFi and AI teams on leveraging on-chain solutions to enhance their products and services on Aptos, the world's highest performing blockchain.`,

  experience: [
    {
      date: '2023 onwards',
      title: 'Head of Growth, Defi & AI',
      company: 'Aptos Labs',
      description: [
        'Leading strategic initiatives to expand DeFi and AI capabilities within the Aptos ecosystem',
        'Developing technical specifications and integration frameworks for partner protocols',
        'Managed relationships with key DeFi protocols and infrastructure providers',
      ],
      highlights: [
        'Led 25+ successful protocol integrations',
        'Helped grow ecosystem TVL by 600% in one year - $200m to $1.2B',
      ],
    },
    {
      date: '2021 - 2023',
      title: 'Product Manager',
      company: 'Solrise Finance',
      description: [
        'Created educational content to make DeFi more accessible',
        'Led user interviews and product roadmaps',
        'Managed technical documentation',
      ],
      highlights: [
        'Launched numerous successful DeFi products',
        'Built a comprehensive knowledge base',
      ],
    },
    {
      date: '2020 - 2023',
      title: 'Senior Analyst',
      company: 'N2 Communications',
      description: [
        'Helped companies navigate the intersection of traditional finance and crypto, from capital formation to regulatory compliance',
        'Analyzed market opportunities across both digital assets and physical commodities',
        'Supported over $2B in fundraising initiatives',
      ],
      highlights: [
        'Ghostwrote for multiple publications and served as investor relations consultant',
        'Wrote 2 Private Placement Memorandums that helped raise a collective $2b',
      ],
    },
  ],

  skills: [
    {
      category: 'Programming & Development',
      skills: [
        'Python',
        'TypeScript',
        'C',
        'Next.js',
        'React',
        'Tailwind CSS',
        'SCAMP',
        'Git',
        'GraphQL',
        'REST APIs',
      ],
      proficiencyLevels: {
        expert: ['Python', 'TypeScript', 'React'],
        advanced: ['Next.js', 'Tailwind CSS', 'Git'],
        intermediate: ['C', 'SCAMP'],
      },
    },
    {
      category: 'Blockchain & DeFi',
      skills: [
        'Move',
        'Solidity',
        'Rust',
        'DeFi Architecture',
        'Analytics',
        'Smart Contract Development',
        'Protocol Design',
        'Tokenomics',
      ],
      proficiencyLevels: {
        expert: ['Move', 'DeFi Architecture', 'Protocol Design'],
        advanced: ['Solidity', 'Smart Contract Development', 'Tokenomics'],
        intermediate: ['Rust'],
      },
    },
    {
      category: 'Business & Communication',
      skills: [
        'Technical Writing',
        'Strategic Planning',
        'Partnership Development',
        'Product Management',
        'Developer Relations',
        'Technical Documentation',
        'Public Speaking',
        'Team Leadership',
      ],
      proficiencyLevels: {
        expert: ['Technical Writing', 'Strategic Planning', 'Developer Relations'],
        advanced: ['Partnership Development', 'Product Management'],
        intermediate: ['Public Speaking', 'Team Leadership'],
      },
    },
  ],
} as const;

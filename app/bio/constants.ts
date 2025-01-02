import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export const SOCIAL_LINKS = [
  { icon: FaGithub, href: 'https://github.com/zacharyr0th', label: 'GitHub' },
  { icon: FaLinkedin, href: 'https://linkedin.com/in/zacharyr0th', label: 'LinkedIn' },
  { icon: FaTwitter, href: 'https://twitter.com/zacharyr0th', label: 'Twitter' },
] as const;

export const BIO = {
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
  ],

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
  ],
} as const;
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

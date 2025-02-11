import { SOCIAL_LINKS } from '@/lib/social';
import type { BioData } from '../types';

export const bioData: BioData = {
  basics: {
    name: 'Zachary Roth',
    title: 'Analyst, Strategist, Writer',
    location: 'San Francisco Bay Area',
    intro: `Since 2019, I've been involved with projects across multiple hyper-growth blockchain ecosystems including Bitcoin, Ethereum, Solana, and Aptos. 
    I'm a strategic thinker and builder with a diverse background and have dedicated my career to advancing the adoption of decentralized technologies.

    I lead growth initiatives for DeFi and AI verticals on Aptos, the world's highest performing blockchain, and beyond my professional work, I regularly build
    open source projects and write about DeFi innovations, technical architecture, and market analysis.`,
    socialLinks: [
      { ...SOCIAL_LINKS.github },
      { ...SOCIAL_LINKS.linkedin },
      { ...SOCIAL_LINKS.twitter },
      { ...SOCIAL_LINKS.email }
    ],
  },
  experience: [
    {
      date: '2023 - Present',
      title: 'Head of Growth, Defi & AI',
      company: '<a href="https://aptoslabs.com/" class="text-accent hover:text-accent/80 transition-colors" target="_blank" rel="noopener noreferrer">Aptos Labs</a>',
      description: [
        'Leading strategic initiatives to expand DeFi and AI capabilities within the Aptos ecosystem',
        'Developing technical specifications and integration frameworks for partner protocols',
        'Managing relationships with key DeFi protocols and infrastructure providers',
      ],
      '2024 Highlights': [
        'Led 25+ successful protocol integrations in 2024',
        'Helped grow ecosystem TVL by 600% in one year - $200m to $1.2B',
        'Owned Aptos\' presence in Electric Capital\'s report - 2nd fastest growing ecosystem of 2024',
      ],
    },
    {
      date: '2021 - 2023',
      title: 'Product Manager',
      company: '<a href="https://solflare.com/" class="text-accent hover:text-accent/80 transition-colors" target="_blank" rel="noopener noreferrer">Solrise Finance</a>',
      description: [
        'Led product strategy and development for DeFi structured products',
        'Coordinated with engineering teams to optimize protocol performance and security',
        'Led user interviews and user research to inform product development',
      ],
      highlights: [
        'Worked on the product strategy for a suite of DeFi investment products on Solana',
        'Managed partnerships with major Solana protocols',
      ],
    },
    {
      date: '2020 - 2023',
      title: 'Senior Analyst',
      company: '<a href="https://n2comms.com/" class="text-accent hover:text-accent/80 transition-colors" target="_blank" rel="noopener noreferrer">N2 Communications</a>',
      description: [
        'Assisted in investor relations and communication strategies for high-profile private equity funds',
        'Provided strategic advisory services to traditional funds interested in investing in blockchain ventures',
        'Developed detailed models and valuation frameworks for digital assets',
      ],
      highlights: [
        'Authored investment memorandums that secured over $2B in funding',
        'Ghostwrote technical reports covering emerging blockchain technologies and evolving regulatory frameworks',
      ],
    },
  ],
  skills: [
    // Programming & Development
    { name: 'Python', level: 'expert', category: 'Programming & Development' },
    { name: 'TypeScript', level: 'expert', category: 'Programming & Development' },
    { name: 'React', level: 'expert', category: 'Programming & Development' },
    { name: 'Next.js', level: 'advanced', category: 'Programming & Development' },
    { name: 'Tailwind CSS', level: 'advanced', category: 'Programming & Development' },
    { name: 'Git', level: 'advanced', category: 'Programming & Development' },
    { name: 'C', level: 'intermediate', category: 'Programming & Development' },
    { name: 'SCAMP', level: 'intermediate', category: 'Programming & Development' },
    
    // Blockchain & DeFi
    { name: 'Move', level: 'expert', category: 'Blockchain & DeFi' },
    { name: 'DeFi Architecture', level: 'expert', category: 'Blockchain & DeFi' },
    { name: 'Protocol Design', level: 'expert', category: 'Blockchain & DeFi' },
    { name: 'Solidity', level: 'advanced', category: 'Blockchain & DeFi' },
    { name: 'Smart Contract Development', level: 'advanced', category: 'Blockchain & DeFi' },
    { name: 'Tokenomics', level: 'advanced', category: 'Blockchain & DeFi' },
    { name: 'Rust', level: 'intermediate', category: 'Blockchain & DeFi' },
    
    // Business & Communication
    { name: 'Technical Writing', level: 'expert', category: 'Business & Communication' },
    { name: 'Strategic Planning', level: 'expert', category: 'Business & Communication' },
    { name: 'Developer Relations', level: 'expert', category: 'Business & Communication' },
    { name: 'Partnership Development', level: 'advanced', category: 'Business & Communication' },
    { name: 'Product Management', level: 'advanced', category: 'Business & Communication' },
    { name: 'Public Speaking', level: 'intermediate', category: 'Business & Communication' },
    { name: 'Team Leadership', level: 'intermediate', category: 'Business & Communication' },
  ],
}; 
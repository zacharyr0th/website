import { SOCIAL_LINKS } from '../lib/social';

export const BIO_SOCIAL_LINKS = [
  { icon: SOCIAL_LINKS.github.icon, href: SOCIAL_LINKS.github.url, label: SOCIAL_LINKS.github.label },
  { icon: SOCIAL_LINKS.linkedin.icon, href: SOCIAL_LINKS.linkedin.url, label: SOCIAL_LINKS.linkedin.label },
  { icon: SOCIAL_LINKS.twitter.icon, href: SOCIAL_LINKS.twitter.url, label: SOCIAL_LINKS.twitter.label },
] as const;

export const BIO = {
  name: 'Zachary Roth',
  title: 'Blockchain Technologist, Technical Writer, & Web3 Product Strategist',
  location: 'San Francisco Bay Area',
  intro: `With over 4 years of experience in blockchain technology and decentralized finance, I've been at the forefront of Web3 innovation across multiple ecosystems. My expertise spans from technical architecture and product strategy to ecosystem growth and developer relations. Currently focused on advancing DeFi and AI capabilities on the Aptos blockchain, I combine technical knowledge with strategic insight to bridge the gap between traditional finance and crypto-native solutions.`,
  
  featuredProjects: [
    {
      title: 'DeFi Integration Framework',
      description: 'Developed a standardized framework for DeFi protocols integrating with Aptos',
      technologies: ['Move', 'TypeScript', 'Python'],
      impact: 'Reduced integration time by 60% for new protocols',
      link: 'https://github.com/zacharyr0th/defi-framework',
      image: '/projects/defi-framework.png'
    },
    {
      title: 'Blockchain Analytics Suite',
      description: 'Built data analytics tools for on-chain market analysis',
      technologies: ['Python', 'SQL', 'React'],
      impact: 'Processed over 1M daily transactions',
      link: 'https://github.com/zacharyr0th/blockchain-analytics',
      image: '/projects/analytics-suite.png'
    },
    {
      title: 'Smart Contract Security Scanner',
      description: 'Developed automated security analysis tools for Move smart contracts',
      technologies: ['Rust', 'Move', 'Python'],
      impact: 'Identified vulnerabilities in 50+ protocols',
      link: 'https://github.com/zacharyr0th/security-scanner',
      image: '/projects/security-scanner.png'
    }
  ],

  achievements: [
    {
      title: 'Top DeFi Contributor',
      organization: 'Aptos Foundation',
      year: '2023',
      description: 'Recognized for significant contributions to the Aptos DeFi ecosystem'
    },
    {
      title: 'Technical Excellence Award',
      organization: 'Solrise Finance',
      year: '2022',
      description: 'Awarded for innovative solutions in DeFi product development'
    },
    {
      title: 'Blockchain Security Champion',
      organization: 'Web3 Security Alliance',
      year: '2023',
      description: 'Recognition for contributions to blockchain security research'
    }
  ],

  experience: [
    {
      date: '2023 onwards',
      title: 'Senior DeFi Strategist',
      company: 'Aptos Labs',
      description: [
        'Leading strategic initiatives to expand DeFi and AI capabilities within the Aptos ecosystem',
        'Developing technical specifications and integration frameworks for partner protocols',
        'Managing relationships with key DeFi protocols and infrastructure providers',
        'Contributing to core protocol development and ecosystem growth strategies',
      ],
      highlights: [
        'Led 20+ successful protocol integrations',
        'Developed core DeFi standards',
        'Grew ecosystem TVL by 300%'
      ]
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
      highlights: [
        'Launched 3 successful DeFi products',
        'Grew user base to 50k+',
        'Implemented key security features'
      ]
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
      highlights: [
        'Led 15+ successful fundraising rounds',
        'Developed crypto market analysis framework',
        'Advisory for major DeFi protocols'
      ]
    },
  ],

  education: [
    {
      degree: 'B.S. Computer Science',
      institution: 'Stanford University',
      year: '2019',
      highlights: ['Focus on Distributed Systems', 'Blockchain Technology Research'],
      awards: ['Outstanding Research Award', 'Dean\'s List 2017-2019']
    }
  ],

  certifications: [
    {
      name: 'Move Programming Language Expert',
      issuer: 'Aptos Foundation',
      year: '2023',
      link: 'https://certification.aptos.dev/move-expert'
    },
    {
      name: 'Advanced Smart Contract Security',
      issuer: 'Web3 Security Alliance',
      year: '2022',
      link: 'https://web3security.alliance/cert/asc'
    },
    {
      name: 'DeFi Architecture Specialist',
      issuer: 'DeFi Alliance',
      year: '2022',
      link: 'https://defi.alliance/cert/das'
    }
  ],

  speakingEngagements: [
    {
      title: 'The Future of DeFi Infrastructure',
      event: 'ETH San Francisco',
      date: 'October 2023',
      link: 'https://ethsf.com/talks/defi-infrastructure'
    },
    {
      title: 'Securing the Future of Web3',
      event: 'Aptos Summit',
      date: 'September 2023',
      link: 'https://aptossummit.com/talks/web3-security'
    },
    {
      title: 'Building Scalable DeFi Protocols',
      event: 'DeFi Summit London',
      date: 'July 2023',
      link: 'https://defisummit.london/talks/scalable-protocols'
    }
  ],

  skills: [
    {
      category: 'Programming & Development',
      skills: [
        'Python', 'TypeScript', 'C', 'Next.js', 'React', 'Tailwind CSS', 
        'SCAMP', 'Git', 'GraphQL', 'REST APIs'
      ],
      proficiencyLevels: {
        expert: ['Python', 'TypeScript', 'React'],
        advanced: ['Next.js', 'Tailwind CSS', 'Git'],
        intermediate: ['C', 'SCAMP'],
      }
    },
    {
      category: 'Blockchain & DeFi',
      skills: [
        'Move', 'Solidity', 'Rust', 'DeFi Architecture', 'Analytics',
        'Smart Contract Development', 'Protocol Design',
        'Tokenomics',
      ],
      proficiencyLevels: {
        expert: ['Move', 'DeFi Architecture', 'Protocol Design'],
        advanced: ['Solidity', 'Smart Contract Development', 'Tokenomics'],
        intermediate: ['Rust'],
      }
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
        'Team Leadership'
      ],
      proficiencyLevels: {
        expert: ['Technical Writing', 'Strategic Planning', 'Developer Relations'],
        advanced: ['Partnership Development', 'Product Management'],
        intermediate: ['Public Speaking', 'Team Leadership'],
      }
    }
  ],

  featuredContent: [
    {
      type: 'Article',
      title: 'The Future of DeFi on High-Performance Blockchains',
      publisher: 'Medium',
      date: '2023',
      url: 'https://medium.com/@zacharyr0th/future-of-defi',
      highlights: ['Featured on Medium homepage', '50k+ views', 'Widely cited in industry']
    },
    {
      type: 'Technical Guide',
      title: 'Building Secure DeFi Protocols on Aptos',
      publisher: 'Aptos Dev Portal',
      date: '2023',
      url: 'https://aptos.dev/guides/defi-security',
      highlights: ['Official documentation', 'Used by 100+ protocols']
    },
    {
      type: 'Research Paper',
      title: 'Optimizing DeFi Protocol Performance',
      publisher: 'ArXiv',
      date: '2023',
      url: 'https://arxiv.org/papers/defi-optimization',
      highlights: ['Peer-reviewed', 'Novel optimization techniques']
    }
  ],

  languages: [
    { name: 'English', level: 'Native' },
    { name: 'Python', level: 'Expert' },
    { name: 'TypeScript', level: 'Expert' },
    { name: 'Move', level: 'Expert' }
  ],

  interests: [
    'Blockchain Technology',
    'Artificial Intelligence',
    'Music Production',
    'Open Source Development',
    'Financial Innovation',
    'Distributed Systems',
    'Cryptography',
    'System Design'
  ]
} as const;

import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Education {
  degree: string;
  institution: string;
  year: string;
  location: string;
}

interface Experience {
  company: string;
  logo: string;
  roles: {
    title: string;
    period: string;
    location: string;
    description: string;
  }[];
}

interface Skill {
  name: string;
  subSkills: string[];
}

const education: Education[] = [
  {
    degree: '',
    institution: 'DePaul University',
    year: '2015 - 2018',
    location: 'Chicago, IL',
  },
];

const experiences: Experience[] = [
  {
    company: 'Aptos Labs',
    logo: '/images/logos/aptos-labs-logo.webp',
    roles: [
      {
        title: 'Head of Growth, DeFi & AI',
        period: 'Nov 2023 - Present',
        location: 'San Francisco, CA',
        description:
          '• Leading growth strategies for DeFi and AI verticals\n• Driving ecosystem expansion and adoption\n• Collaborating with cross-functional teams to develop innovative blockchain solutions',
      },
      {
        title: 'Developer Ecosystems Manager',
        period: 'May 2023 - Oct 2023',
        location: 'San Francisco, CA',
        description:
          '• Managed relationships with DeFi projects building on Aptos\n• Facilitated technical integrations and provided support to developers\n• Organized developer-focused events and hackathons to grow the Aptos ecosystem',
      },
    ],
  },
  {
    company: 'Solrise Finance',
    logo: '/images/logos/solrise-logo.webp',
    roles: [
      {
        title: 'Product Manager',
        period: 'Feb 2021 - Nov 2022',
        location: 'Chicago, IL',
        description:
          '• Led product strategy and managed technical documentation for innovative blockchain solutions\n• Bridged the gap between new users and blockchain wallets by conducting extensive user research',
      },
      {
        title: 'Technical Writer',
        period: 'Apr 2020 - Jan 2021',
        location: 'Chicago, IL',
        description:
          '• Developed comprehensive technical documentation for Solrise Finance products and the Solana ecosystem\n• Created user guides, API documentation, and educational content for blockchain and DeFi concepts',
      },
    ],
  },
  {
    company: 'N2 Communications',
    logo: '/images/logos/n2-logo.webp',
    roles: [
      {
        title: 'Senior Analyst',
        period: 'Jan 2018 - Dec 2021',
        location: 'Chicago, IL',
        description:
          '• Played a pivotal role in capital raising initiatives for specialized private equity ventures\n• Enhanced investor relations through comprehensive monthly reports\n• Developed expertise in analyzing global regulatory landscapes, particularly in the crypto sector',
      },
    ],
  },
];

const skills: Skill[] = [
  {
    name: 'Programming',
    subSkills: ['Full Stack Development', 'Quantitative Trading', 'Smart Contracts'],
  },
  {
    name: 'Ecosystem Growth',
    subSkills: [
      'Relationship Development',
      'Grants & Investments',
      'Incentive Campaigns',
      'Community Building',
    ],
  },
  {
    name: 'Product Management',
    subSkills: ['Competitive Analysis', 'Product Strategy', 'User Research'],
  },
  {
    name: 'Financial Analysis',
    subSkills: ['Investment Strategies', 'Macro Insights', 'Market Trends'],
  },
];

const logos = [
  '/images/logos/aptos-logo.webp',
  '/images/logos/solana-logo.webp',
  '/images/logos/ethereum-logo.webp',
];

export default function BioSection() {
  const logoRef = React.useRef(null);
  const resumeLinkRef = React.useRef(null);
  const isLogoInView = useInView(logoRef, { once: true, amount: 0.5 });
  const isResumeLinkInView = useInView(resumeLinkRef, { once: true, amount: 0.5 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isResumeLinkInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isResumeLinkInView, hasAnimated]);

  return (
    <section className="bio-section py-6 px-4 sm:px-6 lg:px-8 bg-inherit text-gray-300">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col items-center mb-8">
          <div className="w-full md:w-4/5 mb-6 text-center">
            <motion.div
              className="text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <p className="text-base leading-relaxed mb-4">
                Driving innovation in DeFi and AI on high-performance blockchains.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Head of Growth for DeFi and AI at{' '}
                <a
                  href="https://aptoslabs.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pastel-blue hover:underline font-semibold"
                >
                  Aptos Labs
                </a>
                , with a refined understanding of on-chain product market fit based on years of
                experience building and participating in the Aptos, Solana, and EVM ecosystems.
              </p>
            </motion.div>
          </div>

          <div ref={logoRef} className="flex justify-center space-x-4 mb-4 mt-2">
            {logos.map((logo, index) => (
              <motion.div
                key={`logo-${index}`}
                className="rounded-full aspect-square overflow-hidden w-12 h-12 md:w-16 md:h-16 logo-container"
                initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                animate={isLogoInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={
                    index === 0
                      ? 'https://aptosfoundation.org/'
                      : index === 1
                      ? 'https://solana.org/'
                      : 'https://ethereum.foundation/'
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="logo-link"
                >
                  <Image
                    src={logo}
                    alt={
                      index === 0
                        ? 'Aptos Foundation'
                        : index === 1
                        ? 'Solana Foundation'
                        : 'Ethereum Foundation'
                    }
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div ref={resumeLinkRef} className="text-center pb-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isResumeLinkInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <Link href="/resume" passHref>
              <motion.span
                className="inline-flex items-center text-base font-medium text-gray-400 hover:text-[var(--color-secondary)] transition-colors duration-200 focus:outline-none cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Resume
                <motion.span
                  className="ml-1"
                  initial={{ x: 0 }}
                  animate={hasAnimated ? { x: 5 } : {}}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <ChevronRight className="w-3 h-3" aria-hidden="true" />
                </motion.span>
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

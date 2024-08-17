import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';

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
    degree: "",
    institution: "DePaul University",
    year: "2015 - 2018",
    location: "Chicago, IL",
  },
];

const experiences: Experience[] = [
  {
    company: 'Aptos Labs',
    logo: '/images/logos/aptos-labs-logo.webp',
    roles: [
      {
        title: 'Head of Growth, DeFi & AI',
        period: '2023 - Present',
        location: 'San Francisco, CA',
        description: '• Leading growth strategies for DeFi and AI verticals\n• Driving ecosystem expansion and adoption\n• Collaborating with cross-functional teams to develop innovative blockchain solutions',
      },
      {
        title: 'Developer Ecosystems Manager',
        period: '2022 - 2023',
        location: 'San Francisco, CA',
        description: '• Managed relationships with DeFi projects building on Aptos\n• Facilitated technical integrations and provided support to developers\n• Organized developer-focused events and hackathons to grow the Aptos ecosystem',
      },
    ],
  },
  {
    company: 'Solrise Finance',
    logo: '/images/logos/solrise-logo.webp',
    roles: [
      {
        title: 'Product Manager',
        period: '2021 - 2022',
        location: 'Chicago, IL',
        description: '• Led product strategy and managed technical documentation for innovative blockchain solutions\n• Bridged the gap between new users and blockchain wallets by conducting extensive user research',
      },
      {
        title: 'Technical Writer',
        period: '2020 - 2021',
        location: 'Chicago, IL',
        description: '• Developed comprehensive technical documentation for Solrise Finance products and the Solana ecosystem\n• Created user guides, API documentation, and educational content for blockchain and DeFi concepts',
      },
    ],
  },
  {
    company: 'N2 Communications',
    logo: '/images/logos/n2-logo.webp',
    roles: [
      {
        title: 'Senior Analyst',
        period: '2018 - 2020',
        location: 'Chicago, IL',
        description: "• Played a pivotal role in capital raising initiatives for specialized private equity ventures\n• Enhanced investor relations through comprehensive monthly reports\n• Developed expertise in analyzing global regulatory landscapes, particularly in the crypto sector",
      },
    ],
  },
];

const skills: Skill[] = [
  {
    name: 'Blockchain Technology',
    subSkills: ['Smart Contracts', 'Consensus Mechanisms', 'Tokenomics'],
  },
  {
    name: 'Defi',
    subSkills: ['Liquidity Pools', 'Yield Farming', 'Stablecoins'],
  },
  {
    name: 'AI',
    subSkills: ['Predictive Analytics', 'Automated Trading', 'Fraud Detection'],
  },
  {
    name: 'Ecosystem Growth',
    subSkills: ['Community Building', 'Partnership Development', 'Incentive Campaigns'],
  },
  {
    name: 'Product Management',
    subSkills: ['Competitive Analysis', 'User Research', 'Roadmap Planning'],
  },
  {
    name: 'Financial Analysis',
    subSkills: ['Risk Assessment', 'Market Trends', 'Investment Strategies'],
  },
];

// Update the logos array to only include 3 logos
const logos = [
  '/images/logos/aptos-logo.webp',
  '/images/logos/ethereum-logo.webp',
  '/images/logos/solana-logo.webp',
];

export default function BioSection() {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <section className="bio-section py-12 px-4 sm:px-6 lg:px-8 bg-inherit text-gray-300">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between mb-8">
          <div className="flex-grow pr-4 md:max-w-[80%] mb-6 md:mb-0">
            <motion.div
              className="text-gray-300 text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <p className="text-base leading-relaxed mb-4">
                Driving innovation in Defi and AI on the world&apos;s most performant blockchains.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Currently serving as Head of Growth for the DeFi and AI verticals at{' '}
                <a 
                  href="https://aptoslabs.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-pastel-blue hover:underline font-semibold"
                >
                  Aptos Labs
                </a>{' '}
                where I bring a cross-chain expertise with experience building and contributing to
                the Aptos, Solana, and EVM ecosystems.
              </p>
            </motion.div>
          </div>

          <div className="flex-shrink-0 w-full md:w-[20%]">
            <div className="flex flex-col items-center">
              <motion.div
                key="logo-0"
                className="rounded-full aspect-square overflow-hidden w-16 h-16 md:w-18 md:h-18 mt-2 mb-2"
                initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
                animate={{ opacity: 1, scale: 1, rotate: 360 }}
                transition={{ duration: 1.5, delay: 0 }}
              >
                <a href="https://aptosfoundation.org/" target="_blank" rel="noopener noreferrer">
                  <Image
                    src={logos[0]}
                    alt="Aptos Foundation"
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </a>
              </motion.div>
              <div className="flex justify-center space-x-4">
                {logos.slice(1).map((logo, index) => (
                  <motion.div
                    key={`logo-${index + 1}`}
                    className="rounded-full aspect-square overflow-hidden w-16 h-16 md:w-18 md:h-18"
                    initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
                    animate={{ opacity: 1, scale: 1, rotate: 360 }}
                    transition={{ duration: 1.5, delay: index === 0 ? 0.075 : 0.125 }}
                  >
                    <a 
                      href={index === 0 ? "https://ethereum.foundation/" : "https://solana.org/"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src={logo}
                        alt={index === 0 ? "Ethereum Foundation" : "Solana Foundation"}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                      />
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center pb-4">
          <motion.button
            onClick={toggleExpanded}
            className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-[var(--color-secondary)] transition-colors duration-200 focus:outline-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-expanded={expanded}
          >
            {expanded ? 'Hide Details' : 'Show Details'}
            {expanded ? (
              <ChevronUp className="ml-1 w-3 h-3" aria-hidden="true" />
            ) : (
              <ChevronDown className="ml-1 w-3 h-3" aria-hidden="true" />
            )}
          </motion.button>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full overflow-hidden mt-12"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="text-left">
                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">Education</h3>
                    <div className="mt-4">
                      <h4 className="text-xl font-bold text-white">DePaul University</h4>
                      <p className="text-lg text-gray-300">Chicago, IL</p>
                      <p className="text-sm text-gray-400">2015 - 2018</p>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">Skills & Expertise</h3>
                  <div className="space-y-4">
                    {skills.map((skill, index) => (
                      <motion.div
                        key={index}
                        className="bg-inherit"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <h4 className="text-lg font-bold text-white mb-2">{skill.name}</h4>
                        <ul className="space-y-1">
                          {skill.subSkills.map((subSkill, subIndex) => (
                            <li key={subIndex} className="text-gray-300 text-sm flex items-center">
                              <span className="mr-2 text-pastel-blue">•</span>
                              {subSkill}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-2 text-left">
                  <h3 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">Professional Experience</h3>
                  {experiences.map((exp, index) => (
                    <motion.div
                      key={index}
                      className="group relative overflow-hidden rounded-lg bg-inherit p-2 transition-all duration-300 hover:bg-gray-750 mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="flex items-center mb-2">
                        <div className="flex-shrink-0 mr-4">
                          <Image
                            src={exp.logo}
                            alt={`${exp.company} logo`}
                            width={48}
                            height={48}
                            className="rounded-full"
                          />
                        </div>
                        <div className="flex-grow">
                          <h4 className="text-xl font-bold text-white">{exp.company}</h4>
                        </div>
                      </div>
                      <div>
                        {exp.roles.map((role, roleIndex) => (
                          <div key={roleIndex} className="mb-2">
                            <h5 className="text-lg font-semibold text-white">{role.title}</h5>
                            <p className="text-sm text-gray-400">{role.period} | {role.location}</p>
                            <p className="text-gray-300 whitespace-pre-line mt-1">{role.description}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  logo: string;
}

interface Skill {
  name: string;
  subSkills: string[];
}

const experiences: Experience[] = [
  {
    title: 'Head of Growth, DeFi & AI',
    company: 'Aptos Labs',
    period: '2022 - Now',
    description: '',
    logo: '/images/logos/aptos-labs-logo.webp',
  },
  {
    title: 'Product Manager',
    company: 'Solrise Finance',
    period: '2020 - 2022',
    description:
      '• Led product strategy and managed technical documentation for innovative blockchain solutions including a non-custodial fund management platform, on-chain trading competitions, deep links, on-chain notifications, and digital wallets.\n • Bridged the gap between new users and blockchain wallets by conducting extensive user research and collaborating with senior engineers to implement fixes that enhanced the onboarding and overall user experience.\n• Owned all user facing content funnels that catered to audiences across skill levels. Developed onboarding materials, technical articles, editorials, and a popular 14-part course on blockchain technology and the role of DeFi.',
    logo: '/images/logos/solrise-logo.webp',
  },
  {
    title: 'Senior Analyst',
    company: 'N2 Communications',
    period: '2018 - 2020',
    description:
      "• Played a pivotal role in capital raising initiatives, contributing to over $2 billion in funds raised for specialized private equity ventures. Focused on commodities and high-performing companies in Germany's Mittelstand market, demonstrating expertise in niche investment sectors and cross-border financial operations.\n • Enhanced investor relations across multiple firms through the creation of comprehensive monthly reports. Specialized in analyzing and communicating complex information on crypto and commodity investments, synthesizing data to provide actionable insights for stakeholders.\n• Developed a reputation for incisive analysis of global regulatory landscapes, particularly in the evolving crypto sector. Provided strategic guidance to help firms navigate complex international financial regulations, mitigating risks and identifying opportunities in rapidly changing markets.",
    logo: '/images/logos/n2-logo.webp',
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
  '/images/logos/solana-logo.webp',
  '/images/logos/ethereum-logo.webp',
];

export default function BioSection() {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <section className="bio-section py-6 px-2 sm:px-4 lg:px-6 bg-inherit text-gray-300">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between mb-8">
          <div className="flex-grow pr-4 md:max-w-[80%] mb-6 md:mb-0">
            <motion.div
              className="text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <p className="text-lg leading-relaxed text-left mb-4">
                Driving innovation in Defi and AI on the world&apos;s most performant blockchains.
              </p>
              <p className="text-lg leading-relaxed text-left mb-4">
                Currently serving as Head of Growth for the DeFi and AI verticals at Aptos Labs
                where I bring a cross-chain expertise with experience building and contributing to
                the Aptos, Solana, and EVM ecosystems.
              </p>
            </motion.div>
          </div>

          <div className="flex-shrink-0 w-full md:w-[20%]">
            <div className="flex flex-col items-center">
              <motion.div
                key="logo-0"
                className="bg-gray-800 rounded-full aspect-square overflow-hidden w-16 h-16 md:w-18 md:h-18 mt-2 mb-2"
                initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
                animate={{ opacity: 1, scale: 1, rotate: 360 }}
                transition={{ duration: 1.5, delay: 0 }}
              >
                <Image
                  src={logos[0]}
                  alt="Logo 1"
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </motion.div>
              <div className="flex justify-center space-x-4">
                {logos.slice(1).map((logo, index) => (
                  <motion.div
                    key={`logo-${index + 1}`}
                    className="bg-gray-800 rounded-full aspect-square overflow-hidden w-16 h-16 md:w-18 md:h-18"
                    initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
                    animate={{ opacity: 1, scale: 1, rotate: 360 }}
                    transition={{ duration: 1.5, delay: index === 0 ? 0.075 : 0.125 }}
                  >
                    <Image
                      src={logo}
                      alt={`Logo ${index + 2}`}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center pb-4">
          <motion.button
            onClick={toggleExpanded}
            className="text-sm font-medium text-gray-400 hover:text-[var(--color-secondary)] transition-colors duration-200 focus:outline-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-expanded={expanded}
          >
            {expanded ? 'Hide Details' : 'Show Details'}
            {expanded ? (
              <ChevronUp className="ml-1 w-3 h-3 inline" aria-hidden="true" />
            ) : (
              <ChevronDown className="ml-1 w-3 h-3 inline" aria-hidden="true" />
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
              className="w-full overflow-hidden mt-8"
            >
              <div className="flex flex-col lg:flex-row gap-12">
                <div className="lg:w-1/2">
                  <h3 className="text-2xl font-semibold mb-6 text-white text-left">Experience</h3>
                  {experiences.map((exp, index) => (
                    <motion.div
                      key={index}
                      className="group relative overflow-hidden rounded-xl bg-gray-800/30 p-6 transition-all duration-300 hover:bg-gray-700/40 hover:shadow-lg hover:shadow-pastel-blue/20 flex flex-col mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-pastel-blue/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                      <div className="flex items-start mb-2 relative z-10">
                        <div className="flex-shrink-0 mr-4">
                          <Image
                            src={exp.logo}
                            alt={`${exp.company} logo`}
                            width={50}
                            height={50}
                            className="rounded-full"
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between items-start">
                            <div className="text-left">
                              <h4 className="text-xl font-bold text-gray-200 group-hover:text-pastel-blue transition-colors duration-300">
                                {exp.title}
                              </h4>
                              <p className="text-[var(--color-secondary)] font-medium">
                                {exp.company}
                              </p>
                            </div>
                            <span className="text-sm text-gray-400 font-medium">{exp.period}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-400 whitespace-pre-line mt-4 group-hover:text-gray-300 transition-colors duration-300 relative z-10 text-left">
                        {exp.description}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="lg:w-1/2">
                  <h3 className="text-2xl font-semibold mb-6 text-white text-left">
                    Skills & Expertise
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {skills.map((skill, index) => (
                      <motion.div
                        key={index}
                        className="group relative overflow-hidden rounded-xl bg-gray-800/30 p-6 transition-all duration-300 hover:bg-gray-700/40 hover:shadow-lg hover:shadow-pastel-blue/20 flex flex-col"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-pastel-blue/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                        <h4 className="text-xl font-bold text-gray-200 mb-4 text-left group-hover:text-pastel-blue transition-colors duration-300 relative z-10">
                          {skill.name}
                        </h4>
                        <ul className="space-y-2 text-left relative z-10">
                          {skill.subSkills.map((subSkill, subIndex) => (
                            <li
                              key={subIndex}
                              className="text-gray-400 flex items-center group-hover:text-gray-300 transition-colors duration-300"
                            >
                              <span className="mr-2 text-[var(--color-secondary)]">•</span>
                              {subSkill}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
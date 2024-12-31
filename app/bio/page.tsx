'use client';

import React, { memo, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const SOCIAL_LINKS = [
  { icon: FaGithub, href: 'https://github.com/zacharyr0th', label: 'GitHub' },
  { icon: FaLinkedin, href: 'https://linkedin.com/in/zacharyr0th', label: 'LinkedIn' },
  { icon: FaTwitter, href: 'https://twitter.com/zacharyr0th', label: 'Twitter' },
] as const;

const ProfileImage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <motion.div
        className="relative aspect-square w-48"
        whileHover={{ scale: 1.05 }}
        onClick={handleClick}
      >
        <Image
          src="/misc/profile-picture.webp"
          alt="Profile picture"
          fill
          className="rounded-full object-cover shadow-lg transition-all duration-300 hover:shadow-2xl cursor-pointer"
        />
      </motion.div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
          onClick={handleClose}
        >
          <div
            className="relative aspect-square w-96 bg-white p-4 rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src="/misc/profile-picture.webp"
              alt="Profile picture"
              fill
              className="rounded-full object-cover shadow-lg transition-shadow hover:shadow-xl"
            />
            <input
              type="file"
              accept="image/*"
              aria-label="Upload profile picture"
              className="absolute inset-0 opacity-0 cursor-pointer rounded-full"
            />
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 bg-white rounded-full p-2"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const BIO = {
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

interface SectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

interface TimelineItem {
  date: string;
  title: string;
  company?: string;
  description: readonly string[];
}

interface TimelineItemProps {
  item: TimelineItem;
  index: number;
}

interface SkillCategory {
  category: string;
  skills: readonly string[];
}

interface SkillCategoryProps {
  category: SkillCategory;
}

const Section = memo<SectionProps>(({ title, children, className = '' }) => (
  <section
    className={`bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm ${className}`}
    style={{
      backgroundColor: 'var(--color-surface)',
      borderRadius: 'var(--border-radius-lg)',
      padding: 'var(--spacing-lg)',
    }}
  >
    <h2
      className="text-2xl font-bold mb-4 dark:text-white"
      style={{ color: 'var(--heading-color)' }}
    >
      {title}
    </h2>
    {children}
  </section>
));

Section.displayName = 'Section';

const TimelineItem = memo<TimelineItemProps>(({ item, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.2 }}
    className={`flex flex-col gap-2 ${index > 0 ? 'mt-8' : ''}`}
  >
    <div className="text-sm text-muted">{item.date}</div>
    <h3 className="text-lg font-semibold">{item.title}</h3>
    {item.company && <div className="text-accent">{item.company}</div>}
    <ul className="list-disc list-inside space-y-2">
      {item.description.map((point, i) => (
        <li key={i} className="text-muted">
          {point}
        </li>
      ))}
    </ul>
  </motion.div>
));

TimelineItem.displayName = 'TimelineItem';

const SkillCategory = memo<SkillCategoryProps>(({ category }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="flex flex-col gap-4"
  >
    <h3 className="text-lg font-semibold">{category.category}</h3>
    <div className="flex flex-wrap gap-2">
      {category.skills.map((skill, index) => (
        <motion.span
          key={skill}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="px-3 py-1 text-sm rounded-full bg-surface text-muted hover:text-accent hover:bg-accent/10 transition-all"
        >
          {skill}
        </motion.span>
      ))}
    </div>
  </motion.div>
));

SkillCategory.displayName = 'SkillCategory';

const HeroSection = memo(() => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col md:flex-row gap-8 items-center mb-12"
  >
    <ProfileImage />
    <div className="text-center md:text-left">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-4xl font-bold mb-2"
      >
        {BIO.name}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-xl mb-4"
      >
        {BIO.title}
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex gap-4 justify-center md:justify-start"
      >
        {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-gray-600 hover:text-accent transition-colors"
            aria-label={label}
          >
            <Icon />
          </a>
        ))}
      </motion.div>
    </div>
  </motion.div>
));

HeroSection.displayName = 'HeroSection';

const AboutSection = memo(() => (
  <Section title="About">
    <p
      style={{ color: 'var(--color-text-primary)' }}
      className="text-gray-700 dark:text-gray-300 leading-relaxed"
    >
      Since 2019, I&apos;ve been involved with projects across multiple hyper-growth blockchain
      ecosystems including Bitcoin, Ethereum, Solana, and Aptos. My work involves identifying market
      opportunities and guiding DeFi and AI teams on leveraging on-chain solutions to enhance their
      products and services on Aptos, the world&apos;s highest performing blockchain.
    </p>
  </Section>
));

AboutSection.displayName = 'AboutSection';

const ExperienceSection = memo(() => (
  <Section title="Experience">
    <div className="relative space-y-8">
      <div
        className="absolute left-0 top-2 h-full w-0.5"
        style={{
          background: `linear-gradient(to bottom, var(--color-primary), var(--color-accent))`,
        }}
      />
      {BIO.experience.map((item, index) => (
        <TimelineItem key={item.title} item={item} index={index} />
      ))}
    </div>
  </Section>
));

ExperienceSection.displayName = 'ExperienceSection';

const CompetenciesSection = memo(() => (
  <Section title="Competencies">
    <div className="space-y-6">
      {BIO.skills.map((category) => (
        <SkillCategory key={category.category} category={category} />
      ))}
    </div>
  </Section>
));

CompetenciesSection.displayName = 'CompetenciesSection';

export default function BioPage() {
  return (
    <div className="content-page font-mono bg-gradient-to-b from-background to-surface/30">
      <main className="container mx-auto px-6 sm:px-8">
        <HeroSection />
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <AboutSection />
          <ExperienceSection />
          <CompetenciesSection />
        </motion.div>
      </main>
    </div>
  );
}

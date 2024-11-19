import React from 'react';
import ProfileImage from '../components/common/ProfileImage';
import Footer from '../components/common/Footer';
import { BIO_DATA } from '@/lib/constants';
import type { SectionProps, TimelineItemProps, SkillCategoryProps } from '@/lib/types';

const Section: React.FC<SectionProps> = ({ title, children, className = '' }) => (
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
);

const TimelineItem: React.FC<TimelineItemProps> = ({ item, index }) => (
  <div className="relative pl-8 animate-fadeIn" style={{ animationDelay: `${index * 200}ms` }}>
    <div
      className="absolute left-[-8px] top-2 w-4 h-4 rounded-full ring-4 transition-transform hover:scale-110"
      style={{
        backgroundColor: 'var(--color-primary)',
        borderColor: 'var(--color-surface)',
      }}
    />

    <div className="flex flex-col space-y-2">
      <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
        {item.date}
      </span>
      <h3 className="text-xl font-semibold" style={{ color: 'var(--heading-color)' }}>
        {item.title}
      </h3>
      <span className="text-lg" style={{ color: 'var(--color-text-primary)' }}>
        {item.company}
      </span>
      <ul className="list-disc pl-4 space-y-1">
        {item.description.map((point, i) => (
          <li
            key={i}
            className="text-base leading-relaxed"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {point}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const SkillCategory: React.FC<SkillCategoryProps> = ({ category }) => (
  <div className="animate-fadeIn">
    <h3 className="text-lg font-medium mb-3" style={{ color: 'var(--color-text-secondary)' }}>
      {category.category}
    </h3>
    <div className="flex flex-wrap gap-2">
      {category.skills.map((skill) => (
        <span
          key={skill}
          className="px-3 py-1 rounded-full text-sm font-medium transition-all hover:scale-105"
          style={{
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-white)',
          }}
        >
          {skill}
        </span>
      ))}
    </div>
  </div>
);

const BioPage = () => {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: 'var(--color-background)', fontFamily: 'var(--font-family-base)' }}
    >
      <main className="flex-grow container mx-auto px-5 md:px-48 pt-32 md:pt-36 pb-8 md:pb-18 max-w-5xl">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
          <ProfileImage />
          <div className="text-center md:text-left">
            <h1 style={{ color: 'var(--heading-color)' }} className="text-4xl font-bold mb-2">
              Zachary Roth
            </h1>
            <p style={{ color: 'var(--color-text-primary)' }} className="text-xl mb-1">
              Technologist, Writer, & Musician
            </p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          <Section title="About">
            <p
              style={{ color: 'var(--color-text-primary)' }}
              className="text-gray-700 dark:text-gray-300 leading-relaxed"
            >
              Since 2019, I&apos;ve been involved with projects across multiple hyper-growth
              blockchain ecosystems including Bitcoin, Ethereum, Solana, and Aptos. My work involves
              identifying market opportunities and guiding DeFi and AI teams on leveraging on-chain
              solutions to enhance their products and services on Aptos, the world&apos;s highest
              performing blockchain.
            </p>
          </Section>

          {/* Updated Experience section with timeline */}
          <Section title="Experience">
            <div className="relative space-y-8">
              {/* Timeline line */}
              <div
                className="absolute left-0 top-2 h-full w-0.5"
                style={{
                  background: `linear-gradient(to bottom, var(--color-primary), var(--color-accent))`,
                }}
              ></div>

              {/* Timeline items */}
              {BIO_DATA.experience.map((item, index) => (
                <TimelineItem
                  key={index}
                  item={{
                    ...item,
                    description: item.description,
                  }}
                  index={index}
                />
              ))}
            </div>
          </Section>

          {/* Technical Expertise section */}
          <Section title="Competencies">
            <div className="space-y-6">
              {BIO_DATA.skills.map((category) => (
                <SkillCategory
                  key={category.category}
                  category={{
                    category: category.category,
                    skills: category.skills,
                  }}
                />
              ))}
            </div>
          </Section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BioPage;

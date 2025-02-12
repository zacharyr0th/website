'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { getFeaturedProjects } from '@/projects/projects';
import ProjectCard from '@/projects/ProjectCard';
import { WRITING_PROJECTS } from './constants';

interface WritingCardProps {
  article: {
    title: string;
    description: string;
    link: string;
  };
}

const WritingCard = memo(({ article }: WritingCardProps) => (
  <Link href={article.link}>
    <div className="group relative flex flex-col justify-between px-8 py-6 space-y-4 bg-black/40 rounded-2xl border border-white/5 h-full">
      <article className="space-y-3 w-full">
        <h3 className="text-xl font-mono text-white/90 group-hover:text-accent transition-colors text-left w-full">
          {article.title}
        </h3>
        <p className="flex font-mono text-white/60 text-sm leading-relaxed line-clamp-3 text-left w-full">
          {article.description}
        </p>
      </article>

      <div className="flex items-center text-accent/80 group-hover:text-accent text-sm font-mono transition-colors">
        Read Article
        <svg
          className="ml-1 w-4 h-4 group-hover:translate-x-0.5 transition-transform"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M6.66667 12.6667L12 7.33333L6.66667 2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  </Link>
));

WritingCard.displayName = 'WritingCard';

const Section = memo(
  ({
    children,
    id,
    title,
    className,
  }: {
    children: React.ReactNode;
    id: string;
    title: string;
    className: string;
  }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
      <motion.section
        ref={ref}
        className={className}
        aria-labelledby={id}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.h2
            id={id}
            className="text-4xl font-bold mb-8 text-text-primary"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {title}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {children}
          </motion.div>
        </div>
      </motion.section>
    );
  }
);

Section.displayName = 'Section';

const ProjectGrid = memo(() => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    {getFeaturedProjects().map((project) => (
      <ProjectCard key={project.id} project={project} isFocused={false} />
    ))}
  </div>
));

ProjectGrid.displayName = 'ProjectGrid';

const WritingGrid = memo(({ articles }: { articles: typeof WRITING_PROJECTS }) => {
  const parentRef = React.useRef<HTMLDivElement>(null);
  
  return (
    <div ref={parentRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <WritingCard key={article.link} article={article} />
      ))}
    </div>
  );
});

WritingGrid.displayName = 'WritingGrid';

export const Main = memo(() => (
  <>
    <Section
      id="section-always-building"
      title="Always Building"
      className="w-full pt-16 pb-16 px-4 bg-background"
    >
      <ProjectGrid />
    </Section>

    <Section
      id="section-sometimes-writing"
      title="Sometimes Writing"
      className="w-full pt-16 pb-16 px-4 bg-surface"
    >
      <WritingGrid articles={WRITING_PROJECTS} />
    </Section>
  </>
));

Main.displayName = 'Main';

'use client';

/**
 * Main component for the home page
 * Displays featured projects and writing articles in a grid layout
 */

import React, { memo } from 'react';
import Link from 'next/link';
import { getFeaturedProjects } from '@/projects/data/projects';
import ProjectCard from '@/projects/components/ProjectCard';
import { type BaseProject } from '@/projects/types/types';
import { WRITING_PROJECTS } from '@/projects/data/writing';
import { ArticleCard } from 'components/writing-page/ArticleCard';
import { Section } from './Section';
import type { ArticleCategory, ArticleTag } from 'components/writing-page/types';

// Type definitions
interface GridProps {
  children: React.ReactNode;
  columns?: 2 | 3;
}

interface ViewAllLinkProps {
  href: string;
  text: string;
}

// Reusable components
const Grid = memo<GridProps>(({ children, columns = 2 }) => (
  <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 ${columns === 3 ? 'lg:grid-cols-3' : ''}`}>
    {children}
  </div>
));

Grid.displayName = 'Grid';

const ViewAllLink = memo<ViewAllLinkProps>(({ href, text }) => (
  <div className="mt-6 sm:mt-8 text-center">
    <Link
      href={href}
      className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-zinc-400 hover:text-accent border-b border-transparent hover:border-accent/30 transition-all duration-200"
    >
      {text}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="ml-1.5"
      >
        <path d="M5 12h14"></path>
        <path d="m12 5 7 7-7 7"></path>
      </svg>
    </Link>
  </div>
));

ViewAllLink.displayName = 'ViewAllLink';

// Grid components
const ProjectGrid = memo(() => {
  const featuredProjects = getFeaturedProjects();
  const displayedProjects = featuredProjects.slice(0, 6);

  return (
    <>
      <Grid columns={3}>
        {displayedProjects.map((project: BaseProject) => (
          <ProjectCard key={project.id} project={project} isFocused={false} />
        ))}
      </Grid>
      <ViewAllLink href="/projects" text="View all projects" />
    </>
  );
});

ProjectGrid.displayName = 'ProjectGrid';

// Common section styling
const sectionClassName = 'w-full pt-12 pb-12 px-3 sm:pt-16 sm:pb-16 sm:px-4 bg-background';

// Map writing categories to article categories
const categoryMap: Record<string, ArticleCategory> = {
  technical: 'technology',
  research: 'finance',
};

// Map writing tags to article tags
const tagMap: Record<string, ArticleTag> = {
  technology: 'web',
  development: 'react',
  blockchain: 'crypto',
  ai: 'ai',
};

const WritingGrid = memo(() => {
  // Transform WritingProject to Article format expected by ArticleCard
  const processedArticles = React.useMemo(
    () =>
      WRITING_PROJECTS.map((article) => ({
        id: article.id,
        slug: article.link.split('/').pop() || article.id,
        title: article.title,
        content: '',
        link: article.link,
        description: article.description,
        date: article.publishDate,
        category: categoryMap[article.category] || null,
        tags: article.tags.map((tag) => tagMap[tag] || 'web'),
        image: null,
        takeaways: null,
        frontmatter: {
          title: article.title,
          date: article.publishDate,
          description: article.description,
          category: categoryMap[article.category] || null,
          tags: article.tags.map((tag) => tagMap[tag] || 'web'),
          image: null,
          featured: false,
          draft: false,
          takeaways: null,
        },
      })),
    []
  );

  return (
    <>
      <Grid columns={3}>
        {processedArticles.map((article) => (
          <ArticleCard key={article.id} article={article} isFocused={false} />
        ))}
      </Grid>
      <ViewAllLink href="/writing" text="View all articles" />
    </>
  );
});

WritingGrid.displayName = 'WritingGrid';

// Main component
export const Main = memo(() => (
  <>
    <Section id="section-always-building" title="Always Building" className={sectionClassName}>
      <ProjectGrid />
    </Section>

    <Section id="section-sometimes-writing" title="Sometimes Writing" className={sectionClassName}>
      <WritingGrid />
    </Section>
  </>
));

Main.displayName = 'Main';

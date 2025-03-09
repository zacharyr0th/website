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
import { WRITING_PROJECTS } from '../constants/writing';
import { ArticleCard } from '@/writing/components/ArticleCard';
import { Section } from './Section';

// Type definitions
interface WritingProject {
  title: string;
  description: string;
  link: string;
}

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

const WritingGrid = memo(({ articles }: { articles: WritingProject[] }) => {
  // Transform WritingProject to Article format expected by ArticleCard
  const processedArticles = React.useMemo(
    () =>
      articles.map((article, index) => ({
        id: `article-${index}`,
        slug: article.link.split('/').pop() || `article-${index}`,
        title: article.title.includes('and Veblen')
          ? article.title.replace('and', '&')
          : article.title,
        content: '',
        link: article.link,
        description: article.description,
        date: '2025-03-09T00:00:00.000Z', // Static date to avoid hydration issues
        category: null,
        tags: [],
        image: null,
        takeaways: null,
        frontmatter: {
          title: article.title,
          date: '2025-03-09T00:00:00.000Z', // Static date to avoid hydration issues
          description: article.description,
          category: null,
          tags: [],
          image: null,
          featured: false,
          draft: false,
          takeaways: null,
        },
      })),
    [articles]
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

// Common section styling
const sectionClassName = 'w-full pt-12 pb-12 px-3 sm:pt-16 sm:pb-16 sm:px-4 bg-background';

// Main component
export const Main = memo(() => (
  <>
    <Section id="section-always-building" title="Always Building" className={sectionClassName}>
      <ProjectGrid />
    </Section>

    <Section id="section-sometimes-writing" title="Sometimes Writing" className={sectionClassName}>
      <WritingGrid articles={WRITING_PROJECTS} />
    </Section>
  </>
));

Main.displayName = 'Main';

'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import { getFeaturedProjects } from '@/projects/data/projects';
import ProjectCard from '@/projects/components/ProjectCard';
import { type BaseProject } from '@/projects/types/types';
import { WRITING_PROJECTS } from '../constants/writing';
import { Card } from './Card';
import { Section } from './Section';

interface WritingProject {
  title: string;
  description: string;
  link: string;
}

const WritingCard = memo(({ article }: { article: WritingProject }) => (
  <Card title={article.title} description={article.description} link={article.link}>
    <div className="flex items-center text-accent/80 group-hover:text-accent text-xs sm:text-sm font-mono transition-colors">
      Read Article
      <svg
        className="ml-1 w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform"
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
  </Card>
));

WritingCard.displayName = 'WritingCard';

const ProjectGrid = memo(() => {
  const featuredProjects = getFeaturedProjects();
  const displayedProjects = featuredProjects.slice(0, 4);

  return (
    <>
      <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 sm:gap-6">
        {displayedProjects.map((project: BaseProject) => (
          <ProjectCard key={project.id} project={project} isFocused={false} />
        ))}
      </div>
      <div className="mt-6 sm:mt-8 text-center">
        <Link
          href="/projects"
          className="inline-flex items-center justify-center px-4 sm:px-6 py-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors duration-200"
        >
          View all projects →
        </Link>
      </div>
    </>
  );
});

ProjectGrid.displayName = 'ProjectGrid';

const WritingGrid = memo(({ articles }: { articles: WritingProject[] }) => (
  <>
    <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
      {articles.map((article) => {
        const title = article.title.includes('and Veblen')
          ? article.title.replace('and', '&')
          : article.title;

        return <WritingCard key={article.link} article={{ ...article, title }} />;
      })}
    </div>
    <div className="mt-6 sm:mt-8 text-center">
      <Link
        href="/writing"
        className="inline-flex items-center justify-center px-4 sm:px-6 py-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors duration-200"
      >
        View all articles →
      </Link>
    </div>
  </>
));

WritingGrid.displayName = 'WritingGrid';

export const Main = memo(() => (
  <>
    <Section
      id="section-always-building"
      title="Always Building"
      className="w-full pt-12 pb-12 px-3 sm:pt-16 sm:pb-16 sm:px-4 bg-background"
    >
      <ProjectGrid />
    </Section>

    <Section
      id="section-sometimes-writing"
      title="Sometimes Writing"
      className="w-full pt-12 pb-12 px-3 sm:pt-16 sm:pb-16 sm:px-4 bg-surface"
    >
      <WritingGrid articles={WRITING_PROJECTS} />
    </Section>
  </>
));

Main.displayName = 'Main';

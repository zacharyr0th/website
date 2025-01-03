'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import { PROJECTS } from '@projects/projects';
import ProjectCard from '../../projects/ProjectCard';

const WRITING_PROJECTS = [
  {
    title: "A Bird's Eye View",
    description: 'Seeing the forest through the trees when it comes to blockchain adoption.',
    link: '/writing/birdseye-view'
  },
  {
    title: 'Building SimpleOS',
    description: 'A deep dive into operating system development and low-level programming concepts.',
    link: '/writing/simple-os'
  },
  {
    title: 'MusicIDE',
    description: 'Exploring the intersection of artificial intelligence and music composition.',
    link: '/writing/musicide'
  }
];

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
        <h2 className="text-xl font-mono text-white/90 group-hover:text-accent transition-colors text-left w-full">{article.title}</h2>
        <p className="flex font-mono text-white/60 text-sm leading-relaxed line-clamp-3 text-left w-full">{article.description}</p>
      </article>

      <div className="ml-4 flex items-center text-accent/80 group-hover:text-accent text-sm font-mono transition-colors">
        Read Article
        <svg className="ml-1 w-4 h-4 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.66667 12.6667L12 7.33333L6.66667 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  </Link>
));

WritingCard.displayName = 'WritingCard';

export const Main = memo(() => (
  <>
    <section
      className="w-full pt-16 pb-16 px-4 bg-background"
      aria-labelledby="section-always-building"
    >
      <div className="max-w-5xl mx-auto">
        <h2 id="section-always-building" className="text-4xl font-bold mb-8 text-text-primary">
          Always Building
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 auto-rows-fr">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>

    <section
      className="w-full pt-16 pb-16 px-4 bg-surface"
      aria-labelledby="section-sometimes-writing"
    >
      <div className="max-w-5xl mx-auto">
        <h2 id="section-sometimes-writing" className="text-4xl font-bold mb-8 text-text-primary">
          Sometimes Writing
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {WRITING_PROJECTS.map((article) => (
            <WritingCard key={article.link} article={article} />
          ))}
        </div>
      </div>
    </section>
  </>
));

Main.displayName = 'Main';

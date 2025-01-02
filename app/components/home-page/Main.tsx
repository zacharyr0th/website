import React, { memo } from 'react';
import Link from 'next/link';
import { PROJECTS, WRITING_PROJECTS } from '@projects/projects';
import ProjectCard from '../../projects/ProjectCard';

interface WritingCardProps {
  article: {
    title: string;
    description: string;
    link: string;
  };
}

const WritingCard = memo(({ article }: WritingCardProps) => (
  <div className="rounded-2xl bg-background p-6 flex flex-col h-[200px]">
    <article className="space-y-2 flex-grow">
      <h2 className="text-2xl font-mono">{article.title}</h2>

      <p className="text-text-secondary text-sm leading-relaxed">{article.description}</p>
    </article>

    <div className="mt-auto pt-8">
      <Link
        href={article.link}
        className="inline-block rounded-full bg-surface hover:bg-primary px-6 py-2 text-sm transition-colors"
      >
        Read Article
      </Link>
    </div>
  </div>
));

WritingCard.displayName = 'WritingCard';

export const Main = memo(() => (
  <>
    <section
      className="w-full pt-32 pb-16 px-4 bg-background"
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
      className="w-full pt-32 pb-16 px-4 bg-surface"
      aria-labelledby="section-sometimes-writing"
    >
      <div className="max-w-5xl mx-auto">
        <h2 id="section-sometimes-writing" className="text-4xl font-bold mb-8 text-text-primary">
          Sometimes Writing
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 auto-rows-fr">
          {WRITING_PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  </>
));

Main.displayName = 'Main';

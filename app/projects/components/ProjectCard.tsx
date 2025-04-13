/**
 * ProjectCard component for displaying project information in a card format
 */
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaNewspaper, FaPlay } from 'react-icons/fa6';
import { Button } from 'components/common';
import type { BaseProject } from '../types/types';
import { cn } from '@/lib';
import Link from 'next/link';

interface ProjectTagProps {
  tag: string;
}

const ProjectTag = ({ tag }: ProjectTagProps) => (
  <span className="inline-flex items-center px-3 py-1 text-sm font-sans text-[var(--color-text-secondary)] bg-[rgba(255,255,255,0.1)] rounded-xl">
    {tag}
  </span>
);

interface ProjectLinksProps {
  project: BaseProject;
  className?: string;
}

const ProjectLinks = ({ project, className }: ProjectLinksProps) => (
  <div
    className={cn('flex items-center gap-2 z-10', className)}
    onClick={(e) => e.stopPropagation()}
  >
    {project.demoLink && (
      <Button
        icon={<FaPlay className="h-4 w-4" />}
        onClick={() => window.open(project.demoLink, '_blank', 'noopener,noreferrer')}
        ariaLabel="View live demo"
        className="text-zinc-400/60 hover:text-accent transition-colors"
      />
    )}
    {project.articleLink && (
      <Button
        icon={<FaNewspaper className="h-4 w-4" />}
        onClick={() => window.open(project.articleLink, '_blank', 'noopener,noreferrer')}
        ariaLabel="Read project article"
        className="text-zinc-400/60 hover:text-accent transition-colors"
      />
    )}
    {project.githubLink && (
      <Button
        icon={<FaGithub className="h-5 w-5" />}
        onClick={() => window.open(project.githubLink, '_blank', 'noopener,noreferrer')}
        ariaLabel="View project on GitHub"
        className="text-zinc-400/60 hover:text-accent transition-colors"
      />
    )}
  </div>
);

interface ProjectCardProps {
  project: BaseProject;
  isFocused: boolean;
}

const ProjectCard = ({ project, isFocused }: ProjectCardProps) => {
  const cardRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isFocused && cardRef.current) {
      cardRef.current.focus();
    }
  }, [isFocused]);

  const primaryLink =
    project.demoLink || project.articleLink || project.githubLink || project.link || '#';

  return (
    <Link
      href={primaryLink}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block h-full"
    >
      <motion.article
        ref={cardRef}
        tabIndex={0}
        className={cn(
          'relative h-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#1A1A1A]/50 to-[#2A2A2A]/50 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl border border-white/5',
          'focus:outline-none focus:ring-2 focus:ring-accent/50'
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{ willChange: 'transform, opacity', contain: 'layout style paint' }}
      >
        <div className="flex h-full flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-start justify-between">
              <h3 className="text-xl font-sans font-semibold text-[var(--color-text-primary)] group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <ProjectLinks project={project} className="ml-auto" />
            </div>
            <p className="text-base font-sans text-[var(--color-text-secondary)]">
              {project.description}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap items-center gap-1.5 text-sm">
              {project.tags.slice(0, 3).map((tag) => (
                <ProjectTag key={tag} tag={tag} />
              ))}
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
};

export default ProjectCard;

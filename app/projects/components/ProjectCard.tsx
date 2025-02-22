'use client';

import React, { memo, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaNewspaper, FaPlay } from 'react-icons/fa6';
import { IconButton } from '@/components/buttons';
import type { BaseProject } from '../types/types';
import { cn } from '@/lib';
import Link from 'next/link';

interface ProjectTagProps {
  tag: string;
}

const ProjectTag = memo<ProjectTagProps>(({ tag }) => (
  <span className="inline-flex items-center px-2.5 py-1 text-sm font-medium bg-white/5 text-zinc-400 rounded-md transition-colors hover:bg-white/10">
    {tag}
  </span>
));

ProjectTag.displayName = 'ProjectTag';

interface ProjectLinksProps {
  project: BaseProject;
  className?: string;
}

const ProjectLinks = memo<ProjectLinksProps>(({ project, className }) => (
  <div
    className={cn('flex items-center gap-2 z-10', className)}
    onClick={(e) => e.stopPropagation()}
  >
    {project.demoLink && (
      <IconButton
        icon={<FaPlay className="h-4 w-4" />}
        onClick={() => window.open(project.demoLink, '_blank', 'noopener,noreferrer')}
        ariaLabel="View live demo"
        className="text-zinc-400/60 hover:text-accent transition-colors"
      />
    )}
    {project.articleLink && (
      <IconButton
        icon={<FaNewspaper className="h-4 w-4" />}
        onClick={() => window.open(project.articleLink, '_blank', 'noopener,noreferrer')}
        ariaLabel="Read project article"
        className="text-zinc-400/60 hover:text-accent transition-colors"
      />
    )}
    {project.githubLink && (
      <IconButton
        icon={<FaGithub className="h-5 w-5" />}
        onClick={() => window.open(project.githubLink, '_blank', 'noopener,noreferrer')}
        ariaLabel="View project on GitHub"
        className="text-zinc-400/60 hover:text-accent transition-colors"
      />
    )}
  </div>
));

ProjectLinks.displayName = 'ProjectLinks';

interface ProjectCardProps {
  project: BaseProject;
  isFocused: boolean;
}

const ProjectCard = memo<ProjectCardProps>(({ project, isFocused }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFocused && cardRef.current) {
      cardRef.current.focus();
    }
  }, [isFocused]);

  const primaryLink =
    project.demoLink || project.articleLink || project.githubLink || project.link || '#';

  return (
    <Link href={primaryLink} target="_blank" rel="noopener noreferrer" className="block">
      <div className="p-1.5 group/card">
        <motion.article
          ref={cardRef}
          tabIndex={0}
          className={cn(
            'group relative p-3 sm:p-4 backdrop-blur-sm rounded-2xl border border-white/5',
            'transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-accent/50',
            'flex flex-col justify-between',
            'bg-white/[0.02] hover:bg-white/[0.06]',
            'h-[155px] sm:h-[165px]'
          )}
        >
          <div className="flex flex-col">
            <div className="flex items-start justify-between">
              <h3 className="text-xl sm:text-2xl font-mono font-medium text-white group-hover/card:text-accent transition-colors line-clamp-1 tracking-tight">
                {project.title}
              </h3>
              <ProjectLinks project={project} className="ml-auto" />
            </div>
            <p className="text-base text-white/70 leading-normal line-clamp-2 mt-4 mb-3 font-mono">
              {project.description}
            </p>
          </div>

          <div>
            <div className="flex items-center justify-end text-sm text-zinc-400">
              <div className="flex flex-wrap items-center gap-1.5">
                {project.tags.map((tag) => (
                  <ProjectTag key={tag} tag={tag} />
                ))}
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </Link>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;

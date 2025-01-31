'use client';

import React, { memo, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGithub, FaNewspaper, FaPlay } from 'react-icons/fa6';
import { IconButton } from '../components/buttons';
import type { BaseProject } from './projects';
import Link from 'next/link';

interface ProjectTagProps {
  tag: string;
}

const ProjectTag = memo<ProjectTagProps>(({ tag }) => (
  <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-white/5 text-zinc-400 rounded-md">
    {tag}
  </span>
));

ProjectTag.displayName = 'ProjectTag';

interface ProjectLinksProps {
  project: BaseProject;
}

const ProjectLinks = memo<ProjectLinksProps>(({ project }) => (
  <div className="flex ml-auto">
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
  const ref = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isFocused && linkRef.current) {
      linkRef.current.focus();
    }
  }, [isFocused]);

  return (
    <motion.div
      ref={ref}
      style={{
        transform: isInView ? 'none' : 'translateY(50px)',
        opacity: isInView ? 1 : 0,
        transition: 'all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s',
      }}
    >
      <Link
        ref={linkRef}
        href={project.link || project.githubLink || project.demoLink || '#'}
        className={`block transition-all duration-200 ease-in-out will-change-transform outline-none ${
          isFocused ? 'scale-[1.02]' : 'hover:scale-[1.02]'
        }`}
        role="listitem"
        tabIndex={0}
      >
        <article
          className={`flex flex-col justify-between h-[11.25rem] p-6 group rounded-xl transition-all duration-200 ${
            isFocused ? 'bg-zinc-800/50' : 'hover:bg-zinc-800/50 bg-inherit'
          }`}
        >
          <div className="space-y-3">
            <div>
              <h3
                className={`text-xl font-semibold transition-colors line-clamp-1 ${
                  isFocused ? 'text-accent' : 'text-zinc-100 group-hover:text-accent'
                }`}
              >
                {project.title}
              </h3>
            </div>
            <p className="text-base text-zinc-400 leading-relaxed line-clamp-2">
              {project.description}
            </p>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex-1 flex flex-wrap gap-2">
                {project.tags.map((tag: string) => (
                  <ProjectTag key={tag} tag={tag} />
                ))}
              </div>
              <ProjectLinks project={project} />
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;

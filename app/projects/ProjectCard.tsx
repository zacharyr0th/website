'use client';

import React, { memo } from 'react';
import { FaGithub, FaNewspaper, FaPlay } from 'react-icons/fa6';
import { IconButton } from '../components/buttons/IconButton';
import { BaseProject } from './projects';

const ProjectTag = memo(({ tag }: { tag: string }) => (
  <span
    className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-white/5 text-secondary/90 rounded-md"
  >
    {tag}
  </span>
));

ProjectTag.displayName = 'ProjectTag';

const ProjectLinks = memo(({ project }: { project: BaseProject }) => (
  <div className="flex ml-auto">
    {project.githubLink && (
      <IconButton
        icon={<FaGithub className="h-5 w-5" />}
        onClick={() => window.open(project.githubLink, '_blank', 'noopener,noreferrer')}
        ariaLabel="View project on GitHub"
        className="text-secondary/60 hover:text-accent transition-colors"
      />
    )}
    {project.articleLink && (
      <IconButton
        icon={<FaNewspaper className="h-4 w-4" />}
        onClick={() => window.open(project.articleLink, '_blank', 'noopener,noreferrer')}
        ariaLabel="Read project article"
        className="text-secondary/60 hover:text-accent transition-colors"
      />
    )}
    {project.demoLink && (
      <IconButton
        icon={<FaPlay className="h-4 w-4" />}
        onClick={() => window.open(project.demoLink, '_blank', 'noopener,noreferrer')}
        ariaLabel="View live demo"
        className="text-secondary/60 hover:text-accent transition-colors"
      />
    )}
  </div>
));

ProjectLinks.displayName = 'ProjectLinks';

function ProjectCardComponent({ project }: { project: BaseProject }) {
  return (
    <div 
      className="flex flex-col justify-between p-6 group space-y-4 bg-surface/50 rounded-xl hover:bg-surface hover:scale-[1.02] hover:shadow-lg transition-all duration-300 ease-in-out will-change-transform"
    >
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-white group-hover:text-accent transition-colors">
            {project.title}
          </h3>
        </div>
        <p className="text-secondary/90 text-sm leading-relaxed">{project.description}</p>
      </div>

      <div>
        <div className="flex flex-wrap items-center gap-2">
          {project.tags.map((tag: string) => (
            <ProjectTag key={tag} tag={tag} />
          ))}
          <ProjectLinks project={project} />
        </div>
      </div>
    </div>
  );
}

ProjectCardComponent.displayName = 'ProjectCard';

export default memo(ProjectCardComponent);

'use client';

import React from 'react';
import { FaGithub, FaNewspaper, FaPlay } from 'react-icons/fa6';
import { IconButton } from '../components/buttons/IconButton';
import { BaseProject } from './projects';

interface ProjectCardProps {
  project: BaseProject;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="flex flex-col justify-between p-6 group space-y-4 bg-surface/50 rounded-lg hover:bg-surface transition-colors">
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
            <span
              key={tag}
              className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-white/5 text-secondary/90 rounded-md"
            >
              {tag}
            </span>
          ))}
          <div className="flex ml-auto">
            {project.githubLink && (
              <IconButton
                icon={<FaGithub className="h-5 w-5" />}
                onClick={() => window.open(project.githubLink, '_blank', 'noopener,noreferrer')}
                ariaLabel="View project on GitHub"
                className="text-secondary/60"
              />
            )}
            {project.articleLink && (
              <IconButton
                icon={<FaNewspaper className="h-4 w-4" />}
                onClick={() => window.open(project.articleLink, '_blank', 'noopener,noreferrer')}
                ariaLabel="Read project article"
                className="text-secondary/60"
              />
            )}
            {project.demoLink && (
              <IconButton
                icon={<FaPlay className="h-4 w-4" />}
                onClick={() => window.open(project.demoLink, '_blank', 'noopener,noreferrer')}
                ariaLabel="View live demo"
                className="text-secondary/60"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

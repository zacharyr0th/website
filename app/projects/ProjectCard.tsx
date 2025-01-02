import React from 'react';
import Link from 'next/link';
import { FaGithub, FaNewspaper, FaPlay } from 'react-icons/fa6';
import { ProjectType } from './projects';

interface ProjectCardProps {
  project: ProjectType;
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
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-white/5 text-secondary/90 rounded-md"
            >
              {tag}
            </span>
          ))}
          <div className="flex gap-3 ml-auto">
            {project.githubLink && (
              <Link
                href={project.githubLink}
                className="text-secondary/60 hover:text-secondary/90 hover:bg-white/5 rounded-lg transition-colors hover:scale-110 transform p-1"
              >
                <FaGithub className="h-4 w-4" />
              </Link>
            )}
            {project.articleLink && (
              <Link
                href={project.articleLink}
                className="text-secondary/60 hover:text-secondary/90 hover:bg-white/5 rounded-lg transition-colors hover:scale-110 transform p-1"
              >
                <FaNewspaper className="h-4 w-4" />
              </Link>
            )}
            {project.demoLink && (
              <Link
                href={project.demoLink}
                className="text-secondary/60 hover:text-secondary/90 hover:bg-white/5 rounded-lg transition-colors hover:scale-110 transform p-1"
              >
                <FaPlay className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

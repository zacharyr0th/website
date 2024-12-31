import React from 'react';
import Link from 'next/link';
import { learningProjects } from '@/app/lib/constants/constants';
import type { LearningProject } from '@/app/lib/types/types';

const Hero = () => {
  const projects = learningProjects.map((project) => ({
    ...project,
  })) as LearningProject[];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header Section */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">Projects</h1>
      </header>

      {/* Projects Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={project.githubLink || '#'}
            className="group rounded-xl bg-surface/50 hover:bg-surface transition-all duration-300 hover:shadow-lg"
          >
            <article className="p-8 space-y-6">
              <header>
                <h2 className="text-2xl font-semibold group-hover:text-accent transition-colors">
                  {project.title}
                </h2>
              </header>

              <p className="text-muted leading-relaxed">{project.description}</p>

              <footer className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-sm rounded-full bg-surface text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </footer>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Hero;

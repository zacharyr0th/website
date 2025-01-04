import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { PROJECTS, PROJECT_CATEGORIES, type ProjectCategory } from './projects';
import { Icons } from './constants';
import { NavButton } from '../components/buttons';

const Hero = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | ProjectCategory>('all');
  
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') return PROJECTS;
    return PROJECTS.filter(project => 
      project.categories.includes(selectedCategory)
    );
  }, [selectedCategory]);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header className="space-y-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold">Projects</h1>
        </div>
      </header>

      <div className="bg-surface/80 backdrop-blur-sm rounded-3xl px-4 py-2.5 flex items-center space-x-4 overflow-x-auto scrollbar-hide">
        <NavButton
          variant="secondary"
          active={selectedCategory === 'all'}
          onClick={() => setSelectedCategory('all')}
          size="sm"
        >
          All
        </NavButton>
        {Object.entries(PROJECT_CATEGORIES).map(([key, value]) => (
          <NavButton
            key={key}
            variant="secondary"
            active={selectedCategory === key}
            onClick={() => setSelectedCategory(key as ProjectCategory)}
            size="sm"
          >
            {value}
          </NavButton>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group rounded-xl bg-surface/50 hover:bg-surface transition-all duration-300 hover:shadow-lg overflow-hidden"
          >
            <article className="p-8 space-y-6">
              <header className="space-y-2">
                <h2 className="text-2xl font-semibold group-hover:text-accent transition-colors">
                  {project.title}
                </h2>
                <div className="flex gap-3">
                  {project.githubLink && (
                    <Link
                      href={project.githubLink}
                      className="text-muted hover:text-accent transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View on GitHub"
                    >
                      <Icons.GitHub className="w-5 h-5" />
                    </Link>
                  )}
                  {project.articleLink && (
                    <Link
                      href={project.articleLink}
                      className="text-muted hover:text-accent transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Read article"
                    >
                      <Icons.Article className="w-5 h-5" />
                    </Link>
                  )}
                  {project.demoLink && (
                    <Link
                      href={project.demoLink}
                      className="text-muted hover:text-accent transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View demo"
                    >
                      <Icons.Demo className="w-5 h-5" />
                    </Link>
                  )}
                  {project.link && (
                    <Link
                      href={project.link}
                      className="text-muted hover:text-accent transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Visit project"
                    >
                      <Icons.Link className="w-5 h-5" />
                    </Link>
                  )}
                </div>
              </header>

              <p className="text-muted leading-relaxed">{project.description}</p>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-sm rounded-full bg-surface text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center text-sm text-muted">
                  {project.publishDate && (
                    <span>Published: {new Date(project.publishDate).toLocaleDateString()}</span>
                  )}
                  <span className={`px-2 py-1 rounded-full ${
                    project.status === 'completed' ? 'bg-green-500/10 text-green-500' :
                    project.status === 'in-progress' ? 'bg-yellow-500/10 text-yellow-500' :
                    'bg-blue-500/10 text-blue-500'
                  }`}>
                    {project.status}
                  </span>
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;

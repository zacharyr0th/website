import React, { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import type { IconType } from 'react-icons';
import { FaGithub, FaNewspaper, FaPlay, FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { PROJECTS, PROJECT_CATEGORIES, type ProjectCategory, type BaseProject } from '../data/projects';
import { NavButton } from '@/components/buttons/NavButton';

const ProjectIcon: React.FC<{ icon: IconType }> = ({ icon: Icon }) => <Icon className="w-5 h-5" />;

const Icons = {
  GitHub: FaGithub,
  Article: FaNewspaper,
  Demo: FaPlay,
  Link: FaArrowUpRightFromSquare,
} as const;

const Hero: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | ProjectCategory>('all');

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') return PROJECTS;
    return PROJECTS.filter((project: BaseProject) => project.categories.includes(selectedCategory));
  }, [selectedCategory]);

  const handleCategoryChange = useCallback((category: 'all' | ProjectCategory) => {
    setSelectedCategory(category);
  }, []);

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
          onClick={() => handleCategoryChange('all')}
          size="sm"
        >
          All
        </NavButton>
        {Object.entries(PROJECT_CATEGORIES).map(([key, value]) => (
          <NavButton
            key={key}
            variant="secondary"
            active={selectedCategory === key}
            onClick={() => handleCategoryChange(key as ProjectCategory)}
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
                  {project.githubLink && Icons.GitHub && (
                    <Link
                      href={project.githubLink}
                      className="text-muted hover:text-accent transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View on GitHub"
                    >
                      <ProjectIcon icon={Icons.GitHub} />
                    </Link>
                  )}
                  {(project as BaseProject).articleLink && Icons.Article && (
                    <Link
                      href={(project as BaseProject).articleLink!}
                      className="text-muted hover:text-accent transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Read article"
                    >
                      <ProjectIcon icon={Icons.Article} />
                    </Link>
                  )}
                  {(project as BaseProject).demoLink && Icons.Demo && (
                    <Link
                      href={(project as BaseProject).demoLink!}
                      className="text-muted hover:text-accent transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View demo"
                    >
                      <ProjectIcon icon={Icons.Demo} />
                    </Link>
                  )}
                  {(project as BaseProject).link && Icons.Link && (
                    <Link
                      href={(project as BaseProject).link!}
                      className="text-muted hover:text-accent transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Visit project"
                    >
                      <ProjectIcon icon={Icons.Link} />
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
                  {(project as BaseProject).publishDate && (
                    <span>Published: {new Date((project as BaseProject).publishDate!).toLocaleDateString()}</span>
                  )}
                  <span
                    className={`px-2 py-1 rounded-full ${
                      project.status === 'Functional'
                        ? 'bg-green-500/10 text-green-500'
                        : project.status === 'WiP'
                          ? 'bg-yellow-500/10 text-yellow-500'
                          : 'bg-blue-500/10 text-blue-500'
                    }`}
                  >
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

export default React.memo(Hero);

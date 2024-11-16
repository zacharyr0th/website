import React, { memo, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { learningProjects, CONFIG } from '@/lib/constants';
import { ProjectsPageProps, LearningProject } from '@/lib/types';
import { GitHubIcon, ArticleIcon } from '../icons';

const Hero: React.FC<ProjectsPageProps> = memo(({ theme }) => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  return (
    <main className="flex flex-col w-full min-h-screen font-mono">
      <div className="flex-grow container mx-auto px-5 md:px-48 pt-32 md:pt-36 pb-8 md:pb-18 max-w-5xl">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-3 text-text-primary">Projects</h1>
          <p className="text-accent text-xl mt-8">Nights & Weekends</p>
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {learningProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              isSelected={selectedProject === index}
              onClick={() => setSelectedProject(selectedProject === index ? null : index)}
              isGridView={true}
            />
          ))}
        </motion.div>
      </div>
    </main>
  );
});

const ProjectCard: React.FC<{
  project: LearningProject;
  isSelected: boolean;
  onClick: () => void;
  isGridView: boolean;
}> = memo(({ project, isSelected, onClick, isGridView }) => {
  return (
    <motion.div
      layout
      className={`
        bg-surface rounded-xl shadow-lg
        hover:shadow-xl transition-all duration-300
        p-6 flex flex-col h-full min-h-[480px]
        ${isSelected ? 'ring-2 ring-primary' : ''}
      `}
    >
      {/* Project Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
        <p className="text-text-secondary">{project.description}</p>
      </div>

      {/* Tech Stack - Fixed Height */}
      <div className="flex flex-wrap gap-2 min-h-[48px] mb-6">
        {project.technologies?.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1.5 rounded-md bg-surface-accent text-text-primary text-sm font-medium border border-border/50"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Features */}
      <div className="space-y-2 flex-grow mb-6">
        {project.features?.map((feature, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="text-accent">•</span>
            <span className="text-sm text-text-secondary">{feature}</span>
          </div>
        ))}
      </div>

      {/* Links */}
      <div className="flex gap-4 pt-2 mt-6 border-t border-border h-12">
        {project.githubLink ? (
          <Link
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors"
          >
            <GitHubIcon className="w-5 h-5" />
            <span>View Code</span>
          </Link>
        ) : (
          <span className="flex items-center gap-2 text-text-secondary opacity-50 cursor-not-allowed">
            <GitHubIcon className="w-5 h-5" />
            <span>Coming Soon</span>
          </span>
        )}
        {project.articleLink ? (
          <Link
            href={project.articleLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors"
          >
            <ArticleIcon className="w-5 h-5" />
            <span>Read More</span>
          </Link>
        ) : (
          <span className="flex items-center gap-2 text-text-secondary opacity-50 cursor-not-allowed">
            <ArticleIcon className="w-5 h-5" />
            <span>Coming Soon</span>
          </span>
        )}
      </div>
    </motion.div>
  );
});

Hero.displayName = 'Hero';
ProjectCard.displayName = 'ProjectCard';

export default Hero;

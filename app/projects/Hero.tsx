import React, { memo, useState, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { learningProjects } from '@/lib/constants';
import { LearningProject, Theme } from '@/lib/types';
import { GitHubIcon, ArticleIcon } from '../components/icons';

interface HeroProps {
  theme: Theme;
}

const Hero = memo<HeroProps>(({ theme }) => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  return (
    <main className="flex-grow container mx-auto px-5 md:px-48 pt-32 md:pt-40 pb-8 md:pb-16 max-w-6xl">
      {/* Header Section */}
      <motion.div
        className="mb-12 md:mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl md:text-5xl font-bold mb-3 text-text-primary">Projects</h1>
        <p className="text-accent text-xl mt-6">Nights & Weekends</p>
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <AnimatePresence>
          {learningProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              onSelect={() => setSelectedProject(selectedProject === index ? null : index)}
              theme={theme}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </main>
  );
});

interface ProjectCardProps {
  project: LearningProject;
  index: number;
  onSelect: () => void;
  theme: Theme;
}

interface LinkComponentProps {
  href: string;
  children: React.ReactNode;
  disabled?: boolean;
}

const ProjectCard = memo<ProjectCardProps>(({ project, index, onSelect, theme }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: index * 0.1 }
    },
    exit: { opacity: 0, y: -20 }
  };

  const LinkComponent = useCallback(({ href, children, disabled = false }: LinkComponentProps) => {
    if (disabled) {
      return (
        <span className="flex items-center gap-2 text-text-secondary opacity-50 cursor-not-allowed">
          {children}
        </span>
      );
    }

    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-text-secondary transition-all duration-200 hover:-translate-y-0.5 group"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </Link>
    );
  }, []);

  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onSelect}
      className={`
        bg-surface/80 backdrop-blur-sm rounded-xl
        shadow-[var(--box-shadow)] transition-all duration-[var(--transition-speed)]
        p-6 md:p-8 flex flex-col h-full
        cursor-pointer hover:shadow-xl border-2
        ${theme === 'dark' 
          ? 'border-[var(--color-secondary)]/10' 
          : 'border-[var(--color-accent)]'
        }
        ${theme === 'dark' ? 'hover:bg-[var(--color-surface)]/90' : 'hover:bg-[var(--color-surface)]/70'}
      `}
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-3 text-[var(--color-text-primary)]">{project.title}</h2>
        <p className="text-[var(--color-text-secondary)] leading-relaxed">{project.description}</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.technologies?.map((tech) => (
          <span
            key={tech}
            className={`px-3 py-1.5 rounded-md text-accent text-sm font-medium 
                       border-2 backdrop-blur-sm ${theme === 'dark' 
                         ? 'border-[var(--color-secondary)]/10' 
                         : 'border-[var(--color-accent)]'
                       }`}
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="space-y-3 flex-grow mb-6">
        {project.features?.map((feature, i) => (
          <motion.div
            key={i}
            className="flex items-start gap-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <span className="text-accent">•</span>
            <span className="text-sm text-text-secondary">{feature}</span>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-4 pt-4 border-t border-border/30">
        <LinkComponent href={project.githubLink || ''} disabled={!project.githubLink}>
          <GitHubIcon className="w-5 h-5 group-hover:text-accent" />
          <span className="group-hover:text-accent">{project.githubLink ? 'View Code' : 'Coming Soon'}</span>
        </LinkComponent>
        
        <LinkComponent href={project.articleLink || ''} disabled={!project.articleLink}>
          <ArticleIcon className="w-5 h-5 group-hover:text-accent" />
          <span className="group-hover:text-accent">{project.articleLink ? 'Read More' : 'Coming Soon'}</span>
        </LinkComponent>
      </div>
    </motion.div>
  );
});

Hero.displayName = 'Hero';
ProjectCard.displayName = 'ProjectCard';

export default Hero;

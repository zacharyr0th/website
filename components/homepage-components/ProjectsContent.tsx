import React, { useMemo } from 'react';
import Link from 'next/link';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const projects = [
  {
    id: 'simpleos',
    name: 'SimpleOS',
    description:
      'An x86_64 operating system kernel with basic interrupt handling, memory management, and VGA output.',
    tags: ['OS', 'C', 'Assembly'],
    github: 'https://github.com/zacharyr0th/SimpleOS',
  },
  {
    id: 'zacharyroth',
    name: 'zacharyr0th.com',
    description:
      'This website is an open-source portfolio built with Next.js, Tailwind CSS, and TypeScript.',
    tags: ['Next.js', 'Tailwind', 'TypeScript'],
    github: 'https://github.com/yourusername/zacharyroth-website',
    liveLink: 'https://zacharyroth.com',
  },
  {
    id: 'musicide',
    name: 'MusicIDE',
    description: 'An integrated Development Environment for AI assisted music production.',
    tags: ['AI', 'Music', 'IDE'],
    github: 'https://github.com/yourusername/musicide',
    liveLink: 'https://musicide.app',
  },
];

type Project = {
  id: string;
  name: string;
  description: string;
  tags: string[];
  github?: string;
  liveLink?: string;
};

const ProjectCard = React.memo(({ project }: { project: Project }) => (
  <motion.div
    key={project.id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="group relative overflow-hidden rounded-lg bg-gray-800/30 p-4 transition-all duration-300 hover:bg-gray-700/40 hover:shadow-md hover:shadow-pastel-blue/20 flex flex-col h-full"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-pastel-blue/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

    <h3 className="text-lg font-bold text-gray-200 mb-2 group-hover:text-pastel-blue transition-colors duration-300">
      {project.name}
    </h3>
    <p className="text-gray-400 mb-3 flex-grow overflow-hidden text-xs sm:text-sm group-hover:text-gray-300 transition-colors duration-300">
      {project.description}
    </p>

    <div className="flex flex-wrap gap-1 mb-3">
      {project.tags.map((tag, index) => (
        <span
          key={index}
          className="px-1.5 py-0.5 bg-gray-700/50 text-gray-300 text-xs font-medium rounded-full transition-all duration-300 group-hover:bg-gray-600/50"
        >
          {tag}
        </span>
      ))}
    </div>

    <div className="flex space-x-3 mt-auto pt-2 border-t border-gray-700">
      {project.github && (
        <Link
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-gray-400 hover:text-pastel-blue transition-all duration-300 transform hover:scale-105"
        >
          <FaGithub className="mr-1" />
          <span className="text-xs">GitHub</span>
        </Link>
      )}
      {project.liveLink && (
        <Link
          href={project.liveLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-gray-400 hover:text-pastel-blue transition-all duration-300 transform hover:scale-105"
        >
          <FaExternalLinkAlt className="mr-1" />
          <span className="text-xs">Live Demo</span>
        </Link>
      )}
    </div>
  </motion.div>
));

ProjectCard.displayName = 'ProjectCard';

const ProjectsContent = () => {
  const projectCards = useMemo(
    () => projects.map((project) => <ProjectCard key={project.id} project={project} />),
    []
  );

  return (
    <div className="px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
          {projectCards}
        </div>
      </div>
    </div>
  );
};

export default ProjectsContent;

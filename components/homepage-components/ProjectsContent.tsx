import React, { useMemo } from 'react';
import Link from 'next/link';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const projects = [
  {
    id: 'zacharyroth',
    name: 'zacharyr0th.com',
    description:
      'This website is a fully open-source Portfolio/CV built with Next.js, Tailwind, and TypeScript',
    tags: ['Next.js', 'Tailwind', 'TypeScript'],
    github: 'https://github.com/yourusername/zacharyroth-website',
    liveLink: 'https://zacharyroth.com',
  },
  {
    id: 'musicide',
    name: 'MusicIDE',
    description:
      'Integrated Development Environment for AI assisted music production with built in music theory tools',
    tags: ['AI', 'Music', 'IDE'],
    github: 'https://github.com/yourusername/musicide',
    liveLink: 'https://musicide.app',
  },
  {
    id: 'microkernel',
    name: 'Multi Layered Kernel',
    description:
      'An experimental operating system built on a flexible, layered microkernel architecture',
    tags: ['OS', 'C', 'Assembly'],
    github: 'https://github.com/yourusername/microkernel-os',
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
    className="group relative overflow-hidden rounded-xl bg-gray-800/30 p-6 transition-all duration-300 hover:bg-gray-700/40 hover:shadow-lg hover:shadow-pastel-blue/20 border border-gray-800 hover:border-gray-700 flex flex-col h-full"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-pastel-blue/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

    <h3 className="text-2xl font-bold text-gray-200 mb-3 group-hover:text-pastel-blue transition-colors duration-300">
      {project.name}
    </h3>
    <p className="text-gray-400 mb-4 flex-grow overflow-hidden text-sm sm:text-base group-hover:text-gray-300 transition-colors duration-300">
      {project.description}
    </p>

    <div className="flex flex-wrap gap-2 mb-4">
      {project.tags.map((tag, index) => (
        <span
          key={index}
          className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs font-medium rounded-full border border-gray-600 transition-all duration-300 group-hover:bg-gray-600/50 group-hover:border-gray-500"
        >
          {tag}
        </span>
      ))}
    </div>

    <div className="flex space-x-4 mt-auto pt-4 border-t border-gray-700">
      {project.github && (
        <Link
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-gray-400 hover:text-pastel-blue transition-all duration-300 transform hover:scale-105"
        >
          <FaGithub className="mr-2" />
          <span className="text-sm">GitHub</span>
        </Link>
      )}
      {project.liveLink && (
        <Link
          href={project.liveLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-gray-400 hover:text-pastel-blue transition-all duration-300 transform hover:scale-105"
        >
          <FaExternalLinkAlt className="mr-2" />
          <span className="text-sm">Live Demo</span>
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
    <div className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{projectCards}</div>
    </div>
  );
};

export default ProjectsContent;

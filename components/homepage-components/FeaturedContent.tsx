import React from 'react';
import Link from 'next/link';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const featuredProjects = [
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

const FeaturedProjectCard = ({ project }: { project: Project }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    className="flex flex-col md:flex-row bg-gray-800/50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-700/50"
  >
    <div className="md:w-2/5 p-6 flex flex-col justify-center">
      <h3 className="text-2xl font-bold text-pastel-blue mb-2">{project.name}</h3>
      <p className="text-gray-300 mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-gray-700/70 text-pastel-blue text-xs font-medium rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
    <div className="md:w-3/5 bg-gray-900/50 p-6 flex flex-col justify-center">
      <div className="flex space-x-4 mb-4">
        {project.github && (
          <Link
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-gray-300 hover:text-pastel-blue transition-colors duration-300"
          >
            <FaGithub className="mr-2" />
            <span>GitHub</span>
          </Link>
        )}
        {project.liveLink && (
          <Link
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-gray-300 hover:text-pastel-blue transition-colors duration-300"
          >
            <FaExternalLinkAlt className="mr-2" />
            <span>Live Demo</span>
          </Link>
        )}
      </div>
      {/* You can add more details or a screenshot here */}
      <div className="text-gray-400">
        Additional project details or a screenshot could go here...
      </div>
    </div>
  </motion.div>
);

const FeaturedContent = () => {
  return (
    <div className="p-8">
      <div className="space-y-8">
        {featuredProjects.slice(0, 1).map((project) => (
          <FeaturedProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedContent;

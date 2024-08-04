import React from 'react';
import Link from 'next/link';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

// fix featured projects
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
      'Built from scratch, Integrated Development Environment for AI assisted music production',
    tags: ['AI', 'Music', 'IDE'],
    github: 'https://github.com/yourusername/musicide',
    liveLink: 'https://musicide.app',
  },
  {
    id: 'microkernel',
    name: 'Modular Microkernel OS',
    description:
      'An experimental operating system built on a flexible, layered microkernel architecture',
    tags: ['OS', 'C', 'Assembly'],
    github: 'https://github.com/yourusername/microkernel-os',
  },
];

const FeaturedContent = () => (
  <div className="space-y-6">
    {featuredProjects.map((project) => (
      <div
        key={project.id}
        className={`content-item featured-item-${project.id} p-6 rounded-lg bg-gray-800 shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-gray-700`}
      >
        <h3 className="text-xl font-semibold text-pastel-blue mb-2">{project.name}</h3>
        <p className="text-gray-300 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 text-sm rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex space-x-4">
          {project.github && (
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-400 hover:text-pastel-blue transition-colors duration-300"
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
              className="flex items-center text-gray-400 hover:text-pastel-blue transition-colors duration-300"
            >
              <FaExternalLinkAlt className="mr-2" />
              <span>Live Demo</span>
            </Link>
          )}
        </div>
      </div>
    ))}
  </div>
);

export default FeaturedContent;

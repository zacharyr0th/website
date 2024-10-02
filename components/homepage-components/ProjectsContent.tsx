import React, { useMemo } from 'react';
import { FaGithub, FaRegFileAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const projects = [
  {
    id: 'zacharyroth',
    name: 'zacharyr0th.com',
    description:
      'This website is a soon to be open-source portfolio built with Next.js, Tailwind CSS, and TypeScript.',
    tags: ['Next.js', 'Tailwind', 'TypeScript'],
    github: '',
    liveLink: 'https://zacharyr0th.com',
  },
  {
    id: 'simpleos',
    name: 'SimpleOS',
    description:
      'An x86_64 operating system kernel with basic interrupt handling, memory management, and VGA output.',
    tags: ['OS', 'C', 'Assembly'],
    github: 'https://github.com/zacharyr0th/SimpleOS',
    liveLink: 'https://www.zacharyr0th.com/writing/a-simple-operating-system',
  },
  {
    id: 'musicide',
    name: 'MusicIDE (WIP)',
    description:
      'A web-based integrated Development Environment for AI assisted music production and research.',
    tags: ['AI', 'Music', 'IDE'],
    github: '',
    liveLink: 'https://zacharyr0th.com/writing/music-ide',
  },
  {
    id: 'toml-tools',
    name: 'toml-tools',
    description: `Scripts for analyzing, categorizing, and organizing TOML files from Electric Capital's crypto-ecosystems directory.`,
    tags: ['Data Analysis', 'Blockchains'],
    github: '',
    liveLink: 'https://zacharyr0th.com/writing/music-ide',
  },
  {
    id: 'Privvy',
    name: 'Privvy (WIP)',
    description: `A privacy preserving DEX on the Aleo blockchain.`,
    tags: ['Aleo', 'DeFi', 'Privacy'],
    github: '',
    liveLink: '',
  },
  {
    id: 'casino-time',
    name: 'Casino Time (WIP)',
    description: `A gambling platform on the Aptos blockchain which utilizes Aptos randomness to ensure fair shuffling and private transactions for poker.`,
    tags: ['Aptos', 'Move', 'Next.'],
    github: '',
    liveLink: '',
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ProjectCard: React.FC<{ project: Project }> = React.memo(({ project }) => {
  // Use useMemo for complex JSX structures
  const tags = useMemo(
    () =>
      project.tags.map((tag, index) => (
        <span
          key={index}
          className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs font-medium rounded-full transition-all duration-300 group-hover:bg-gray-600/50 group-hover:text-pastel-blue"
        >
          {tag}
        </span>
      )),
    [project.tags]
  );

  return (
    <motion.div
      variants={itemVariants}
      className="group relative overflow-hidden rounded-lg bg-gray-800/30 p-6 transition-all duration-300 hover:bg-gray-700/40 hover:shadow-lg hover:shadow-pastel-blue/20 flex flex-col h-full cursor-pointer"
      onClick={() => window.open(project.liveLink || '#', '_blank')}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-pastel-blue/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="flex flex-col h-full">
        <h3 className="text-xl font-bold text-gray-200 mb-3 group-hover:text-pastel-blue transition-colors duration-300">
          {project.name}
        </h3>
        <p className="text-gray-400 mb-4 flex-grow text-sm group-hover:text-gray-300 transition-colors duration-300">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">{tags}</div>
        <div className="flex space-x-4 mt-auto pt-3 border-t border-gray-700">
          {project.github && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.github, '_blank');
              }}
              className="flex items-center text-gray-400 hover:text-pastel-blue transition-all duration-300 transform hover:scale-105"
            >
              <FaGithub className="mr-2" />
              <span className="text-sm">GitHub</span>
            </button>
          )}
          {project.liveLink && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.liveLink, '_blank');
              }}
              className="flex items-center text-gray-400 hover:text-pastel-blue transition-all duration-300 transform hover:scale-105"
            >
              <FaRegFileAlt className="mr-2" />
              <span className="text-sm">Context</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
});

ProjectCard.displayName = 'ProjectCard';

const ProjectsContent: React.FC = () => {
  // Use useMemo for the project cards to prevent unnecessary re-renders
  const projectCards = useMemo(
    () => projects.map((project) => <ProjectCard key={project.id} project={project} />),
    []
  );

  return (
    <div className="px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {projectCards}
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectsContent;

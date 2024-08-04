import React from 'react';
import Link from 'next/link';

const projects = [
  {
    id: 'zacharyroth',
    name: 'zacharyr0th.com',
    description:
      'This website is a fully open-source Portfolio/CV built with Next.js, Tailwind, and TypeScript',
    tags: ['Next.js', 'Tailwind', 'TypeScript'],
    status: 'Active',
  },
  {
    id: 'musicide',
    name: 'MusicIDE',
    description:
      'An Integrated Development Environment for AI assisted music production and composition',
    tags: ['AI', 'Music', 'IDE'],
    status: 'In Development',
  },
  {
    id: 'mirror-kernel',
    name: 'Mirror Kernel OS',
    description:
      'An experimental operating system built on a flexible, layered microkernel architecture',
    tags: ['OS', 'C', 'Assembly'],
    status: 'Ongoing',
  },
];

const ProjectsContent = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {projects.map((project) => (
      <div
        key={project.id}
        className="content-item project-item bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-gray-700"
      >
        <div className="p-6">
          <h3 className="text-xl font-semibold text-pastel-blue mb-2">{project.name}</h3>
          <p className="text-gray-300 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-700 text-gray-300 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <span
              className={`text-sm ${
                project.status === 'Active' ? 'text-green-400' : 'text-yellow-400'
              }`}
            >
              {project.status}
            </span>
            <Link href={`/projects/${project.id}`} className="text-pastel-blue hover:underline">
              Learn more
            </Link>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default ProjectsContent;

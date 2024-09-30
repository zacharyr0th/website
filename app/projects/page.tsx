import React from 'react';
import Image from 'next/image';

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  link: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Project 1',
    description: 'A brief description of Project 1 and its key features.',
    imageUrl: '/project1.jpg',
    technologies: ['React', 'Node.js', 'MongoDB'],
    link: 'https://project1.com',
  },
  {
    id: 2,
    title: 'Project 2',
    description: 'An overview of Project 2 and what makes it unique.',
    imageUrl: '/project2.jpg',
    technologies: ['Vue.js', 'Express', 'PostgreSQL'],
    link: 'https://project2.com',
  },
  // Add more projects as needed
];

const ProjectsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">My Portfolio</h1>
      <p className="mb-8 text-lg">
        Welcome to my portfolio. Here you can find a showcase of my recent projects and work.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image
              src={project.imageUrl}
              alt={project.title}
              width={400}
              height={200}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View Project
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;

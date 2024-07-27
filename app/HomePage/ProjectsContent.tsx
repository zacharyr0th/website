// Server Component: ProjectsContent

import React from 'react';

const projects = [
  { id: 'x', name: 'This Website', description: 'Lorem Ipsum' },
  { id: 'y', name: 'Product B', description: 'Testing.' },
  { id: 'z', name: 'Product C', description: 'Testing.' },
  { id: 'a', name: 'Product D', description: 'Testing.' },
];

const ProjectsContent = () => (
  <div className="space-y-4">
    {projects.map((project) => (
      <div 
        key={project.id} 
        className={`content-item project-item-${project.id} p-4 rounded-lg bg-gray-700 transition-all duration-300`}
      >
        <h3 className="text-lg font-semibold text-pastel-blue">{project.name}</h3>
        <p className="mt-2 text-gray-400">{project.description}</p>
      </div>
    ))}
  </div>
);

export default ProjectsContent;
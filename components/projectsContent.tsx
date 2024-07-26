// Server Component: ProjectsContent

import React from "react";

const ProjectsContent = () => (
  <div className="space-y-4">
    {[
      {
        name: "This Website",
        description:
          "Lorem Ipsum",
      },
      { name: "Product B", description: "Testing." },
      { name: "Product C", description: "Testing." },
      { name: "Product D", description: "Testing." },
    ].map((project) => (
      <div
        key={project.name}
        className="p-4 rounded-lg bg-gray-700 transition-colors duration-300"
      >
        <h3 className="text-lg font-semibold text-pastel-blue">
          {project.name}
        </h3>
        <p className="mt-2 text-gray-400">{project.description}</p>
      </div>
    ))}
  </div>
);

export default ProjectsContent;
'use client';

import React, { useState } from 'react';
import Navigation from '../components/common/Navigation';
import { Theme } from '@/lib/types';

export default function ProjectsPage() {
  const [theme, setTheme] = useState<Theme>('light');

  const projects = [
    { id: 1, title: 'Project 1', description: 'A brief description of Project 1' },
    { id: 2, title: 'Project 2', description: 'A brief description of Project 2' },
    { id: 3, title: 'Project 3', description: 'A brief description of Project 3' },
  ];

  return (
    <div className={`bg-background text-text min-h-screen ${theme}`}>
      <Navigation setTheme={setTheme} />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">My Projects</h1>
        <p className="mb-8">
          Welcome to my projects page. Here you can find a list of my recent work and
          accomplishments.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-card p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

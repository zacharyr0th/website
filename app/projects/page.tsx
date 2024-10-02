'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaChevronDown, FaExternalLinkAlt, FaTags } from 'react-icons/fa';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  link: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'AI-Powered Chat Interface',
    description: 'A cutting-edge chatbot with natural language processing capabilities.',
    image: '/images/project1.jpg',
    category: 'AI & Machine Learning',
    tags: ['React', 'Python', 'NLP'],
    link: 'https://project1.com',
  },
  {
    id: 2,
    title: 'Eco-Friendly Smart Home App',
    description: 'Mobile application for managing energy-efficient smart home devices.',
    image: '/images/project2.jpg',
    category: 'IoT & Mobile',
    tags: ['React Native', 'IoT', 'Energy Efficiency'],
    link: 'https://project2.com',
  },
  {
    id: 3,
    title: 'Blockchain-Based Supply Chain',
    description: 'Transparent and secure supply chain management using blockchain technology.',
    image: '/images/project3.jpg',
    category: 'Blockchain',
    tags: ['Ethereum', 'Smart Contracts', 'Supply Chain'],
    link: 'https://project3.com',
  },
  {
    id: 4,
    title: 'Virtual Reality Art Gallery',
    description: 'Immersive VR experience showcasing digital art in a virtual space.',
    image: '/images/project4.jpg',
    category: 'Virtual Reality',
    tags: ['Unity', 'VR', 'Digital Art'],
    link: 'https://project4.com',
  },
  // Add more projects as needed
];

export default function ProjectsPage() {
  const [filter, setFilter] = useState<string>('');
  const [category, setCategory] = useState<string>('All Categories');

  const filteredProjects = projects.filter(
    (project) =>
      (category === 'All Categories' || project.category === category) &&
      (project.title.toLowerCase().includes(filter.toLowerCase()) ||
        project.description.toLowerCase().includes(filter.toLowerCase()) ||
        project.tags.some((tag) => tag.toLowerCase().includes(filter.toLowerCase())))
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="bg-white text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-8">
          <div className="flex space-x-6">
            {['All Projects', 'AI & ML', 'IoT & Mobile', 'Blockchain', 'VR'].map((category) => (
              <button
                key={category}
                className="text-sm font-medium hover:text-gray-500"
                onClick={() =>
                  setCategory(category === 'All Projects' ? 'All Categories' : category)
                }
              >
                {category}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-sm font-medium hover:text-gray-500">Compare</button>
            <input
              type="text"
              placeholder="Search projects"
              className="border rounded-full px-4 py-2 text-sm"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </nav>

        {/* Main content */}
        <div className="mb-12">
          <h1 className="text-6xl font-bold mb-4">Projects</h1>
          <p className="text-2xl">If you can dream it, we can build it.</p>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
              <Image
                src={project.image}
                alt={project.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tech, index) => (
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
                  Learn more
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Education savings banner */}
        <div className="mt-12 text-center">
          <p className="text-lg">
            Get project discounts with education savings.{' '}
            <a href="#" className="text-blue-500 hover:underline">
              Learn more &gt;
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

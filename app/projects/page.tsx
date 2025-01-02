'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS, ProjectCategory } from './projects';
import ProjectCard from './ProjectCard';
import ProjectNav from './ProjectNav';

type Category = 'all' | ProjectCategory;

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') return PROJECTS;
    return PROJECTS.filter(
      (project) =>
        project.category === selectedCategory ||
        project.tags?.some((tag) => tag.toLowerCase().includes(selectedCategory))
    );
  }, [selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category as Category);
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-background to-surface/30"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <main className="container mx-auto px-6 sm:px-8 pt-24 sm:pt-36 pb-24">
        <div className="max-w-6xl mx-auto space-y-8">
          <motion.header className="space-y-4" variants={itemVariants}>
            <h1 className="text-4xl md:text-5xl font-bold">Projects</h1>
          </motion.header>

          <motion.div variants={itemVariants}>
            <ProjectNav
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
          </motion.div>

          <motion.div
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
          >
            {filteredProjects.map((project) => (
              <motion.div key={project.id} variants={itemVariants}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
}

'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS, ProjectCategory } from './projects';
import ProjectCard from './ProjectCard';
import ProjectNav from './ProjectNav';
import clsx from 'clsx';

type Category = 'all' | ProjectCategory;

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [focusedIndex, setFocusedIndex] = useState(0);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') return PROJECTS;
    return PROJECTS.filter((project) =>
      project.categories.includes(selectedCategory as ProjectCategory)
    );
  }, [selectedCategory]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setFocusedIndex(0); // Reset focus to first item when category changes
  }, [selectedCategory]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        
        const numProjects = filteredProjects.length;
        const cols = window.innerWidth >= 768 ? 2 : 1; // md breakpoint

        let newIndex = focusedIndex;

        switch (e.key) {
          case 'ArrowUp':
            newIndex = focusedIndex - cols;
            break;
          case 'ArrowDown':
            newIndex = focusedIndex + cols;
            break;
          case 'ArrowLeft':
            newIndex = focusedIndex - 1;
            break;
          case 'ArrowRight':
            newIndex = focusedIndex + 1;
            break;
        }

        // Ensure new index is within bounds
        if (newIndex >= 0 && newIndex < numProjects) {
          setFocusedIndex(newIndex);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedIndex, filteredProjects.length]);

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
        <div style={{ maxWidth: 'var(--article-width)' }} className="mx-auto space-y-6">
          <motion.header variants={itemVariants}>
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight">Projects</h1>
          </motion.header>

          <motion.div variants={itemVariants}>
            <ProjectNav
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
          </motion.div>

          <div className="grid md:grid-cols-1">
            {filteredProjects.map((project, index) => (
              <motion.div 
                key={project.id} 
                variants={itemVariants}
                className={clsx(index !== 0 && "border-t border-zinc-800/50")}
              >
                <ProjectCard 
                  project={project} 
                  isFocused={index === focusedIndex}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </motion.div>
  );
}

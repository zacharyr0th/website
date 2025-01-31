'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import type { ProjectCategory, BaseProject } from './projects';
import ProjectCard from './ProjectCard';
import ProjectNav from './ProjectNav';
import { itemVariants, containerVariants } from '../lib/animations';

type Category = 'all' | ProjectCategory;

interface ProjectsPageClientProps {
  readonly initialProjects: ReadonlyArray<BaseProject>;
  readonly containerVariants: typeof containerVariants;
}

const useKeyboardNavigation = (
  focusedIndex: number,
  setFocusedIndex: (index: number) => void,
  projectsLength: number
) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'ArrowUp' ||
        e.key === 'ArrowDown' ||
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight'
      ) {
        e.preventDefault();

        const cols = window.innerWidth >= 768 ? 2 : 1;
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

        if (newIndex >= 0 && newIndex < projectsLength) {
          setFocusedIndex(newIndex);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedIndex, projectsLength, setFocusedIndex]);
};

export function ProjectsPageClient({ initialProjects, containerVariants }: ProjectsPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [focusedIndex, setFocusedIndex] = useState(0);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') return initialProjects;
    return initialProjects.filter((project) =>
      project.categories.includes(selectedCategory as ProjectCategory)
    );
  }, [selectedCategory, initialProjects]);

  const handleCategoryChange = useCallback((category: Category) => {
    window.scrollTo(0, 0);
    setFocusedIndex(0);
    setSelectedCategory(category);
  }, []);

  useKeyboardNavigation(focusedIndex, setFocusedIndex, filteredProjects.length);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        <ProjectNav selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
      </motion.div>

      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project, index) => (
          <motion.div key={project.id} variants={itemVariants}>
            <ProjectCard project={project} isFocused={index === focusedIndex} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

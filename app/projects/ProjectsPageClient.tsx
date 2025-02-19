'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { ProjectCategory, BaseProject } from './types/types';
import ProjectCard from './components/ProjectCard';
import ProjectNav from './components/ProjectNav';

type Category = 'all' | ProjectCategory;
interface ProjectsPageClientProps {
  readonly initialProjects: ReadonlyArray<BaseProject>;
  readonly containerVariants: typeof import('@/lib/ui/animations').containerVariants;
}

export default function ProjectsPageClient({
  initialProjects,
  containerVariants,
}: ProjectsPageClientProps) {
  const [category, setCategory] = useState<Category>('all');
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const filteredProjects = useMemo(() => {
    return category === 'all'
      ? initialProjects
      : initialProjects.filter((project) => project.categories.includes(category));
  }, [category, initialProjects]);

  const handleKeyboardNavigation = useCallback(
    (e: KeyboardEvent) => {
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
            newIndex = Math.max(focusedIndex - cols, 0);
            break;
          case 'ArrowDown':
            newIndex = Math.min(focusedIndex + cols, filteredProjects.length - 1);
            break;
          case 'ArrowLeft':
            newIndex = Math.max(focusedIndex - 1, 0);
            break;
          case 'ArrowRight':
            newIndex = Math.min(focusedIndex + 1, filteredProjects.length - 1);
            break;
        }

        setFocusedIndex(newIndex);
      }
    },
    [focusedIndex, filteredProjects.length]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyboardNavigation);
    return () => window.removeEventListener('keydown', handleKeyboardNavigation);
  }, [handleKeyboardNavigation]);

  return (
    <div className="space-y-8">
      <ProjectNav
        selectedCategory={category}
        onCategoryChange={setCategory}
        className="sticky top-4 z-10"
      />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
      >
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} isFocused={index === focusedIndex} />
        ))}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center py-12"
          >
            <p className="text-zinc-400 text-lg">No projects found in this category.</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

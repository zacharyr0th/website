import React, { Suspense } from 'react';
import { PROJECTS } from '../../components/projects-page/data/projects';
import { LoadingState } from 'components/common/Loading';
import ProjectsPageClient from '../../components/projects-page/components/ProjectsPageClient';
import { RootLayoutClient } from 'components/layout';
import type { Metadata } from 'next';
import { SECTION_METADATA } from '@/lib';

// Define animation variants inline
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

export const metadata: Metadata = {
  title: SECTION_METADATA.projects.title,
  description: SECTION_METADATA.projects.description,
};

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

export default function ProjectsPage() {
  return (
    <RootLayoutClient width="wide">
      <h1 className="text-6xl font-light text-center sm:text-left mb-10">Projects</h1>
      <Suspense
        fallback={
          <LoadingState
            label="Loading projects"
            height="h-[600px]"
            barCount={4}
            className="max-w-3xl mx-auto mt-8"
          />
        }
      >
        <ProjectsPageClient initialProjects={PROJECTS} containerVariants={containerVariants} />
      </Suspense>
    </RootLayoutClient>
  );
}

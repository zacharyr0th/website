import React, { Suspense } from 'react';
import { PROJECTS } from './projects';
import { LoadingState } from '../lib/Loading';
import { ProjectsPageClient } from './ProjectsPageClient';
import { containerVariants } from '../lib/animations';
import PageHeader from '../components/PageHeader';

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-surface/30">
      <main className="container mx-auto px-6 sm:px-8 pt-16 sm:pt-36 pb-24">
        <div style={{ maxWidth: 'var(--article-width)' }} className="mx-auto space-y-6">
          <PageHeader title="Projects" />

          <Suspense 
            fallback={
              <LoadingState 
                label="Loading projects" 
                height="h-[600px]"
                barCount={4}
                className="max-w-3xl mx-auto" 
              />
            }
          >
            <ProjectsPageClient 
              initialProjects={PROJECTS} 
              containerVariants={containerVariants}
            />
          </Suspense>
        </div>
      </main>
    </div>
  );
}

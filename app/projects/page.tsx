import React, { Suspense } from 'react';
import { PROJECTS } from './data/projects';
import { LoadingState } from '@/components/misc/Loading';
import ProjectsPageClient from './ProjectsPageClient';
import { containerVariants } from '@/lib/ui/animations';
import PageContent from '@/components/layout/PageContent';
import PageHeader from '@/components/layout/PageHeader';
import PageLayout from '@/components/layout/PageLayout';
import BaseLayout from '@/components/layout/BaseLayout';
import type { Metadata } from 'next';
import { SECTION_METADATA } from '@/lib/config/metadata';

export const metadata: Metadata = {
  title: SECTION_METADATA.projects.title,
  description: SECTION_METADATA.projects.description,
};

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

export default function ProjectsPage() {
  return (
    <BaseLayout>
      <PageLayout>
        <PageContent maxWidth="wide">
          <Suspense fallback={<LoadingState label="Loading title" height="h-12" barCount={1} />}>
            <PageHeader title="Projects" />
          </Suspense>
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
            <ProjectsPageClient initialProjects={PROJECTS} containerVariants={containerVariants} />
          </Suspense>
        </PageContent>
      </PageLayout>
    </BaseLayout>
  );
}

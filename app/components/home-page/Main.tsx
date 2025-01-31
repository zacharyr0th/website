'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useVirtualizer } from '@tanstack/react-virtual';
import { PROJECTS, type BaseProject } from '@/projects/projects';
import Image from 'next/image';

const WRITING_PROJECTS = [
  {
    title: "A Bird's Eye View",
    description: 'Seeing the forest through the trees when it comes to blockchain adoption.',
    link: '/writing/birdseye-view',
  },
  {
    title: 'Web 1',
    description: 'A cross generational perspective on the internet.',
    link: '/writing/web-1',
  },
  {
    title: 'MusicIDE',
    description: 'Exploring the intersection of artificial intelligence and music composition.',
    link: '/writing/musicide',
  },
];

interface WritingCardProps {
  article: {
    title: string;
    description: string;
    link: string;
  };
}

const WritingCard = memo(({ article }: WritingCardProps) => (
  <Link href={article.link}>
    <div className="group relative flex flex-col justify-between px-8 py-6 space-y-4 bg-black/40 rounded-2xl border border-white/5 h-full">
      <article className="space-y-3 w-full">
        <h2 className="text-xl font-mono text-white/90 group-hover:text-accent transition-colors text-left w-full">
          {article.title}
        </h2>
        <p className="flex font-mono text-white/60 text-sm leading-relaxed line-clamp-3 text-left w-full">
          {article.description}
        </p>
      </article>

      <div className="flex items-center text-accent/80 group-hover:text-accent text-sm font-mono transition-colors">
        Read Article
        <svg
          className="ml-1 w-4 h-4 group-hover:translate-x-0.5 transition-transform"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M6.66667 12.6667L12 7.33333L6.66667 2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  </Link>
));

WritingCard.displayName = 'WritingCard';

const Section = memo(
  ({
    children,
    id,
    title,
    className,
  }: {
    children: React.ReactNode;
    id: string;
    title: string;
    className: string;
  }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
      <motion.section
        ref={ref}
        className={className}
        aria-labelledby={id}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.h2
            id={id}
            className="text-4xl font-bold mb-8 text-text-primary"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {title}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {children}
          </motion.div>
        </div>
      </motion.section>
    );
  }
);

Section.displayName = 'Section';

const ProjectGrid = memo(({ projects }: { projects: typeof PROJECTS }) => {
  const parentRef = React.useRef<HTMLDivElement>(null);
  
  const rowVirtualizer = useVirtualizer({
    count: projects.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 300,
    overscan: 5,
  });

  // Generate projects structured data
  const projectsStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: projects.map((project, index) => {
      const technologies = 'technologies' in project && Array.isArray(project.technologies) 
        ? project.technologies.join(', ') 
        : undefined;

      return {
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'SoftwareSourceCode',
          name: project.title,
          description: project.description,
          programmingLanguage: technologies,
          url: project.link,
        },
      };
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsStructuredData) }}
      />
      <div 
        ref={parentRef}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 auto-rows-fr overflow-auto"
        style={{
          height: '800px',
          width: '100%',
        }}
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualItem) => {
            const project = projects[virtualItem.index];
            if (!project) return null;
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: virtualItem.size,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                <ProjectCard project={project} isFocused={false} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
});

ProjectGrid.displayName = 'ProjectGrid';

const WritingGrid = memo(({ articles }: { articles: typeof WRITING_PROJECTS }) => {
  const parentRef = React.useRef<HTMLDivElement>(null);
  
  return (
    <div ref={parentRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {articles.map((article) => (
        <WritingCard key={article.link} article={article} />
      ))}
    </div>
  );
});

WritingGrid.displayName = 'WritingGrid';

const ProjectCard = memo<{ project: BaseProject & { image?: string }; isFocused: boolean }>(
  ({ project }) => (
    <div className="group relative flex flex-col justify-between px-8 py-6 space-y-4 bg-black/40 rounded-2xl border border-white/5 h-full">
      {project.image && (
        <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg">
          <Image
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={85}
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzYvLy0vLi44QjxAOEA4Qi5AOTc5PkVFPkdEREdHREdHREf/2wBDAR"
          />
        </div>
      )}
      <article className="space-y-3 w-full">
        <h2 className="text-xl font-mono text-white/90 group-hover:text-accent transition-colors text-left w-full">
          {project.title}
        </h2>
        <p className="flex font-mono text-white/60 text-sm leading-relaxed line-clamp-3 text-left w-full">
          {project.description}
        </p>
      </article>
    </div>
  )
);

export const Main = memo(() => (
  <>
    <Section
      id="section-always-building"
      title="Always Building"
      className="w-full pt-16 pb-16 px-4 bg-background"
    >
      <ProjectGrid projects={PROJECTS} />
    </Section>

    <Section
      id="section-sometimes-writing"
      title="Sometimes Writing"
      className="w-full pt-16 pb-16 px-4 bg-surface"
    >
      <WritingGrid articles={WRITING_PROJECTS} />
    </Section>
  </>
));

Main.displayName = 'Main';

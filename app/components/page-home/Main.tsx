import React, { memo } from 'react';
import Link from 'next/link';
import { learningProjects, writingProjects, NavButton } from '@/lib/constants';
import { LearningProject, WritingProject } from '@/lib/types';

// Extract common styles to prevent recreation
const styles = {
  section: {
    learning: { backgroundColor: 'var(--color-background)' },
    writing: { backgroundColor: 'var(--color-surface)' },
  },
  card: {
    learning: {
      backgroundColor: 'var(--color-surface)',
      borderRadius: 'var(--border-radius-md)',
      boxShadow: 'var(--box-shadow)',
      padding: 'var(--spacing-md)',
    },
    writing: {
      backgroundColor: 'var(--color-background)',
      borderRadius: 'var(--border-radius-md)',
      boxShadow: 'var(--box-shadow)',
      padding: 'var(--spacing-md)',
    },
  },
  text: {
    primary: { color: 'var(--color-text-primary)' },
    secondary: { color: 'var(--color-text-secondary)' },
  },
} as const;

// Memoized Project Card component
const ProjectCard = memo<{
  title: string;
  description: string;
  articleLink: string | undefined;
  githubLink: string | undefined;
  variant: 'learning' | 'writing';
}>(({ title, description, articleLink, githubLink, variant }) => (
  <div className="flex flex-col h-full" style={styles.card[variant]}>
    <h3 className="text-xl font-semibold mb-2" style={styles.text.primary}>
      {title}
    </h3>
    <p className="text-sm mb-4 flex-grow" style={styles.text.secondary}>
      {description}
    </p>
    <div className="mt-auto flex flex-wrap gap-2">
      {articleLink && (
        <Link href={articleLink} target="_blank" rel="noopener noreferrer">
          <NavButton variant="primary">
            {variant === 'writing' ? 'Read Article' : 'Learn More'}
          </NavButton>
        </Link>
      )}
      {githubLink && (
        <Link href={githubLink} target="_blank" rel="noopener noreferrer">
          <NavButton variant="secondary">View on GitHub</NavButton>
        </Link>
      )}
    </div>
  </div>
));
ProjectCard.displayName = 'ProjectCard';

// Memoized Section component
const Section = memo<{
  title: string;
  variant: 'learning' | 'writing';
  projects: readonly (LearningProject | WritingProject)[];
}>(({ title, variant, projects }) => (
  <section className="w-full py-24 px-8" style={styles.section[variant]}>
    <div className="max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold mb-12" style={styles.text.primary}>
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard
            key={`${variant}-${index}`}
            variant={variant}
            title={project.title}
            description={project.description}
            articleLink={
              variant === 'learning'
                ? (project as LearningProject).articleLink
                : (project as WritingProject).link
            }
            githubLink={
              variant === 'learning' ? (project as LearningProject).githubLink : undefined
            }
          />
        ))}
      </div>
    </div>
  </section>
));
Section.displayName = 'Section';

// Main component
const Main = memo(() => (
  <>
    <Section title="Always Learning" variant="learning" projects={learningProjects} />
    <Section title="Sometimes Writing" variant="writing" projects={writingProjects} />
  </>
));
Main.displayName = 'Main';

export default Main;

import React from 'react';
import Link from 'next/link';
import { learningProjects, writingProjects, NavButton } from '@/lib/constants';

const Main: React.FC = () => (
  <>
    <section className="w-full py-24 px-8" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12" style={{ color: 'var(--color-text-primary)' }}>
          Always Learning
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {learningProjects.map((project, index) => (
            <div
              key={index}
              className="flex flex-col h-full"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderRadius: 'var(--border-radius-md)',
                boxShadow: 'var(--box-shadow)',
                padding: 'var(--spacing-md)',
              }}
            >
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {project.title}
              </h3>
              <p
                className="text-sm mb-4 flex-grow"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {project.description}
              </p>
              <div className="mt-auto flex flex-wrap gap-2">
                <Link href={project.articleLink} target="_blank" rel="noopener noreferrer">
                  <NavButton variant="primary">Learn More</NavButton>
                </Link>
                {project.githubLink && (
                  <Link href={project.githubLink} target="_blank" rel="noopener noreferrer">
                    <NavButton variant="secondary">View on GitHub</NavButton>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="w-full py-24 px-8" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12" style={{ color: 'var(--color-text-primary)' }}>
          Sometimes Writing
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {writingProjects.map((article, index) => (
            <div
              key={index}
              className="flex flex-col h-full"
              style={{
                backgroundColor: 'var(--color-background)',
                borderRadius: 'var(--border-radius-md)',
                boxShadow: 'var(--box-shadow)',
                padding: 'var(--spacing-md)',
              }}
            >
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {article.title}
              </h3>
              <p
                className="text-sm mb-4 flex-grow"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {article.description}
              </p>
              <div className="mt-auto">
                <Link href={article.link} target="_blank" rel="noopener noreferrer">
                  <NavButton variant="primary">Read Article</NavButton>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default Main;

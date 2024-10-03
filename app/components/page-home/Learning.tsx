import React from 'react';
import Link from 'next/link';

const Learning: React.FC = () => (
  <section className="w-full py-24 px-8" style={{ backgroundColor: 'var(--color-background)' }}>
    <div className="max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
        Always Learning
      </h2>
      <p className="text-lg mb-16 max-w-3xl" style={{ color: 'var(--color-text-secondary)' }}>
        Whenever I come across a topic I want to learn more about, I start building something around it.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            title: 'zacharyr0th.com',
            description: 'This website is fully open sourced and built with Next.js.',
            articleLink: 'https://example.com/article1',
            githubLink: 'https://github.com/yourusername/zacharyr0th.com',
          },
          {
            title: 'simple-os',
            description: 'A minimalist operating system built from scratch.',
            articleLink: 'https://example.com/article2',
            githubLink: 'https://github.com/yourusername/simple-os',
          },
          {
            title: 'casino-time',
            description: 'Provably fair, permissionless gambling on the Aptos blockchain.',
            articleLink: 'https://example.com/article3',
          },
          {
            title: 'muisc-ide',
            description: 'An ai-assisted IDE for practicing, researching, and composing music.',
            articleLink: 'https://example.com/article4',
            githubLink: 'https://github.com/yourusername/muisc-ide',
          },
          {
            title: 'privvy',
            description: 'A DEX with private transactions by default on the Aleo blockchain.',
            articleLink: 'https://example.com/article5',
          },
          {
            title: 'toml-tools',
            description: 'Utilities for working with Electric Capital\'s crypto-ecosystems repo.',
            articleLink: 'https://example.com/article6',
            githubLink: 'https://github.com/yourusername/toml-tools',
          },
        ].map((project, index) => (
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
            <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
              {project.title}
            </h3>
            <p className="text-sm mb-4 flex-grow" style={{ color: 'var(--color-text-secondary)' }}>
              {project.description}
            </p>
            <div className="mt-auto flex flex-wrap gap-2">
              <Link
                href={project.articleLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm px-4 py-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-text-on-primary)',
                }}
              >
                Read Article
              </Link>
              {project.githubLink && (
                <Link
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm px-4 py-2 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    color: 'var(--color-text-primary)',
                    border: '1px solid var(--color-primary)',
                  }}
                >
                  View on GitHub
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Learning;

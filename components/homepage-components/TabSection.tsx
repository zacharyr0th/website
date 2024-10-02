// Client Component: TabSection

'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const ProjectsContent = dynamic(() => import('./ProjectsContent'), {
  ssr: false,
});

const WritingContent = dynamic(() => import('./WritingContent'), {
  ssr: false,
});

const MusicContent = dynamic(() => import('./MusicContent'), {
  ssr: false,
});

export default function TabSection() {
  const [activeTab, setActiveTab] = useState('projects');

  return (
    <div className="tab-section">
      <div className="tabs-container" role="tablist">
        {['projects', 'writing', 'music'].map((tab, index) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
            role="tab"
            aria-selected={activeTab === tab}
            aria-controls={`${tab}-content`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === 'projects' && <ProjectsContent />}
        {activeTab === 'writing' && <WritingContent />}
        {activeTab === 'music' && <MusicContent />}
      </div>

      <style jsx>{`
        .tab-section {
          width: 100%;
          max-width: var(--max-content-width);
          margin-inline: auto;
          padding-inline: var(--spacing-md);
        }

        .tab-button {
          padding: var(--spacing-sm) var(--spacing-md);
          font-size: var(--font-size-base);
          border: none;
          border-radius: var(--border-radius-sm);
          cursor: pointer;
          transition: all var(--transition-speed);
          background-color: transparent;
        }

        .tab-button.active {
          color: var(--color-text-primary);
          font-weight: bold;
        }

        .tab-button:not(.active) {
          color: var(--color-text-secondary);
        }

        .tab-button:hover {
          color: var(--color-text-primary);
        }

        .tabs-container {
          display: flex;
          justify-content: center;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-md);
        }

        .tab-content {
          color: var(--color-text-primary);
          border-radius: var(--border-radius-md);
          padding: var(--spacing-lg);
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(calc(var(--spacing-sm) * -1));
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .tabs-container {
          opacity: 0;
          animation: fadeIn var(--transition-speed) ease-out forwards;
          animation-delay: 0.2s;
        }

        .tab-button {
          opacity: 0;
          animation: fadeInDown var(--transition-speed) ease-out forwards;
        }

        .tab-content {
          opacity: 0;
          animation: fadeIn var(--transition-speed) ease-out forwards;
          animation-delay: 0.5s;
        }
      `}</style>
    </div>
  );
}

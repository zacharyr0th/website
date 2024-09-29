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
        .container {
          max-width: 56rem;
          margin-left: auto;
          margin-right: auto;
          padding-left: 1rem;
          padding-right: 1rem;
          width: 100%;
        }

        .tab-button,
        .contact-button {
          padding: 0.5rem 1rem;
          font-size: 1rem;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.3s;
        }

        .tab-button.active,
        .contact-button {
          background-color: var(--color-accent);
          color: white;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .tab-button:not(.active) {
          background-color: transparent;
          color: var(--color-secondary);
        }

        .tab-button:not(.active):hover {
          background-color: #e1f5fe;
          color: #4a90e2;
        }

        .tabs-container {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
          position: relative;
        }

        .tabs-container::before,
        .tabs-container::after {
          content: '';
          flex: 1;
        }

        .content {
          background-color: #1e293b;
          color: white;
          border-radius: var(--border-radius);
          padding: 1.5rem;
          box-shadow: var(--box-shadow);
          transition: transform 0.3s;
        }

        .content:hover {
          transform: scale(1.05);
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
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
          animation: fadeIn 0.5s ease-out forwards;
          animation-delay: 0.2s;
        }

        .tab-button {
          opacity: 0;
          animation: fadeInDown 0.5s ease-out forwards;
        }

        .tab-content {
          opacity: 0;
          animation: fadeIn 0.5s ease-out forwards;
          animation-delay: 0.5s;
        }
      `}</style>
    </div>
  );
}

// Client Component: TabSection

'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const FeaturedContent = dynamic(() => import('./FeaturedContent'), {
  ssr: false,
});
const ProjectsContent = dynamic(() => import('./ProjectsContent'), {
  ssr: false,
});
const BioSection = dynamic(() => import('./BioSection'), {
  ssr: false,
});

export default function TabSection() {
  const [activeTab, setActiveTab] = useState('projects');

  return (
    <div className="tab-section">
      <div className="tabs-container" role="tablist">
        {['projects', 'about', 'featured'].map((tab, index) => (
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
        {activeTab === 'about' && <BioSection />}
        {activeTab === 'featured' && <FeaturedContent />}
      </div>

      <style jsx>{`
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

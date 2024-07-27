// Client Component: TabSection
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import './TabSection.css';

const FeaturedContent = dynamic(() => import('./FeaturedContent'), {
  ssr: false,
});
const ProjectsContent = dynamic(() => import('./ProjectsContent'), {
  ssr: false,
});

export default function TabSection() {
  const [activeTab, setActiveTab] = useState('bio');

  return (
    <div className="transition-opacity duration-300 ease-in-out">
      <div className="tabs-container" role="tablist">
        {['bio', 'featured', 'projects'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
            role="tab"
            aria-selected={activeTab === tab}
            aria-controls={`${tab}-content`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="content-container">
        <div className="content">
          {activeTab === 'bio' && (
            <div className="bio-section">
              <p className="bio-text">Lorem Ipsum</p>
            </div>
          )}

          {activeTab === 'featured' && <FeaturedContent />}
          {activeTab === 'projects' && <ProjectsContent />}
        </div>
      </div>
    </div>
  );
}

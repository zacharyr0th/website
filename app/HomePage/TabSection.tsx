'use client';

import { useState } from 'react';
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

      {activeTab === 'bio' && <BioSection />}
      {activeTab === 'featured' && <FeaturedContent />}
      {activeTab === 'projects' && <ProjectsContent />}
    </div>
  );
}
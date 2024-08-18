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
  const [activeTab, setActiveTab] = useState('about');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="tab-section">
      <div className="tabs-container" role="tablist">
        {['projects', 'about', 'featured'].map((tab, index) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`tab-button ${activeTab === tab ? 'active' : ''} ${
              isLoaded ? 'loaded' : ''
            }`}
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

        .tab-button {
          animation: fadeInDown 0.5s ease-out backwards;
        }

        .tab-button.active {
          transition: all 0.3s ease;
        }

        .tab-content {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

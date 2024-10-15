import React, { memo, useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { learningProjects } from '@/lib/constants';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const Hero: React.FC = memo(() => {
  return (
    <section className="flex flex-row min-h-screen bg-background">
      <div className="w-1/2 flex flex-col">
        <HeroContent />
      </div>
      <div className="w-1/2 relative h-screen overflow-hidden">
        <ProjectPanels />
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

const HeroContent: React.FC = memo(() => (
  <>
    <StickyHeader />
  </>
));

HeroContent.displayName = 'HeroContent';

const StickyHeader: React.FC = () => (
  <div className="h-screen flex flex-col justify-center sticky top-0 ml-12">
    <h1 className="text-6xl font-bold leading-tight tracking-tighter mb-8 text-primary">
      Projects
    </h1>
    <p className="text-lg mb-6 max-w-xl tracking-wide text-text-secondary">Nights and weekends.</p>
    <div className="w-24 h-1 bg-accent mb-6"></div>
  </div>
);

const ProjectPanels: React.FC = () => {
  const [expandedPanel, setExpandedPanel] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [bookWidth, setBookWidth] = useState(0);

  const visibleProjects = 6;

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const availableWidth = containerWidth - 300 - 16; // Subtracting space for expanded panel and right margin
      const calculatedWidth = Math.floor(availableWidth / (visibleProjects - 1));
      setBookWidth(calculatedWidth);
    }
  }, []);

  const colorVariables = [
    'var(--color-primary)',
    'var(--color-secondary)',
    'var(--color-accent)',
    'var(--color-text-primary)',
    'var(--color-text-secondary)',
    'var(--color-surface)',
  ];

  const handleNext = () => {
    setStartIndex((prevIndex) =>
      Math.min(prevIndex + 1, learningProjects.length - visibleProjects)
    );
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const getTextColor = (backgroundColor: string) => {
    if (
      backgroundColor === 'var(--color-accent)' ||
      backgroundColor === 'var(--color-text-primary)' ||
      backgroundColor === 'var(--color-text-secondary)'
    ) {
      return 'text-white dark:text-white';
    } else if (backgroundColor === 'var(--color-surface)') {
      return 'text-black dark:text-white';
    } else {
      return 'text-background dark:text-white';
    }
  };

  return (
    <div className="h-full flex items-center bg-background relative">
      <div
        ref={containerRef}
        className="flex flex-row h-4/5 w-full bg-surface rounded-lg overflow-hidden mr-4 shadow-lg"
      >
        {learningProjects.slice(startIndex, startIndex + visibleProjects).map((project, index) => {
          const colorIndex = (startIndex + index) % colorVariables.length;
          const bookColor = colorVariables[colorIndex];
          const textColorClass = getTextColor(bookColor);

          return (
            <div
              key={project.title}
              className={`h-full transition-all duration-300 ease-in-out cursor-pointer flex flex-col ${
                expandedPanel === index ? 'flex-grow' : ''
              }`}
              style={{
                backgroundColor: bookColor,
                width: expandedPanel === index ? '300px' : `${bookWidth}px`,
                minWidth: expandedPanel === index ? '300px' : `${bookWidth}px`,
              }}
              onClick={() => setExpandedPanel(index)}
            >
              <div
                className={`h-full overflow-hidden p-6 ${
                  expandedPanel === index ? 'block' : 'hidden'
                }`}
              >
                <h2 className={`text-2xl font-bold mb-4 ${textColorClass}`}>{project.title}</h2>
                <p className={`text-sm mb-6 ${textColorClass} opacity-90`}>{project.description}</p>

                {/* New sections */}
                <div className={`mb-6 ${textColorClass}`}>
                  <h3 className="text-lg font-semibold mb-2">Technologies</h3>
                  <ul className="list-disc list-inside text-sm">
                    {project.technologies?.map((tech, i) => (
                      <li key={i}>{tech}</li>
                    ))}
                  </ul>
                </div>

                <div className={`mb-6 ${textColorClass}`}>
                  <h3 className="text-lg font-semibold mb-2">Key Features</h3>
                  <ul className="list-disc list-inside text-sm">
                    {project.features?.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>

                {project.articleLink && (
                  <Link
                    href={project.articleLink}
                    className={`${textColorClass} hover:underline text-sm block mb-3 transition-colors duration-200 hover:text-accent`}
                  >
                    Read Article
                  </Link>
                )}
                {project.githubLink && (
                  <Link
                    href={project.githubLink}
                    className={`${textColorClass} hover:underline text-sm block transition-colors duration-200 hover:text-accent`}
                  >
                    View on GitHub
                  </Link>
                )}
              </div>
              <div
                className={`h-full flex items-center justify-center ${
                  expandedPanel === index ? 'hidden' : 'block'
                }`}
              >
                <span
                  className={`${textColorClass} text-sm font-bold transform -rotate-90 whitespace-nowrap`}
                >
                  {project.title}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      {startIndex > 0 && (
        <button
          onClick={handlePrev}
          className="absolute left-2 bg-surface rounded-full p-2 shadow-md hover:bg-accent transition-colors duration-200"
        >
          <ChevronLeftIcon className="h-6 w-6 text-text-primary" />
        </button>
      )}
      {startIndex < learningProjects.length - visibleProjects && (
        <button
          onClick={handleNext}
          className="absolute right-6 bg-surface rounded-full p-2 shadow-md hover:bg-accent transition-colors duration-200"
        >
          <ChevronRightIcon className="h-6 w-6 text-text-primary" />
        </button>
      )}
    </div>
  );
};

export default memo(Hero);

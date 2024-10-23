import React, { memo, useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  learningProjects,
  Button,
  VISIBLE_PROJECTS,
  colorVariables,
  getTextColor,
} from '@/lib/constants';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { ProjectsPageProps, ProjectPanelsProps, LearningProject } from '@/lib/types';

const Hero: React.FC<ProjectsPageProps> = memo(() => {
  return (
    <section className="flex flex-row min-h-screen bg-background">
      <div className="w-1/2 flex flex-col">
        <HeroContent />
      </div>
      <div className="w-1/2 relative h-screen overflow-hidden">
        <ProjectPanels visibleProjects={VISIBLE_PROJECTS} />
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
    <h1 className="text-6xl font-bold leading-tight tracking-wide mb-8 text-text-primary">
      Projects
    </h1>
    <p className="text-lg mb-6 max-w-xl tracking-wide text-text-secondary">Nights and weekends.</p>
    <div className="w-24 h-1 bg-accent mb-6"></div>
  </div>
);

const ProjectPanels: React.FC<ProjectPanelsProps> = ({ visibleProjects }) => {
  const [expandedPanel, setExpandedPanel] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [bookWidth, setBookWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const availableWidth = containerWidth - 300 - 16; // Subtracting space for expanded panel and right margin
      const calculatedWidth = Math.floor(availableWidth / (visibleProjects - 1));
      setBookWidth(calculatedWidth);
    }
  }, []);

  const handleNext = () => {
    setStartIndex((prevIndex) =>
      Math.min(prevIndex + 1, learningProjects.length - visibleProjects)
    );
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  return (
    <div className="h-full flex items-center bg-background relative">
      <div
        ref={containerRef}
        className="flex flex-row h-4/5 w-full bg-surface rounded-md overflow-hidden mr-4 shadow-md"
        style={{ '--box-shadow': 'var(--box-shadow)' } as React.CSSProperties}
      >
        {learningProjects
          .slice(startIndex, startIndex + visibleProjects)
          .map((project: LearningProject, index: number) => {
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
                  transition: 'var(--transition-speed)',
                }}
                onClick={() => setExpandedPanel(index)}
              >
                <div
                  className={`h-full overflow-hidden p-6 ${
                    expandedPanel === index ? 'block' : 'hidden'
                  }`}
                >
                  <h2 className={`text-2xl font-bold mb-4 ${textColorClass}`}>{project.title}</h2>
                  <p className={`text-sm mb-6 ${textColorClass} opacity-90`}>
                    {project.description}
                  </p>

                  {/* Technologies section */}
                  <div className={`mb-6 ${textColorClass}`}>
                    <h3 className={`text-lg font-semibold mb-2 ${textColorClass}`}>Technologies</h3>
                    <ul className="list-disc list-inside text-sm">
                      {project.technologies?.map((tech, i) => (
                        <li key={i}>{tech}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Key Features section */}
                  <div className={`mb-6 ${textColorClass}`}>
                    <h3 className={`text-lg font-semibold mb-2 ${textColorClass}`}>Key Features</h3>
                    <ul className="list-disc list-inside text-sm">
                      {project.features?.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Links */}
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
        <Button
          onClick={handlePrev}
          className="absolute left-2 bg-surface rounded-full p-2 shadow-md hover:bg-accent transition-colors duration-200"
        >
          <ChevronLeftIcon className="h-6 w-6 text-text-primary" />
        </Button>
      )}
      {startIndex < learningProjects.length - visibleProjects && (
        <Button
          onClick={handleNext}
          className="absolute right-6 bg-surface rounded-full p-2 shadow-md hover:bg-accent transition-colors duration-200"
        >
          <ChevronRightIcon className="h-6 w-6 text-text-primary" />
        </Button>
      )}
    </div>
  );
};

export default memo(Hero);

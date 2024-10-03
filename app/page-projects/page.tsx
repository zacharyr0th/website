'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import Image from 'next/image';
import Navigation from '../components/common/Navigation';
import { Project, ProjectRefs } from '@/lib/types';

// Remove the ProjectsPageProps interface

const projects: Project[] = [
  { id: 1, title: "Personal Portfolio", logo: "/portfolio-logo.svg", description: "A responsive Next.js portfolio showcasing my projects and skills", link: "#" },
  { id: 2, title: "Task Management App", logo: "/task-logo.svg", description: "A full-stack application for efficient task organization", link: "#" },
  { id: 3, title: "Fitness Tracker", logo: "/fitness-logo.svg", description: "React Native app for tracking workouts and nutrition", link: "#" },
  { id: 4, title: "Travel Planner", logo: "/travel-logo.svg", description: "iOS app for planning and organizing trips", link: "#" },
  { id: 5, title: "Sentiment Analysis Tool", logo: "/sentiment-logo.svg", description: "NLP-based sentiment analysis for social media data", link: "#" },
  { id: 6, title: "Image Recognition API", logo: "/image-logo.svg", description: "Deep learning model for image classification and object detection", link: "#" },
];

export default function ProjectsPage() {
  const [theme, setTheme] = useState('theme-light');
  const [currentProject, setCurrentProject] = useState(0);
  const projectRefs: ProjectRefs = useRef([]);

  const nextProject = useCallback(() => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  }, []);

  const prevProject = useCallback(() => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  }, []);

  useEffect(() => {
    projectRefs.current[currentProject]?.focus();
  }, [currentProject]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      nextProject();
    } else if (e.key === 'ArrowLeft') {
      prevProject();
    }
  };

  return (
    <div className={`bg-background text-text full-height ${theme}`}>
      <Navigation setTheme={setTheme} />

      <main className="pb-spacing-xl">
        <section className="hero py-spacing-xl px-spacing-md max-w-content mx-auto">
          <h1 className="text-6xl font-bold mb-spacing-sm text-primary">My Projects</h1>
          <p className="text-xl text-text-secondary">Explore my latest work and ongoing projects</p>
        </section>

        <section 
          className="project-book relative h-[70vh] bg-surface shadow-lg overflow-hidden"
          aria-roledescription="carousel"
          aria-label="Project showcase"
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el: HTMLDivElement | null) => {
                if (el) projectRefs.current[index] = el;
              }}
              className={`absolute top-0 left-0 w-full h-full bg-surface p-spacing-xl flex flex-col transition-transform duration-500 ease-in-out ${
                index === currentProject ? 'z-10' : 'z-0'
              }`}
              style={{
                transform: `translateX(${(index - currentProject) * 100}%)`,
              }}
              role="group"
              aria-roledescription="slide"
              aria-label={`Project ${index + 1} of ${projects.length}`}
              aria-hidden={index !== currentProject}
              tabIndex={index === currentProject ? 0 : -1}
              onKeyDown={handleKeyDown}
            >
              <div className="flex items-center mb-spacing-lg">
                <Image
                  src={project.logo}
                  alt=""
                  width={100}
                  height={100}
                  className="rounded-full mr-spacing-md"
                />
                <h2 className="text-4xl font-bold text-primary">{project.title}</h2>
              </div>
              <p className="text-xl text-text-secondary mb-spacing-xl flex-grow max-w-3xl">{project.description}</p>
              <a
                href={project.link}
                className="text-accent hover:underline inline-flex items-center transition-colors duration-transition text-xl"
                aria-label={`View ${project.title} project`}
              >
                View Project
                <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          ))}
          <button
            onClick={prevProject}
            className="absolute top-1/2 left-spacing-md transform -translate-y-1/2 bg-primary text-white p-3 rounded-full shadow-md hover:bg-primary-dark transition-colors duration-transition z-20"
            aria-label="Previous project"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextProject}
            className="absolute top-1/2 right-spacing-md transform -translate-y-1/2 bg-primary text-white p-3 rounded-full shadow-md hover:bg-primary-dark transition-colors duration-transition z-20"
            aria-label="Next project"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </section>
      </main>
    </div>
  );
}

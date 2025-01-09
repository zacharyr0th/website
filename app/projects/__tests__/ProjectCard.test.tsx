import React from 'react';
import { render, screen } from '@testing-library/react';
import ProjectCard from '../ProjectCard';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
      <div {...props}>{children}</div>
    ),
  },
  useInView: () => true,
}));

describe('ProjectCard', () => {
  const mockProject = {
    title: 'Test Project',
    description: 'A test project description',
    tags: ['React', 'TypeScript'],
    githubLink: 'https://github.com/test',
    demoLink: 'https://demo.test',
    link: 'https://project.test',
  };

  describe('rendering', () => {
    it('renders project information correctly', () => {
      render(<ProjectCard project={mockProject} isFocused={false} />);

      expect(screen.getByText('Test Project')).toBeInTheDocument();
      expect(screen.getByText('A test project description')).toBeInTheDocument();
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
    });

    it('renders project links correctly', () => {
      render(<ProjectCard project={mockProject} isFocused={false} />);

      expect(screen.getByLabelText('View live demo')).toBeInTheDocument();
      expect(screen.getByLabelText('View project on GitHub')).toBeInTheDocument();
    });
  });

  describe('focus behavior', () => {
    it('applies focus styles when isFocused is true', () => {
      render(<ProjectCard project={mockProject} isFocused={true} />);

      const article = screen.getByRole('listitem').querySelector('article');
      expect(article).toHaveClass('bg-zinc-800/50');
    });
  });

  describe('link behavior', () => {
    it('uses project.link as primary link', () => {
      render(<ProjectCard project={mockProject} isFocused={false} />);
      const link = screen.getByRole('listitem');
      expect(link).toHaveAttribute('href', mockProject.link);
    });

    it('falls back to githubLink when link is not available', () => {
      const projectWithoutLink = { ...mockProject, link: undefined };
      render(<ProjectCard project={projectWithoutLink} isFocused={false} />);
      const link = screen.getByRole('listitem');
      expect(link).toHaveAttribute('href', mockProject.githubLink);
    });

    it('falls back to demoLink when link and githubLink are not available', () => {
      const projectWithoutLinks = { ...mockProject, link: undefined, githubLink: undefined };
      render(<ProjectCard project={projectWithoutLinks} isFocused={false} />);
      const link = screen.getByRole('listitem');
      expect(link).toHaveAttribute('href', mockProject.demoLink);
    });

    it('uses # as fallback when no links are available', () => {
      const projectWithNoLinks = {
        ...mockProject,
        link: undefined,
        githubLink: undefined,
        demoLink: undefined,
      };
      render(<ProjectCard project={projectWithNoLinks} isFocused={false} />);
      const link = screen.getByRole('listitem');
      expect(link).toHaveAttribute('href', '#');
    });
  });

  describe('accessibility', () => {
    it('has correct ARIA roles', () => {
      render(<ProjectCard project={mockProject} isFocused={false} />);
      expect(screen.getByRole('listitem')).toBeInTheDocument();
      expect(screen.getByRole('article')).toBeInTheDocument();
    });

    it('supports keyboard navigation', async () => {
      render(<ProjectCard project={mockProject} isFocused={false} />);
      const link = screen.getByRole('listitem');

      link.focus();
      expect(document.activeElement).toBe(link);
    });
  });
});

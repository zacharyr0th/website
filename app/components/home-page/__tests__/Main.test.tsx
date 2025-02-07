import React from 'react';
import { render, screen } from '@testing-library/react';
import { Main } from '../Main';
import { PROJECTS } from '../../../projects/projects';
import { WRITING_PROJECTS } from '../constants';

// Mock next/link
jest.mock('next/link', () => {
  return function MockLink({ children, href }: React.PropsWithChildren<{ href: string }>) {
    return <a href={href}>{children}</a>;
  };
});

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    section: ({ children, className, 'aria-labelledby': ariaLabelledBy }: React.HTMLAttributes<HTMLElement>) => (
      <section className={className} aria-labelledby={ariaLabelledBy}>{children}</section>
    ),
    div: ({ children, className }: React.HTMLAttributes<HTMLDivElement>) => <div className={className}>{children}</div>,
    h2: ({ children, className, id }: React.HTMLAttributes<HTMLHeadingElement>) => <h2 id={id} className={className}>{children}</h2>,
  },
  useInView: () => true,
}));

// Mock ProjectCard component
jest.mock('@/projects/ProjectCard', () => {
  return function MockProjectCard({ project }: { project: { title: string; description: string } }) {
    return (
      <div data-testid="project-card">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
    );
  };
});

describe('Main', () => {
  it('renders without crashing', () => {
    render(<Main />);
    expect(screen.getByText('Always Building')).toBeInTheDocument();
    expect(screen.getByText('Sometimes Writing')).toBeInTheDocument();
  });

  describe('Projects Section', () => {
    it('renders all projects', () => {
      render(<Main />);
      const projectCards = screen.getAllByTestId('project-card');
      expect(projectCards).toHaveLength(PROJECTS.length);

      PROJECTS.forEach(project => {
        expect(screen.getByText(project.title)).toBeInTheDocument();
        expect(screen.getByText(project.description)).toBeInTheDocument();
      });
    });

    it('applies correct section styles', () => {
      render(<Main />);
      const section = screen.getByLabelText('section-always-building');
      expect(section).toHaveClass('w-full', 'pt-16', 'pb-16', 'px-4', 'bg-background');
    });
  });

  describe('Writing Section', () => {
    it('renders all writing articles', () => {
      render(<Main />);
      
      WRITING_PROJECTS.forEach(article => {
        expect(screen.getByText(article.title)).toBeInTheDocument();
        expect(screen.getByText(article.description)).toBeInTheDocument();
      });
    });

    it('renders article links correctly', () => {
      render(<Main />);
      
      WRITING_PROJECTS.forEach(article => {
        const link = screen.getByText(article.title).closest('a');
        expect(link).toHaveAttribute('href', article.link);
      });
    });

    it('applies correct section styles', () => {
      render(<Main />);
      const section = screen.getByLabelText('section-sometimes-writing');
      expect(section).toHaveClass('w-full', 'pt-16', 'pb-16', 'px-4', 'bg-surface');
    });
  });

  describe('WritingCard', () => {
    it('renders article cards with correct structure', () => {
      render(<Main />);
      
      WRITING_PROJECTS.forEach(article => {
        const card = screen.getByText(article.title).closest('.group');
        expect(card).toHaveClass(
          'group',
          'relative',
          'flex',
          'flex-col',
          'justify-between',
          'px-8',
          'py-6',
          'space-y-4',
          'bg-black/40',
          'rounded-2xl',
          'border',
          'border-white/5',
          'h-full'
        );
      });
    });

    it('includes "Read Article" text and arrow icon', () => {
      render(<Main />);
      const readArticleLinks = screen.getAllByText('Read Article');
      expect(readArticleLinks).toHaveLength(WRITING_PROJECTS.length);

      readArticleLinks.forEach(link => {
        const svg = link.nextElementSibling;
        expect(svg?.tagName.toLowerCase()).toBe('svg');
      });
    });
  });

  describe('Section Component', () => {
    it('renders sections with correct structure', () => {
      render(<Main />);
      
      ['Always Building', 'Sometimes Writing'].forEach(title => {
        const section = screen.getByRole('heading', { name: title }).parentElement?.parentElement;
        expect(section).toHaveClass('max-w-5xl', 'mx-auto');
      });
    });

    it('applies correct heading styles', () => {
      render(<Main />);
      
      const headings = screen.getAllByRole('heading', { level: 2 });
      headings.forEach(heading => {
        expect(heading).toHaveClass('text-4xl', 'font-bold', 'mb-8', 'text-text-primary');
      });
    });
  });

  describe('Grid Layouts', () => {
    it('renders project grid with correct structure', () => {
      render(<Main />);
      const projectGrid = screen.getAllByTestId('project-card')[0].parentElement;
      expect(projectGrid).toHaveClass('grid', 'grid-cols-1', 'sm:grid-cols-2', 'gap-6');
    });

    it('renders writing grid with correct structure', () => {
      render(<Main />);
      const writingGrid = screen.getByText(WRITING_PROJECTS[0].title).closest('.grid');
      expect(writingGrid).toHaveClass('grid', 'grid-cols-1', 'sm:grid-cols-2', 'gap-6');
    });
  });

  describe('Accessibility', () => {
    it('uses proper heading hierarchy', () => {
      render(<Main />);
      const h2s = screen.getAllByRole('heading', { level: 2 });
      const h3s = screen.getAllByRole('heading', { level: 3 });
      
      expect(h2s).toHaveLength(2); // Section titles
      expect(h3s).toHaveLength(PROJECTS.length); // Project titles
    });

    it('provides proper section labeling', () => {
      render(<Main />);
      expect(screen.getByLabelText('section-always-building')).toBeInTheDocument();
      expect(screen.getByLabelText('section-sometimes-writing')).toBeInTheDocument();
    });

    it('ensures all links are accessible', () => {
      render(<Main />);
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toHaveAccessibleName();
      });
    });
  });
}); 
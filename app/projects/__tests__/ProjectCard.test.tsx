import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectCard from '../ProjectCard';

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  useInView: () => true,
}));

const mockProject = {
  title: 'Test Project',
  description: 'A test project description',
  tags: ['React', 'TypeScript'],
  githubLink: 'https://github.com/test',
  demoLink: 'https://demo.test',
  link: 'https://project.test',
};

describe('ProjectCard', () => {
  it('renders project information correctly', () => {
    render(<ProjectCard project={mockProject} isFocused={false} />);
    
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('A test project description')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('applies focus styles when isFocused is true', () => {
    render(<ProjectCard project={mockProject} isFocused={true} />);
    
    const article = screen.getByRole('listitem').querySelector('article');
    expect(article).toHaveClass('bg-zinc-800/50');
  });

  it('renders project links correctly', () => {
    render(<ProjectCard project={mockProject} isFocused={false} />);
    
    expect(screen.getByLabelText('View live demo')).toBeInTheDocument();
    expect(screen.getByLabelText('View project on GitHub')).toBeInTheDocument();
  });
}); 
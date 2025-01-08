import React from 'react';
import { render, screen } from '@testing-library/react';
import CategoryCard from '../CategoryCard';

const mockCategory = {
  title: 'Test Category',
  description: 'A test category description',
  slug: 'test-category',
  status: 'coming-soon' as const,
};

interface MotionProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...props }: MotionProps) => <div className={className} {...props}>{children}</div>,
    span: ({ children, className, ...props }: MotionProps) => <span className={className} {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}));

describe('CategoryCard', () => {
  describe('rendering', () => {
    it('renders category information correctly', () => {
      render(<CategoryCard category={mockCategory} index={0} />);
      
      expect(screen.getByText('Test Category')).toBeInTheDocument();
      expect(screen.getByText('A test category description')).toBeInTheDocument();
      expect(screen.getByText('(Coming Soon)')).toBeInTheDocument();
    });

    it('renders arrow icon', () => {
      render(<CategoryCard category={mockCategory} index={0} />);
      const arrow = screen.getByTestId('arrow-icon');
      expect(arrow).toHaveAttribute('aria-hidden', 'true');
    });

    it('renders with correct link', () => {
      render(<CategoryCard category={mockCategory} index={0} />);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/audio/test-category');
      expect(link).toHaveAttribute('aria-label', 'Test Category');
    });
  });

  describe('accessibility', () => {
    it('provides accessible link text', () => {
      render(<CategoryCard category={mockCategory} index={0} />);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('aria-label', 'Test Category');
    });

    it('marks decorative elements as hidden', () => {
      render(<CategoryCard category={mockCategory} index={0} />);
      const arrow = screen.getByTestId('arrow-icon');
      expect(arrow).toHaveAttribute('aria-hidden', 'true');
    });
  });
}); 
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navigation from '../Navigation';
import { navItems } from '../constants';
import { usePathname } from 'next/navigation';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

describe('Navigation', () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/');
  });

  it('renders without crashing', () => {
    render(<Navigation />);
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
  });

  it('has proper list structure', () => {
    render(<Navigation />);
    expect(screen.getByRole('menubar', { name: 'Main menu' })).toBeInTheDocument();
    expect(screen.getAllByRole('none')).toHaveLength(navItems.length);
  });

  describe('navigation items', () => {
    it('renders all navigation items', () => {
      render(<Navigation />);
      navItems.forEach(item => {
        expect(screen.getByRole('button', { name: item.label })).toBeInTheDocument();
      });
    });

    it('applies active styles to current page link', () => {
      (usePathname as jest.Mock).mockReturnValue('/projects');
      render(<Navigation />);
      const projectsButton = screen.getByRole('button', { name: 'Projects' });
      expect(projectsButton).toHaveStyle({ backgroundColor: 'var(--color-surface)' });
    });
  });

  describe('home button', () => {
    it('shows home button when prop is true and not on home page', () => {
      (usePathname as jest.Mock).mockReturnValue('/projects');
      render(<Navigation showHomeButton={true} />);
      const homeButton = screen.getByText('z');
      expect(homeButton).toBeInTheDocument();
      expect(homeButton.closest('div')?.parentElement).toHaveClass('max-sm:hidden');
    });

    it('hides home button on home page even when prop is true', () => {
      (usePathname as jest.Mock).mockReturnValue('/');
      render(<Navigation showHomeButton />);
      expect(screen.queryByText('z')).not.toBeInTheDocument();
    });
  });

  describe('responsive behavior', () => {
    it('applies mobile styles correctly', () => {
      (usePathname as jest.Mock).mockReturnValue('/projects');
      render(<Navigation />);
      const nav = screen.getByRole('navigation', { name: 'Main navigation' });
      expect(nav.parentElement).toHaveClass('max-sm:px-4');
    });

    it('handles scroll behavior', () => {
      render(<Navigation />);
      const nav = screen.getAllByRole('navigation')[0];
      expect(nav).toHaveClass('translate-y-0', 'opacity-100', 'scale-100');
    });
  });

  describe('accessibility', () => {
    it('has proper ARIA labels', () => {
      render(<Navigation />);
      expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
      expect(screen.getByRole('menubar', { name: 'Main menu' })).toBeInTheDocument();
    });

    it('supports keyboard navigation', async () => {
      render(<Navigation />);
      const firstButton = screen.getByRole('button', { name: navItems[0].label });
      firstButton.focus();
      expect(firstButton).toHaveFocus();
    });
  });

  describe('blur background', () => {
    it('applies blur effect to navigation background', () => {
      render(<Navigation />);
      const container = screen.getByTestId('blur-background');
      expect(container).toBeInTheDocument();
    });
  });
});

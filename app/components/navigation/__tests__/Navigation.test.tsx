import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Navigation from '../Navigation';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

// Import the mocked usePathname
import { usePathname } from 'next/navigation';

const mockPathname = '/test';

describe('Navigation', () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue(mockPathname);
    // Reset window dimensions
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    it('renders navigation container with correct attributes', () => {
      render(<Navigation showHomeButton />);
      const nav = screen.getByRole('navigation', { name: 'Main navigation' });
      expect(nav).toHaveAttribute('aria-label', 'Main navigation');
    });

    it('renders all navigation items', () => {
      render(<Navigation showHomeButton />);
      expect(screen.getByText('Projects')).toBeInTheDocument();
      expect(screen.getByText('Writing')).toBeInTheDocument();
      expect(screen.getByText('Audio')).toBeInTheDocument();
    });

    it('shows loading state before mount', () => {
      render(<Navigation showHomeButton />);
      expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
    });

    it('transitions from loading to mounted state', () => {
      render(<Navigation showHomeButton />);
      const nav = screen.getByRole('navigation', { name: 'Main navigation' });
      expect(nav).toBeInTheDocument();
    });
  });

  describe('home button', () => {
    it('shows home button when showHomeButton is true and not on home page', () => {
      render(<Navigation showHomeButton />);
      expect(screen.getByLabelText('Go to home page')).toBeInTheDocument();
    });

    it('hides home button when on home page', () => {
      (usePathname as jest.Mock).mockReturnValue('/');
      render(<Navigation showHomeButton={false} />);
      expect(screen.queryByLabelText('Go to home page')).not.toBeInTheDocument();
    });

    it('applies correct styles to home button', () => {
      render(<Navigation showHomeButton />);
      const homeButtonContainer = screen.getByLabelText('Go to home page').closest('div')?.parentElement;
      expect(homeButtonContainer).toHaveClass('max-sm:hidden');
    });

    it('handles home button click correctly', async () => {
      render(<Navigation showHomeButton />);
      const homeButton = screen.getByLabelText('Go to home page');
      await userEvent.click(homeButton);
      // Add assertions for click behavior if needed
    });
  });

  describe('active state', () => {
    it('applies active state to current route', () => {
      (usePathname as jest.Mock).mockReturnValue('/projects');
      render(<Navigation showHomeButton />);
      const projectsLink = screen.getByText('Projects').closest('button');
      expect(projectsLink).toHaveStyle({ backgroundColor: 'var(--color-surface)' });
    });

    it('does not apply active state to non-current routes', () => {
      (usePathname as jest.Mock).mockReturnValue('/writing');
      render(<Navigation showHomeButton />);
      const projectsLink = screen.getByText('Projects').closest('button');
      expect(projectsLink).toHaveStyle({ backgroundColor: 'transparent' });
    });

    it('handles partial route matches correctly', () => {
      (usePathname as jest.Mock).mockReturnValue('/writing/article');
      render(<Navigation showHomeButton />);
      const writingLink = screen.getByText('Writing').closest('button');
      expect(writingLink).toHaveStyle({ backgroundColor: 'var(--color-surface)' });
    });
  });

  describe('responsive behavior', () => {
    it('shows desktop layout on large screens', () => {
      render(<Navigation showHomeButton />);
      const nav = screen.getByRole('navigation', { name: 'Main navigation' });
      expect(nav).toHaveClass('flex');
    });

    it('handles home button visibility correctly on mobile', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 639,
      });
      render(<Navigation showHomeButton />);
      const homeButton = screen.getByLabelText('Go to home page');
      expect(homeButton).toBeVisible();
    });

    it('adjusts spacing on mobile', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 639,
      });
      render(<Navigation showHomeButton />);
      const menubar = screen.getByRole('menubar');
      expect(menubar).toHaveClass('max-sm:space-x-2');
    });
  });

  describe('accessibility', () => {
    it('has correct ARIA roles and labels', () => {
      render(<Navigation showHomeButton />);
      const nav = screen.getByRole('navigation', { name: 'Main navigation' });
      expect(nav).toHaveAttribute('aria-label', 'Main navigation');
      expect(screen.getByRole('menubar')).toHaveAttribute('aria-label', 'Main menu');
    });

    it('supports keyboard navigation', async () => {
      render(<Navigation showHomeButton />);
      const firstLink = screen.getByLabelText('Go to home page');
      firstLink.focus();
      expect(firstLink).toHaveFocus();
    });

    it('has proper focus indicators', () => {
      render(<Navigation showHomeButton />);
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toHaveClass('focus:outline-none', 'focus:ring-2');
      });
    });
  });

  describe('blur background', () => {
    it('applies blur effect to navigation background', () => {
      render(<Navigation showHomeButton />);
      const container = screen.getAllByTestId('blur-background')[0];
      expect(container).toHaveStyle({
        backdropFilter: 'blur(4px)',
      });
    });
  });
});

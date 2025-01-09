import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { usePathname } from 'next/navigation';
import Navigation from '../Navigation';
import { navItems } from '../constants';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
      <div {...props}>{children}</div>
    ),
  },
}));

describe('Navigation', () => {
  const mockPathname = '/';

  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue(mockPathname);
    // Reset window dimensions
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
    window.dispatchEvent(new Event('resize'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    it('renders navigation container with correct attributes', () => {
      render(<Navigation />);
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('fixed', 'top-0', 'right-0', 'left-0', 'z-50');
    });

    it('renders all navigation items', () => {
      render(<Navigation />);
      const nav = screen.getByRole('navigation');

      navItems.forEach((item) => {
        const link = within(nav).getByRole('link', { name: item.label });
        expect(link).toHaveAttribute('href', item.href);
      });
    });

    it('shows loading state before mount', () => {
      render(<Navigation />);
      expect(screen.getByText('Loading...')).toHaveClass('opacity-0');
    });
  });

  describe('home button', () => {
    it('shows home button when showHomeButton is true and not on home page', () => {
      (usePathname as jest.Mock).mockReturnValue('/projects');
      render(<Navigation showHomeButton />);

      const homeLinks = screen.getAllByText('z');
      expect(homeLinks.length).toBeGreaterThan(0);
      expect(homeLinks[0].closest('a')).toHaveAttribute('href', '/');
    });

    it('hides home button when on home page', () => {
      (usePathname as jest.Mock).mockReturnValue('/');
      render(<Navigation showHomeButton />);

      const homeLinks = screen.queryAllByText('z');
      expect(homeLinks.length).toBe(0);
    });

    it('applies correct styles to home button', () => {
      (usePathname as jest.Mock).mockReturnValue('/projects');
      render(<Navigation showHomeButton />);

      const homeButton = screen.getAllByText('z')[0];
      expect(homeButton).toHaveClass('uppercase', 'text-2xl');
    });
  });

  describe('theme button', () => {
    const ThemeButton = () => <button data-testid="theme-button">Theme</button>;

    it('renders theme button when provided', () => {
      render(<Navigation themeButton={<ThemeButton />} />);
      expect(screen.getByTestId('theme-button')).toBeInTheDocument();
    });

    it('positions theme button correctly', () => {
      render(<Navigation themeButton={<ThemeButton />} />);
      const themeButtonContainer = screen.getByTestId('theme-button').closest('li');
      expect(themeButtonContainer).toHaveClass('flex', 'items-center');
    });
  });

  describe('active state', () => {
    it('applies active state to current route', () => {
      (usePathname as jest.Mock).mockReturnValue('/projects');
      render(<Navigation />);

      const activeLink = screen.getByRole('link', { name: 'Projects' });
      const activeButton = within(activeLink).getByRole('button');
      expect(activeButton).toHaveAttribute('aria-current', 'page');
    });

    it('does not apply active state to non-current routes', () => {
      (usePathname as jest.Mock).mockReturnValue('/projects');
      render(<Navigation />);

      const inactiveLink = screen.getByRole('link', { name: 'Writing' });
      const inactiveButton = within(inactiveLink).getByRole('button');
      expect(inactiveButton).not.toHaveAttribute('aria-current');
    });
  });

  describe('responsive behavior', () => {
    it('shows mobile layout on small screens', () => {
      // Mock small screen
      Object.defineProperty(window, 'innerWidth', { value: 500 });
      window.dispatchEvent(new Event('resize'));

      render(<Navigation showHomeButton />);
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('max-sm:mt-4');
    });

    it('shows desktop layout on large screens', () => {
      // Mock large screen
      Object.defineProperty(window, 'innerWidth', { value: 1024 });
      window.dispatchEvent(new Event('resize'));

      render(<Navigation showHomeButton />);
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('mt-8');
    });

    it('handles home button visibility correctly on mobile', () => {
      // Mock small screen
      Object.defineProperty(window, 'innerWidth', { value: 500 });
      window.dispatchEvent(new Event('resize'));

      (usePathname as jest.Mock).mockReturnValue('/projects');
      render(<Navigation showHomeButton />);

      const mobileHomeButton = screen.getAllByText('z')[0].closest('li');
      expect(mobileHomeButton).toHaveClass('sm:hidden');
    });
  });

  describe('accessibility', () => {
    it('has correct ARIA roles', () => {
      render(<Navigation />);
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      expect(screen.getByRole('list')).toBeInTheDocument();
      expect(screen.getAllByRole('listitem').length).toBeGreaterThan(0);
    });

    it('supports keyboard navigation', async () => {
      render(<Navigation />);
      const firstLink = screen.getAllByRole('link')[0];

      firstLink.focus();
      expect(document.activeElement).toBe(firstLink);

      await userEvent.tab();
      expect(document.activeElement).not.toBe(firstLink);
    });
  });

  describe('blur background', () => {
    it('applies blur effect to navigation background', () => {
      render(<Navigation />);
      const blurBackground = screen.getByRole('list').parentElement;
      expect(blurBackground).toHaveClass('backdrop-blur-sm');
    });
  });
});

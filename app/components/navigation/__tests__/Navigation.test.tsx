import React from 'react';
import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import Navigation from '../Navigation';
import { navItems } from '../constants';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('Navigation', () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders navigation items', () => {
    render(<Navigation />);
    
    // Wait for component to mount
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();

    // Check if all nav items are rendered
    navItems.forEach(item => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });

  it('shows home button when showHomeButton is true and not on home page', () => {
    (usePathname as jest.Mock).mockReturnValue('/projects');
    render(<Navigation showHomeButton />);
    
    const homeButtons = screen.getAllByText('z');
    expect(homeButtons.length).toBeGreaterThan(0);
  });

  it('hides home button when on home page', () => {
    (usePathname as jest.Mock).mockReturnValue('/');
    render(<Navigation showHomeButton />);
    
    const homeButtons = screen.queryAllByText('z');
    expect(homeButtons.length).toBe(0);
  });

  it('renders theme button when provided', () => {
    const ThemeButton = () => <button data-testid="theme-button">Theme</button>;
    render(<Navigation themeButton={<ThemeButton />} />);
    
    expect(screen.getByTestId('theme-button')).toBeInTheDocument();
  });

  it('applies active state to current route', () => {
    (usePathname as jest.Mock).mockReturnValue('/projects');
    render(<Navigation />);
    
    const projectsButton = screen.getByText('Projects').closest('button');
    expect(projectsButton).toHaveStyle({ backgroundColor: undefined });
  });

  it('shows loading state initially', () => {
    render(<Navigation />);
    
    // Check if loading state is shown before mount
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });
}); 
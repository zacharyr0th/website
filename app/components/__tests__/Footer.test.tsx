import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Footer from '../Footer';
import { SOCIAL_LINKS } from '../../lib/social';

// Mock window.open
const mockOpen = jest.fn();
window.open = mockOpen;

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
    p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => <p {...props}>{children}</p>,
  },
  useInView: () => true,
}));

describe('Footer', () => {
  beforeEach(() => {
    mockOpen.mockClear();
  });

  it('renders without crashing', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('displays the current year', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument();
  });

  it('renders all social links', () => {
    render(<Footer />);
    expect(screen.getByLabelText(SOCIAL_LINKS.twitter.label)).toBeInTheDocument();
    expect(screen.getByLabelText(SOCIAL_LINKS.linkedin.label)).toBeInTheDocument();
    expect(screen.getByLabelText(SOCIAL_LINKS.github.label)).toBeInTheDocument();
  });

  it('opens social links in new tab when clicked', () => {
    render(<Footer />);
    
    // Test Twitter link
    fireEvent.click(screen.getByLabelText(SOCIAL_LINKS.twitter.label));
    expect(mockOpen).toHaveBeenCalledWith(
      SOCIAL_LINKS.twitter.url,
      '_blank',
      'noopener,noreferrer'
    );

    // Test LinkedIn link
    fireEvent.click(screen.getByLabelText(SOCIAL_LINKS.linkedin.label));
    expect(mockOpen).toHaveBeenCalledWith(
      SOCIAL_LINKS.linkedin.url,
      '_blank',
      'noopener,noreferrer'
    );

    // Test GitHub link
    fireEvent.click(screen.getByLabelText(SOCIAL_LINKS.github.label));
    expect(mockOpen).toHaveBeenCalledWith(
      SOCIAL_LINKS.github.url,
      '_blank',
      'noopener,noreferrer'
    );
  });

  it('has proper accessibility attributes', () => {
    render(<Footer />);
    const socialButtons = screen.getAllByRole('button');
    
    socialButtons.forEach(button => {
      expect(button).toHaveAttribute('aria-label');
    });
  });

  it('applies correct CSS classes', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass('bg-background');
    
    const socialButtons = screen.getAllByRole('button');
    socialButtons.forEach(button => {
      expect(button).toHaveClass('text-text-secondary');
    });
  });
}); 
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Hero from '../Hero';
import { heroContent } from '../constants';

// Mock next/image
jest.mock('next/image', () => {
  return function MockImage({ src, alt, className }: any) {
    return <img src={src} alt={alt} className={className} />;
  };
});

// Mock next/link
jest.mock('next/link', () => {
  return function MockLink({ children, href }: any) {
    return <a href={href}>{children}</a>;
  };
});

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, style }: any) => (
      <div className={className} style={style}>{children}</div>
    ),
    h1: ({ children, className }: any) => <h1 className={className}>{children}</h1>,
    h2: ({ children, className }: any) => <h2 className={className}>{children}</h2>,
    p: ({ children, className }: any) => <p className={className}>{children}</p>,
    section: ({ children, className }: any) => <section className={className}>{children}</section>,
  },
  useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
  useTransform: () => 0,
  useInView: () => true,
  AnimatePresence: ({ children }: any) => children,
}));

// Mock background SVG
jest.mock('../backgrounds/HeroBackground', () => {
  return function MockBackground() {
    return <div data-testid="hero-background" />;
  };
});

describe('Hero', () => {
  beforeEach(() => {
    // Mock window.dispatchEvent
    window.dispatchEvent = jest.fn();
  });

  it('renders without crashing', () => {
    render(<Hero />);
    expect(screen.getByText(heroContent.name)).toBeInTheDocument();
  });

  it('renders sticky header with correct content', () => {
    render(<Hero />);
    expect(screen.getByText(heroContent.name)).toBeInTheDocument();
    expect(screen.getByText(/Connect/)).toBeInTheDocument();
    expect(screen.getByText(/Bio/)).toBeInTheDocument();
  });

  it('renders chain logos', () => {
    render(<Hero />);
    heroContent.chainLogos.forEach(logo => {
      const altText = `${logo.charAt(0).toUpperCase() + logo.slice(1)} Logo`;
      expect(screen.getByAltText(altText)).toBeInTheDocument();
    });
  });

  it('renders all content sections', () => {
    render(<Hero />);
    heroContent.sections.forEach(section => {
      expect(screen.getByText(section.title)).toBeInTheDocument();
      expect(screen.getByText(section.content as string)).toBeInTheDocument();
    });
  });

  it('dispatches openConnectModal event when Connect button is clicked', () => {
    render(<Hero />);
    fireEvent.click(screen.getByText('Connect'));
    expect(window.dispatchEvent).toHaveBeenCalledWith(
      expect.any(CustomEvent)
    );
  });

  it('renders Aptos Labs link with correct attributes', () => {
    render(<Hero />);
    const aptosLink = screen.getByText('Aptos Labs');
    expect(aptosLink).toHaveAttribute('href', heroContent.aptosLink);
    expect(aptosLink).toHaveAttribute('target', '_blank');
    expect(aptosLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders Bio link with correct href', () => {
    render(<Hero />);
    const bioLink = screen.getByText('Bio').closest('a');
    expect(bioLink).toHaveAttribute('href', '/bio');
  });

  it('applies correct CSS classes', () => {
    render(<Hero />);
    
    // Check main section classes
    const mainSection = screen.getByRole('region');
    expect(mainSection).toHaveClass('relative', 'min-h-[200vh]');

    // Check header classes
    const header = screen.getByText(heroContent.name);
    expect(header).toHaveClass(
      'text-4xl',
      'sm:text-6xl',
      'font-normal',
      'leading-tight',
      'tracking-tight',
      'text-text-primary',
      'mb-4'
    );

    // Check background element
    expect(screen.getByTestId('hero-background')).toBeInTheDocument();
  });

  describe('ChainLogo component', () => {
    it('renders each chain logo with correct image attributes', () => {
      render(<Hero />);
      heroContent.chainLogos.forEach(logo => {
        const img = screen.getByAltText(`${logo.charAt(0).toUpperCase() + logo.slice(1)} Logo`);
        expect(img).toHaveAttribute('src', `/logos/${logo}-logo.webp`);
        expect(img.parentElement).toHaveClass(
          'chain-logo',
          'w-12',
          'h-12',
          'rounded-full'
        );
      });
    });
  });

  describe('ContentSection component', () => {
    it('renders each section with correct structure', () => {
      render(<Hero />);
      heroContent.sections.forEach(section => {
        const title = screen.getByText(section.title);
        expect(title.tagName).toBe('H2');
        expect(title).toHaveClass(
          'text-2xl',
          'font-bold',
          'mb-4',
          'text-text-primary',
          'tracking-tight'
        );

        const content = screen.getByText(section.content as string);
        expect(content).toHaveClass(
          'text-base',
          'max-w-xl',
          'leading-relaxed',
          'mb-6',
          'text-text-secondary'
        );
      });
    });
  });

  describe('Accessibility', () => {
    it('maintains proper heading hierarchy', () => {
      render(<Hero />);
      const h1 = screen.getByRole('heading', { level: 1 });
      const h2s = screen.getAllByRole('heading', { level: 2 });
      
      expect(h1).toHaveTextContent(heroContent.name);
      expect(h2s).toHaveLength(heroContent.sections.length);
    });

    it('provides proper link text', () => {
      render(<Hero />);
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).not.toHaveTextContent(/click here/i);
        expect(link).toHaveAccessibleName();
      });
    });
  });
}); 
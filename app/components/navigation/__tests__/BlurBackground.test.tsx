import React from 'react';
import { render, screen } from '@testing-library/react';
import BlurBackground from '../BlurBackground';

// Mock ResizeObserver and elementsFromPoint
const mockDisconnect = jest.fn();
const mockObserve = jest.fn();
const mockUnobserve = jest.fn();

beforeAll(() => {
  // Mock ResizeObserver
  (window as Window & typeof globalThis).ResizeObserver = class {
    constructor() {}
    disconnect = mockDisconnect;
    observe = mockObserve;
    unobserve = mockUnobserve;
  };

  // Mock elementsFromPoint
  document.elementsFromPoint = jest.fn().mockReturnValue([]);
});

interface MotionDivProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, style, ...props }: MotionDivProps) => (
      <div data-testid="blur-background" className={className} style={style} {...props}>
        {children}
      </div>
    ),
  },
}));

describe('BlurBackground', () => {
  describe('rendering', () => {
    it('renders children correctly', () => {
      render(<BlurBackground>Test content</BlurBackground>);
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      render(<BlurBackground className="custom-class">Test content</BlurBackground>);
      const container = screen.getByTestId('blur-background');
      expect(container.className).toContain('custom-class');
    });

    it('renders with default styles', () => {
      render(<BlurBackground>Test content</BlurBackground>);
      const container = screen.getByTestId('blur-background');
      const classes = container.className.split(' ');
      expect(classes).toEqual(
        expect.arrayContaining([
          'rounded-3xl',
          'px-4',
          'pt-4',
          'flex',
          'items-center',
          'justify-center',
          'text-center',
        ])
      );
    });
  });

  describe('accessibility', () => {
    it('maintains content visibility', () => {
      render(<BlurBackground>Test content</BlurBackground>);
      expect(screen.getByText('Test content')).toBeVisible();
    });

    it('preserves semantic structure', () => {
      render(
        <BlurBackground>
          <button>Click me</button>
        </BlurBackground>
      );
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('background behavior', () => {
    it('applies initial background styles', () => {
      render(<BlurBackground>Test content</BlurBackground>);
      const container = screen.getByTestId('blur-background');
      expect(container).toHaveStyle({
        backgroundColor: 'rgb(var(--background) / 0.1)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        position: 'relative',
        zIndex: '1',
      });
    });
  });
});

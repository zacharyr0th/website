import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
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
          'flex',
          'items-center',
          'justify-center',
          'text-center',
        ])
      );
    });

    it('handles nested components correctly', () => {
      render(
        <BlurBackground>
          <div data-testid="child-div">
            <span>Nested content</span>
          </div>
        </BlurBackground>
      );
      expect(screen.getByTestId('child-div')).toBeInTheDocument();
      expect(screen.getByText('Nested content')).toBeInTheDocument();
    });

    it('preserves custom styles passed through props', () => {
      const customStyle = { marginTop: '20px', color: 'red' };
      render(
        <BlurBackground style={customStyle}>Test content</BlurBackground>
      );
      const container = screen.getByTestId('blur-background');
      expect(container).toHaveStyle(customStyle);
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

    it('forwards ARIA attributes', () => {
      render(
        <BlurBackground aria-label="test label" role="region">
          Content
        </BlurBackground>
      );
      const container = screen.getByTestId('blur-background');
      expect(container).toHaveAttribute('aria-label', 'test label');
      expect(container).toHaveAttribute('role', 'region');
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

    it('handles special class combinations correctly', () => {
      render(
        <BlurBackground className="w-10 h-10">
          Test content
        </BlurBackground>
      );
      const container = screen.getByTestId('blur-background');
      expect(container).toHaveStyle({
        aspectRatio: '1 / 1',
      });
    });

    it('handles p-0 class correctly', () => {
      render(
        <BlurBackground className="p-0">
          Test content
        </BlurBackground>
      );
      const container = screen.getByTestId('blur-background');
      expect(container).toHaveStyle({
        padding: '0',
      });
    });
  });

  describe('dynamic behavior', () => {
    it('updates background when elements underneath change', () => {
      render(<BlurBackground>Test content</BlurBackground>);
      const container = screen.getByTestId('blur-background');
      
      // Simulate elements underneath by mocking elementsFromPoint
      (document.elementsFromPoint as jest.Mock).mockReturnValueOnce([
        container,
        document.createElement('div'),
        document.createElement('div'),
      ]);

      // Trigger mutation observer
      const mutationCallback = (mockObserve as jest.Mock).mock.calls[0][1];
      mutationCallback([{ type: 'childList' }]);

      expect(container).toHaveStyle({
        backgroundColor: 'rgb(var(--background) / 0.95)',
      });
    });

    it('cleans up observers on unmount', () => {
      const { unmount } = render(<BlurBackground>Test content</BlurBackground>);
      unmount();
      expect(mockDisconnect).toHaveBeenCalled();
    });

    it('handles resize events', () => {
      render(<BlurBackground>Test content</BlurBackground>);
      
      // Verify resize observer was set up
      expect(mockObserve).toHaveBeenCalled();
      
      // Trigger resize observer callback
      const resizeCallback = (mockObserve as jest.Mock).mock.calls[0][0];
      resizeCallback([{ contentRect: { width: 100, height: 100 } }]);
      
      // Verify background check was performed
      expect(document.elementsFromPoint).toHaveBeenCalled();
    });
  });
});

import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import BlurBackground from '../BlurBackground';

// Extend Window interface
declare global {
  interface Window {
    elementsFromPoint(x: number, y: number): Element[];
  }
}

// Mock ResizeObserver
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Mock MutationObserver
class MutationObserverMock {
  observe() {}
  disconnect() {}
}

beforeAll(() => {
  window.ResizeObserver = ResizeObserverMock;
  window.MutationObserver = MutationObserverMock as any;
  window.elementsFromPoint = jest.fn().mockReturnValue([]);
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
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(
      <BlurBackground>
        <div>Test content</div>
      </BlurBackground>
    );
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies default styles', () => {
    render(
      <BlurBackground>
        <div>Test content</div>
      </BlurBackground>
    );
    const container = screen.getByText('Test content').parentElement;
    expect(container).toHaveStyle({
      position: 'relative',
      zIndex: 1,
      minHeight: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    });
  });

  it('accepts custom className', () => {
    const customClass = 'custom-class';
    render(
      <BlurBackground className={customClass}>
        <div>Test content</div>
      </BlurBackground>
    );
    const container = screen.getByText('Test content').parentElement;
    expect(container).toHaveClass(customClass);
  });

  it('accepts custom intensity', () => {
    const intensity = 0.5;
    render(
      <BlurBackground intensity={intensity}>
        <div>Test content</div>
      </BlurBackground>
    );
    // The intensity affects the blur effect, which is handled by the component's internal logic
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('forwards additional props', () => {
    render(
      <BlurBackground data-testid="blur-bg" aria-label="Background">
        <div>Test content</div>
      </BlurBackground>
    );
    const container = screen.getByTestId('blur-bg');
    expect(container).toHaveAttribute('aria-label', 'Background');
  });

  describe('Background Detection', () => {
    beforeEach(() => {
      // Mock getBoundingClientRect
      Element.prototype.getBoundingClientRect = jest.fn().mockReturnValue({
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        top: 0,
        right: 100,
        bottom: 100,
        left: 0,
      });
    });

    it('detects elements underneath', () => {
      const mockElements = [
        document.createElement('div'),
        document.createElement('div'),
      ];
      window.elementsFromPoint = jest.fn().mockReturnValue(mockElements);

      render(
        <BlurBackground>
          <div>Test content</div>
        </BlurBackground>
      );

      act(() => {
        // Trigger a resize to force background check
        window.dispatchEvent(new Event('resize'));
      });

      expect(window.elementsFromPoint).toHaveBeenCalled();
    });

    it('handles empty space underneath', () => {
      window.elementsFromPoint = jest.fn().mockReturnValue([]);

      render(
        <BlurBackground>
          <div>Test content</div>
        </BlurBackground>
      );

      act(() => {
        window.dispatchEvent(new Event('resize'));
      });

      expect(window.elementsFromPoint).toHaveBeenCalled();
    });
  });

  describe('Cleanup', () => {
    it('disconnects observers on unmount', () => {
      const disconnectMock = jest.fn();
      ResizeObserverMock.prototype.disconnect = disconnectMock;
      MutationObserverMock.prototype.disconnect = disconnectMock;

      const { unmount } = render(
        <BlurBackground>
          <div>Test content</div>
        </BlurBackground>
      );

      unmount();
      expect(disconnectMock).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('preserves child element roles', () => {
      render(
        <BlurBackground>
          <button>Click me</button>
        </BlurBackground>
      );
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('maintains focus management', () => {
      render(
        <BlurBackground>
          <button>Click me</button>
        </BlurBackground>
      );
      const button = screen.getByRole('button');
      button.focus();
      expect(button).toHaveFocus();
    });
  });
});

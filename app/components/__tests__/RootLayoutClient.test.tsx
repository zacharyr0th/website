import React from 'react';
import { render, screen } from '@testing-library/react';
import RootLayoutClient from '../RootLayoutClient';

// Mock next/font/google
jest.mock('next/font/google', () => ({
  Inter: () => ({
    variable: 'mock-inter',
    subsets: ['latin'],
    display: 'swap',
    preload: true,
    fallback: ['system-ui', 'arial'],
  }),
  JetBrains_Mono: () => ({
    variable: 'mock-mono',
    subsets: ['latin'],
    display: 'swap',
    preload: true,
    fallback: ['monospace'],
  }),
}));

// Mock next/script
jest.mock('next/script', () => {
  return function MockScript({ children }: { children?: React.ReactNode }) {
    return <div data-testid="mock-script">{children}</div>;
  };
});

// Mock @vercel/analytics/react
jest.mock('@vercel/analytics/react', () => ({
  Analytics: () => <div data-testid="mock-analytics" />,
}));

// Mock lazy loaded Navigation component
jest.mock('../navigation/Navigation', () => {
  return function MockNavigation() {
    return <nav data-testid="mock-navigation">Navigation</nav>;
  };
});

// Mock other components
jest.mock('../Footer', () => {
  return function MockFooter() {
    return <footer data-testid="mock-footer">Footer</footer>;
  };
});

jest.mock('../KeyboardShortcuts', () => {
  return function MockKeyboardShortcuts() {
    return <div data-testid="mock-keyboard-shortcuts">Keyboard Shortcuts</div>;
  };
});

jest.mock('../misc/GlobalConnectModal', () => {
  return function MockGlobalConnectModal() {
    return <div data-testid="mock-global-connect-modal">Global Connect Modal</div>;
  };
});

jest.mock('../ErrorBoundary', () => {
  return function MockErrorBoundary({ children }: { children: React.ReactNode }) {
    return <div data-testid="mock-error-boundary">{children}</div>;
  };
});

// Mock process.env
const originalEnv = process.env;
beforeAll(() => {
  process.env = {
    ...originalEnv,
    NEXT_PUBLIC_GA_ID: 'test-ga-id',
  };
});

afterAll(() => {
  process.env = originalEnv;
});

describe('RootLayoutClient', () => {
  it('renders all components correctly', () => {
    render(
      <RootLayoutClient>
        <div>Test Content</div>
      </RootLayoutClient>
    );

    // Check if all components are rendered
    expect(screen.getByTestId('mock-analytics')).toBeInTheDocument();
    expect(screen.getByTestId('mock-error-boundary')).toBeInTheDocument();
    expect(screen.getByTestId('mock-keyboard-shortcuts')).toBeInTheDocument();
    expect(screen.getByTestId('mock-global-connect-modal')).toBeInTheDocument();
    expect(screen.getByTestId('mock-navigation')).toBeInTheDocument();
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders Google Analytics scripts', () => {
    render(
      <RootLayoutClient>
        <div>Test Content</div>
      </RootLayoutClient>
    );

    const scripts = screen.getAllByTestId('mock-script');
    expect(scripts).toHaveLength(2);

    // Check if GA config script contains correct ID
    const configScript = scripts[1];
    expect(configScript.textContent).toContain('test-ga-id');
  });

  it('applies font variables to root div', () => {
    render(
      <RootLayoutClient>
        <div>Test Content</div>
      </RootLayoutClient>
    );

    const rootDiv = screen.getByText('Test Content').parentElement?.parentElement;
    expect(rootDiv).toHaveClass('mock-inter mock-mono');
  });

  it('applies correct CSS classes to main content wrapper', () => {
    render(
      <RootLayoutClient>
        <div>Test Content</div>
      </RootLayoutClient>
    );

    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveClass(
      'relative',
      'flex',
      'min-h-screen',
      'flex-col',
      'max-w-[100vw]',
      'overflow-x-hidden'
    );
  });

  it('applies correct CSS classes to background wrapper', () => {
    render(
      <RootLayoutClient>
        <div>Test Content</div>
      </RootLayoutClient>
    );

    const bgWrapper = screen.getByTestId('mock-error-boundary').parentElement;
    expect(bgWrapper).toHaveClass(
      'min-h-screen',
      'bg-background',
      'antialiased',
      'overflow-x-hidden',
      'selection:bg-accent/10'
    );
  });
});

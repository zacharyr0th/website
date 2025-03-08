import React from 'react';
import { render } from '@testing-library/react';
import { useRouter, usePathname } from 'next/navigation';
import KeyboardShortcuts from '../KeyboardShortcuts';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

describe('KeyboardShortcuts', () => {
  const mockPush = jest.fn();
  const mockDispatchEvent = jest.fn();
  const originalDispatchEvent = window.dispatchEvent;

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (usePathname as jest.Mock).mockReturnValue('/test');
    window.dispatchEvent = mockDispatchEvent;
  });

  afterEach(() => {
    jest.clearAllMocks();
    window.dispatchEvent = originalDispatchEvent;
  });

  it('navigates to writing page on Cmd+Ctrl+W', () => {
    render(<KeyboardShortcuts />);

    const event = new KeyboardEvent('keydown', {
      key: 'w',
      metaKey: true,
      ctrlKey: true,
      bubbles: true,
    });
    document.dispatchEvent(event);

    expect(mockPush).toHaveBeenCalledWith('/writing');
  });

  it('navigates to projects page on Cmd+Shift+P', () => {
    render(<KeyboardShortcuts />);

    const event = new KeyboardEvent('keydown', {
      key: 'p',
      metaKey: true,
      shiftKey: true,
      bubbles: true,
    });
    document.dispatchEvent(event);

    expect(mockPush).toHaveBeenCalledWith('/projects');
  });

  it('opens connect modal on Cmd+Shift+C', () => {
    render(<KeyboardShortcuts />);

    const event = new KeyboardEvent('keydown', {
      key: 'c',
      metaKey: true,
      shiftKey: true,
      bubbles: true,
    });
    document.dispatchEvent(event);

    expect(mockDispatchEvent).toHaveBeenCalled();
    const customEvent = mockDispatchEvent.mock.calls[0][0];
    expect(customEvent instanceof CustomEvent).toBe(true);
    expect(customEvent.type).toBe('openConnectModal');
  });

  it('navigates to home page on Cmd+Shift+Z when not on home page', () => {
    (usePathname as jest.Mock).mockReturnValue('/other');
    render(<KeyboardShortcuts />);

    const event = new KeyboardEvent('keydown', {
      key: 'z',
      metaKey: true,
      shiftKey: true,
      bubbles: true,
    });
    document.dispatchEvent(event);

    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('does not navigate on Cmd+Shift+Z when already on home page', () => {
    (usePathname as jest.Mock).mockReturnValue('/');
    render(<KeyboardShortcuts />);

    const event = new KeyboardEvent('keydown', {
      key: 'z',
      metaKey: true,
      shiftKey: true,
      bubbles: true,
    });
    document.dispatchEvent(event);

    expect(mockPush).not.toHaveBeenCalled();
  });
});

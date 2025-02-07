import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ConnectModal from '../ConnectModal';
import { SOCIAL_LINKS, type SocialLink } from '../../../lib/social';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => children,
}));

// Mock react-icons
jest.mock('react-icons/fa6', () => ({
  FaXmark: () => <span>×</span>,
}));

// Mock ErrorBoundary to simulate error
jest.mock('react-error-boundary', () => ({
  ErrorBoundary: ({ FallbackComponent, onReset }: { 
    FallbackComponent: React.ComponentType<{ error: Error; resetErrorBoundary: () => void }>;
    onReset: () => void;
  }) => (
    <FallbackComponent error={new Error('Test error')} resetErrorBoundary={onReset} />
  ),
}));

describe('ConnectModal', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
    document.body.style.overflow = '';
  });

  it('renders nothing when closed', () => {
    render(<ConnectModal isOpen={false} onClose={mockOnClose} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders modal content when open', () => {
    render(<ConnectModal isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('renders social links correctly', () => {
    render(<ConnectModal isOpen={true} onClose={mockOnClose} />);
    
    const activeLinks = Object.values(SOCIAL_LINKS).filter(
      (link: SocialLink) => link.active && link.platform !== 'GitHub'
    );
    
    activeLinks.forEach((link: SocialLink) => {
      const button = screen.getByLabelText(`Connect on ${link.platform}`);
      expect(button).toBeInTheDocument();
    });
  });

  it('closes on close button click', () => {
    render(<ConnectModal isOpen={true} onClose={mockOnClose} />);
    const closeButton = screen.getByLabelText('Close modal');
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('closes on escape key press', () => {
    render(<ConnectModal isOpen={true} onClose={mockOnClose} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('closes on outside click', () => {
    render(<ConnectModal isOpen={true} onClose={mockOnClose} />);
    const overlay = screen.getByRole('presentation');
    fireEvent.mouseDown(overlay);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('does not close on modal content click', () => {
    render(<ConnectModal isOpen={true} onClose={mockOnClose} />);
    const dialog = screen.getByRole('dialog');
    fireEvent.mouseDown(dialog);
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('manages body scroll correctly', () => {
    const { unmount } = render(<ConnectModal isOpen={true} onClose={mockOnClose} />);
    expect(document.body.style.overflow).toBe('hidden');
    
    unmount();
    expect(document.body.style.overflow).toBe('');
  });

  it('focuses close button on open', () => {
    render(<ConnectModal isOpen={true} onClose={mockOnClose} />);
    const closeButton = screen.getByLabelText('Close modal');
    expect(closeButton).toHaveFocus();
  });

  describe('Error Boundary', () => {
    it('renders error fallback when error occurs', () => {
      render(<ConnectModal isOpen={true} onClose={mockOnClose} />);
      expect(screen.getByText('Something went wrong:')).toBeInTheDocument();
      expect(screen.getByText(/Test error/)).toBeInTheDocument();
    });

    it('calls onClose when error boundary retry button is clicked', () => {
      render(<ConnectModal isOpen={true} onClose={mockOnClose} />);
      const retryButton = screen.getByText('Try again');
      fireEvent.click(retryButton);
      expect(mockOnClose).toHaveBeenCalled();
    });
  });
}); 
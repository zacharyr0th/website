import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import GlobalConnectModal from '../GlobalConnectModal';

// Mock next/dynamic
jest.mock('next/dynamic', () => () => {
  const DynamicComponent = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
    isOpen ? (
      <div data-testid="mock-connect-modal" role="dialog">
        <button onClick={onClose}>Close</button>
      </div>
    ) : null
  );
  return DynamicComponent;
});

describe('GlobalConnectModal', () => {
  beforeEach(() => {
    // Clear any previous event listeners
    window.removeEventListener('openConnectModal', () => {});
  });

  it('renders without crashing', () => {
    render(<GlobalConnectModal />);
    expect(screen.queryByTestId('mock-connect-modal')).not.toBeInTheDocument();
  });

  it('renders modal when defaultOpen is true', () => {
    render(<GlobalConnectModal defaultOpen={true} />);
    expect(screen.getByTestId('mock-connect-modal')).toBeInTheDocument();
  });

  it('opens modal on custom event', () => {
    render(<GlobalConnectModal />);
    expect(screen.queryByTestId('mock-connect-modal')).not.toBeInTheDocument();

    act(() => {
      window.dispatchEvent(new Event('openConnectModal'));
    });

    expect(screen.getByTestId('mock-connect-modal')).toBeInTheDocument();
  });

  it('closes modal when close button is clicked', () => {
    render(<GlobalConnectModal defaultOpen={true} />);
    expect(screen.getByTestId('mock-connect-modal')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Close'));
    expect(screen.queryByTestId('mock-connect-modal')).not.toBeInTheDocument();
  });

  describe('Error Boundary', () => {
    beforeEach(() => {
      jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      (console.error as jest.Mock).mockRestore();
    });

    it('renders error fallback when error occurs', () => {
      const ThrowError = () => {
        throw new Error('Test error');
      };

      render(
        <GlobalConnectModal>
          <ThrowError />
        </GlobalConnectModal>
      );

      expect(screen.getByText('Error loading connect modal:')).toBeInTheDocument();
      expect(screen.getByText('Test error')).toBeInTheDocument();
    });

    it('shows retry button in error state', () => {
      const ThrowError = () => {
        throw new Error('Test error');
      };

      render(
        <GlobalConnectModal>
          <ThrowError />
        </GlobalConnectModal>
      );

      expect(screen.getByText('Retry')).toBeInTheDocument();
    });

    it('retries when retry button is clicked', () => {
      let shouldThrow = true;
      const MaybeThrow = () => {
        if (shouldThrow) {
          throw new Error('Test error');
        }
        return null;
      };

      render(
        <GlobalConnectModal>
          <MaybeThrow />
        </GlobalConnectModal>
      );

      expect(screen.getByText('Error loading connect modal:')).toBeInTheDocument();

      // Simulate fixing the error
      shouldThrow = false;

      // Click retry
      fireEvent.click(screen.getByText('Retry'));

      // Error boundary should be cleared
      expect(screen.queryByText('Error loading connect modal:')).not.toBeInTheDocument();
    });
  });

  it('applies correct CSS classes to error fallback', () => {
    const ThrowError = () => {
      throw new Error('Test error');
    };

    render(
      <GlobalConnectModal>
        <ThrowError />
      </GlobalConnectModal>
    );

    const errorAlert = screen.getByRole('alert');
    expect(errorAlert).toHaveClass(
      'fixed',
      'bottom-4',
      'right-4',
      'bg-red-500',
      'text-white',
      'p-4',
      'rounded-lg',
      'shadow-lg'
    );

    const retryButton = screen.getByText('Retry');
    expect(retryButton).toHaveClass(
      'mt-2',
      'px-4',
      'py-1',
      'bg-white',
      'text-red-500',
      'rounded',
      'hover:bg-red-50',
      'transition-colors'
    );
  });

  it('cleans up event listener on unmount', () => {
    const { unmount } = render(<GlobalConnectModal />);
    
    // Add spy after render to not interfere with the component's listener
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    
    unmount();
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'openConnectModal',
      expect.any(Function)
    );
    
    removeEventListenerSpy.mockRestore();
  });
}); 
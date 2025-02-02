import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { ActionButton } from '../ActionButton';

// Mock LoadingSpinner
jest.mock('../../../lib/Loading', () => ({
  LoadingSpinner: () => <div data-testid="loading-spinner">Loading...</div>,
}));

describe('ActionButton', () => {
  it('renders with default props', () => {
    render(<ActionButton>Click me</ActionButton>);
    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('px-6', 'py-2');
  });

  it('applies primary variant by default', () => {
    render(<ActionButton>Click me</ActionButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-primary', 'text-text-primary');
  });

  it('handles click events', async () => {
    const handleClick = jest.fn();
    render(<ActionButton onClick={handleClick}>Click me</ActionButton>);
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders with left icon', () => {
    const LeftIcon = () => <span data-testid="left-icon">←</span>;
    render(<ActionButton leftIcon={<LeftIcon />}>Click me</ActionButton>);
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('←Click me');
  });

  it('renders with right icon', () => {
    const RightIcon = () => <span data-testid="right-icon">→</span>;
    render(<ActionButton rightIcon={<RightIcon />}>Click me</ActionButton>);
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Click me→');
  });

  it('handles loading state', () => {
    render(<ActionButton isLoading>Click me</ActionButton>);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    const contentSpan = screen.getByText('Click me').closest('span');
    expect(contentSpan?.parentElement).toHaveClass('invisible');
  });

  it('applies custom className', () => {
    render(<ActionButton className="custom-class">Click me</ActionButton>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<ActionButton ref={ref}>Click me</ActionButton>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('forwards additional props', () => {
    render(
      <ActionButton data-testid="test-button" aria-label="Test button">
        Click me
      </ActionButton>
    );
    const button = screen.getByTestId('test-button');
    expect(button).toHaveAttribute('aria-label', 'Test button');
  });

  it('renders with both icons', () => {
    const LeftIcon = () => <span data-testid="left-icon">←</span>;
    const RightIcon = () => <span data-testid="right-icon">→</span>;
    render(
      <ActionButton leftIcon={<LeftIcon />} rightIcon={<RightIcon />}>
        Click me
      </ActionButton>
    );
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('←Click me→');
  });

  it('applies different variants', () => {
    const variants = ['primary', 'secondary', 'default', 'surface'] as const;
    variants.forEach(variant => {
      const { rerender } = render(<ActionButton variant={variant}>Click me</ActionButton>);
      const button = screen.getByRole('button');
      if (variant === 'primary') {
        expect(button).toHaveClass('bg-primary', 'text-text-primary');
      } else if (variant === 'secondary') {
        expect(button).toHaveClass('bg-surface', 'text-text-secondary', 'border-secondary');
      }
      rerender(<></>);
    });
  });
});

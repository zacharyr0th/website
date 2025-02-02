import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { NavButton } from '../NavButton';

// Mock LoadingSpinner
jest.mock('../../../lib/Loading', () => ({
  LoadingSpinner: () => <div data-testid="loading-spinner">Loading...</div>,
}));

describe('NavButton', () => {
  it('renders with default props', () => {
    render(<NavButton>Click me</NavButton>);
    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('interactive-button', 'h-8');
  });

  it('applies active styles', () => {
    render(<NavButton active>Click me</NavButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('shadow-sm');
  });

  it('handles click events', async () => {
    const handleClick = jest.fn();
    render(<NavButton onClick={handleClick}>Click me</NavButton>);
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders with left icon', () => {
    const LeftIcon = () => <span data-testid="left-icon">←</span>;
    render(<NavButton leftIcon={<LeftIcon />}>Click me</NavButton>);
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('←Click me');
  });

  it('renders with right icon', () => {
    const RightIcon = () => <span data-testid="right-icon">→</span>;
    render(<NavButton rightIcon={<RightIcon />}>Click me</NavButton>);
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Click me→');
  });

  it('handles loading state', () => {
    render(<NavButton isLoading>Click me</NavButton>);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    const contentSpan = screen.getByText('Click me').closest('span');
    expect(contentSpan?.parentElement).toHaveClass('invisible');
  });

  it('applies custom className', () => {
    render(<NavButton className="custom-class">Click me</NavButton>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('respects p-0 in className', () => {
    const { rerender } = render(<NavButton>Click me</NavButton>);
    let button = screen.getByRole('button');
    expect(button).toHaveClass('px-3');

    rerender(<NavButton className="p-0">Click me</NavButton>);
    button = screen.getByRole('button');
    expect(button).toHaveClass('p-0');
    // The px-3 class will still be present from BaseButton's default size classes
    // but it will be overridden by p-0 in the browser's CSS cascade
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<NavButton ref={ref}>Click me</NavButton>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('forwards additional props', () => {
    render(
      <NavButton data-testid="test-button" aria-label="Test button">
        Click me
      </NavButton>
    );
    const button = screen.getByTestId('test-button');
    expect(button).toHaveAttribute('aria-label', 'Test button');
  });

  it('renders with both icons', () => {
    const LeftIcon = () => <span data-testid="left-icon">←</span>;
    const RightIcon = () => <span data-testid="right-icon">→</span>;
    render(
      <NavButton leftIcon={<LeftIcon />} rightIcon={<RightIcon />}>
        Click me
      </NavButton>
    );
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('←Click me→');
  });
});

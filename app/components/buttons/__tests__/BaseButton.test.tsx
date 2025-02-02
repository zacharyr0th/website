import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BaseButton } from '../BaseButton';
import { BUTTON_CLASSES } from '../constants';

// Mock LoadingSpinner
jest.mock('../../../lib/Loading', () => ({
  LoadingSpinner: () => <div data-testid="loading-spinner">Loading...</div>,
}));

describe('BaseButton', () => {
  it('renders with default props', () => {
    render(<BaseButton>Click me</BaseButton>);
    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(BUTTON_CLASSES.base);
    expect(button).toHaveClass(BUTTON_CLASSES.size.md);
    expect(button).toHaveClass(BUTTON_CLASSES.variant.default);
  });

  it('applies custom className', () => {
    render(<BaseButton className="custom-class">Click me</BaseButton>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('handles disabled state', () => {
    render(<BaseButton disabled>Click me</BaseButton>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass(BUTTON_CLASSES.state.disabled);
  });

  it('handles loading state', () => {
    render(<BaseButton isLoading>Click me</BaseButton>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass(BUTTON_CLASSES.state.loading);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    expect(screen.getByText('Click me')).toHaveClass('invisible');
  });

  it('applies different sizes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg'] as const;
    sizes.forEach(size => {
      const { rerender } = render(<BaseButton size={size}>Click me</BaseButton>);
      expect(screen.getByRole('button')).toHaveClass(BUTTON_CLASSES.size[size]);
      rerender(<></>);
    });
  });

  it('applies different variants', () => {
    const variants = ['primary', 'secondary', 'default', 'surface'] as const;
    variants.forEach(variant => {
      const { rerender } = render(<BaseButton variant={variant}>Click me</BaseButton>);
      expect(screen.getByRole('button')).toHaveClass(BUTTON_CLASSES.variant[variant]);
      rerender(<></>);
    });
  });

  it('forwards additional props', () => {
    render(
      <BaseButton data-testid="test-button" aria-label="Test button">
        Click me
      </BaseButton>
    );
    const button = screen.getByTestId('test-button');
    expect(button).toHaveAttribute('aria-label', 'Test button');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<BaseButton ref={ref}>Click me</BaseButton>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('combines loading and disabled states correctly', () => {
    render(<BaseButton isLoading disabled>Click me</BaseButton>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass(BUTTON_CLASSES.state.loading);
    expect(button).toHaveClass(BUTTON_CLASSES.state.disabled);
  });
});

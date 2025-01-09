import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BaseButton } from '../BaseButton';
import { BUTTON_CLASSES } from '../constants';

describe('BaseButton', () => {
  it('renders children correctly', () => {
    render(<BaseButton>Click me</BaseButton>);
    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click me');
  });

  it('applies default classes', () => {
    render(<BaseButton>Click me</BaseButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      BUTTON_CLASSES.base,
      BUTTON_CLASSES.size.md,
      BUTTON_CLASSES.variant.default
    );
  });

  it('applies custom className', () => {
    render(<BaseButton className="custom-class">Click me</BaseButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
    expect(button).toHaveClass(BUTTON_CLASSES.base);
  });

  describe('disabled state', () => {
    it('can be disabled', () => {
      render(<BaseButton disabled>Click me</BaseButton>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveClass(BUTTON_CLASSES.state.disabled);
    });

    it('prevents click events when disabled', async () => {
      const handleClick = jest.fn();
      render(
        <BaseButton disabled onClick={handleClick}>
          Click me
        </BaseButton>
      );

      await userEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('loading state', () => {
    it('shows loading spinner and hides content', () => {
      render(<BaseButton isLoading>Click me</BaseButton>);
      const button = screen.getByRole('button');

      expect(button).toBeDisabled();
      expect(button).toHaveClass(BUTTON_CLASSES.state.loading);
      expect(screen.getByText('Click me')).toHaveClass('invisible');
      expect(document.querySelector('.absolute')).toBeInTheDocument();
    });

    it('prevents click events when loading', async () => {
      const handleClick = jest.fn();
      render(
        <BaseButton isLoading onClick={handleClick}>
          Click me
        </BaseButton>
      );

      await userEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('size variants', () => {
    it.each(['xs', 'sm', 'md', 'lg'] as const)('applies correct classes for size="%s"', (size) => {
      render(<BaseButton size={size}>Click me</BaseButton>);
      expect(screen.getByRole('button')).toHaveClass(BUTTON_CLASSES.size[size]);
    });
  });

  describe('button variants', () => {
    it.each(['primary', 'secondary', 'default', 'surface'] as const)(
      'applies correct classes for variant="%s"',
      (variant) => {
        render(<BaseButton variant={variant}>Click me</BaseButton>);
        expect(screen.getByRole('button')).toHaveClass(BUTTON_CLASSES.variant[variant]);
      }
    );
  });

  describe('interactions', () => {
    it('handles click events', async () => {
      const handleClick = jest.fn();
      render(<BaseButton onClick={handleClick}>Click me</BaseButton>);

      await userEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<BaseButton ref={ref}>Click me</BaseButton>);

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current).toBe(screen.getByRole('button'));
    });
  });

  describe('accessibility', () => {
    it('maintains button role', () => {
      render(<BaseButton>Click me</BaseButton>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('supports aria-label', () => {
      render(<BaseButton aria-label="Custom label">Click me</BaseButton>);
      expect(screen.getByLabelText('Custom label')).toBeInTheDocument();
    });

    it('supports aria-expanded', () => {
      render(<BaseButton aria-expanded={true}>Click me</BaseButton>);
      expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
    });

    it('supports aria-controls', () => {
      render(<BaseButton aria-controls="menu-id">Click me</BaseButton>);
      expect(screen.getByRole('button')).toHaveAttribute('aria-controls', 'menu-id');
    });
  });

  describe('style composition', () => {
    it('combines multiple classes correctly', () => {
      render(
        <BaseButton className="custom-class" variant="primary" size="lg" disabled isLoading>
          Click me
        </BaseButton>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveClass(
        BUTTON_CLASSES.base,
        BUTTON_CLASSES.variant.primary,
        BUTTON_CLASSES.size.lg,
        BUTTON_CLASSES.state.disabled,
        BUTTON_CLASSES.state.loading,
        'custom-class'
      );
    });
  });
});

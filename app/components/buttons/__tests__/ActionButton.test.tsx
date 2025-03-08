import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ActionButton } from '../ActionButton';

const MockIcon = () => <svg data-testid="mock-icon" />;

describe('ActionButton', () => {
  describe('rendering', () => {
    it('renders children correctly', () => {
      render(<ActionButton>Click me</ActionButton>);
      expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('renders with left icon', () => {
      render(<ActionButton leftIcon={<MockIcon />}>Click me</ActionButton>);
      expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    });

    it('renders with right icon', () => {
      render(<ActionButton rightIcon={<MockIcon />}>Click me</ActionButton>);
      expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    });
  });

  describe('styling', () => {
    it('applies flex layout for content', () => {
      render(<ActionButton>Click me</ActionButton>);
      const contentWrapper = screen.getByText('Click me').closest('span');
      expect(contentWrapper).toHaveClass('flex items-center gap-2');
    });
  });

  describe('interactions', () => {
    it('handles click events', async () => {
      const handleClick = jest.fn();
      render(<ActionButton onClick={handleClick}>Click me</ActionButton>);

      await userEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalled();
    });

    it('prevents click when disabled', async () => {
      const handleClick = jest.fn();
      render(
        <ActionButton onClick={handleClick} disabled>
          Click me
        </ActionButton>
      );

      await userEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('handles loading state', () => {
      render(<ActionButton isLoading>Click me</ActionButton>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(screen.getByText('Click me').closest('span')).toHaveClass('invisible');
    });
  });

  describe('icon positioning', () => {
    it('maintains correct order with left icon', () => {
      render(<ActionButton leftIcon={<MockIcon />}>Click me</ActionButton>);
      const contentWrapper = screen.getByText('Click me').closest('span');
      const icon = screen.getByTestId('mock-icon');

      expect(contentWrapper?.firstElementChild).toBe(icon);
      expect(contentWrapper?.lastChild?.textContent).toBe('Click me');
    });

    it('maintains correct order with right icon', () => {
      render(<ActionButton rightIcon={<MockIcon />}>Click me</ActionButton>);
      const contentWrapper = screen.getByText('Click me').closest('span');
      const icon = screen.getByTestId('mock-icon');

      expect(contentWrapper?.firstChild?.textContent).toBe('Click me');
      expect(contentWrapper?.lastElementChild).toBe(icon);
    });

    it('maintains correct order with both icons', () => {
      render(
        <ActionButton
          leftIcon={<MockIcon data-testid="left-icon" />}
          rightIcon={<MockIcon data-testid="right-icon" />}
        >
          Click me
        </ActionButton>
      );

      const contentWrapper = screen.getByText('Click me').closest('span');
      const leftIcon = screen.getByTestId('left-icon');
      const rightIcon = screen.getByTestId('right-icon');

      expect(contentWrapper?.firstElementChild).toBe(leftIcon);
      expect(contentWrapper?.children[1].textContent).toBe('Click me');
      expect(contentWrapper?.lastElementChild).toBe(rightIcon);
    });
  });
});

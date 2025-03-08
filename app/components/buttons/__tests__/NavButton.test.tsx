import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NavButton } from '../NavButton';

const MockIcon = () => <svg data-testid="mock-icon" />;

describe('NavButton', () => {
  describe('rendering', () => {
    it('renders children correctly', () => {
      render(<NavButton>Home</NavButton>);
      expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('renders with left icon', () => {
      render(<NavButton leftIcon={<MockIcon />}>Home</NavButton>);
      expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    });

    it('renders with right icon', () => {
      render(<NavButton rightIcon={<MockIcon />}>Home</NavButton>);
      expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    });
  });

  describe('styling', () => {
    it('applies active styles', () => {
      render(<NavButton active>Home</NavButton>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('shadow-sm');
    });

    it('applies inactive styles', () => {
      render(<NavButton active={false}>Home</NavButton>);
      const button = screen.getByRole('button');
      expect(button).not.toHaveClass('shadow-sm');
    });

    it('applies flex layout for content', () => {
      render(<NavButton>Home</NavButton>);
      const contentWrapper = screen.getByText('Home').closest('span');
      expect(contentWrapper).toHaveClass('flex items-center gap-2');
    });
  });

  describe('interactions', () => {
    it('handles click events', async () => {
      const handleClick = jest.fn();
      render(<NavButton onClick={handleClick}>Home</NavButton>);

      await userEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalled();
    });

    it('prevents click when disabled', async () => {
      const handleClick = jest.fn();
      render(
        <NavButton onClick={handleClick} disabled>
          Home
        </NavButton>
      );

      await userEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('handles loading state', () => {
      render(<NavButton isLoading>Home</NavButton>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      const contentWrapper = screen.getByText('Home').closest('span');
      expect(contentWrapper).toHaveClass('invisible');
    });
  });

  describe('icon positioning', () => {
    it('maintains correct order with left icon', () => {
      render(<NavButton leftIcon={<MockIcon />}>Home</NavButton>);
      const contentWrapper = screen.getByText('Home').closest('span');
      const icon = screen.getByTestId('mock-icon');

      expect(contentWrapper?.firstElementChild).toBe(icon);
      expect(contentWrapper?.lastChild?.textContent).toBe('Home');
    });

    it('maintains correct order with right icon', () => {
      render(<NavButton rightIcon={<MockIcon />}>Home</NavButton>);
      const contentWrapper = screen.getByText('Home').closest('span');
      const icon = screen.getByTestId('mock-icon');

      expect(contentWrapper?.firstChild?.textContent).toBe('Home');
      expect(contentWrapper?.lastElementChild).toBe(icon);
    });

    it('maintains correct order with both icons', () => {
      render(
        <NavButton
          leftIcon={<MockIcon data-testid="left-icon" />}
          rightIcon={<MockIcon data-testid="right-icon" />}
        >
          Home
        </NavButton>
      );

      const contentWrapper = screen.getByText('Home').closest('span');
      const leftIcon = screen.getByTestId('left-icon');
      const rightIcon = screen.getByTestId('right-icon');

      expect(contentWrapper?.firstElementChild).toBe(leftIcon);
      expect(contentWrapper?.children[1].textContent).toBe('Home');
      expect(contentWrapper?.lastElementChild).toBe(rightIcon);
    });
  });
});

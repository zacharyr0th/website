import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IconButton } from '../IconButton';

describe('IconButton', () => {
  const MockIcon = () => <svg data-testid="mock-icon" />;

  it('renders icon correctly', () => {
    render(
      <IconButton icon={<MockIcon />} ariaLabel="Test button" />
    );
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    expect(screen.getByRole('button')).toContainElement(screen.getByTestId('mock-icon'));
  });

  it('applies correct aria-label', () => {
    render(
      <IconButton icon={<MockIcon />} ariaLabel="Test button" />
    );
    expect(screen.getByLabelText('Test button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Test button');
  });

  it('applies padding by default', () => {
    render(
      <IconButton icon={<MockIcon />} ariaLabel="Test button" />
    );
    const button = screen.getByRole('button');
    expect(button).toHaveClass('p-2');
    expect(button).toHaveClass('interactive-button');
  });

  it('removes padding when noPadding is true', () => {
    render(
      <IconButton icon={<MockIcon />} ariaLabel="Test button" noPadding />
    );
    const button = screen.getByRole('button');
    expect(button).not.toHaveClass('p-2');
    expect(button).toHaveClass('interactive-button');
  });

  it('applies custom className', () => {
    render(
      <IconButton
        icon={<MockIcon />}
        ariaLabel="Test button"
        className="custom-class"
      />
    );
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
    expect(button).toHaveClass('interactive-button');
    expect(button).toHaveClass('p-2');
  });

  it('handles click events', async () => {
    const handleClick = jest.fn();
    render(
      <IconButton
        icon={<MockIcon />}
        ariaLabel="Test button"
        onClick={handleClick}
      />
    );
    
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('handles disabled state', async () => {
    const handleClick = jest.fn();
    render(
      <IconButton
        icon={<MockIcon />}
        ariaLabel="Test button"
        onClick={handleClick}
        disabled
      />
    );
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    await userEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('handles loading state', () => {
    render(
      <IconButton
        icon={<MockIcon />}
        ariaLabel="Test button"
        isLoading
      />
    );
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    const iconWrapper = screen.getByTestId('mock-icon').closest('span');
    expect(iconWrapper?.parentElement).toHaveClass('invisible');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(
      <IconButton
        ref={ref}
        icon={<MockIcon />}
        ariaLabel="Test button"
      />
    );
    
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current).toBe(screen.getByRole('button'));
  });

  it('applies variant styles correctly', () => {
    render(
      <IconButton
        icon={<MockIcon />}
        ariaLabel="Test button"
        variant="primary"
      />
    );
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('interactive-button');
  });

  it('applies size styles correctly', () => {
    render(
      <IconButton
        icon={<MockIcon />}
        ariaLabel="Test button"
        size="lg"
      />
    );
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('interactive-button');
  });
}); 
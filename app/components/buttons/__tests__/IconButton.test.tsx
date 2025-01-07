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
  });

  it('applies correct aria-label', () => {
    render(
      <IconButton icon={<MockIcon />} ariaLabel="Test button" />
    );
    expect(screen.getByLabelText('Test button')).toBeInTheDocument();
  });

  it('applies padding by default', () => {
    render(
      <IconButton icon={<MockIcon />} ariaLabel="Test button" />
    );
    const button = screen.getByRole('button');
    expect(button).toHaveClass('p-2');
  });

  it('removes padding when noPadding is true', () => {
    render(
      <IconButton icon={<MockIcon />} ariaLabel="Test button" noPadding />
    );
    const button = screen.getByRole('button');
    expect(button).not.toHaveClass('p-2');
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

  it('can be disabled', () => {
    render(
      <IconButton
        icon={<MockIcon />}
        ariaLabel="Test button"
        disabled
      />
    );
    expect(screen.getByRole('button')).toBeDisabled();
  });
}); 
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BaseButton } from '../BaseButton';

describe('BaseButton', () => {
  it('renders children correctly', () => {
    render(<BaseButton>Click me</BaseButton>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies default classes', () => {
    render(<BaseButton>Click me</BaseButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('rounded-full', 'transition-all', 'duration-300');
  });

  it('applies custom className', () => {
    render(<BaseButton className="custom-class">Click me</BaseButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('can be disabled', () => {
    render(<BaseButton disabled>Click me</BaseButton>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('shows loading state', () => {
    render(<BaseButton isLoading>Click me</BaseButton>);
    expect(screen.getByText('Click me')).toHaveClass('invisible');
    expect(document.querySelector('.absolute')).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = jest.fn();
    render(<BaseButton onClick={handleClick}>Click me</BaseButton>);
    
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not trigger click when disabled', async () => {
    const handleClick = jest.fn();
    render(<BaseButton disabled onClick={handleClick}>Click me</BaseButton>);
    
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('does not trigger click when loading', async () => {
    const handleClick = jest.fn();
    render(<BaseButton isLoading onClick={handleClick}>Click me</BaseButton>);
    
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });
}); 
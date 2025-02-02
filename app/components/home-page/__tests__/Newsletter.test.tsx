import React from 'react';
import { render, screen } from '@testing-library/react';
import { Newsletter } from '../Newsletter';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: function MockMotionDiv({ children, className, ...props }) {
      return (
        <div className={className} {...props}>
          {children}
        </div>
      );
    },
    h2: function MockMotionH2({ children, className, ...props }) {
      return (
        <h2 className={className} {...props}>
          {children}
        </h2>
      );
    },
    form: function MockMotionForm({ children, className, ...props }) {
      return (
        <form className={className} {...props}>
          {children}
        </form>
      );
    },
  },
  useInView: () => true,
}));

describe('Newsletter', () => {
  it('renders without crashing', () => {
    render(<Newsletter />);
    expect(screen.getByText('Subscribe for Updates')).toBeInTheDocument();
  });

  it('renders email input with correct attributes', () => {
    render(<Newsletter />);
    const input = screen.getByLabelText('Email address');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('placeholder', 'Enter your email');
    expect(input).toBeDisabled();
  });

  it('renders submit button with correct text and disabled state', () => {
    render(<Newsletter />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Coming Soon');
    expect(button).toBeDisabled();
  });

  it('applies correct CSS classes to container', () => {
    render(<Newsletter />);
    const section = screen.getByRole('region', { name: /newsletter/i });
    expect(section).toHaveClass('bg-[var(--color-background)]', 'py-8', 'sm:py-16');
  });

  it('applies correct CSS classes to form elements', () => {
    render(<Newsletter />);
    const form = screen.getByRole('form', { name: /newsletter subscription/i });
    expect(form).toHaveClass('w-full', 'max-w-md');

    const input = screen.getByLabelText('Email address');
    expect(input).toHaveClass(
      'w-full',
      'text-center',
      'sm:text-left',
      'bg-transparent',
      'text-[var(--color-text-primary)]',
      'mb-3',
      'sm:mb-0',
      'sm:mr-3',
      'py-1',
      'px-2',
      'leading-tight',
      'focus:outline-none',
      'placeholder:text-text-secondary/50'
    );
  });

  it('has disabled form elements', () => {
    render(<Newsletter />);
    const input = screen.getByLabelText('Email address');
    const button = screen.getByRole('button', { name: /coming soon/i });

    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
  });

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      render(<Newsletter />);
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveTextContent('Subscribe for Updates');
    });

    it('has proper form structure', () => {
      render(<Newsletter />);
      expect(screen.getByRole('textbox', { name: 'Email address' })).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('has proper ARIA labels', () => {
      render(<Newsletter />);
      const input = screen.getByLabelText('Email address');
      expect(input).toHaveAttribute('aria-label', 'Email address');
    });
  });

  describe('Responsive Design', () => {
    it('applies responsive classes to container', () => {
      render(<Newsletter />);
      const section = screen.getByRole('region', { name: /newsletter/i });
      expect(section).toHaveClass('py-8', 'sm:py-16');
    });

    it('applies responsive classes to input container', () => {
      render(<Newsletter />);
      const inputContainer = screen.getByRole('form', { name: /newsletter subscription/i })
        .firstElementChild?.firstElementChild;
      expect(inputContainer).toHaveClass(
        'w-full',
        'flex',
        'flex-col',
        'sm:flex-row',
        'items-center',
        'sm:items-stretch'
      );
    });
  });

  describe('Visual States', () => {
    it('shows disabled state for input', () => {
      render(<Newsletter />);
      const input = screen.getByLabelText('Email address');
      expect(input).toBeDisabled();
      expect(input).toHaveClass('bg-transparent');
    });

    it('shows disabled state for button', () => {
      render(<Newsletter />);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });
  });
}); 
import React from 'react';
import { render, screen } from '@testing-library/react';
import PageHeader from '../PageHeader';

describe('PageHeader', () => {
  it('renders the title correctly', () => {
    render(<PageHeader title="Test Title" />);
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Test Title');
  });

  it('has correct styling classes', () => {
    render(<PageHeader title="Test Title" />);
    
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('mb-8');
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveClass('text-5xl', 'lg:text-6xl', 'font-bold', 'tracking-tight', 'text-center', 'sm:text-left');
  });
}); 
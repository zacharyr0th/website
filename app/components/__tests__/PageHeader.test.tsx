import React from 'react';
import { render, screen } from '@testing-library/react';
import PageHeader from '../PageHeader';

describe('PageHeader', () => {
  it('renders the title correctly', () => {
    const testTitle = 'Test Page Title';
    render(<PageHeader title={testTitle} />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(testTitle);
  });

  it('applies correct CSS classes', () => {
    render(<PageHeader title="Test" />);

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('mb-8');

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveClass(
      'text-5xl',
      'lg:text-6xl',
      'font-bold',
      'tracking-tight',
      'text-center',
      'sm:text-left'
    );
  });

  it('renders within a header element', () => {
    render(<PageHeader title="Test" />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('maintains accessibility hierarchy', () => {
    render(<PageHeader title="Test" />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.tagName).toBe('H1');
  });

  describe('styling', () => {
    it('applies correct base styles', () => {
      render(<PageHeader title="Test Title" />);
      const header = screen.getByRole('banner');
      expect(header).toHaveClass('mb-8');
    });

    it('applies correct heading styles', () => {
      render(<PageHeader title="Test Title" />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveClass(
        'text-5xl',
        'lg:text-6xl',
        'font-bold',
        'tracking-tight',
        'text-center',
        'sm:text-left'
      );
    });

    it('maintains responsive text alignment', () => {
      render(<PageHeader title="Test Title" />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveClass('text-center', 'sm:text-left');
    });

    it('maintains responsive font size', () => {
      render(<PageHeader title="Test Title" />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveClass('text-5xl', 'lg:text-6xl');
    });
  });

  describe('accessibility', () => {
    it('provides semantic header structure', () => {
      render(<PageHeader title="Test Title" />);
      expect(screen.getByRole('banner')).toContainElement(
        screen.getByRole('heading', { level: 1 })
      );
    });

    it('maintains heading hierarchy', () => {
      render(
        <div>
          <PageHeader title="Main Title" />
          <h2>Subtitle</h2>
        </div>
      );
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    it('supports long titles without breaking layout', () => {
      const longTitle =
        'This is a very long title that should still maintain proper styling and not break the layout of the page header component';
      render(<PageHeader title={longTitle} />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent(longTitle);
      expect(heading).toHaveClass('tracking-tight');
    });
  });

  describe('content handling', () => {
    it('handles empty title gracefully', () => {
      render(<PageHeader title="" />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeEmptyDOMElement();
    });

    it('handles special characters in title', () => {
      const titleWithSpecialChars = '!@#$%^&*()_+ Special Title';
      render(<PageHeader title={titleWithSpecialChars} />);
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(titleWithSpecialChars);
    });

    it('handles HTML entities in title', () => {
      const titleWithEntities = 'Title & More';
      render(<PageHeader title={titleWithEntities} />);
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Title & More');
    });
  });

  describe('layout', () => {
    it('maintains consistent spacing', () => {
      render(<PageHeader title="Test Title" />);
      const header = screen.getByRole('banner');
      expect(header).toHaveClass('mb-8');
    });

    it('maintains proper text wrapping', () => {
      const longTitle =
        'This is a very long title that should wrap properly without breaking the layout';
      render(<PageHeader title={longTitle} />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveClass('tracking-tight');
    });
  });
});

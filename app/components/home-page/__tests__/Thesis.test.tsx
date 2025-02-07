import React from 'react';
import { render, screen } from '@testing-library/react';
import { Thesis } from '../Thesis';
import { THESIS_CONTENT, THESIS_STYLES } from '../constants';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className }: React.HTMLAttributes<HTMLDivElement>) => <div className={className}>{children}</div>,
    h1: ({ children, className }: React.HTMLAttributes<HTMLHeadingElement>) => <h1 className={className}>{children}</h1>,
    h2: ({ children, className }: React.HTMLAttributes<HTMLHeadingElement>) => <h2 className={className}>{children}</h2>,
    p: ({ children, className }: React.HTMLAttributes<HTMLParagraphElement>) => <p className={className}>{children}</p>,
  },
  useInView: () => true,
}));

// Mock background component
jest.mock('../backgrounds/ThesisBackground', () => ({
  ThesisBackground: () => <div data-testid="thesis-background" />,
}));

describe('Thesis', () => {
  it('renders without crashing', () => {
    render(<Thesis />);
    expect(screen.getByText(THESIS_CONTENT.title)).toBeInTheDocument();
  });

  it('renders all content sections', () => {
    render(<Thesis />);
    expect(screen.getByText(THESIS_CONTENT.label)).toBeInTheDocument();
    expect(screen.getByText(THESIS_CONTENT.title)).toBeInTheDocument();
    expect(screen.getByText(THESIS_CONTENT.subtitle)).toBeInTheDocument();
  });

  it('renders background component', () => {
    render(<Thesis />);
    expect(screen.getByTestId('thesis-background')).toBeInTheDocument();
  });

  describe('Styling', () => {
    it('applies correct section styles', () => {
      render(<Thesis />);
      const section = screen.getByRole('region');
      expect(section).toHaveClass(THESIS_STYLES.section);
    });

    it('applies correct content wrapper styles', () => {
      render(<Thesis />);
      const contentWrapper = screen.getByText(THESIS_CONTENT.title).parentElement?.parentElement;
      expect(contentWrapper).toHaveClass(THESIS_STYLES.contentWrapper);
    });

    it('applies correct text container styles', () => {
      render(<Thesis />);
      const textContainer = screen.getByText(THESIS_CONTENT.title).parentElement;
      expect(textContainer).toHaveClass(THESIS_STYLES.textContainer);
    });

    it('applies correct label styles', () => {
      render(<Thesis />);
      const label = screen.getByText(THESIS_CONTENT.label);
      expect(label).toHaveClass(THESIS_STYLES.label);
    });

    it('applies correct title styles', () => {
      render(<Thesis />);
      const title = screen.getByText(THESIS_CONTENT.title);
      expect(title).toHaveClass(THESIS_STYLES.title);
    });

    it('applies correct subtitle styles', () => {
      render(<Thesis />);
      const subtitle = screen.getByText(THESIS_CONTENT.subtitle);
      expect(subtitle).toHaveClass(THESIS_STYLES.subtitle);
    });

    it('applies correct background styles', () => {
      render(<Thesis />);
      const background = screen.getByTestId('thesis-background').parentElement;
      expect(background).toHaveClass(THESIS_STYLES.background);
    });
  });

  describe('Accessibility', () => {
    it('maintains proper heading hierarchy', () => {
      render(<Thesis />);
      
      const label = screen.getByText(THESIS_CONTENT.label);
      const title = screen.getByText(THESIS_CONTENT.title);
      
      expect(label.tagName).toBe('H2');
      expect(title.tagName).toBe('H1');
    });

    it('provides semantic structure', () => {
      render(<Thesis />);
      expect(screen.getByRole('region')).toBeInTheDocument();
    });

    it('maintains readable text contrast', () => {
      render(<Thesis />);
      const textElements = [
        screen.getByText(THESIS_CONTENT.label),
        screen.getByText(THESIS_CONTENT.title),
        screen.getByText(THESIS_CONTENT.subtitle),
      ];

      textElements.forEach(element => {
        const styles = window.getComputedStyle(element);
        expect(styles.color).not.toBe(styles.backgroundColor);
      });
    });
  });

  describe('Content Structure', () => {
    it('renders content in correct order', () => {
      render(<Thesis />);
      const content = screen.getByText(THESIS_CONTENT.title).parentElement;
      const children = Array.from(content?.children || []);
      
      expect(children[0]).toHaveTextContent(THESIS_CONTENT.label);
      expect(children[1]).toHaveTextContent(THESIS_CONTENT.title);
      expect(children[2]).toHaveTextContent(THESIS_CONTENT.subtitle);
    });

    it('maintains text content integrity', () => {
      render(<Thesis />);
      expect(screen.getByText(THESIS_CONTENT.label)).toHaveTextContent(THESIS_CONTENT.label);
      expect(screen.getByText(THESIS_CONTENT.title)).toHaveTextContent(THESIS_CONTENT.title);
      expect(screen.getByText(THESIS_CONTENT.subtitle)).toHaveTextContent(THESIS_CONTENT.subtitle);
    });
  });

  describe('Layout', () => {
    it('maintains proper content structure', () => {
      render(<Thesis />);
      const section = screen.getByRole('region');
      const contentWrapper = screen.getByText(THESIS_CONTENT.title).parentElement?.parentElement;
      const background = screen.getByTestId('thesis-background').parentElement;

      if (contentWrapper && background) {
        expect(section).toContainElement(contentWrapper);
        expect(section).toContainElement(background);
      }
    });

    it('positions background correctly', () => {
      render(<Thesis />);
      const background = screen.getByTestId('thesis-background').parentElement;
      expect(background).toHaveClass(THESIS_STYLES.background);
    });
  });
}); 
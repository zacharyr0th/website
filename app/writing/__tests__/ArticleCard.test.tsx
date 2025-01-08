import React from 'react';
import { render, screen } from '@testing-library/react';
import { ArticleCard } from '../components/ArticleCard';
import type { Article } from '../types';

describe('ArticleCard', () => {
  const mockArticle: Article = {
    title: 'Test Article',
    description: 'A test article description',
    link: '/articles/test',
    date: '2024-01-07',
    tags: ['crypto', 'defi', 'ai', 'systems', 'trading'],
    frontmatter: {
      title: 'Test Article',
      description: 'A test article description',
      date: '2024-01-07',
      tags: ['crypto', 'defi', 'ai', 'systems', 'trading'],
      featured: false,
    },
    category: 'technology',
  };

  describe('rendering', () => {
    it('renders article information correctly', () => {
      render(<ArticleCard article={mockArticle} isFocused={false} />);
      
      expect(screen.getByText('Test Article')).toBeInTheDocument();
      expect(screen.getByText('A test article description')).toBeInTheDocument();
      const formattedDate = new Date(mockArticle.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
      expect(screen.getByText(formattedDate)).toBeInTheDocument();
    });

    it('renders without description when not provided', () => {
      const articleWithoutDesc = { ...mockArticle, description: undefined };
      render(<ArticleCard article={articleWithoutDesc} isFocused={false} />);
      
      expect(screen.getByText('Test Article')).toBeInTheDocument();
      expect(screen.queryByText('A test article description')).not.toBeInTheDocument();
    });

    it('renders "Untitled Article" when title is missing', () => {
      const articleWithoutTitle = { 
        ...mockArticle, 
        title: undefined,
        frontmatter: { ...mockArticle.frontmatter, title: undefined }
      };
      render(<ArticleCard article={articleWithoutTitle} isFocused={false} />);
      
      expect(screen.getByText('Untitled Article')).toBeInTheDocument();
    });
  });

  describe('tag handling', () => {
    it('renders tags in correct order', () => {
      render(<ArticleCard article={mockArticle} isFocused={false} />);
      
      const tags = screen.getAllByText(/crypto|defi|ai|systems|trading/);
      expect(tags.map(tag => tag.textContent)).toEqual(['systems', 'ai', 'trading', 'defi', 'crypto']);
    });

    it('renders no tags when not provided', () => {
      const articleWithoutTags = { 
        ...mockArticle, 
        tags: undefined,
        frontmatter: { ...mockArticle.frontmatter, tags: undefined }
      };
      render(<ArticleCard article={articleWithoutTags} isFocused={false} />);
      
      expect(screen.queryByText(/crypto|defi|ai|systems|trading/)).not.toBeInTheDocument();
    });

    it('applies correct tag styles', () => {
      render(<ArticleCard article={mockArticle} isFocused={false} />);
      
      const tags = screen.getAllByText(/crypto|defi|ai|systems|trading/);
      tags.forEach(tag => {
        expect(tag).toHaveClass(
          'inline-flex',
          'items-center',
          'px-2.5',
          'py-1',
          'text-xs',
          'font-medium',
          'bg-white/5',
          'text-zinc-400',
          'rounded-md'
        );
      });
    });
  });

  describe('focus behavior', () => {
    it('applies focus styles when isFocused is true', () => {
      render(<ArticleCard article={mockArticle} isFocused={true} />);
      
      const link = screen.getByRole('listitem');
      const article = link.querySelector('article');
      expect(link).toHaveClass('scale-[1.02]');
      expect(article).toHaveClass('bg-zinc-800/50');
    });

    it('applies hover styles when not focused', () => {
      render(<ArticleCard article={mockArticle} isFocused={false} />);
      
      const link = screen.getByRole('listitem');
      const article = link.querySelector('article');
      expect(link).toHaveClass('hover:scale-[1.02]');
      expect(article).toHaveClass('hover:bg-zinc-800/50', 'bg-inherit');
    });

    it('focuses the link when isFocused becomes true', () => {
      const { rerender } = render(<ArticleCard article={mockArticle} isFocused={false} />);
      const link = screen.getByRole('listitem');
      expect(document.activeElement).not.toBe(link);

      rerender(<ArticleCard article={mockArticle} isFocused={true} />);
      expect(document.activeElement).toBe(link);
    });
  });

  describe('featured article', () => {
    it('applies featured styles when article is featured', () => {
      const featuredArticle = {
        ...mockArticle,
        frontmatter: { ...mockArticle.frontmatter, featured: true }
      };
      render(<ArticleCard article={featuredArticle} isFocused={false} />);
      
      const link = screen.getByRole('listitem');
      expect(link).toHaveClass('bg-amber-500/[0.02]');
    });

    it('does not apply featured styles when article is not featured', () => {
      render(<ArticleCard article={mockArticle} isFocused={false} />);
      
      const link = screen.getByRole('listitem');
      expect(link).not.toHaveClass('bg-amber-500/[0.02]');
    });
  });

  describe('date formatting', () => {
    it('formats date correctly', () => {
      render(<ArticleCard article={mockArticle} isFocused={false} />);
      const formattedDate = new Date(mockArticle.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
      expect(screen.getByText(formattedDate)).toBeInTheDocument();
    });

    it('handles missing date', () => {
      const articleWithoutDate = { 
        ...mockArticle, 
        date: undefined,
        frontmatter: { ...mockArticle.frontmatter, date: undefined }
      };
      render(<ArticleCard article={articleWithoutDate} isFocused={false} />);
      
      const dateElement = screen.queryByRole('time');
      expect(dateElement).not.toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has correct ARIA roles', () => {
      render(<ArticleCard article={mockArticle} isFocused={false} />);
      expect(screen.getByRole('listitem')).toBeInTheDocument();
      expect(screen.getByRole('article')).toBeInTheDocument();
    });

    it('has accessible link text', () => {
      render(<ArticleCard article={mockArticle} isFocused={false} />);
      const link = screen.getByRole('listitem');
      expect(link).toHaveAttribute('aria-label', 'Read article: Test Article');
    });

    it('supports keyboard navigation', () => {
      render(<ArticleCard article={mockArticle} isFocused={false} />);
      const link = screen.getByRole('listitem');
      
      link.focus();
      expect(document.activeElement).toBe(link);
    });

    it('has semantic time element', () => {
      render(<ArticleCard article={mockArticle} isFocused={false} />);
      const formattedDate = new Date(mockArticle.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
      const timeElement = screen.getByText(formattedDate).closest('time');
      expect(timeElement).toHaveAttribute('dateTime', '2024-01-07');
    });
  });

  describe('link handling', () => {
    it('uses article link when provided', () => {
      render(<ArticleCard article={mockArticle} isFocused={false} />);
      expect(screen.getByRole('listitem')).toHaveAttribute('href', '/articles/test');
    });

    it('falls back to # when no link provided', () => {
      const articleWithoutLink = { ...mockArticle, link: undefined };
      render(<ArticleCard article={articleWithoutLink} isFocused={false} />);
      expect(screen.getByRole('listitem')).toHaveAttribute('href', '#');
    });
  });
}); 
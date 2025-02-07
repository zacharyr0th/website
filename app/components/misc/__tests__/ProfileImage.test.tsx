import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProfileImage from '../ProfileImage';

// Mock next/image
jest.mock('next/image', () => {
  return function MockImage({ src, alt, className, width = 100, height = 100 }: {
    src: string;
    alt: string;
    className?: string;
    width?: number;
    height?: number;
  }) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={className} width={width} height={height} />;
  };
});

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, onClick, style }: React.HTMLAttributes<HTMLDivElement>) => (
      <div className={className} onClick={onClick} style={style}>
        {children}
      </div>
    ),
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => children,
}));

describe('ProfileImage', () => {
  it('renders with default props', () => {
    render(<ProfileImage />);
    const image = screen.getByAltText('Profile picture of Zachary Roth');
    expect(image).toBeInTheDocument();
    expect(image.parentElement).toHaveClass('w-48'); // default md size
  });

  it('applies correct size classes', () => {
    const { rerender } = render(<ProfileImage size="sm" />);
    expect(screen.getByAltText('Profile picture of Zachary Roth').parentElement).toHaveClass('w-24');

    rerender(<ProfileImage size="md" />);
    expect(screen.getByAltText('Profile picture of Zachary Roth').parentElement).toHaveClass('w-48');

    rerender(<ProfileImage size="lg" />);
    expect(screen.getByAltText('Profile picture of Zachary Roth').parentElement).toHaveClass('w-96');
  });

  it('handles click events when clickable', () => {
    render(<ProfileImage clickable={true} />);
    const container = screen.getByAltText('Profile picture of Zachary Roth').parentElement;
    expect(container).toHaveStyle({ cursor: 'pointer' });
    
    fireEvent.click(container!);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('does not handle click events when not clickable', () => {
    render(<ProfileImage clickable={false} />);
    const container = screen.getByAltText('Profile picture of Zachary Roth').parentElement;
    expect(container).toHaveStyle({ cursor: 'default' });
    
    fireEvent.click(container!);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('shows file input when editable', () => {
    render(<ProfileImage editable={true} />);
    expect(screen.getByLabelText('Upload profile picture')).toBeInTheDocument();
  });

  it('hides file input when not editable', () => {
    render(<ProfileImage editable={false} />);
    expect(screen.queryByLabelText('Upload profile picture')).not.toBeInTheDocument();
  });

  it('calls onImageChange when file is selected', async () => {
    const mockOnImageChange = jest.fn();
    render(<ProfileImage editable={true} onImageChange={mockOnImageChange} />);
    
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    const input = screen.getByLabelText('Upload profile picture');
    
    await userEvent.upload(input, file);
    
    expect(mockOnImageChange).toHaveBeenCalledWith(file);
  });

  describe('Modal', () => {
    it('opens modal on image click', () => {
      render(<ProfileImage />);
      fireEvent.click(screen.getByAltText('Profile picture of Zachary Roth').parentElement!);
      
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getAllByAltText('Profile picture of Zachary Roth')).toHaveLength(2);
    });

    it('closes modal when clicking close button', () => {
      render(<ProfileImage />);
      fireEvent.click(screen.getByAltText('Profile picture of Zachary Roth').parentElement!);
      
      fireEvent.click(screen.getByLabelText('Close modal'));
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('closes modal when clicking backdrop', () => {
      render(<ProfileImage />);
      fireEvent.click(screen.getByAltText('Profile picture of Zachary Roth').parentElement!);
      
      fireEvent.click(screen.getByRole('dialog'));
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('does not close modal when clicking modal content', () => {
      render(<ProfileImage />);
      fireEvent.click(screen.getByAltText('Profile picture of Zachary Roth').parentElement!);
      
      const modalContent = screen.getByRole('dialog').children[0];
      fireEvent.click(modalContent);
      
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });
}); 
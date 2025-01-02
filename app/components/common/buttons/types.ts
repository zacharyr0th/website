export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'default' | 'icon';
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  ariaLabel?: string;
}

import React, { memo } from 'react';

interface NavButtonProps {
  children: React.ReactNode;
  variant: 'primary' | 'secondary';
  active?: boolean;
}

const NavButton = memo<NavButtonProps>(({ children, variant }) => {
  const baseStyles = 'px-4 py-2 rounded-lg text-sm font-medium transition-colors';
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary:
      'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600',
  };

  return <button className={`${baseStyles} ${variantStyles[variant]}`}>{children}</button>;
});

NavButton.displayName = 'NavButton';

export default NavButton;

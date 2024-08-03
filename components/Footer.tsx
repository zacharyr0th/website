// Footer.jsx or Footer.tsx (if using TypeScript)

import React from 'react';

export function Footer() {
  return (
    <footer className="bg-[var(--primary-bg)] text-sm py-6">
      <p className="text-center text-[var(--color-secondary)]">&copy; {new Date().getFullYear()}</p>
    </footer>
  );
}

export default Footer;

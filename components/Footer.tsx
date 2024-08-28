// Footer.jsx or Footer.tsx (if using TypeScript)

import React from 'react';

export function Footer() {
  return (
    <footer className="bg-[var(--primary-bg)] text-sm py-12">
      <p className="text-center text-[#9ca3af]">&copy; {new Date().getFullYear()}</p>
    </footer>
  );
}

export default Footer;

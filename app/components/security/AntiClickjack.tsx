'use client';

import { useEffect } from 'react';

export default function AntiClickjack() {
  useEffect(() => {
    // Basic anti-clickjacking
    if (window.self !== window.top && window.top) {
      window.top.location = window.self.location;
    }
  }, []);

  return null;
}

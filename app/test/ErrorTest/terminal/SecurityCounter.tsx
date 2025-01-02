'use client';

import React, { useState } from 'react';
import TerminalWindow from './TerminalWindow';

const SecurityCounter = () => {
  const [counter, setCounter] = useState(0);

  if (counter === 5) {
    throw new Error('SECURITY BREACH DETECTED: INITIATING SYSTEM LOCKDOWN');
  }

  return (
    <TerminalWindow title="SECURITY MONITORING SYSTEM">
      <div>
        <h3 className="text-xl font-mono text-[var(--color-accent)]">
          <span className="animate-pulse">█</span> Security Level: {counter}
        </h3>
        <button
          onClick={() => setCounter((c) => c + 1)}
          className="mt-4 font-mono bg-[var(--color-accent)] hover:bg-[var(--color-info)] 
                   text-black px-6 py-2 transition-all duration-[var(--transition-speed)]
                   border border-[var(--color-accent)] hover:border-[var(--color-info)]
                   focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
        >
          BREACH SECURITY
        </button>
        <p className="mt-4 font-mono text-[var(--color-warning)] text-sm animate-pulse">
          [!] Warning: Security breach imminent at level 5
        </p>
      </div>
    </TerminalWindow>
  );
};

export default SecurityCounter;

'use client';

import React, { useState, useEffect } from 'react';

interface BootSequenceProps {
  onComplete: () => void;
  messages?: string[];
  delay?: number;
}

const BootSequence = ({
  onComplete,
  messages = [
    'INITIALIZING SYSTEM...',
    'CHECKING SECURITY PROTOCOLS...',
    'ESTABLISHING SECURE CONNECTION...',
    'ACCESS GRANTED...',
  ],
  delay = 800,
}: BootSequenceProps) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (step < messages.length) {
        setStep(step + 1);
      } else {
        onComplete();
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [step, messages.length, delay, onComplete]);

  return (
    <div className="font-mono text-sm space-y-2">
      {messages.slice(0, step + 1).map((text, i) => (
        <div key={i} className="text-[var(--color-text-secondary)] opacity-80">
          {`> ${text}`}
        </div>
      ))}
    </div>
  );
};

export default BootSequence;

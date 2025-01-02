'use client';

import React, { useState } from 'react';
import ErrorBoundaryClient from './ErrorBoundaryClient';
import BootSequence from './terminal/BootSequence';
import SecurityCounter from './terminal/SecurityCounter';
import { SystemTime } from './terminal/SystemTime';

const glitchKeyframes = `
  @keyframes glitch {
    0% { transform: translate(0) }
    20% { transform: translate(-2px, 2px) }
    40% { transform: translate(-2px, -2px) }
    60% { transform: translate(2px, 2px) }
    80% { transform: translate(2px, -2px) }
    100% { transform: translate(0) }
  }
`;

const ErrorTest = () => {
  const [bootComplete, setBootComplete] = useState(false);

  return (
    <div
      className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)]
                    p-8 font-[var(--font-mono)] overflow-hidden"
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        ${glitchKeyframes}
        .glitch-text {
          animation: glitch 0.5s infinite;
          animation-timing-function: steps(2);
        }
      `,
        }}
      />

      {!bootComplete ? (
        <BootSequence onComplete={() => setBootComplete(true)} />
      ) : (
        <>
          <header className="mb-8 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-[var(--color-accent)]">
              RESTRICTED ACCESS
            </h1>
            <p className="text-[var(--color-text-secondary)] mt-4 opacity-80">
              &gt; You&apos;ve discovered the hidden terminal.
            </p>
          </header>
          <ErrorBoundaryClient>
            <SecurityCounter />
          </ErrorBoundaryClient>
          <SystemTime />
        </>
      )}
    </div>
  );
};

export default ErrorTest;

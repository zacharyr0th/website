'use client';

import React from 'react';

interface TerminalWindowProps {
  children: React.ReactNode;
  title?: string;
}

const TerminalWindow = ({ children, title }: TerminalWindowProps) => {
  const sessionId = Math.random().toString(36).substring(7);

  return (
    <div className="terminal-window flex flex-col items-center gap-4 p-8 border border-[var(--color-accent)] rounded-md bg-[var(--color-surface)] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full bg-[var(--color-accent)] px-4 py-1 font-mono text-xs text-black">
        {title || `Terminal Session: ${sessionId}`}
      </div>
      <div className="mt-6 w-full">{children}</div>
    </div>
  );
};

export default TerminalWindow;

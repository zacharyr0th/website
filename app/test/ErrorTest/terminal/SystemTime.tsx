'use client';

import React, { useState, useEffect } from 'react';

export function SystemTime() {
  const [time, setTime] = useState('');

  useEffect(() => {
    function updateTime() {
      setTime(new Date().toLocaleTimeString());
    }
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-4 left-4 font-mono text-xs text-[var(--color-text-secondary)]">
      System Time: {time}
    </div>
  );
} 
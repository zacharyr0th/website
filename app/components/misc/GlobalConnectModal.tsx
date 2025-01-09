'use client';

import React, { useEffect, useState, useCallback } from 'react';
import ConnectModal from './ConnectModal';

export default function GlobalConnectModal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    // Listen for the custom event to open the modal
    const handleOpenEvent = () => setIsOpen(true);
    window.addEventListener('openConnectModal', handleOpenEvent);
    return () => window.removeEventListener('openConnectModal', handleOpenEvent);
  }, []);

  return <ConnectModal isOpen={isOpen} onClose={handleClose} />;
}

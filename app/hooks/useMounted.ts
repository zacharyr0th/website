import { useState, useEffect } from 'react';

interface UseMountedOptions {
  onMount?: () => void;
  onUnmount?: () => void;
}

export const useMounted = ({ onMount, onUnmount }: UseMountedOptions = {}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    onMount?.();
    return () => {
      onUnmount?.();
    };
  }, [onMount, onUnmount]);

  return mounted;
};

import { useEffect, useState } from 'react';
import type { RefObject } from 'react';

interface DimensionState {
  width: number;
  height: number;
}

export function useResizeObserver<T extends HTMLElement>(
  ref: RefObject<T>,
  debounceMs: number = 0
) {
  const [dimensions, setDimensions] = useState<DimensionState>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let timeoutId: NodeJS.Timeout;
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      const updateDimensions = () => {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      };

      if (debounceMs > 0) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(updateDimensions, debounceMs);
      } else {
        updateDimensions();
      }
    });

    resizeObserver.observe(element);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      resizeObserver.disconnect();
    };
  }, [ref, debounceMs]);

  return dimensions;
}

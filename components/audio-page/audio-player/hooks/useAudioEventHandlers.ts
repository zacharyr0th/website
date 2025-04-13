import { useEffect, useRef } from 'react';

type AudioEventHandlers = {
  onTimeUpdate?: (e: Event) => void;
  onLoadedMetadata?: (e: Event) => void;
  onEnd?: (e: Event) => void;
  onPlay?: (e: Event) => void;
  onPause?: (e: Event) => void;
  onWaiting?: (e: Event) => void;
  onCanPlay?: (e: Event) => void;
  onProgress?: (e: Event) => void;
};

export const useAudioEventHandlers = (
  audio: HTMLAudioElement | null,
  handlers: AudioEventHandlers
) => {
  const handlersRef = useRef(handlers);

  useEffect(() => {
    handlersRef.current = handlers;
  }, [handlers]);

  useEffect(() => {
    if (!audio) return;

    const eventMap = {
      onTimeUpdate: 'timeupdate',
      onLoadedMetadata: 'loadedmetadata',
      onEnd: 'ended',
      onPlay: 'play',
      onPause: 'pause',
      onWaiting: 'waiting',
      onCanPlay: 'canplay',
      onProgress: 'progress',
    } as const;

    // Create stable event handlers that reference the current handlers
    const stableHandlers = {} as Record<keyof typeof eventMap, (e: Event) => void>;

    Object.keys(eventMap).forEach((handlerKey) => {
      const key = handlerKey as keyof typeof eventMap;
      stableHandlers[key] = (e: Event) => {
        handlersRef.current[key]?.(e);
      };
    });

    // Add event listeners
    Object.entries(eventMap).forEach(([handlerKey, event]) => {
      const key = handlerKey as keyof typeof eventMap;
      if (handlersRef.current[key]) {
        audio.addEventListener(event, stableHandlers[key], { passive: true });
      }
    });

    // Cleanup function
    return () => {
      Object.entries(eventMap).forEach(([handlerKey, event]) => {
        const key = handlerKey as keyof typeof eventMap;
        if (handlersRef.current[key]) {
          audio.removeEventListener(event, stableHandlers[key]);
        }
      });
    };
  }, [audio]); // Only depend on audio reference
};

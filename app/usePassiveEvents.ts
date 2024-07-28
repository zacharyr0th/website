import { useEffect } from 'react';

export function usePassiveEvents() {
  useEffect(() => {
    const events = ['touchstart', 'touchmove', 'touchend', 'mousewheel'];

    const makePassive = (event: string) => {
      const original = (window as any)[`on${event}`];
      (window as any)[`on${event}`] = null;
      window.addEventListener(event, (e) => {
        if (original) original(e);
      }, { passive: true });
    };

    events.forEach(makePassive);

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event as keyof WindowEventMap, (e) => {}, {
          passive: true,
        } as AddEventListenerOptions);
      });
    };
  }, []);
}
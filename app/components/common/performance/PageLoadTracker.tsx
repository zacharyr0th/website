'use client';

import { usePageLoadTracking } from '@/app/lib/monitoring/performance';

export function PageLoadTracker() {
  usePageLoadTracking();
  return null;
} 
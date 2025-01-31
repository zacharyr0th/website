import { errorReporting } from './errorReporting';

export function initializeApp() {
  if (typeof window !== 'undefined') {
    // Initialize error reporting
    errorReporting.initialize();

    // Add any other app-wide initialization here
  }
} 
import { createLogger, LogCategory } from '@/lib/core/logger';

const logger = createLogger('format-selection', { category: LogCategory.APPLICATION });

// Supported audio formats by browser
export const SUPPORTED_FORMATS = {
  safari: ['m4a', 'mp3', 'wav'],
  chrome: ['m4a', 'mp3', 'wav'],
  mobile: ['m4a', 'mp3', 'wav'],
} as const;

// Browser detection utility with improved security
export const detectBrowser = (userAgent: string) => {
  // Sanitize user agent
  const sanitizedUA = userAgent.slice(0, 256).toLowerCase();

  const browserInfo = {
    isSafari: false,
    isChrome: false,
    isMobile: false,
    formats: SUPPORTED_FORMATS.chrome as readonly string[], // Default to Chrome formats
  };

  // Use safe pattern matching
  if (sanitizedUA.includes('safari/') && !sanitizedUA.includes('chrome/')) {
    browserInfo.isSafari = true;
    browserInfo.formats = SUPPORTED_FORMATS.safari;
  } else if (sanitizedUA.includes('chrome/')) {
    browserInfo.isChrome = true;
    browserInfo.formats = SUPPORTED_FORMATS.chrome;
  }

  // Check for mobile last to ensure proper format selection
  if (
    sanitizedUA.includes('mobile/') ||
    sanitizedUA.includes('android') ||
    sanitizedUA.includes('iphone')
  ) {
    browserInfo.isMobile = true;
    browserInfo.formats = SUPPORTED_FORMATS.mobile;
  }

  return browserInfo;
};

// Format selection utility with improved security
export const selectOptimalFormat = async (userAgent: string): Promise<string | undefined> => {
  try {
    if (!userAgent || typeof userAgent !== 'string') {
      return SUPPORTED_FORMATS.chrome[0];
    }

    const browserInfo = detectBrowser(userAgent);
    return browserInfo.formats[0];
  } catch (error) {
    logger.warn('Format selection failed', {
      error: 'Failed to select format',
      defaultFormat: SUPPORTED_FORMATS.chrome[0],
    });
    return SUPPORTED_FORMATS.chrome[0];
  }
};

interface AudioError {
  message: string;
  code: number | undefined;
  name: string;
}

interface ErrorContext {
  [key: string]: unknown;
}

/**
 * Audio error handler singleton for consistent error handling across the audio player
 */
class AudioErrorHandler {
  private static instance: AudioErrorHandler;

  private constructor() {}

  public static getInstance(): AudioErrorHandler {
    if (!AudioErrorHandler.instance) {
      AudioErrorHandler.instance = new AudioErrorHandler();
    }
    return AudioErrorHandler.instance;
  }

  /**
   * Handle audio-related errors with context
   */
  public handleError(
    error: Error | AudioError | null,
    context: string,
    metadata?: ErrorContext
  ): void {
    if (!error) {
      console.error(`Unknown error in ${context}`);
      return;
    }

    const errorObj: Record<string, unknown> = {
      message: error.message,
      name: error.name,
      code: 'code' in error ? error.code : undefined,
      context,
      ...metadata,
    };

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error(`Audio error in ${context}:`, errorObj);
      if ('stack' in error && error.stack) {
        console.error('Stack trace:', error.stack);
      }
    }

    // In production, we could send this to an error tracking service
    // if (process.env.NODE_ENV === 'production') {
    //   // Example: Sentry.captureException(error, { extra: errorObj });
    // }
  }

  /**
   * Log debug messages with optional metadata
   */
  public logDebug(message: string, metadata?: Record<string, unknown>): void {
    if (process.env.NODE_ENV === 'development') {
      console.debug('[Audio Player]', message, metadata || '');
    }
  }

  /**
   * Create a standardized audio error object
   */
  public createAudioError(error: Error): AudioError {
    return {
      message: error.message,
      name: error.name,
      code: (error as unknown as { code?: number }).code || undefined,
    };
  }

  /**
   * Handle media element specific errors
   */
  public handleMediaError(
    mediaError: MediaError | null,
    context: string,
    metadata?: ErrorContext
  ): void {
    if (!mediaError) {
      this.handleError(null, context, metadata);
      return;
    }

    const errorMessages: Record<number, string> = {
      1: 'MEDIA_ERR_ABORTED: The fetching of the media was aborted by the user',
      2: 'MEDIA_ERR_NETWORK: A network error occurred while fetching the media',
      3: 'MEDIA_ERR_DECODE: The media cannot be decoded',
      4: 'MEDIA_ERR_SRC_NOT_SUPPORTED: The media format is not supported',
    };

    const error: AudioError = {
      message: errorMessages[mediaError.code] || mediaError.message || 'Unknown media error',
      code: mediaError.code,
      name: 'MediaError',
    };

    this.handleError(error, context, metadata);
  }
}

// Export singleton instance
export const audioErrorHandler = AudioErrorHandler.getInstance();

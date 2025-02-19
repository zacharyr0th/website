declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    LOG_LEVEL?: 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace';

    // Storage Configuration
    STORAGE_ACCESS_KEY: string;
    STORAGE_SECRET_KEY: string;
    STORAGE_BUCKET_NAME: string;
    STORAGE_ENDPOINT: string;
    STORAGE_REGION: string;

    // Domain Configuration
    DOMAIN_NAME: string;

    // Development Configuration
    DEVELOPMENT_HOST?: string; // Optional: Development server host (defaults to 'localhost')
    DEVELOPMENT_PORT?: string; // Optional: Development server port (defaults to '3000')

    // Public Variables
    NEXT_PUBLIC_SITE_URL: string;
    NEXT_PUBLIC_GA_ID?: string;
    NEXT_PUBLIC_AUDIO_CDN_URL: string;

    // Security
    ENCRYPTION_KEY: string;
    GOOGLE_SITE_VERIFICATION?: string;
  }
}

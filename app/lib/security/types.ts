export interface SecurityHeaders {
  'X-Content-Type-Options'?: string;
  'X-Frame-Options'?: string;
  'Referrer-Policy'?: string;
  'Strict-Transport-Security'?: string;
  'Cache-Control'?: string;
  'Pragma'?: string;
  'Expires'?: string;
}

export interface CspDirectives {
  'default-src'?: string[];
  'script-src'?: string[];
  'style-src'?: string[];
  'img-src'?: string[];
  'connect-src'?: string[];
  'font-src'?: string[];
  'object-src'?: string[];
  'media-src'?: string[];
  'frame-src'?: string[];
  'worker-src'?: string[];
  'manifest-src'?: string[];
  'form-action'?: string[];
}

export interface ProblemDetails {
  type: string;
  title: string;
  status: number;
  detail: string | undefined;
  instance?: string;
}

export const ErrorType = {
  VALIDATION_ERROR: 'validation_error',
  INTERNAL_ERROR: 'internal_error',
  NOT_FOUND: 'not_found',
  UNAUTHORIZED: 'unauthorized',
  FORBIDDEN: 'forbidden',
} as const;

export interface SecurityConfig {
  includeCSP?: boolean;
  includeHSTS?: boolean;
  includeFrameOptions?: boolean;
  nonce?: string;
}

export interface RateLimitResult {
  headers: Record<string, string>;
  error?: Response;
}

export interface LogContext {
  [key: string]: string | number | boolean | undefined;
  category?: string;
  timestamp?: string;
  requestId?: string;
  userId?: string;
  ip?: string;
  userAgent?: string;
  path?: string;
  method?: string;
}

export enum ErrorType {
  VALIDATION_ERROR = 'validation_error',
  AUTHENTICATION_ERROR = 'authentication_error',
  AUTHORIZATION_ERROR = 'authorization_error',
  NOT_FOUND_ERROR = 'not_found_error',
  STORAGE_ERROR = 'storage_error',
  INTERNAL_ERROR = 'internal_error',
  RATE_LIMIT_ERROR = 'rate_limit_error',
  BAD_REQUEST_ERROR = 'bad_request_error',
}

export interface ValidationResult<T = unknown> {
  success: boolean;
  data?: T;
  errors?: Array<{
    path: string[];
    message: string;
  }>;
}

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

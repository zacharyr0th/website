/**
 * API Response Types
 */

export interface ApiResponse<T> {
  data: T;
}

export interface ApiErrorResponse {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export interface ApiHeaders extends Record<string, string> {
  'Cache-Control': string;
  'Content-Type': string;
  Vary?: string;
  'Content-Encoding'?: string;
}

import type { ProblemDetails } from '@/lib/security';

/**
 * API Response Types
 */

export interface ApiResponse<T> {
  data: T;
}

export interface ApiErrorResponse extends ProblemDetails {}

export interface ApiHeaders extends Record<string, string> {
  'Cache-Control': string;
  'Content-Type': string;
  Vary?: string;
  'Content-Encoding'?: string;
}

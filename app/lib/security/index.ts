import type { ProblemDetails } from './types';

// Essential security exports
export {
  getBaseSecurityHeaders,
  getStaticHeaders,
  getApiHeaders,
  getErrorHeaders,
} from './headers';

export { SECURITY_CONSTANTS, validateOrigin } from './constants';

export type { SecurityHeaders, CspDirectives, ProblemDetails } from './types';

export { ErrorType } from './types';

// CSP configuration
export { buildCSPHeader as getCSP, generateNonce } from './csp';

// CSP report schemas
export { cspReportSchema, reportToSchema } from './schemas';

// Error response utilities
export const createErrorResponse = (
  type: string,
  status: number,
  title: string,
  detail?: string
): ProblemDetails => ({
  type,
  title,
  status,
  detail,
});

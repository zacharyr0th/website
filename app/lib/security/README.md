# Security Library

Over-engineered enterprise-grade security middleware and utilities for a personal website.

### Core Security Components

| File                                       | Purpose                 | Key Features                                                                                     |
| ------------------------------------------ | ----------------------- | ------------------------------------------------------------------------------------------------ |
| [`index.ts`](./index.ts)                   | Main entry point        | • Exports all security features<br>• Type definitions<br>• Public API surface                    |
| [`access-control.ts`](./access-control.ts) | Access control system   | • Role-based permissions<br>• Resource-level access<br>• Permission flags<br>• Access validation |
| [`constants.ts`](./constants.ts)           | Security constants      | • Security headers<br>• Rate limit configs<br>• Allowed origins<br>• Security settings           |
| [`csp.ts`](./csp.ts)                       | Content Security Policy | • CSP builder<br>• Nonce generation<br>• Policy caching<br>• Directive management                |
| [`headers.ts`](./headers.ts)               | Security headers        | • Header generation<br>• CORS configuration<br>• Cache control<br>• Security options             |
| [`security.ts`](./security.ts)             | Core utilities          | • Origin validation<br>• Resource access<br>• Secure references<br>• Security constants          |
| [`validation.ts`](./validation.ts)         | Request validation      | • Schema validation<br>• Request sanitization<br>• Content validation<br>• Size limits           |

### Integration Points

| File                                                                             | Purpose             | Implementation Details                                                                    |
| -------------------------------------------------------------------------------- | ------------------- | ----------------------------------------------------------------------------------------- |
| [`/app/middleware.ts`](/app/middleware.ts)                                       | Security middleware | • Request pipeline<br>• Security checks<br>• Header application<br>• Access control       |
| [`/app/api/security/csp-report/route.ts`](/app/api/security/csp-report/route.ts) | CSP reporting       | • Violation logging<br>• Report validation<br>• Metrics collection<br>• Response handling |

### Configuration Files

| File                                 | Purpose         | Configuration Areas                                                                     |
| ------------------------------------ | --------------- | --------------------------------------------------------------------------------------- |
| [`/next.config.js`](/next.config.js) | Next.js config  | • Security headers<br>• CSP settings<br>• HSTS config<br>• Frame options                |
| [`/SECURITY.md`](/SECURITY.md)       | Security policy | • Vulnerability reporting<br>• Response SLAs<br>• Security features<br>• Best practices |

## Component Details

### Access Control System

The access control system manages user permissions and resource access.

**Role-Based Access Control (RBAC)**

- Provides a hierarchical approach to permissions that scales with application growth
- Enables quick updates to permissions across entire user groups
- Supports the principle of least privilege by default

**Bitwise Permissions**

- Offers efficient permission checks using single CPU operations
- Provides compact storage by representing multiple permissions in a single integer
- Reduces database load by minimizing permission-related queries
- Enables fast in-memory permission calculations

**Resource-Level Permissions**

- Implements granular control over specific resources and actions
- Supports context-aware permission checks for dynamic rules
- Enforces the principle of least privilege at the resource level
- Makes it easier to audit and track resource access

**Context-Aware Permission Checks**

- Enables dynamic permission rules based on request context
- Supports time-based and condition-based permission rules
- Provides context for security audit logging
- Allows for flexible policy enforcement based on circumstances

Located in [`access-control.ts`](./access-control.ts)

```typescript
enum Role {
  PUBLIC = 0, // Unauthenticated users - least privilege
  USER = 1, // Basic authenticated users - standard access
  EDITOR = 2, // Content management - partial admin rights
  ADMIN = 3, // System administration - full control
  SYSTEM = 4, // Internal processes - highest privilege, used for automation
}

const PERMISSION_FLAGS = {
  READ: 1 << 0, // 0001 - Most basic permission, required for viewing
  WRITE: 1 << 1, // 0010 - Allows content creation and modification
  DELETE: 1 << 2, // 0100 - Separate from write to prevent accidental deletions
  ADMIN: 1 << 3, // 1000 - Special actions requiring elevated privileges
} as const;

const RESOURCE_PERMISSIONS: Record<Resource, Record<string, Permission>> = {
  [Resource.ARTICLE]: {
    view: Permission.READ, // Basic viewing requires only READ
    edit: Permission.WRITE, // Content modification needs WRITE
    delete: Permission.DELETE, // Destructive actions need explicit DELETE
    publish: Permission.MANAGE, // Publishing affects site content, needs higher permission
  },
  [Resource.USER]: {
    view: Permission.READ,
    edit: Permission.WRITE,
    delete: Permission.MANAGE, // User deletion more sensitive than article deletion
    impersonate: Permission.ADMIN, // Highest risk action, requires ADMIN
  },
};

function checkPermission(
  userId: string,
  resource: Resource,
  action: string,
  context: Record<string, unknown>
): boolean {
  // Get user's role and permissions - cached for performance
  const userRole = getUserRole(userId);
  const userPermissions = getRolePermissions(userRole);

  // Get required permissions - defined at resource level
  const requiredPermissions = RESOURCE_PERMISSIONS[resource][action];

  // Special case handling - prevents privilege abuse
  if (action === 'delete' && resource === Resource.USER) {
    // Security: Prevent users from deleting their own account
    // Reason: Maintains accountability and prevents cleanup attempts
    if (context.targetUserId === userId) return false;
  }

  // Efficient bitwise check - single CPU operation
  return (userPermissions & requiredPermissions) === requiredPermissions;
}
```

### Content Security Policy

Content Security Policy (CSP) is a defense mechanism against various web attacks.

**LRU Cache for CSP Headers**

- Optimizes performance by caching frequently used CSP strings
- Reduces CPU overhead in high-traffic scenarios
- Prevents memory leaks through size limits and TTL
- Automatically removes stale policies to maintain freshness

**Strict CSP Directives**

- Provides defense against Cross-Site Scripting (XSS) attacks
- Controls resource loading to prevent unauthorized data exfiltration
- Mitigates clickjacking and injection attacks
- Enables violation reporting for security monitoring

**Cryptographic Nonce Generation**

- Enables secure use of inline scripts when necessary
- Provides unique per-request validation tokens
- Prevents script injection attacks through strict validation
- Offers more flexibility than hash-based CSP for dynamic content

**Dynamic CSP Building**

- Allows customization of policies based on request context
- Supports nonce integration for dynamic script handling
- Enables different policies for various routes and content types

Located in [`csp.ts`](./csp.ts)

```typescript
const cspCache = new LRU<string, string>({
  max: 100, // Limit cache size to prevent memory issues
  ttl: 3600000, // Expire after 1 hour to ensure fresh policies
  updateAgeOnGet: true, // Keep frequently used policies alive
});

const DEFAULT_DIRECTIVES = {
  // Only allow resources from same origin - prevents unauthorized data exfiltration
  'default-src': ["'self'"],

  // Script control - critical for XSS prevention
  'script-src': [
    "'self'", // Same-origin scripts only
    "'strict-dynamic'", // Trust scripts loaded by trusted scripts
    "'wasm-unsafe-eval'", // Needed for WebAssembly, carefully controlled
  ],

  // Style control - needed for modern frameworks
  'style-src': [
    "'self'", // Same-origin styles
    "'unsafe-inline'", // Required by many UI frameworks
  ],

  // Image control - common attack vector
  'img-src': [
    "'self'", // Same-origin images
    'data:', // Inline images (carefully controlled)
    'https:', // Secure external images
  ],

  // Network control - prevents unauthorized data transmission
  'connect-src': [
    "'self'", // Same-origin connections
    'https:', // Secure external connections
  ],

  'frame-ancestors': ["'none'"], // Prevent clickjacking attacks
  'base-uri': ["'self'"], // Prevent base tag hijacking
  'form-action': ["'self'"], // Prevent form injection attacks
  'object-src': ["'none'"], // Block plugin content - major attack vector
  'require-trusted-types-for': ["'script'"], // Prevent DOM XSS
} as const;

function generateNonce(): string {
  // Use crypto API for cryptographically secure values
  const random = new Uint8Array(16);
  crypto.getRandomValues(random);
  return Buffer.from(random).toString('base64');
}

function buildCSPHeader(nonce?: string): string {
  // Cache check - performance optimization
  if (!nonce) {
    const cached = cspCache.get('default');
    if (cached) return cached;
  }

  const directives = new Map(Object.entries(DEFAULT_DIRECTIVES));

  // Add nonce for dynamic scripts
  if (nonce) {
    const scriptSrc = directives.get('script-src') || [];
    directives.set('script-src', [...scriptSrc, `'nonce-${nonce}'`]);
  }

  // Additional security directives
  const enhancedDirectives = [
    'upgrade-insecure-requests', // Force HTTPS
    'block-all-mixed-content', // Prevent mixed content attacks
    'sandbox allow-scripts allow-same-origin', // Restrict dangerous features
  ];

  // Build and cache policy
  const parts = [
    ...Array.from(directives.entries()).map(([key, values]) => `${key} ${values.join(' ')}`),
    ...enhancedDirectives,
  ];

  const cspValue = parts.join('; ');

  // Cache non-nonce policies
  if (!nonce) {
    cspCache.set('default', cspValue);
  }

  return cspValue;
}
```

### Security Headers

Security headers provide browser-level protection against common web vulnerabilities.

**Comprehensive Security Headers**

- Prevents common web vulnerabilities through built-in browser features
- Reduces attack surface through restrictive policies

**Environment-Aware Headers**

- Prevents information leakage through header management

**Feature Policy Controls**

- Restricts access to powerful browser features
- Prevents unauthorized use of sensitive capabilities
- Enables fine-grained control over browser capabilities

Located in [`headers.ts`](./headers.ts)

```typescript
const SECURITY_HEADERS = {
  // Prevent MIME type sniffing attacks
  'X-Content-Type-Options': 'nosniff',

  // Prevent clickjacking attacks
  'X-Frame-Options': 'DENY',

  // Additional XSS protection layer
  'X-XSS-Protection': '1; mode=block',

  // Control information leakage
  'Referrer-Policy': 'strict-origin-when-cross-origin',

  // Restrict powerful browser features
  'Permissions-Policy': [
    'camera=()', // Prevent unauthorized camera access
    'microphone=()', // Prevent unauthorized audio recording
    'geolocation=()', // Prevent location tracking
    'interest-cohort=()', // Disable FLoC tracking
    'payment=()', // Prevent unauthorized payments
    'usb=()', // Prevent USB access
  ].join(', '),

  // Force HTTPS usage
  'Strict-Transport-Security': [
    'max-age=31536000', // Cache for 1 year
    'includeSubDomains', // Protect all subdomains
    'preload', // Include in browser HSTS list
  ].join('; '),

  // Clean up after sessions
  'Clear-Site-Data': [
    '"cache"', // Clear cached data
    '"cookies"', // Remove cookies
    '"storage"', // Clear storage (localStorage, etc)
    '"executionContexts"', // Reset runtime state
  ].join(', '),
} as const;

function applySecurityHeaders(headers: Headers, options: SecurityHeadersOptions = {}): void {
  const { environment = process.env.NODE_ENV, isApi = false, includeCSP = true } = options;

  // Apply base security headers
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    headers.set(key, value);
  });

  // Production-specific security
  if (environment === 'production') {
    headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }

  // API-specific security
  if (isApi) {
    headers.set('Cache-Control', 'no-store, max-age=0');
    headers.set('Pragma', 'no-cache');
  }

  // Remove headers that could expose server info
  headers.delete('X-Powered-By');
  headers.delete('Server');
}
```

### Request Validation

Request validation is the first line of defense against malicious input.

**Strict Validation Patterns**

- Prevents various injection attacks through strict input validation
- Reduces server-side processing risks from malformed input
- Provides defense against common attack patterns

**Comprehensive Request Validation**

- Blocks malicious requests before they reach application logic
- Reduces server load by rejecting invalid requests early
- Implements multiple validation layers

**Size and Method Validation**

- Prevents denial of service attacks through size limits
- Restricts HTTP methods to reduce attack surface
- Protects against common request-based attacks

Located in [`validation.ts`](./validation.ts)

```typescript
const PATTERNS = {
  // RFC 5322 compliant email validation
  // Why: Ensures valid email format while preventing injection
  EMAIL: /^[a-zA-Z0-9._%+-]{1,64}@[a-zA-Z0-9.-]{1,255}\.[a-zA-Z]{2,}$/,

  // Strong password requirements
  // Why: Prevents weak passwords while allowing special characters
  PASSWORD: /^(?=[A-Za-z0-9@$!%*?&]{8,64})(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[^]{8,64}$/,

  // Username restrictions
  // Why: Prevents special characters that could be used for injection
  USERNAME: /^[\w]{3,20}$/,

  // Phone number format
  // Why: Supports international numbers while preventing invalid formats
  PHONE: /^\+?[\d-]{10,15}$/,

  // Date validation
  // Why: Ensures valid dates in ISO format
  DATE: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,

  // URL validation
  // Why: Ensures HTTPS and prevents malicious URLs
  URL: /^https:\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/,

  // Path validation
  // Why: Prevents directory traversal attacks
  PATH: /^[a-zA-Z0-9-_/]+$/,

  // JWT format validation
  // Why: Ensures proper token format before processing
  JWT: /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/,
} as const;

async function validateRequest(
  request: Request,
  context: ValidationContext
): Promise<ValidationResult> {
  const {
    method = request.method,
    contentType = request.headers.get('content-type'),
    body = await request.json().catch(() => ({})),
  } = context;

  // Size validation - prevents DoS attacks
  const contentLength = parseInt(request.headers.get('content-length') || '0');
  if (contentLength > MAX_REQUEST_SIZE) {
    return {
      valid: false,
      error: 'Request too large',
      details: { size: contentLength, max: MAX_REQUEST_SIZE },
    };
  }

  // Method validation - prevents unauthorized methods
  if (!ALLOWED_METHODS.includes(method)) {
    return {
      valid: false,
      error: 'Method not allowed',
      details: { method, allowed: ALLOWED_METHODS },
    };
  }

  // Content-Type validation - ensures proper request format
  if (['POST', 'PUT'].includes(method)) {
    if (!contentType?.includes('application/json')) {
      return {
        valid: false,
        error: 'Invalid content type',
        details: { contentType, expected: 'application/json' },
      };
    }
  }

  // Schema validation - ensures data integrity
  try {
    const schema = getValidationSchema(method, context.path);
    await schema.parseAsync(body);
  } catch (error) {
    return {
      valid: false,
      error: 'Validation failed',
      details: error,
    };
  }

  return { valid: true };
}
```

### CSP Reporting

CSP violation reporting provides security insights. Here's why each component matters:

**Violation Handling**

- Captures and analyzes security policy violations
- Provides early warning of potential attacks
- Helps identify and fix security misconfigurations

**Severity Classification**

- Enables appropriate response to different threat levels
- Supports efficient security resource allocation
- Helps identify security issues quickly

Located in [`/app/api/security/csp-report/route.ts`](/app/api/security/csp-report/route.ts)

```typescript
// CSP violation report handler
export async function POST(request: Request) {
  // Size limits to prevent DoS
  const MAX_REPORT_SIZE = 1024 * 100; // 100KB limit
  const contentLength = request.headers.get('content-length');

  // Validate request size
  if (contentLength && parseInt(contentLength) > MAX_REPORT_SIZE) {
    return new Response('Report too large', { status: 413 });
  }

  // Validate content type
  const contentType = request.headers.get('content-type');
  const validTypes = ['application/json', 'application/csp-report'];
  if (!contentType || !validTypes.some((type) => contentType.includes(type))) {
    return new Response('Invalid content type', { status: 415 });
  }

  try {
    const report = await request.json();

    // Determine report type and validate structure
    let validatedReport;
    let reportType: 'CSP' | 'Report-To';

    if ('csp-report' in report) {
      validatedReport = validateCSPReport(report['csp-report']);
      reportType = 'CSP';
    } else {
      validatedReport = validateReportToPayload(report);
      reportType = 'Report-To';
    }

    // Collect context for analysis
    const context = {
      timestamp: new Date().toISOString(),
      clientIP: request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
      reportSource: request.url,
      reportType,
    };

    // Log violation with full context
    logger.warn('CSP Violation', {
      report: validatedReport,
      context,
      severity: determineSeverity(validatedReport),
      suggestedActions: generateRemediation(validatedReport),
    });

    // Store for analysis
    await storeViolation({
      report: validatedReport,
      context,
      hash: generateReportHash(validatedReport),
    });

    // Return minimal response
    return new Response(null, {
      status: 204,
      headers: {
        ...getSecurityHeaders(),
        'Report-To': JSON.stringify({
          group: 'csp-endpoint',
          max_age: 86400,
          endpoints: [{ url: '/api/security/csp-report' }],
        }),
      },
    });
  } catch (error) {
    // Log error but don't expose details
    logger.error('CSP Report Processing Error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    });

    return new Response('Invalid report', { status: 400 });
  }
}

// Severity determination based on violation type
function determineSeverity(report: CSPReport): 'high' | 'medium' | 'low' {
  const { 'violated-directive': directive, 'blocked-uri': uri } = report;

  // High severity violations
  if (
    directive.startsWith('script-src') ||
    directive.startsWith('object-src') ||
    directive.startsWith('base-uri')
  ) {
    return 'high';
  }

  // Medium severity violations
  if (
    directive.startsWith('connect-src') ||
    directive.startsWith('frame-src') ||
    directive.startsWith('form-action')
  ) {
    return 'medium';
  }

  return 'low';
}

// Generate remediation suggestions
function generateRemediation(report: CSPReport): string[] {
  const suggestions: string[] = [];
  const { 'violated-directive': directive, 'blocked-uri': uri } = report;

  if (directive.startsWith('script-src')) {
    suggestions.push(
      'Add nonce or hash to script elements',
      'Consider using strict-dynamic',
      'Review third-party script sources'
    );
  }

  if (uri.startsWith('inline')) {
    suggestions.push('Move inline scripts/styles to external files', 'Implement nonce-based CSP');
  }

  return suggestions;
}
```

## Implementation Overview

### Core Security Features

1. **Access Control & Authentication**

   ```typescript
   // Role-based access with bitwise permissions
   const userPermissions = PERMISSION_FLAGS.READ | PERMISSION_FLAGS.WRITE;
   const canAccess = (userPermissions & requiredPermissions) === requiredPermissions;
   ```

   - 5-level role hierarchy (PUBLIC → USER → EDITOR → ADMIN → SYSTEM)
   - Permission caching with TTL
   - Real-time access validation
   - Resource-level permissions
   - Context-aware decisions
   - Audit logging

2. **Request Protection**

   ```typescript
   // Adaptive rate limiting example
   const limiter = new AdaptiveRateLimiter({
     baseLimit: 100,
     windowMs: 60000,
     adaptiveFactors: {
       errorRate: 0.1,
       successRate: 0.9,
     },
   });
   ```

   - Pattern-based rate limiting
   - Automatic rate adjustment
   - Burst detection
   - Error rate monitoring
   - Success pattern rewards

3. **Memory Security**

   ```typescript
   // Secure memory handling
   const { id, buffer } = secureMemory.allocate(1024, 'sensitive-data');
   try {
     // Process sensitive data with overflow protection
     buffer.write(data, 0, Math.min(data.length, buffer.length));
   } finally {
     secureMemory.free(id); // Guaranteed cleanup
   }
   ```

   - Secure buffer allocation
   - Overflow protection
   - Memory pressure monitoring
   - Automatic cleanup
   - Usage tracking
   - Integrity verification

4. **Headers & CSP**

   ```typescript
   // Dynamic CSP with nonce
   const nonce = generateNonce();
   const csp = generateCSP({
     scriptSrc: ["'self'", `'nonce-${nonce}'`],
     styleSrc: ["'self'", "'unsafe-inline'"],
     imgSrc: ["'self'", 'data:', 'https:'],
     connectSrc: ["'self'", 'https:'],
   });
   ```

   - Dynamic nonce generation
   - Strict CSP policies
   - CORS configuration
   - Security headers
   - SRI validation

5. **Input Validation**

   ```typescript
   // Request validation
   const validator = new RequestValidator({
     body: validateBody,
     query: validateQuery,
     headers: validateHeaders,
   });
   ```

   - Request sanitization
   - Type validation
   - Schema validation
   - XSS prevention
   - SQL injection prevention

6. **Error Handling**

   ```typescript
   // Structured error responses
   const errorResponse = createErrorResponse({
     type: ErrorType.VALIDATION_ERROR,
     status: 400,
     message: 'Invalid input',
     details: validationErrors,
     sanitize: true,
   });
   ```

   - Error sanitization
   - Structured responses
   - Environment-aware details
   - Audit logging
   - Stack trace handling

7. **Monitoring & Metrics**

   ```typescript
   // Security metrics collection
   const metrics = new SecurityMetrics({
     rateLimit: trackRateLimits(),
     memory: trackMemoryUsage(),
     access: trackAccessAttempts(),
     errors: trackSecurityErrors(),
   });
   ```

   - Real-time monitoring
   - Performance tracking
   - Security event logging
   - Metric aggregation
   - Alert generation

8. **Load Management**

   ```typescript
   // Circuit breaker implementation
   const breaker = new CircuitBreaker({
     failureThreshold: 5,
     resetTimeout: 30000,
     monitorInterval: 1000,
   });
   ```

   - Load balancing
   - Circuit breaking
   - Resource protection
   - Performance optimization
   - Health checks

9. **Threat Detection & Response**

   ```typescript
   // Pattern detection and response
   const detector = new PatternDetector({
     patterns: securityPatterns,
     responseThreshold: 0.8,
     autoBlock: true,
   });
   ```

   - Behavioral analysis
   - Attack pattern recognition
   - Automated responses
   - Threat logging
   - Admin notifications

10. **Secure Sessions**

    ```typescript
    // Session management
    const session = new SecureSession({
      ttl: 3600,
      renewalThreshold: 0.8,
      maxConcurrent: 5,
    });
    ```

    - Secure token generation
    - Session lifecycle management
    - Concurrent session limits
    - Auto-renewal policies
    - Inactivity timeouts

11. **API Security**

    ```typescript
    // API protection
    const apiSecurity = new ApiSecurity({
      authentication: ['jwt', 'apiKey'],
      rateLimit: true,
      logging: true,
    });
    ```

    - Multiple auth methods
    - Rate limiting
    - Request validation
    - Response sanitization
    - Audit logging

12. **File Security**

    ```typescript
    // Secure file operations
    const fileHandler = new SecureFileHandler({
      maxSize: '10mb',
      allowedTypes: ['image/*', 'application/pdf'],
      scanForMalware: true,
    });
    ```

    - Upload validation
    - Malware scanning
    - Type verification
    - Size restrictions
    - Secure storage

13. **Encryption Services**

    ```typescript
    // Data encryption
    const encryption = new EncryptionService({
      algorithm: 'aes-256-gcm',
      keyRotation: true,
      backupEnabled: true,
    });
    ```

    - Data at rest encryption
    - Key rotation
    - Secure key storage
    - Backup management
    - Decryption policies

14. **Compliance Tools**
    ```typescript
    // Compliance tracking
    const compliance = new ComplianceTracker({
      standards: ['GDPR', 'CCPA', 'SOC2'],
      autoReport: true,
    });
    ```
    - Regulatory compliance
    - Audit trails
    - Data retention
    - Privacy controls
    - Report generation

## Security Middleware Pipeline

```typescript
export async function middleware(request: NextRequest) {
  // 1. Request Context
  const context = createRequestContext(request);

  // 2. Origin & Protocol
  validateOrigin(request);
  enforceHttps(request);

  // 3. Rate Limiting
  const rateLimit = await checkRateLimit(request);

  // 4. Load Management
  await checkServerLoad(request);

  // 5. Memory Management
  const secureMemory = allocateSecureMemory();

  // 6. Access Control
  await validateAccess(request);

  // 7. Request Processing
  const response = await processRequest(request);

  // 8. Security Headers
  applySecurityHeaders(response);

  // 9. Cleanup
  cleanupSecureMemory();

  return response;
}
```

## Configuration Examples

### Rate Limiting

```typescript
const rateLimitConfig = {
  standard: {
    windowMs: 60000,
    max: 100,
    message: 'Too many requests',
  },
  api: {
    windowMs: 60000,
    max: 50,
    message: 'API rate limit exceeded',
  },
  auth: {
    windowMs: 300000,
    max: 5,
    message: 'Too many auth attempts',
  },
};
```

### Memory Management

```typescript
const memoryConfig = {
  maxBufferSize: 10 * 1024 * 1024, // 10MB
  maxTotalMemory: 100 * 1024 * 1024, // 100MB
  cleanupInterval: 60000, // 1 minute
  pressureThreshold: 0.8, // 80% usage
};
```

### Security Headers

```typescript
const headerConfig = {
  csp: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'strict-dynamic'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    upgradeInsecureRequests: true,
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
};
```

import { api, core, security } from '@/lib';

const logger = core.createLogger('csp', { category: core.LogCategory.SECURITY });

const MAX_REPORT_SIZE = 1024 * 100; // 100KB limit

export async function POST(request: Request) {
  try {
    // Check request size
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > MAX_REPORT_SIZE) {
      return security.createErrorResponse(
        security.ErrorType.VALIDATION_ERROR,
        413,
        'Report too large'
      );
    }

    // Validate content type
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType?.includes('application/csp-report')) {
      return security.createErrorResponse(
        security.ErrorType.VALIDATION_ERROR,
        415,
        'Invalid content type'
      );
    }

    const report = await request.json();

    // Determine report type and validate
    let validatedReport;
    let reportType: 'CSP' | 'Report-To';

    if ('csp-report' in report) {
      validatedReport = security.cspReportSchema.parse(report);
      reportType = 'CSP';
    } else {
      validatedReport = security.reportToSchema.parse(report);
      reportType = 'Report-To';
    }

    // Get request metadata from the request headers
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const cspReportOnly = request.headers.get('Content-Security-Policy-Report-Only') || '';

    // Log the violation with additional context
    logger.warn(
      JSON.stringify({
        report: validatedReport,
        metadata: {
          clientIP,
          userAgent,
          reportSource: request.url,
        },
        message: `${reportType} violation detected`,
        timestamp: new Date().toISOString(),
      })
    );

    return api.createApiResponse(null, {
      status: 204,
      headers: {
        ...security.getBaseSecurityHeaders(),
        'Content-Security-Policy-Report-Only': cspReportOnly,
      },
    });
  } catch (error) {
    logger.error(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        type: 'CSP_REPORT_ERROR',
        timestamp: new Date().toISOString(),
        url: request.url,
      })
    );

    return security.createErrorResponse(
      security.ErrorType.VALIDATION_ERROR,
      400,
      'Invalid CSP report',
      process.env.NODE_ENV === 'development' ? JSON.stringify(error) : undefined
    );
  }
}

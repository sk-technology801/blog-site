
// Centralized API response utility for Cosmic Blog
import * as Sentry from '@sentry/nextjs';
import { handleError } from './error-handler';

// Initialize Sentry (if used)
if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    tracesSampleRate: 1.0,
  });
}

// Standardized response object structure
const createResponseObject = (success, data = null, message = '', code = 200, details = {}) => ({
  success,
  data,
  message,
  code,
  timestamp: new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' }),
  details,
});

// Cosmic-themed success messages
const cosmicSuccessMessages = {
  200: 'Cosmic Success! Your data is orbiting safely!',
  201: 'Launched Successfully! A new star is born in the cosmos!',
  204: 'Cosmic Void Cleared! No content, but all is well!',
};

// Create success response
export function createSuccessResponse(data, message = cosmicSuccessMessages[200], code = 200, context = {}) {
  const response = createResponseObject(true, data, message, code, context);
  
  // Log to console
  console.log(`[${response.timestamp}] Success: ${response.message}`, {
    code: response.code,
    data: response.data,
    context,
  });

  // Log to Sentry
  Sentry.captureMessage(`API Success: ${response.message}`, {
    level: 'info',
    extra: { code: response.code, data: response.data, context },
  });

  return response;
}

// Create error response (integrates with error-handler.js)
export function createErrorResponse(error, context = {}) {
  const errorObj = handleError(error, context);
  const response = createResponseObject(false, null, errorObj.message, errorObj.code, errorObj.details);
  
  // Log to console (already logged in handleError)
  console.log(`[${response.timestamp}] Error Response: ${response.message}`, {
    code: response.code,
    details: response.details,
    context,
  });

  // Log to Sentry (already logged in handleError)
  return response;
}

// Handle API response for client-side fetch
export async function handleApiResponse(response, context = {}) {
  if (!response.ok) {
    const error = await handleApiError(response, context);
    return createErrorResponse(error, context);
  }
  const data = await response.json();
  return createSuccessResponse(data, cosmicSuccessMessages[response.status] || 'Operation Successful!', response.status, context);
}

// Wrap API route handlers
export function withApiResponse(handler) {
  return async (req, res) => {
    try {
      const result = await handler(req, res);
      return NextResponse.json(createSuccessResponse(result.data, result.message, result.status || 200, { route: req.nextUrl.pathname }));
    } catch (error) {
      const errorResponse = createErrorResponse(error, { route: req.nextUrl.pathname });
      return NextResponse.json(errorResponse, { status: errorResponse.code });
    }
  };
}

// Format response for UI display
export function formatResponseForUI(response) {
  return {
    message: response.message,
    code: response.code,
    ariaMessage: `${response.success ? 'Success' : 'Error'} ${response.code}: ${response.message}`,
  };
}

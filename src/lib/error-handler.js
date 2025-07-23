
// Centralized error handling utility for Cosmic Blog
import * as Sentry from '@sentry/nextjs';

// Initialize Sentry (if used)
if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    tracesSampleRate: 1.0,
  });
}

// Standardized error object structure
const createErrorObject = (message, code, details = {}) => ({
  message,
  code,
  details,
  timestamp: new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' }),
});

// Cosmic-themed error messages
const cosmicErrorMessages = {
  400: 'Cosmic Misalignment! Please check your input and try again.',
  401: 'Unauthorized Orbit! Please log in to continue.',
  403: 'Forbidden Galaxy! You don’t have access to this area.',
  404: 'Lost in the Cosmos! This resource couldn’t be found.',
  500: 'Cosmic Connection Lost! Our servers are drifting—try again soon.',
  default: 'Unexpected Anomaly! Something went wrong in the universe.',
};

// Handle errors and return standardized response
export function handleError(error, context = {}) {
  let errorObj;

  // Handle HTTP errors (e.g., from fetch)
  if (error instanceof Response) {
    const status = error.status;
    const message = cosmicErrorMessages[status] || cosmicErrorMessages.default;
    errorObj = createErrorObject(message, status, { url: error.url });
  }
  // Handle JavaScript errors
  else if (error instanceof Error) {
    const status = error.status || 500;
    const message = cosmicErrorMessages[status] || error.message || cosmicErrorMessages.default;
    errorObj = createErrorObject(message, status, { stack: error.stack });
  }
  // Handle unknown errors
  else {
    errorObj = createErrorObject(cosmicErrorMessages.default, 500, { rawError: error });
  }

  // Log to console
  console.error(`[${errorObj.timestamp}] Error: ${errorObj.message}`, {
    code: errorObj.code,
    details: errorObj.details,
    context,
  });

  // Log to Sentry
  Sentry.captureException(error, {
    extra: { ...errorObj.details, context },
  });

  // Return standardized error for UI display
  return errorObj;
}

// Handle API errors (e.g., fetch requests in SignupPage.jsx, LoginPage.jsx)
export async function handleApiError(response, context = {}) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const error = new Response(null, {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
    });
    return handleError(error, { ...context, apiResponse: errorData });
  }
  return null;
}

// Wrap async functions to handle errors (e.g., getServerSideProps)
export function withErrorHandler(handler) {
  return async (...args) => {
    try {
      return await handler(...args);
    } catch (error) {
      return { props: { error: handleError(error, { handler: handler.name }) } };
    }
  };
}

// Format error for UI display (e.g., in SignupPage.jsx)
export function formatErrorForUI(errorObj) {
  return {
    message: errorObj.message,
    code: errorObj.code,
    ariaMessage: `Error ${errorObj.code}: ${errorObj.message}`,
  };
}

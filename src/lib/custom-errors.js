
// Custom error classes for Cosmic Blog
import * as Sentry from '@sentry/nextjs';

// Base custom error class
class CosmicError extends Error {
  constructor(message, code, details = {}) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.details = {
      ...details,
      timestamp: new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' }),
    };

    // Log to Sentry
    Sentry.captureException(this, {
      extra: this.details,
    });

    // Log to console
    console.error(`[${this.details.timestamp}] ${this.name}: ${message}`, {
      code,
      details,
    });
  }
}

// Authentication error (e.g., invalid credentials)
export class AuthError extends CosmicError {
  constructor(message = 'Cosmic Credentials Misaligned! Please check your login details.', details = {}) {
    super(message, 401, details);
  }
}

// Validation error (e.g., invalid form input)
export class ValidationError extends CosmicError {
  constructor(message = 'Cosmic Input Misalignment! Please verify your data.', details = {}) {
    super(message, 400, details);
  }
}

// API error (e.g., failed API request)
export class ApiError extends CosmicError {
  constructor(message = 'Cosmic Connection Lost! The server is drifting.', details = {}) {
    super(message, 500, details);
  }
}

// Database error (e.g., failed database query)
export class DatabaseError extends CosmicError {
  constructor(message = 'Cosmic Database Nebula! Data retrieval failed.', details = {}) {
    super(message, 500, details);
  }
}

// Helper function to throw custom errors
export function throwError(type, message, details = {}) {
  switch (type) {
    case 'auth':
      throw new AuthError(message, details);
    case 'validation':
      throw new ValidationError(message, details);
    case 'api':
      throw new ApiError(message, details);
    case 'database':
      throw new DatabaseError(message, details);
    default:
      throw new CosmicError(message || 'Unexpected Cosmic Anomaly!', 500, details);
  }
}

// Helper function to check if an error is a specific custom error type
export function isCustomError(error, type) {
  const errorTypes = {
    auth: AuthError,
    validation: ValidationError,
    api: ApiError,
    database: DatabaseError,
    cosmic: CosmicError,
  };
  return error instanceof (errorTypes[type] || CosmicError);
}

// Helper function to format custom error for UI
export function formatCustomErrorForUI(error) {
  return {
    message: error.message,
    code: error.code,
    ariaMessage: `Error ${error.code}: ${error.message}`,
  };
}

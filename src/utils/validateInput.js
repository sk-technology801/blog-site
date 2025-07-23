
// Input validation utility for Cosmic Blog
import { throwError, ValidationError } from './custom-errors';
import * as Sentry from '@sentry/nextjs';

// Initialize Sentry (if used)
if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    tracesSampleRate: 1.0,
  });
}

// Validation rules
const validationRules = {
  username: {
    test: (value) => typeof value === 'string' && value.trim().length >= 3 && value.trim().length <= 20 && /^[a-zA-Z0-9_-]+$/.test(value),
    message: 'Cosmic Username Misaligned! Must be 3-20 characters, using letters, numbers, underscores, or hyphens.',
  },
  email: {
    test: (value) => typeof value === 'string' && /\S+@\S+\.\S+/.test(value.trim()),
    message: 'Cosmic Email Misaligned! Please provide a valid email address.',
  },
  password: {
    test: (value) => typeof value === 'string' && value.trim().length >= 6 && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(value),
    message: 'Cosmic Password Misaligned! Must be at least 6 characters with one uppercase, one lowercase, and one number.',
  },
  bio: {
    test: (value) => typeof value === 'string' && value.trim().length <= 500,
    message: 'Cosmic Bio Too Vast! Must be 500 characters or less.',
  },
  avatar: {
    test: (value) => !value || (typeof value === 'string' && /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(value.trim())),
    message: 'Cosmic Avatar Misaligned! Must be a valid image URL (jpg, jpeg, png, gif).',
  },
  title: {
    test: (value) => typeof value === 'string' && value.trim().length >= 3 && value.trim().length <= 100,
    message: 'Cosmic Title Misaligned! Must be 3-100 characters.',
  },
  content: {
    test: (value) => typeof value === 'string' && value.trim().length >= 10 && value.trim().length <= 5000,
    message: 'Cosmic Content Misaligned! Must be 10-5000 characters.',
  },
};

// Validate a single field
export function validateField(field, value, context = {}) {
  const rule = validationRules[field];
  if (!rule) {
    throwError('validation', `Unknown field: ${field}`, { field, value, context });
  }
  if (!rule.test(value)) {
    throw new ValidationError(rule.message, { field, value, context });
  }
  return true;
}

// Validate multiple fields (e.g., form data)
export function validateForm(data, fields, context = {}) {
  const errors = {};
  for (const field of fields) {
    try {
      validateField(field, data[field], context);
    } catch (error) {
      if (isCustomError(error, 'validation')) {
        errors[field] = formatCustomErrorForUI(error).message;
      } else {
        throw error; // Re-throw unexpected errors
      }
    }
  }
  if (Object.keys(errors).length > 0) {
    throwError('validation', 'Form validation failed', { errors, context });
  }
  return true;
}

// Validate API payload
export function validateApiPayload(payload, requiredFields, context = {}) {
  const errors = {};
  for (const field of requiredFields) {
    if (!(field in payload)) {
      errors[field] = `Cosmic Payload Missing! ${field} is required.`;
      continue;
    }
    try {
      validateField(field, payload[field], context);
    } catch (error) {
      if (isCustomError(error, 'validation')) {
        errors[field] = formatCustomErrorForUI(error).message;
      } else {
        throw error;
      }
    }
  }
  if (Object.keys(errors).length > 0) {
    throwError('validation', 'API payload validation failed', { errors, context });
  }
  return true;
}

// Import isCustomError and formatCustomErrorForUI for compatibility
export { isCustomError, formatCustomErrorForUI } from './custom-errors';


import { NextResponse } from 'next/server';

// Middleware function
export function middleware(request) {
  const { pathname, searchParams } = request.nextUrl;

  // Mock authentication check (replace with next-auth or JWT validation)
  const isAuthenticated = checkAuth(request); // Example: Check for a token in cookies

  // Protected routes
  const protectedRoutes = ['/write', /^\/authors\/[^/]+$/]; // /write and /authors/[id]
  const isProtectedRoute = protectedRoutes.some((route) =>
    typeof route === 'string' ? pathname === route : route.test(pathname)
  );

  // Redirect unauthenticated users to login for protected routes
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirectReason', 'cosmic-auth');
    loginUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from login/signup to /write
  if ((pathname === '/login' || pathname === '/signup') && isAuthenticated) {
    return NextResponse.redirect(new URL('/write', request.url));
  }

  // Add custom security headers
  const response = NextResponse.next();
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; img-src 'self' https://source.unsplash.com; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-eval';"
  );

  // Log request details (for debugging or monitoring)
  console.log(`[${new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' })}] ${request.method} ${pathname}`);
  // Optionally log to Sentry
  // import * as Sentry from '@sentry/nextjs';
  // Sentry.captureMessage(`Request: ${request.method} ${pathname}`);

  return response;
}

// Mock authentication check (replace with real auth logic)
function checkAuth(request) {
  // Example: Check for a token in cookies
  const token = request.cookies.get('auth_token')?.value;
  return !!token; // Return true if token exists (mock logic)
}

// Configuration for middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - /api (API routes)
     * - /_next/static (static files)
     * - /_next/image (image optimization files)
     * - /favicon.ico (favicon file)
     * - /images/* (image files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
};

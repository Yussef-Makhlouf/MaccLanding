import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

export default createMiddleware({
  ...routing,
  localePrefix: 'always', // ✅ Force locale prefix for all locales
  localeDetection: false, // ✅ Disable auto-detection to avoid conflicts
});

export const config = {
  matcher: [
    // Match all pathnames except for static files and API routes
    '/((?!api|_next|_vercel|.*\\..*).*)',
    // Also match root
    '/'
  ]
};
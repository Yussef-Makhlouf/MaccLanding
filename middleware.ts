import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect /new to main website
  if (pathname === '/new') {
    return NextResponse.redirect('https://macc-fm.com');
  }

  // Apply maintenance page to all other routes (except static files and API and maintenance page itself)
  if (
    !pathname.startsWith('/api') &&
    !pathname.startsWith('/_next') &&
    !pathname.startsWith('/images') &&
    !pathname.startsWith('/fonts') &&
    !pathname.includes('.') && // Exclude files with extensions
    !pathname.includes('/maintenance') // Exclude maintenance page
  ) {
    // Redirect to maintenance page with locale
    const locale = pathname.startsWith('/ar') ? 'ar' : 'en';
    return NextResponse.redirect(new URL(`/${locale}/maintenance`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all pathnames except for static files and API routes
    '/((?!api|_next|_vercel|.*\\..*).*)',
    // Also match root
    '/'
  ]
};

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect /new to main website
  if (pathname === '/new') {
    return NextResponse.redirect('https://macc-fm.com');
  }

  // ⚠️ تم تعطيل وضع الصيانة - إذا أردت تفعيله مرة أخرى، أزل التعليق عن الكود التالي:

  if (
    !pathname.startsWith('/api') &&
    !pathname.startsWith('/_next') &&
    !pathname.startsWith('/images') &&
    !pathname.startsWith('/fonts') &&
    !pathname.includes('.') &&
    !pathname.includes('/maintenance')
  ) {
    const locale = pathname.startsWith('/ar') ? 'ar' : 'en';
    return NextResponse.redirect(new URL(`/${locale}/maintenance`, request.url));
  }


  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
    '/'
  ]
};

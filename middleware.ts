import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname, search, origin, basePath } = request.nextUrl;

  const publicPaths = ['/_next', '/favicon.ico', '/static'];

  // Avoid infinite redirects/invalid response
  // on paths that never require authentication
  if (
    ['/auth/signin', '/auth/signup'].some((p) => pathname.startsWith(p)) ||
    publicPaths.some((p) => pathname.startsWith(p))
  ) {
    return;
  }

  const protectedPages = ['/create/story'];
  const access_token = request.cookies.get('access_token')?.value;

  // Redirect to signin page if not authenticated
  if (protectedPages.some((p) => pathname.startsWith(p)) && !access_token) {
    const url = new URL('/auth/signin', request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

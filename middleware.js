import { NextResponse } from 'next/server';
const SKIP = ['/api/', '/admin/', '/_next/', '/favicon', '/robots'];
export function middleware(request) {
  const { pathname } = request.nextUrl;
  if (SKIP.some(p => pathname.startsWith(p))) return NextResponse.next();
  const url = new URL('/api/track', request.url);
  const h = {};
  ['x-forwarded-for', 'x-real-ip', 'x-vercel-ip-country', 'x-vercel-ip-country-code', 'x-vercel-ip-city', 'x-vercel-ip-country-region']
    .forEach(k => { h[k] = request.headers.get(k) || ''; });
  fetch(url.toString(), { method: 'POST', headers: { 'Content-Type': 'application/json', ...h } }).catch(() => { });
  return NextResponse.next();
}
export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'] };

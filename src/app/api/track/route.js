import { NextResponse } from 'next/server';
import { extractGeoFromRequest, trackVisitor } from '@/lib/geoTracker';
import { trackingLimiter, rateLimitResponse } from '@/lib/rateLimit';

export async function POST(request) {
  // ── Rate limit: 10 requests per minute per IP ──
  const { success, remaining, limit } = trackingLimiter.check(request, 10);
  if (!success) {
    return rateLimitResponse(60);
  }

  try {
    const geo = extractGeoFromRequest(request);
    const result = await trackVisitor(geo);

    const response = NextResponse.json({ ok: true, ...result });
    response.headers.set('X-RateLimit-Limit', String(limit));
    response.headers.set('X-RateLimit-Remaining', String(remaining));
    return response;
  } catch (err) {
    console.error('[track] error:', err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

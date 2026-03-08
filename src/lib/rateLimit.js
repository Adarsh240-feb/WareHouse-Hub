/**
 * Rate Limiter for Next.js API Routes
 *
 * Uses an in-memory sliding-window counter keyed by IP address.
 * Works well for single-instance deployments and Vercel serverless
 * (each cold start resets the map, which is acceptable for basic protection).
 *
 * Usage:
 *   import { rateLimit } from '@/lib/rateLimit';
 *
 *   const limiter = rateLimit({ interval: 60_000, uniqueTokenPerInterval: 500, limit: 10 });
 *
 *   // Inside an API route handler:
 *   const { success, remaining, limit } = limiter.check(request, 10);
 *   if (!success) return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
 */

/**
 * Create a rate limiter instance.
 *
 * @param {Object}  opts
 * @param {number}  opts.interval              - Sliding window size in milliseconds (default: 60 000 = 1 min)
 * @param {number}  opts.uniqueTokenPerInterval - Max unique IPs to track before oldest entries are evicted (default: 500)
 * @returns {{ check: (request: Request, limit: number) => { success: boolean, remaining: number, limit: number } }}
 */
export function rateLimit({ interval = 60_000, uniqueTokenPerInterval = 500 } = {}) {
    // Map<token, number[]>  — each value is an array of timestamps
    const tokenCache = new Map();

    // Periodic cleanup to prevent memory leaks
    const cleanupInterval = setInterval(() => {
        const now = Date.now();
        for (const [token, timestamps] of tokenCache) {
            const valid = timestamps.filter((t) => now - t < interval);
            if (valid.length === 0) {
                tokenCache.delete(token);
            } else {
                tokenCache.set(token, valid);
            }
        }
    }, interval);

    // Allow garbage collection of the timer in serverless environments
    if (cleanupInterval.unref) {
        cleanupInterval.unref();
    }

    return {
        /**
         * Check whether a request is within the rate limit.
         *
         * @param {Request} request - The incoming request (used to extract IP)
         * @param {number}  limit   - Max requests allowed within the interval
         * @returns {{ success: boolean, remaining: number, limit: number }}
         */
        check(request, limit) {
            const token = getClientIp(request);
            const now = Date.now();

            // Get existing timestamps or create new entry
            const timestamps = tokenCache.get(token) || [];

            // Filter to only timestamps within the current window
            const validTimestamps = timestamps.filter((t) => now - t < interval);

            // Evict oldest tokens if we've hit the max unique token count
            if (!tokenCache.has(token) && tokenCache.size >= uniqueTokenPerInterval) {
                const oldestToken = tokenCache.keys().next().value;
                tokenCache.delete(oldestToken);
            }

            // Check if over limit
            if (validTimestamps.length >= limit) {
                tokenCache.set(token, validTimestamps);
                return {
                    success: false,
                    remaining: 0,
                    limit,
                };
            }

            // Record this request
            validTimestamps.push(now);
            tokenCache.set(token, validTimestamps);

            return {
                success: true,
                remaining: limit - validTimestamps.length,
                limit,
            };
        },
    };
}

/**
 * Extract the client IP from a Next.js Request object.
 * Checks standard proxy headers first, then falls back to 'unknown'.
 *
 * @param {Request} request
 * @returns {string}
 */
function getClientIp(request) {
    // Vercel / proxy headers
    const forwarded = request.headers.get('x-forwarded-for');
    if (forwarded) {
        return forwarded.split(',')[0].trim();
    }

    const realIp = request.headers.get('x-real-ip');
    if (realIp) {
        return realIp.trim();
    }

    return 'unknown';
}

// ─── Pre-configured limiters for common use cases ──────────────────────────

/**
 * General API limiter — 10 requests per minute per IP.
 * Suitable for most API endpoints.
 */
export const apiLimiter = rateLimit({
    interval: 60_000,           // 1 minute
    uniqueTokenPerInterval: 500,
});

/**
 * Auth limiter — 5 requests per minute per IP.
 * Stricter limit for login / registration / password-reset endpoints.
 */
export const authLimiter = rateLimit({
    interval: 60_000,           // 1 minute
    uniqueTokenPerInterval: 500,
});

/**
 * Tracking limiter — 10 requests per minute per IP.
 * For the visitor tracking endpoint.
 */
export const trackingLimiter = rateLimit({
    interval: 60_000,           // 1 minute
    uniqueTokenPerInterval: 500,
});

/**
 * Helper to create a 429 Too Many Requests response with Retry-After header.
 *
 * @param {number} retryAfterSeconds - Seconds the client should wait (default: 60)
 * @returns {Response}
 */
export function rateLimitResponse(retryAfterSeconds = 60) {
    return new Response(
        JSON.stringify({
            error: 'Too many requests',
            message: 'You have exceeded the rate limit. Please try again later.',
            retryAfter: retryAfterSeconds,
        }),
        {
            status: 429,
            headers: {
                'Content-Type': 'application/json',
                'Retry-After': String(retryAfterSeconds),
                'X-RateLimit-Limit': '0',
                'X-RateLimit-Remaining': '0',
            },
        }
    );
}

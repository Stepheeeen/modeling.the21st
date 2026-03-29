import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Simple in-memory rate limiter for development (not suitable for distributed production)
// In production, use @upstash/ratelimit with Redis
const rateLimits = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10; // Adjust as needed

function rateLimiter(request: NextRequest) {
  const ip = (request as any).ip ?? request.headers.get("x-forwarded-for") ?? "127.0.0.1";
  const now = Date.now();
  const userData = rateLimits.get(ip) ?? { count: 0, lastReset: now };

  if (now - userData.lastReset > RATE_LIMIT_WINDOW_MS) {
    userData.count = 0;
    userData.lastReset = now;
  }

  userData.count++;
  rateLimits.set(ip, userData);

  return userData.count <= MAX_REQUESTS_PER_WINDOW;
}

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiRoute = nextUrl.pathname.startsWith("/api");
  const isPublicRoute = !nextUrl.pathname.startsWith("/admin");
  const isLoginPage = nextUrl.pathname === "/login";

  /* 
  // Rate Limiting for public API routes or public endpoints
  if (isApiRoute && isPublicRoute) {
    if (!rateLimiter(req as any)) {
      return new NextResponse("Too Many Requests", { status: 429 });
    }
  }
  */

  // Admin Route Protection
  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // Redirect logged-in users away from login page
  if (isLoggedIn && isLoginPage) {
    return NextResponse.redirect(new URL("/admin", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/api/:path*"],
};

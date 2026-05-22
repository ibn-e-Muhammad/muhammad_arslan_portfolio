import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /* ── Only protect /admin routes ──────────────── */
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const adminPassword = process.env.ADMIN_PASSWORD?.trim();
  if (!adminPassword) {
    console.error("ADMIN_PASSWORD is not set in environment variables.");
    return new Response("Server configuration error", { status: 500 });
  }

  /* ── Check for existing session cookie ───────── */
  const sessionCookie = request.cookies.get("admin_session");
  if (sessionCookie?.value === adminPassword) {
    return NextResponse.next();
  }

  /* ── Check for Basic Auth header ─────────────── */
  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Basic ")) {
    const base64 = authHeader.slice(6);
    const decoded = atob(base64);
    const [, password] = decoded.split(":");

    if (password === adminPassword) {
      /* Set a session cookie so the browser doesn't prompt every request */
      const response = NextResponse.next();
      response.cookies.set("admin_session", adminPassword, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24, // 24 hours
      });
      return response;
    }
  }

  /* ── Prompt for Basic Auth ───────────────────── */
  return new Response("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Admin Panel"',
    },
  });
}

export const config = {
  matcher: "/admin/:path*",
};

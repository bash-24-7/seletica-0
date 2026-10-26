import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/security";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("admin_session")?.value;

  // Protect Admin UI routes (except login)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const isValid = await verifyAdminToken(token);
    if (!isValid) {
      const loginUrl = new URL("/admin/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Protect Admin API mutation routes (POST, PUT, DELETE)
  if (
    pathname.startsWith("/api/admin") &&
    !pathname.startsWith("/api/admin/login") &&
    !pathname.startsWith("/api/admin/logout") &&
    req.method !== "GET"
  ) {
    const isValid = await verifyAdminToken(token);
    if (!isValid) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }
  }

  const res = NextResponse.next();
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  return res;
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

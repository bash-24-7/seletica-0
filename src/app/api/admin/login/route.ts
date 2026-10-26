import { NextRequest, NextResponse } from "next/server";
import { createAdminToken } from "@/lib/security";

const loginAttempts = new Map<string, { count: number; lockUntil: number }>();

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "local";
    const now = Date.now();
    const record = loginAttempts.get(ip);

    if (record && record.lockUntil > now) {
      return NextResponse.json(
        { error: "Too many failed attempts. Try again in 15 minutes." },
        { status: 429 }
      );
    }

    const { email, password } = await req.json();
    const adminEmail = process.env.ADMIN_EMAIL || "admin@seletica.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

    if (email === adminEmail && password === adminPassword) {
      loginAttempts.delete(ip);
      const token = await createAdminToken(email);

      const response = NextResponse.json({ success: true });
      response.cookies.set("admin_session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 12, // 12 hours
      });
      return response;
    }

    const attempts = (record?.count || 0) + 1;
    loginAttempts.set(ip, {
      count: attempts,
      lockUntil: attempts >= 5 ? now + 15 * 60 * 1000 : 0,
    });

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Authentication error" }, { status: 500 });
  }
}

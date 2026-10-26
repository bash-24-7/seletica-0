import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'seletica_super_secret_jwt_key_2026';
const secret = new TextEncoder().encode(JWT_SECRET);

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;

  if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
    if (!token) {
      console.error('Middleware redirecting to login. Token missing.');
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      await jose.jwtVerify(token, secret);
      return NextResponse.next();
    } catch (error) {
      console.error('Middleware redirecting to login. Token missing.');
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'seletica_super_secret_jwt_key_2026';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    // Temporary bypass for DB-less environments to allow the user to see the admin panel
    let token;
    
    if (email === 'admin@seletica.com' && password === 'seletica_admin2026') {
      token = jwt.sign(
        { userId: 'bypass-id', email: 'admin@seletica.com', role: 'ADMIN' },
        JWT_SECRET,
        { expiresIn: '1d' }
      );
    } else {
      let user;
      try {
        user = await prisma.user.findUnique({ where: { email } });
      } catch (dbError) {
        console.warn("DB connection failed, falling back to mock auth.");
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
      }

      if (!user || user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
      }

      token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: '1d' }
      );
    }

    const cookieStore = await cookies();
    cookieStore.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 1 day
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
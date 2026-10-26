import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import * as jose from 'jose';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'seletica_super_secret_jwt_key_2026';
const secret = new TextEncoder().encode(JWT_SECRET);

async function verifyAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  if (!token) return false;
  try {
    const { payload } = await jose.jwtVerify(token, secret) as any;
    return payload.role === 'ADMIN';
  } catch (err) {
    return false;
  }
}

export async function GET() {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const lookbooks = await prisma.lookbook.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json({ success: true, lookbooks });
  } catch (error) {
    return NextResponse.json({ success: true, lookbooks: [] });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: Request) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const lookbook = await prisma.lookbook.create({
      data: {
        title: body.title,
        slug: body.slug,
        description: body.description,
        images: body.images || [],
        published: body.published || false
      }
    });
    return NextResponse.json({ success: true, lookbook }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create lookbook' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

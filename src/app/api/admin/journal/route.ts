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
    const articles = await prisma.journalPost.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json({ success: true, articles });
  } catch (error) {
    return NextResponse.json({ success: true, articles: [] });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: Request) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const article = await prisma.journalPost.create({
      data: {
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt,
        content: body.content,
        image: body.image,
        published: body.published || false
      }
    });
    return NextResponse.json({ success: true, article }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

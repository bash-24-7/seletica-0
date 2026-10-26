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
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    let content = [];
    try {
      content = await prisma.brandContent.findMany({
        orderBy: { order: 'asc' }
      });
    } catch (e) {
      console.warn("DB offline, falling back to mock content");
      content = [
        { id: '1', key: 'about_story', title: 'Our Story', subtitle: 'Quiet Luxury', content: 'Default story', isActive: true },
        { id: '2', key: 'vision_mission', title: 'Our Vision', subtitle: 'Modern Elegance', content: 'Default vision', isActive: true },
      ];
    }
    return NextResponse.json({ success: true, content });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(request: Request) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, key, title, subtitle, content, image, isActive, order } = await request.json();

    let updated;
    try {
      if (id) {
        updated = await prisma.brandContent.update({
          where: { id },
          data: { title, subtitle, content, image, isActive, order }
        });
      } else {
        updated = await prisma.brandContent.create({
          data: { key, title, subtitle, content, image, isActive, order }
        });
      }
    } catch (e) {
      console.warn("DB offline, mocking update");
      updated = { id: id || 'new-id', key, title, subtitle, content, image, isActive, order };
    }

    return NextResponse.json({ success: true, content: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

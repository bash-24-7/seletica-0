import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { cookies } from 'next/headers';
import * as jose from 'jose';


const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET && process.env.NEXT_PHASE !== 'phase-production-build') {
  throw new Error('JWT_SECRET environment variable is missing');
}
const JWT_SECRET_STRING = JWT_SECRET as string;
const secret = new TextEncoder().encode(JWT_SECRET_STRING);

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
    const timeline = await prisma.timelineEvent.findMany({ orderBy: { year: 'asc' } });
    return NextResponse.json({ success: true, timeline });
  } catch (error) {
    return NextResponse.json({ error: 'Database query failed' }, { status: 500 }); // Fallback
  }
}

export async function POST(request: Request) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const event = await prisma.timelineEvent.create({
      data: {
        year: body.year,
        title: body.title,
        description: body.description,
        image: body.image,
        order: body.order || 0
      }
    });
    return NextResponse.json({ success: true, event }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}

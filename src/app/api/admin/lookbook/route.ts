import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function GET() {
  try {
    const lookbooks = await prisma.lookbookItem.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json({ success: true, lookbooks });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch lookbooks' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const lookbook = await prisma.lookbookItem.create({
      data: {
        title: body.title,
        season: body.season || 'FW26',
        image: body.images ? body.images[0] : '',
      }
    });
    return NextResponse.json({ success: true, lookbook }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create lookbook' }, { status: 500 });
  }
}

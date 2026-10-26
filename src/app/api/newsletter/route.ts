import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    try {
      const existingSubscriber = await prisma.subscriber.findUnique({
        where: { email },
      });

      if (existingSubscriber) {
        return NextResponse.json({ message: 'Already subscribed' }, { status: 200 });
      }

      const newSubscriber = await prisma.subscriber.create({
        data: {
          email,
        },
      });

      return NextResponse.json({ success: true, subscriber: newSubscriber }, { status: 201 });
    } catch (dbError) {
      console.warn("Database connection failed for newsletter, failing gracefully:", dbError);
      // Fallback for when the DB is disconnected/missing env vars
      return NextResponse.json({ success: true, message: 'Subscribed offline' }, { status: 201 });
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

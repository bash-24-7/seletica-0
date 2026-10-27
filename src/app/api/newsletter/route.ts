import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

const newsletterAttempts = new Map<string, { count: number; lockUntil: number }>();

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "local";
    const now = Date.now();
    const record = newsletterAttempts.get(ip);

    if (record && record.lockUntil > now) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Rate limit update
    const attempts = (record?.count || 0) + 1;
    newsletterAttempts.set(ip, {
      count: attempts,
      lockUntil: attempts >= 10 ? now + 15 * 60 * 1000 : 0, // max 10 requests per 15 minutes
    });
    if (attempts >= 10) return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });


    const bodyText = await request.text();
    if (bodyText.length > 500) {
       return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
    }

    let body;
    try {
        body = JSON.parse(bodyText);
    } catch {
        return NextResponse.json({ error: 'Malformed JSON' }, { status: 400 });
    }

    let email = body.email;

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    email = email.trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || email.length > 255) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

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
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

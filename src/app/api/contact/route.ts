import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

const contactAttempts = new Map<string, { count: number; lockUntil: number }>();

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "local";
    const now = Date.now();
    const record = contactAttempts.get(ip);

    if (record && record.lockUntil > now) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Rate limit update
    const attempts = (record?.count || 0) + 1;
    contactAttempts.set(ip, {
      count: attempts,
      lockUntil: attempts >= 5 ? now + 15 * 60 * 1000 : 0, // max 5 requests per 15 minutes
    });
    if (attempts >= 5) return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });

    const bodyText = await request.text();
    if (bodyText.length > 5000) { // Max payload size 5KB
       return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
    }

    let body;
    try {
        body = JSON.parse(bodyText);
    } catch {
        return NextResponse.json({ error: 'Malformed JSON' }, { status: 400 });
    }

    let { name, email, subject, message } = body;

    if (!name || !email || !message || typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }

    email = email.trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || email.length > 255) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    if (name.length > 100 || message.length > 2000) {
        return NextResponse.json({ error: 'Input too long' }, { status: 400 });
    }

    const newContactMessage = await prisma.contactSubmission.create({
      data: {
        name,
        email,
        subject: typeof subject === "string" ? subject.slice(0, 200) : 'General Inquiry',
        message,
      },
    });

    return NextResponse.json({ success: true, message: newContactMessage }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

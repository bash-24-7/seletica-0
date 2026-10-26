import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { requireAdminAuth } from "@/lib/security";

export async function GET() {
  try {
    const collections = await prisma.collection.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(collections);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(req: NextRequest) {
  const authError = await requireAdminAuth(req);
  if (authError) return authError;

  try {
    const body = await req.json();
    const name = String(body.name || "").trim();
    const gender = String(body.gender || "women").toLowerCase();
    const description = String(body.description || "").trim();
    const coverImage = String(body.coverImage || "").trim();

    if (!name) {
      return NextResponse.json({ error: "Collection name is required" }, { status: 400 });
    }

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const collection = await prisma.collection.upsert({
      where: { slug },
      update: { name, gender, description, coverImage },
      create: { name, slug, gender, description, coverImage },
    });

    return NextResponse.json(collection, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create collection" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const authError = await requireAdminAuth(req);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    await prisma.collection.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete collection" }, { status: 500 });
  }
}

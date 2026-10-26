import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { requireAdminAuth } from "@/lib/security";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(products);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(req: NextRequest) {
  const authError = await requireAdminAuth(req);
  if (authError) return authError;

  try {
    const body = await req.json();
    const { name, description, price, images, gender, collection, featured } = body;

    if (!name || price === undefined) {
      return NextResponse.json({ error: "Name and price are required" }, { status: 400 });
    }

    const imageArray = Array.isArray(images)
      ? JSON.stringify(images)
      : typeof images === "string" && images.startsWith("[")
      ? images
      : JSON.stringify([images]);

    const product = await prisma.product.create({
      data: {
        name: String(name).trim(),
        description: String(description || ""),
        price: parseFloat(String(price)),
        images: imageArray,
        gender: String(gender || "women").toLowerCase(),
        collection: String(collection || "archive").toLowerCase(),
        sizes: JSON.stringify(["BESPOKE_TAILOR", "CUSTOM_MEASUREMENT"]),
        featured: Boolean(featured),
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const authError = await requireAdminAuth(req);
  if (authError) return authError;

  try {
    const body = await req.json();
    const { id, name, description, price, images, gender, collection, featured } = body;

    if (!id) return NextResponse.json({ error: "Product ID required" }, { status: 400 });

    const imageArray = Array.isArray(images)
      ? JSON.stringify(images)
      : typeof images === "string" && images.startsWith("[")
      ? images
      : JSON.stringify([images]);

    const updated = await prisma.product.update({
      where: { id },
      data: {
        name: String(name).trim(),
        description: String(description || ""),
        price: parseFloat(String(price)),
        images: imageArray,
        gender: String(gender || "women").toLowerCase(),
        collection: String(collection || "archive").toLowerCase(),
        featured: Boolean(featured),
      },
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const authError = await requireAdminAuth(req);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Product ID required" }, { status: 400 });

    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}

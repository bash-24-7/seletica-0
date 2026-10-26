import { NextRequest, NextResponse } from "next/server";

const SECRET_KEY = process.env.ADMIN_SECRET_KEY || "seletica-ultra-luxury-hmac-secret-2026-key";

async function getCryptoKey() {
  const enc = new TextEncoder();
  return await crypto.subtle.importKey(
    "raw",
    enc.encode(SECRET_KEY),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function bufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function createAdminToken(email: string): Promise<string> {
  const exp = Date.now() + 1000 * 60 * 60 * 12; // 12 hours expiration
  const payload = JSON.stringify({ email, role: "admin", exp });
  const base64Payload = btoa(payload);
  const key = await getCryptoKey();
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(base64Payload)
  );
  return `${base64Payload}.${bufferToHex(signature)}`;
}

export async function verifyAdminToken(token?: string): Promise<boolean> {
  if (!token || !token.includes(".")) return false;
  try {
    const [base64Payload, sigHex] = token.split(".");
    const key = await getCryptoKey();
    const expectedSig = await crypto.subtle.sign(
      "HMAC",
      key,
      new TextEncoder().encode(base64Payload)
    );
    if (bufferToHex(expectedSig) !== sigHex) return false;

    const payload = JSON.parse(atob(base64Payload));
    if (Date.now() > payload.exp) return false;
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export async function requireAdminAuth(req: NextRequest): Promise<NextResponse | null> {
  const token = req.cookies.get("admin_session")?.value;
  const isValid = await verifyAdminToken(token);
  if (!isValid) {
    return NextResponse.json(
      { error: "Unauthorized: Invalid or expired security token." },
      { status: 401 }
    );
  }
  return null;
}

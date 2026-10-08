import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import type { Product } from "@/lib/types";

const file = path.join(process.cwd(), "data", "products.json");
const authorized = (request: NextRequest) => {
  const password = process.env.ADMIN_PASSWORD;
  return Boolean(password && request.headers.get("authorization") === `Bearer ${password}`);
};

export async function GET() {
  const data = await fs.readFile(file, "utf8");
  return NextResponse.json(JSON.parse(data));
}

export async function PUT(request: NextRequest) {
  if (!authorized(request)) return NextResponse.json({ error: "رمز مدیریت درست نیست؛ لطفاً دوباره بررسی کنید." }, { status: 401 });
  const products = await request.json() as Product[];
  if (!Array.isArray(products) || products.some(p => !p.id || !p.name || !p.image)) {
    return NextResponse.json({ error: "اطلاعات یکی از محصولات کامل نیست؛ نام، شناسه و تصویر را بررسی کنید." }, { status: 400 });
  }
  await fs.writeFile(file, JSON.stringify(products, null, 2), "utf8");
  return NextResponse.json({ ok: true });
}

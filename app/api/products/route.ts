import { NextRequest, NextResponse } from "next/server";
import type { Product } from "@/lib/types";
import { isAdmin } from "@/lib/auth";
import { readDatabase, updateDatabase } from "@/lib/store";
export async function GET() { return NextResponse.json((await readDatabase()).products); }
export async function PUT(request: NextRequest) {
  if (!isAdmin(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const products = await request.json() as Product[];
  if (!Array.isArray(products) || products.some(p => !p.id || !p.slug || !p.name?.fa || !p.name?.en || !p.image || !Array.isArray(p.packages))) return NextResponse.json({ error: "Product information is incomplete." }, { status: 400 });
  await updateDatabase(database => { database.products = products; }); return NextResponse.json({ ok: true });
}

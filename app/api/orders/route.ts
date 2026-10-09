import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { isAdmin } from "@/lib/auth";
import { readDatabase, updateDatabase } from "@/lib/store";
import type { Order } from "@/lib/types";
const clean = (value: unknown, max = 300) => String(value ?? "").trim().slice(0, max);
export async function GET(request: NextRequest) { if (!isAdmin(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); return NextResponse.json((await readDatabase()).orders); }
export async function POST(request: NextRequest) {
  const body = await request.json(); const database = await readDatabase(); const product = database.products.find(item => item.id === body.productId && item.available); const pack = product?.packages.find(item => item.id === body.packageId); const quantity = Number(body.quantity);
  if (!product || !pack || !Number.isInteger(quantity) || quantity < 1 || quantity > 100000 || !clean(body.customerName, 100) || !/^\+?[0-9 ()-]{7,20}$/.test(clean(body.phone, 30)) || !clean(body.province, 80) || !clean(body.city, 80) || !clean(body.address, 300)) return NextResponse.json({ error: "Please complete all required fields with valid information." }, { status: 400 });
  const order: Order = { id: `SB-${new Date().getFullYear()}-${randomBytes(3).toString("hex").toUpperCase()}`, createdAt: new Date().toISOString(), customerName: clean(body.customerName, 100), phone: clean(body.phone, 30), whatsapp: clean(body.whatsapp, 30), province: clean(body.province, 80), city: clean(body.city, 80), address: clean(body.address, 300), productId: product.id, productName: product.name.en, packageId: pack.id, packageLabel: pack.label.en, packageWeightKg: pack.weightKg, quantity, totalWeightKg: quantity * pack.weightKg, unitPriceAfn: pack.priceAfn, subtotalAfn: pack.priceAfn === null ? null : pack.priceAfn * quantity, notes: clean(body.notes, 1000), internalNotes: "", status: "pending" };
  await updateDatabase(db => { db.orders.unshift(order); }); return NextResponse.json({ ok: true, orderNumber: order.id, totalWeightKg: order.totalWeightKg, subtotalAfn: order.subtotalAfn }, { status: 201 });
}
export async function PATCH(request: NextRequest) {
  if (!isAdmin(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); const body = await request.json(); const allowed = ["pending", "confirmed", "preparing", "dispatched", "delivered", "cancelled"];
  if (!body.id || !allowed.includes(body.status)) return NextResponse.json({ error: "Invalid order update." }, { status: 400 });
  try { await updateDatabase(db => { const order = db.orders.find(item => item.id === body.id); if (!order) throw new Error("Order not found"); order.status = body.status; order.internalNotes = clean(body.internalNotes, 1000); if (body.unitPriceAfn === null || Number(body.unitPriceAfn) >= 0) { order.unitPriceAfn = body.unitPriceAfn === null ? null : Number(body.unitPriceAfn); order.subtotalAfn = order.unitPriceAfn === null ? null : order.unitPriceAfn * order.quantity; } }); } catch { return NextResponse.json({ error: "Order not found" }, { status: 404 }); }
  return NextResponse.json({ ok: true });
}

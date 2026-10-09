import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { getOrders } from "@/lib/store";
const csvCell = (value: unknown) => `"${String(value ?? "").replaceAll('"', '""')}"`;
export async function GET(request: NextRequest) { if (!isAdmin(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); const fields = ["id","createdAt","customerName","phone","whatsapp","province","city","address","productName","packageLabel","quantity","totalWeightKg","unitPriceAfn","subtotalAfn","status","notes","internalNotes"] as const; const rows = (await getOrders()).map(order => fields.map(field => csvCell(order[field])).join(",")); return new NextResponse([fields.join(","), ...rows].join("\n"), { headers: { "content-type": "text/csv; charset=utf-8", "content-disposition": "attachment; filename=sarchashma-orders.csv" } }); }

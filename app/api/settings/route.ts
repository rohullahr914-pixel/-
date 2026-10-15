import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/auth";
import { readDatabase, updateDatabase } from "@/lib/store";
import type { SiteSettings } from "@/lib/types";
export async function GET() { return NextResponse.json((await readDatabase()).settings); }
export async function PUT(request: NextRequest) { if (!isAdmin(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); const settings = await request.json() as SiteSettings; if (!settings.email || !settings.address?.fa || !Array.isArray(settings.deliveryRules)) return NextResponse.json({ error: "Settings are incomplete." }, { status: 400 }); await updateDatabase(db => { db.settings = settings; }); revalidatePath("/"); revalidatePath("/facilities"); revalidatePath("/exports"); return NextResponse.json({ ok: true }); }

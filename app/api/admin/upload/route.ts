import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { randomBytes } from "node:crypto";
import { isAdmin } from "@/lib/auth";
export async function POST(request: NextRequest) { if (!isAdmin(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); const form = await request.formData(); const file = form.get("file"); if (!(file instanceof File) || file.size > 8 * 1024 * 1024 || !["image/jpeg", "image/png", "image/webp"].includes(file.type)) return NextResponse.json({ error: "Upload a JPG, PNG, or WebP image under 8 MB." }, { status: 400 }); const extension = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg"; const name = `${Date.now()}-${randomBytes(3).toString("hex")}.${extension}`; const directory = path.join(process.cwd(), "public", "uploads"); await fs.mkdir(directory, { recursive: true }); await fs.writeFile(path.join(directory, name), Buffer.from(await file.arrayBuffer())); return NextResponse.json({ path: `/uploads/${name}` }); }

import { NextRequest, NextResponse } from "next/server";
import { createSession, verifyPassword } from "@/lib/auth";
export async function POST(request: NextRequest) { const { password } = await request.json(); if (!verifyPassword(String(password || ""))) return NextResponse.json({ error: "Invalid password" }, { status: 401 }); const response = NextResponse.json({ ok: true }); const cookie = createSession(); response.cookies.set(cookie.name, cookie.value, cookie.options); return response; }

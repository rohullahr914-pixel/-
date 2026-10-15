import { NextRequest, NextResponse } from "next/server";
import { createSession, verifyCredentials } from "@/lib/auth";
export async function POST(request: NextRequest) {
  const { email, password } = await request.json().catch(() => ({ email: "", password: "" }));
  if (!verifyCredentials(String(email || ""), String(password || ""))) return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  const response = NextResponse.json({ ok: true });
  const cookie = createSession();
  response.cookies.set(cookie.name, cookie.value, cookie.options);
  return response;
}

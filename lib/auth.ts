import { createHmac, timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";
const COOKIE = "sb_admin";
const maxAge = 60 * 60 * 12;
const secret = () => process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "";
const sign = (value: string) => createHmac("sha256", secret()).update(value).digest("hex");
export function verifyPassword(password: string) { const expected = process.env.ADMIN_PASSWORD || ""; if (!expected || password.length !== expected.length) return false; return timingSafeEqual(Buffer.from(password), Buffer.from(expected)); }
export function createSession() { const expires = String(Math.floor(Date.now() / 1000) + maxAge); return { name: COOKIE, value: `${expires}.${sign(expires)}`, options: { httpOnly: true, sameSite: "strict" as const, secure: Boolean(process.env.NEXT_PUBLIC_SITE_URL?.startsWith("https://")), path: "/", maxAge } }; }
export function isAdmin(request: NextRequest) { const raw = request.cookies.get(COOKIE)?.value || ""; const [expires, signature] = raw.split("."); if (!expires || !signature || Number(expires) < Date.now() / 1000 || !secret()) return false; const expected = sign(expires); return signature.length === expected.length && timingSafeEqual(Buffer.from(signature), Buffer.from(expected)); }
export const sessionCookieName = COOKIE;

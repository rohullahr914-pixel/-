import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";
const COOKIE = "sb_admin";
const maxAge = 60 * 60 * 12;
const ADMIN_EMAIL = "rohullahr914@gmail.com";
const ADMIN_PASSWORD_HASH = Buffer.from(
  "3f841566f9a7a442294dedb055797813b1b687013ef4393aa85df415ed3dcbd5",
  "hex",
);
const secret = () => process.env.ADMIN_SESSION_SECRET || ADMIN_PASSWORD_HASH.toString("hex");
const sign = (value: string) => createHmac("sha256", secret()).update(value).digest("hex");
const digest = (value: string) => createHash("sha256").update(value).digest();
export function verifyCredentials(email: string, password: string) {
  if (email.trim().toLowerCase() !== ADMIN_EMAIL) return false;
  return timingSafeEqual(digest(password), ADMIN_PASSWORD_HASH);
}
export function createSession() { const expires = String(Math.floor(Date.now() / 1000) + maxAge); const payload = `${expires}:${ADMIN_EMAIL}`; return { name: COOKIE, value: `${expires}.${sign(payload)}`, options: { httpOnly: true, sameSite: "strict" as const, secure: Boolean(process.env.NEXT_PUBLIC_SITE_URL?.startsWith("https://")), path: "/", maxAge } }; }
export function isAdmin(request: NextRequest) { const raw = request.cookies.get(COOKIE)?.value || ""; const [expires, signature] = raw.split("."); if (!expires || !signature || Number(expires) < Date.now() / 1000 || !secret()) return false; const expected = sign(`${expires}:${ADMIN_EMAIL}`); return signature.length === expected.length && timingSafeEqual(Buffer.from(signature), Buffer.from(expected)); }
export const sessionCookieName = COOKIE;

import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
export async function GET(request: NextRequest) { return NextResponse.json({ authenticated: isAdmin(request) }); }

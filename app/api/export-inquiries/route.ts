import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { updateDatabase } from "@/lib/store";
import type { ExportInquiry } from "@/lib/types";
import { isAdmin } from "@/lib/auth";
const text=(v:unknown,n=200)=>String(v??"").trim().slice(0,n);
export async function POST(request:NextRequest){const b=await request.json();const volumeMt=Number(b.volumeMt);if(!text(b.company)||!text(b.contactName)||!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(text(b.email))||!text(b.country)||!Number.isFinite(volumeMt)||volumeMt<=0)return NextResponse.json({error:"Please complete all required business details."},{status:400});const inquiry:ExportInquiry={id:`EX-${randomBytes(3).toString("hex").toUpperCase()}`,createdAt:new Date().toISOString(),company:text(b.company),contactName:text(b.contactName),email:text(b.email),whatsapp:text(b.whatsapp),country:text(b.country),product:text(b.product),volumeMt,packaging:text(b.packaging),notes:text(b.notes,1000)};await updateDatabase(db=>{db.exportInquiries.unshift(inquiry)});return NextResponse.json({ok:true,inquiryNumber:inquiry.id},{status:201})}
export async function GET(request:NextRequest){if(!isAdmin(request))return NextResponse.json({error:"Unauthorized"},{status:401});const {readDatabase}=await import("@/lib/store");return NextResponse.json((await readDatabase()).exportInquiries)}

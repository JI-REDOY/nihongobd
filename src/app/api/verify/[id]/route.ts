import { NextRequest, NextResponse } from "next/server";
import { verifyCertificate } from "@/lib/verify";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const result = await verifyCertificate(id);
  return NextResponse.json(result);
}
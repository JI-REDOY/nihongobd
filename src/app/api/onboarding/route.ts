import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getCourseGoal, setCourseGoal } from "@/lib/onboarding";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const goal = await getCourseGoal(session.user.id);
  return NextResponse.json({ goal });
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { durationDays } = body;

  if (![30, 60, 90, 180].includes(durationDays)) {
    return NextResponse.json({ error: "Invalid duration" }, { status: 400 });
  }

  const goal = await setCourseGoal(session.user.id, durationDays);
  return NextResponse.json({ goal });
}
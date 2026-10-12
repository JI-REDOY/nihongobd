import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getProgress } from "@/lib/progress";
import {
  getUserCertificate,
  issueCertificate,
  isEligibleForCertificate,
  calculateN5Completion,
} from "@/lib/certificate";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cert = await getUserCertificate(session.user.id);
  const progress = await getProgress(session.user.id);

  return NextResponse.json({
    certificate: cert,
    completion: calculateN5Completion(progress),
    eligible: isEligibleForCertificate(progress),
  });
}

export async function POST() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const progress = await getProgress(session.user.id);

  if (!isEligibleForCertificate(progress)) {
    return NextResponse.json(
      { error: "অসম্পূর্ণ — ৮০% এর বেশি সম্পন্ন করতে হবে" },
      { status: 400 }
    );
  }

  const cert = await issueCertificate(
    session.user.id,
    session.user.name || "শিক্ষার্থী",
    progress
  );

  return NextResponse.json({ certificate: cert });
}
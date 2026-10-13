import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getProgress } from "@/lib/progress";
import {
  getUserCertificateByLevel,
  issueCertificate,
  isEligibleForCertificate,
  isEligibleForN4Certificate,
  calculateN5Completion,
  calculateN4Completion,
} from "@/lib/certificate";

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const level = (url.searchParams.get("level") || "n5") as "n5" | "n4";

  if (level !== "n5" && level !== "n4") {
    return NextResponse.json({ error: "Invalid level" }, { status: 400 });
  }

  const cert = await getUserCertificateByLevel(session.user.id, level);
  const progress = await getProgress(session.user.id);

  const completion =
    level === "n5"
      ? calculateN5Completion(progress)
      : calculateN4Completion(progress);

  const eligible =
    level === "n5"
      ? isEligibleForCertificate(progress)
      : isEligibleForN4Certificate(progress);

  // ⭐ Name, current session থেকে নাও (certificate এর পুরানো name এর বদলে)
  const certWithCurrentName = cert
    ? {
        ...cert,
        userName: session.user.name || "শিক্ষার্থী",
      }
    : null;

  return NextResponse.json({
    certificate: certWithCurrentName,
    completion,
    eligible,
    level,
  });
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const level = (body.level || "n5") as "n5" | "n4";

  if (level !== "n5" && level !== "n4") {
    return NextResponse.json({ error: "Invalid level" }, { status: 400 });
  }

  const progress = await getProgress(session.user.id);

  const eligible =
    level === "n5"
      ? isEligibleForCertificate(progress)
      : isEligibleForN4Certificate(progress);

  if (!eligible) {
    return NextResponse.json(
      { error: "অসম্পূর্ণ — ৮০% এর বেশি সম্পন্ন করতে হবে" },
      { status: 400 }
    );
  }

  const cert = await issueCertificate(
    session.user.id,
    session.user.name || "শিক্ষার্থী",
    progress,
    level
  );

  return NextResponse.json({ certificate: cert });
}
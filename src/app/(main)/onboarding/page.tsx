import { OnboardingClient } from "@/components/onboarding/OnboardingClient";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";


export default async function OnboardingPage() {
  const session = await getSession();
  if (!session) redirect("/signin?callbackUrl=/onboarding");

  return <OnboardingClient userName={session.user.name || "শিক্ষার্থী"} />;
}
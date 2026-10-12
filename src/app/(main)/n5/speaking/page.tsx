import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { SpeechPractice } from "@/components/speaking/SpeechPractice";

export default async function SpeakingPage() {
  const session = await getSession();
  if (!session) redirect("/signin?callbackUrl=/n5/speaking");

  return (
    <div className="py-10 sm:py-14 bg-bg-alt min-h-screen">
      <Container>
        <SpeechPractice />
      </Container>
    </div>
  );
}
import { getSession } from "@/lib/session";
import { redirect, notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { SpeechPractice } from "@/components/speaking/SpeechPractice";
import type { Level } from "@/lib/data";
import { ALL_LEVELS } from "@/lib/levels";
interface PageProps {
  params: Promise<{ level: string }>;
}

export default async function SpeakingPage({ params }: PageProps) {
  const { level } = await params;
  if (!ALL_LEVELS.includes(level as Level)) notFound();

  const session = await getSession();
  if (!session) redirect(`/signin?callbackUrl=/${level}/speaking`);

  return (
    <div className="py-10 sm:py-14 bg-bg-alt min-h-screen">
      <Container>
        <SpeechPractice />
      </Container>
    </div>
  );
}
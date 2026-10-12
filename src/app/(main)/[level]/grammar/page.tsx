import { getSession } from "@/lib/session";
import { redirect, notFound } from "next/navigation";
import { GrammarList } from "@/components/grammar/GrammarList";
import { ALL_LEVELS, type Level } from "@/lib/data";

interface PageProps {
  params: Promise<{ level: string }>;
}

export default async function GrammarPage({ params }: PageProps) {
  const { level } = await params;
  if (!ALL_LEVELS.includes(level as Level)) notFound();

  const session = await getSession();
  if (!session) redirect(`/signin?callbackUrl=/${level}/grammar`);

  return <GrammarList level={level as Level} />;
}
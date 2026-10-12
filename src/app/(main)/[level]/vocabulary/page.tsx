import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { VocabList } from "@/components/vocab/VocabList";
import { ALL_LEVELS, type Level } from "@/lib/data";

interface PageProps {
  params: Promise<{ level: string }>;
}

export default async function VocabularyPage({ params }: PageProps) {
  const { level } = await params;

  if (!ALL_LEVELS.includes(level as Level)) notFound();

  const session = await getSession();
  if (!session) redirect(`/signin?callbackUrl=/${level}/vocabulary`);

  return <VocabList level={level as Level} />;
}
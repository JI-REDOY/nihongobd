import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getLevelData, ALL_LEVELS, type Level } from "@/lib/data";
import { GrammarDetail } from "@/components/grammar/GrammarDetail";

interface PageProps {
  params: Promise<{ level: string; id: string }>;
}

export default async function GrammarDetailPage({ params }: PageProps) {
  const { level, id } = await params;
  if (!ALL_LEVELS.includes(level as Level)) notFound();

  const session = await getSession();
  if (!session) redirect(`/signin?callbackUrl=/${level}/grammar/${id}`);

  const data = getLevelData(level as Level);
  const index = data.grammar.findIndex((g) => g.id === id);
  if (index === -1) notFound();

  const lesson = data.grammar[index];
  const prev = index > 0 ? data.grammar[index - 1] : null;
  const next = index < data.grammar.length - 1 ? data.grammar[index + 1] : null;

  return (
    <GrammarDetail
      lesson={lesson}
      prev={prev}
      next={next}
      level={level as Level}
    />
  );
}
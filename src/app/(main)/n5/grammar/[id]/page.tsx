import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { n5Grammar } from "@/lib/n5Grammar";
import { GrammarDetail } from "@/components/grammar/GrammarDetail";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function GrammarDetailPage({ params }: PageProps) {
  const { id } = await params;

  const session = await getSession();
  if (!session) redirect(`/signin?callbackUrl=/n5/grammar/${id}`);

  const index = n5Grammar.findIndex((g) => g.id === id);
  if (index === -1) notFound();

  const lesson = n5Grammar[index];
  const prev = index > 0 ? n5Grammar[index - 1] : null;
  const next = index < n5Grammar.length - 1 ? n5Grammar[index + 1] : null;

  return <GrammarDetail lesson={lesson} prev={prev} next={next} />;
}
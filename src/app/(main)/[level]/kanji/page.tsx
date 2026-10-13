import { getSession } from "@/lib/session";
import { redirect, notFound } from "next/navigation";
import { KanjiGrid } from "@/components/kanji/KanjiGrid";
import { ALL_LEVELS, type Level } from "@/lib/data";

interface PageProps {
  params: Promise<{ level: string }>;
  searchParams: Promise<{ q?: string }>;
}

export const dynamic = "force-dynamic";

export default async function KanjiPage({ params, searchParams }: PageProps) {
  const { level } = await params;
  const { q } = await searchParams;

  if (!ALL_LEVELS.includes(level as Level)) notFound();

  const session = await getSession();
  if (!session) redirect(`/signin?callbackUrl=/${level}/kanji`);

  // ⭐ key দিয়ে force re-render
  return (
    <KanjiGrid
      key={`${level}-${q || "all"}`}
      level={level as Level}
      initialSearch={q || ""}
    />
  );
}
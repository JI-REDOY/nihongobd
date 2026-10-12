import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { KanjiGrid } from "@/components/kanji/KanjiGrid";

export default async function KanjiPage() {
  const session = await getSession();
  if (!session) redirect("/signin?callbackUrl=/n5/kanji");

  return <KanjiGrid />;
}
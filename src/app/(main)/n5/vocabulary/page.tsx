import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { VocabList } from "@/components/vocab/VocabList";

export default async function VocabularyPage() {
  const session = await getSession();
  if (!session) redirect("/signin?callbackUrl=/n5/vocabulary");

  return <VocabList />;
}
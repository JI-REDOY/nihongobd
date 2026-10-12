import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { GrammarList } from "@/components/grammar/GrammarList";

export default async function GrammarPage() {
  const session = await getSession();
  if (!session) redirect("/signin?callbackUrl=/n5/grammar");

  return <GrammarList />;
}
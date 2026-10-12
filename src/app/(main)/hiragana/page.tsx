import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { KanaGrid } from "@/components/kana/KanaGrid";

export default async function HiraganaPage() {
  const session = await getSession();
  if (!session) redirect("/signin?callbackUrl=/hiragana");

  return <KanaGrid type="hiragana" />;
}
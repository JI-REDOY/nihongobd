import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { BadgesGrid } from "@/components/badges/BadgesGrid";

export default async function BadgesPage() {
  const session = await getSession();
  if (!session) redirect("/signin?callbackUrl=/badges");

  return <BadgesGrid />;
}
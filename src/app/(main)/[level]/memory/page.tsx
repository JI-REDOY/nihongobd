import { getSession } from "@/lib/session";
import { redirect, notFound } from "next/navigation";
import { MemoryPage } from "@/components/memory/MemoryPage";
import { ALL_LEVELS, type Level } from "@/lib/data";

interface PageProps {
  params: Promise<{ level: string }>;
}

export default async function MemoryRoute({ params }: PageProps) {
  const { level } = await params;
  if (!ALL_LEVELS.includes(level as Level)) notFound();

  const session = await getSession();
  if (!session) redirect(`/signin?callbackUrl=/${level}/memory`);

  return <MemoryPage level={level as Level} />;
}
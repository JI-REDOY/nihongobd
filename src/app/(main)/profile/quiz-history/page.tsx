import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { QuizHistory } from "@/components/quiz/QuizHistory";

export default async function QuizHistoryPage() {
  const session = await getSession();
  if (!session) redirect("/signin?callbackUrl=/profile/quiz-history");

  return <QuizHistory />;
}
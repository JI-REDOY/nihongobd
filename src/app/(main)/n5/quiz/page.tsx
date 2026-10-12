import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { QuizGame } from "@/components/quiz/QuizGame";

export default async function QuizPage() {
  const session = await getSession();
  if (!session) redirect("/signin?callbackUrl=/n5/quiz");

  return <QuizGame />;
}
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { DashboardClient } from "@/components/dashboard/DashboardClient";
import { getCourseGoal } from "@/lib/onboarding";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/signin?callbackUrl=/dashboard");

  const goal = await getCourseGoal(session.user.id);
  if (!goal) redirect("/onboarding");

  const user = session.user;

  return (
    <div className="py-10 sm:py-14 bg-bg-alt min-h-screen">
      <Container>
        <div className="max-w-5xl mx-auto">
          <DashboardClient
            userName={user.name || "শিক্ষার্থী"}
            courseGoal={{
              durationDays: goal.durationDays,
              dailyTarget: goal.dailyTarget,
              startedAt: goal.startedAt.toISOString(),
            }}
          />
        </div>
      </Container>
    </div>
  );
}
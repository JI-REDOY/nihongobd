import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { DashboardClient } from "@/components/dashboard/DashboardClient";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/signin?callbackUrl=/dashboard");

  const user = session.user;

  return (
    <div className="py-10 sm:py-14 bg-bg-alt min-h-screen">
      <Container>
        <div className="max-w-5xl mx-auto">
          <DashboardClient userName={user.name || "শিক্ষার্থী"} />
        </div>
      </Container>
    </div>
  );
}
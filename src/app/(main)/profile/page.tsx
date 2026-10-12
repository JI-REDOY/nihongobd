import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { ProgressChart } from "@/components/profile/ProgressChart";
import { StreakCard } from "@/components/profile/StreakCard";

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) redirect("/signin?callbackUrl=/profile");

  const { user } = session;

  return (
    <div className="py-10 sm:py-14 bg-bg-alt min-h-screen">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-2 font-bangla">
              আমার প্রোফাইল
            </h1>
            <p className="text-text-secondary font-bangla">
              তোমার অগ্রগতি ও অর্জন দেখো
            </p>
          </div>

          {/* Profile Card */}
          <div className="mb-6">
            <ProfileCard
              name={user.name || "শিক্ষার্থী"}
              email={user.email}
              image={user.image}
            />
          </div>

          {/* Streak Card */}
          <div className="mb-8">
            <StreakCard />
          </div>

          {/* Progress */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">📊</span>
              <h2 className="text-xl font-bold text-text-primary font-bangla">
                শেখার অগ্রগতি
              </h2>
            </div>
            <ProgressChart />
          </div>
        </div>
      </Container>
    </div>
  );
}
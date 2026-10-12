"use client";

import { useProgress } from "@/hooks/useProgress";
import { BadgeCard } from "./BadgeCard";
import { BADGES, getEarnedBadges } from "@/lib/badges";
import { Container } from "@/components/layout/Container";

export function BadgesGrid() {
  const { progress, loading } = useProgress();

  if (loading || !progress) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-48 rounded-2xl bg-bg-alt animate-pulse" />
        ))}
      </div>
    );
  }

  const earned = getEarnedBadges(progress);
  const earnedIds = new Set(earned.map((b) => b.id));
  const total = BADGES.length;
  const earnedCount = earned.length;
  const percent = Math.round((earnedCount / total) * 100);

  return (
    <div className="py-10">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-2 font-bangla">
            🏆 ব্যাজ
          </h1>
          <p className="text-text-secondary font-bangla">
            শেখার যাত্রায় তোমার অর্জন
          </p>
        </div>

        {/* Summary */}
        <div className="bg-gradient-to-br from-jp-red to-jp-red/80 rounded-2xl p-6 text-white shadow-card mb-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm opacity-90 font-bangla mb-1">
                তুমি অর্জন করেছ
              </p>
              <p className="text-3xl font-bold">
                {earnedCount} <span className="text-xl opacity-80">/ {total}</span>
              </p>
              <p className="text-xs opacity-80 font-bangla mt-1">
                ব্যাজ ({percent}%)
              </p>
            </div>
            <div className="w-20 h-20 rounded-2xl bg-white/15 flex items-center justify-center text-5xl">
              🏆
            </div>
          </div>

          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden mt-4">
            <div
              className="h-full bg-white transition-all duration-700 rounded-full"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {BADGES.map((badge) => {
            const isEarned = earnedIds.has(badge.id);
            const progressData = badge.progress(progress);

            return (
              <BadgeCard
                key={badge.id}
                badge={badge}
                earned={isEarned}
                progressData={progressData}
              />
            );
          })}
        </div>
      </Container>
    </div>
  );
}
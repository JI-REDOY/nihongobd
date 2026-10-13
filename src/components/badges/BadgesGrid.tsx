"use client";

import { useState } from "react";
import { useProgress } from "@/hooks/useProgress";
import { BadgeCard } from "./BadgeCard";
import { BADGES, getEarnedBadges } from "@/lib/badges";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";
import type { Level } from "@/lib/data";

const LEVEL_BADGES: Record<string, string[]> = {
  n5: [
    "hiragana-first", "hiragana-master", "katakana-master",
    "vocab-50", "vocab-200", "vocab-500", "vocab-800",
    "grammar-10", "grammar-50",
    "kanji-25", "kanji-100",
    "streak-3", "streak-7", "streak-30",
    "quiz-first", "quiz-10", "quiz-perfect",
    "n5-complete",
  ],
  n4: [
    "n4-vocab-100", "n4-vocab-500", "n4-vocab-1000",
    "n4-grammar-20", "n4-grammar-80",
    "n4-kanji-50", "n4-kanji-300",
    "n4-complete",
  ],
  general: ["streak-3", "streak-7", "streak-30", "quiz-first", "quiz-10", "quiz-perfect"],
};

export function BadgesGrid() {
  const { progress, loading } = useProgress();
  const [activeLevel, setActiveLevel] = useState<"n5" | "n4">("n5");

  if (loading || !progress) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-48 rounded-2xl bg-bg-alt animate-pulse" />
        ))}
      </div>
    );
  }

  const earnedIds = new Set(getEarnedBadges(progress).map((b) => b.id));

  // Filter badges by active level
  const levelBadgeIds = LEVEL_BADGES[activeLevel] || [];
  const displayBadges = BADGES.filter((b) => levelBadgeIds.includes(b.id));

  const earnedCount = displayBadges.filter((b) => earnedIds.has(b.id)).length;
  const total = displayBadges.length;
  const percent = total > 0 ? Math.round((earnedCount / total) * 100) : 0;

  const isN5 = activeLevel === "n5";
  const accentColor = isN5 ? "#BC002D" : "#006A4E";
  const accentColor2 = isN5 ? "#8E0021" : "#004A36";

  return (
    <div className="py-10">
      <Container>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-2 font-bangla">
            🏆 ব্যাজ
          </h1>
          <p className="text-text-secondary font-bangla">
            শেখার যাত্রায় তোমার অর্জন
          </p>
        </div>

        {/* Level Tabs */}
        <div className="inline-flex rounded-xl border border-border bg-white p-1 mb-6">
          <button
            onClick={() => setActiveLevel("n5")}
            className={cn(
              "px-5 py-2 rounded-lg text-sm font-bold transition-colors font-en",
              isN5
                ? "bg-jp-red text-white"
                : "text-text-secondary hover:bg-bg-alt"
            )}
          >
            N5
          </button>
          <button
            onClick={() => setActiveLevel("n4")}
            className={cn(
              "px-5 py-2 rounded-lg text-sm font-bold transition-colors font-en",
              !isN5
                ? "bg-bd-green text-white"
                : "text-text-secondary hover:bg-bg-alt"
            )}
          >
            N4
          </button>
        </div>

        {/* Summary */}
        <div
          className="rounded-2xl p-6 text-white shadow-card mb-8"
          style={{
            background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor2} 100%)`,
          }}
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm opacity-90 font-bangla mb-1">
                {activeLevel.toUpperCase()} — তুমি অর্জন করেছ
              </p>
              <p className="text-3xl font-bold">
                {earnedCount}{" "}
                <span className="text-xl opacity-80">/ {total}</span>
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
          {displayBadges.map((badge) => {
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
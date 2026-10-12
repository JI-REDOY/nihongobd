"use client";

import { useProgress } from "@/hooks/useProgress";

export function StreakCard() {
  const { progress, loading } = useProgress();

  if (loading || !progress) {
    return <div className="h-40 rounded-2xl bg-bg-alt animate-pulse" />;
  }

  const { current, longest } = progress.streak;

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-jp-red via-jp-red to-jp-red/80 rounded-2xl p-6 shadow-card text-white">
      {/* Decorative circles */}
      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/5" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/5" />

      <div className="relative">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl">
            🔥
          </div>
          <div>
            <p className="text-lg font-bold font-bangla">দৈনিক স্ট্রিক</p>
            <p className="text-xs opacity-90 font-bangla">
              প্রতিদিন পড়াশোনা চালিয়ে যাও
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4">
            <p className="text-3xl font-bold">{current}</p>
            <p className="text-xs opacity-90 mt-1 font-bangla">বর্তমান দিন</p>
          </div>
          <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4">
            <p className="text-3xl font-bold">{longest}</p>
            <p className="text-xs opacity-90 mt-1 font-bangla">সর্বোচ্চ দিন</p>
          </div>
        </div>
      </div>
    </div>
  );
}
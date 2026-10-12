"use client";

import { cn } from "@/lib/utils";
import type { Badge } from "@/lib/badges";

interface BadgeCardProps {
  badge: Badge;
  earned: boolean;
  progressData?: { current: number; target: number };
}

export function BadgeCard({ badge, earned, progressData }: BadgeCardProps) {
  const isRed = badge.color === "jp-red";
  const isGreen = badge.color === "bd-green";

  const bgClass = earned
    ? isRed
      ? "bg-gradient-to-br from-jp-red to-jp-red/80"
      : isGreen
      ? "bg-gradient-to-br from-bd-green to-bd-green/80"
      : "bg-gradient-to-br from-warning to-warning/80"
    : "bg-bg-alt";

  const percent = progressData
    ? Math.min(100, Math.round((progressData.current / progressData.target) * 100))
    : 0;

  return (
    <div
      className={cn(
        "relative rounded-2xl p-4 flex flex-col items-center text-center transition-all duration-300",
        earned
          ? `${bgClass} text-white shadow-card hover:scale-[1.02]`
          : "border-2 border-dashed border-border"
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          "w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-jp font-bold mb-3",
          earned ? "bg-white/20" : "bg-white text-text-secondary/40"
        )}
      >
        {earned ? badge.icon : "🔒"}
      </div>

      {/* Title */}
      <h3
        className={cn(
          "font-bold text-sm mb-1 font-bangla",
          earned ? "text-white" : "text-text-secondary"
        )}
      >
        {badge.title}
      </h3>

      {/* Description */}
      <p
        className={cn(
          "text-xs mb-3 font-bangla",
          earned ? "text-white/80" : "text-text-secondary/60"
        )}
      >
        {badge.description}
      </p>

      {/* Progress bar (locked) */}
      {!earned && progressData && (
        <div className="w-full">
          <div className="w-full h-1.5 bg-white rounded-full overflow-hidden mb-1">
            <div
              className={cn(
                "h-full transition-all duration-700 rounded-full",
                isRed ? "bg-jp-red" : isGreen ? "bg-bd-green" : "bg-warning"
              )}
              style={{ width: `${percent}%` }}
            />
          </div>
          <p className="text-[10px] text-text-secondary font-en">
            {progressData.current} / {progressData.target}
          </p>
        </div>
      )}

      {/* Earned badge */}
      {earned && (
        <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white text-jp-red flex items-center justify-center text-xs">
          ✓
        </span>
      )}
    </div>
  );
}
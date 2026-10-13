"use client";

import { cn } from "@/lib/utils";
import type { Badge } from "@/lib/badges";

interface BadgeCardProps {
  badge: Badge;
  earned: boolean;
  progressData?: { current: number; target: number };
}

// Color mapping — theme colors only
const COLOR_MAP = {
  "jp-red": { gradient: "linear-gradient(135deg, #BC002D 0%, #8E0021 100%)" },
  "bd-green": { gradient: "linear-gradient(135deg, #006A4E 0%, #004A36 100%)" },
  warning: { gradient: "linear-gradient(135deg, #BC002D 0%, #006A4E 100%)" },
};

export function BadgeCard({ badge, earned, progressData }: BadgeCardProps) {
  const isRed = badge.color === "jp-red";
  const isGreen = badge.color === "bd-green";

  const percent = progressData
    ? Math.min(
        100,
        Math.round((progressData.current / progressData.target) * 100)
      )
    : 0;

  return (
    <div
      className={cn(
        "relative rounded-2xl p-4 flex flex-col items-center text-center transition-all duration-300 overflow-hidden",
        !earned && "border-2 border-dashed border-border bg-bg-alt"
      )}
      style={
        earned
          ? { background: COLOR_MAP[badge.color].gradient, color: "#FFFFFF" }
          : undefined
      }
    >
      {/* Earned checkmark — top right */}
      {earned && (
        <span
          className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-sm"
          style={{ backgroundColor: "#FFFFFF", color: "#BC002D" }}
        >
          ✓
        </span>
      )}

      {/* Icon */}
      <div
        className={cn(
          "w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-jp font-bold mb-3 relative"
        )}
        style={{
          backgroundColor: earned ? "rgba(255,255,255,0.2)" : "#FFFFFF",
          color: earned ? "#FFFFFF" : "#9CA3AF",
        }}
      >
        {earned ? badge.icon : "🔒"}
      </div>

      {/* Title */}
      <h3
        className="font-bold text-sm mb-1 font-bangla"
        style={{ color: earned ? "#FFFFFF" : "#6B7280" }}
      >
        {badge.title}
      </h3>

      {/* Description */}
      <p
        className="text-xs mb-3 font-bangla"
        style={{ color: earned ? "rgba(255,255,255,0.85)" : "rgba(107,114,128,0.7)" }}
      >
        {badge.description}
      </p>

      {/* Progress bar (locked) */}
      {!earned && progressData && (
        <div className="w-full">
          <div
            className="w-full h-1.5 rounded-full overflow-hidden mb-1"
            style={{ backgroundColor: "#FFFFFF" }}
          >
            <div
              className="h-full transition-all duration-700 rounded-full"
              style={{
                width: `${percent}%`,
                backgroundColor: isRed ? "#BC002D" : isGreen ? "#006A4E" : "#BC002D",
              }}
            />
          </div>
          <p
            className="text-[10px] font-en"
            style={{ color: "#6B7280" }}
          >
            {progressData.current} / {progressData.target}
          </p>
        </div>
      )}
    </div>
  );
}
"use client";

import { useProgress } from "@/hooks/useProgress";
import { cn } from "@/lib/utils";

type ProgressItem = {
  label: string;
  learned: number;
  total: number;
  color: "jp-red" | "bd-green";
  icon: string;
};

export function ProgressChart() {
  const { progress, loading } = useProgress();

  if (loading || !progress) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-32 rounded-2xl bg-bg-alt animate-pulse" />
        ))}
      </div>
    );
  }

  const items: ProgressItem[] = [
    {
      label: "হিরাগানা",
      learned: progress.hiragana.learned.length,
      total: 46,
      color: "jp-red",
      icon: "あ",
    },
    {
      label: "কাতাকানা",
      learned: progress.katakana.learned.length,
      total: 46,
      color: "bd-green",
      icon: "ア",
    },
    {
      label: "N5 ভোকাবুলারি",
      learned: progress.n5.vocabulary.learned.length,
      total: 200,
      color: "jp-red",
      icon: "語",
    },
    {
      label: "N5 গ্রামার",
      learned: progress.n5.grammar.completed.length,
      total: 15,
      color: "bd-green",
      icon: "文",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {items.map((item) => {
        const percent =
          item.total > 0 ? Math.round((item.learned / item.total) * 100) : 0;
        const isRed = item.color === "jp-red";

        return (
          <div
            key={item.label}
            className="relative bg-white rounded-2xl border border-border p-5 hover:shadow-card transition-all duration-300 overflow-hidden"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center text-xl font-jp font-bold",
                    isRed
                      ? "bg-jp-red/10 text-jp-red"
                      : "bg-bd-green/10 text-bd-green"
                  )}
                >
                  {item.icon}
                </div>
                <div>
                  <p className="font-medium text-text-primary font-bangla">
                    {item.label}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {item.learned} / {item.total}
                  </p>
                </div>
              </div>
              <span
                className={cn(
                  "text-2xl font-bold",
                  isRed ? "text-jp-red" : "text-bd-green"
                )}
              >
                {percent}%
              </span>
            </div>

            <div className="w-full h-2.5 bg-bg-alt rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full transition-all duration-700 rounded-full",
                  isRed
                    ? "bg-gradient-to-r from-jp-red to-jp-red/70"
                    : "bg-gradient-to-r from-bd-green to-bd-green/70"
                )}
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

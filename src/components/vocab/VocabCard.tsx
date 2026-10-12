"use client";

import { cn } from "@/lib/utils";
import type { VocabItem } from "@/lib/data/types";

interface VocabCardProps {
  item: VocabItem;
  isLearned: boolean;
  onToggle: () => void;
  onSpeak: () => void;
}

export function VocabCard({
  item,
  isLearned,
  onToggle,
  onSpeak,
}: VocabCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border p-5 transition-all duration-300",
        isLearned
          ? "bg-bd-green/5 border-bd-green/30"
          : "bg-white border-border hover:border-jp-red/30 hover:shadow-soft"
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1">
          <p className="text-2xl font-jp text-text-primary leading-tight mb-1">
            {item.japanese}
          </p>
          <p className="text-sm text-text-secondary font-en">
            {item.romaji}
          </p>
        </div>
        <button
          onClick={onSpeak}
          className="w-10 h-10 rounded-lg hover:bg-bg-alt flex items-center justify-center text-lg transition-colors shrink-0"
          aria-label="Speak"
        >
          🔊
        </button>
      </div>

      <div className="border-t border-border pt-3 mt-3">
        <p className="text-base font-medium text-text-primary font-bangla">
          {item.bangla}
        </p>
        <p className="text-xs text-text-secondary italic mt-0.5">
          {item.english}
        </p>
      </div>

      <button
        onClick={onToggle}
        className={cn(
          "w-full mt-3 py-2 rounded-lg text-sm font-medium transition-colors font-bangla",
          isLearned
            ? "bg-bd-green text-white hover:bg-bd-green/90"
            : "bg-bg-alt text-text-secondary hover:bg-jp-red/10 hover:text-jp-red"
        )}
      >
        {isLearned ? "✓ শেখা হয়েছে" : "শিখেছি চিহ্নিত করো"}
      </button>
    </div>
  );
}

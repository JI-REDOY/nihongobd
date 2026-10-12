"use client";

import { cn } from "@/lib/utils";
import type { KanaItem } from "@/lib/kanaData";

interface KanaCardProps {
  item: KanaItem;
  isLearned: boolean;
  onClick: () => void;
}

export function KanaCard({ item, isLearned, onClick }: KanaCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "aspect-square rounded-xl border-2 transition-all duration-300",
        "flex flex-col items-center justify-center gap-1 relative group",
        "hover:shadow-card hover:-translate-y-0.5",
        isLearned
          ? "bg-bd-green/10 border-bd-green/40"
          : "bg-white border-border hover:border-jp-red/40"
      )}
    >
      {isLearned && (
        <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-bd-green text-white text-xs flex items-center justify-center">
          ✓
        </span>
      )}

      <span className="text-3xl sm:text-4xl font-jp text-text-primary leading-none">
        {item.char}
      </span>
      <span className="text-xs text-text-secondary font-en">
        {item.romaji}
      </span>
    </button>
  );
}
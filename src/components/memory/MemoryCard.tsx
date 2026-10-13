"use client";

import { cn } from "@/lib/utils";
import type { MemoryRadical } from "@/lib/data/types";

interface MemoryCardProps {
  radical: MemoryRadical;
  onClick: () => void;
}

export function MemoryCard({ radical, onClick }: MemoryCardProps) {
  return (
    <button
      onClick={onClick}
      className="group bg-white rounded-2xl border border-border p-6 hover:shadow-card hover:-translate-y-1 transition-all duration-300 text-left w-full"
    >
      {/* Radical Big */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-20 h-20 rounded-2xl bg-jp-red/10 flex items-center justify-center">
          <span className="text-5xl font-jp font-bold text-jp-red">
            {radical.radical}
          </span>
        </div>
        <span className="text-xs px-2 py-1 rounded-full bg-bg-alt text-text-secondary font-bangla">
          {radical.category}
        </span>
      </div>

      {/* Name */}
      <h3 className="text-lg font-bold text-text-primary mb-1 font-bangla">
        {radical.radicalNameBangla}
      </h3>
      <p className="text-sm text-text-secondary font-en mb-3">
        {radical.radicalName}
      </p>

      {/* Info */}
      <div className="flex items-center gap-3 text-xs text-text-secondary">
        <span className="font-bangla">
          <strong className="text-jp-red">{radical.kanjiFamily.length}+</strong>{" "}
          kanji
        </span>
        <span>•</span>
        <span className="font-en">{radical.strokeCount} strokes</span>
      </div>

      {/* Preview hint */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-xs text-text-secondary font-bangla">
            পরিবার দেখো
          </span>
          <span className="text-jp-red text-lg group-hover:translate-x-1 transition-transform">
            →
          </span>
        </div>
      </div>
    </button>
  );
}
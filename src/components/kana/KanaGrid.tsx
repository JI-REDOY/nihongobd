"use client";

import { useMemo, useState } from "react";
import { KanaCard } from "./KanaCard";
import { KanaModal } from "./KanaModal";
import { Container } from "@/components/layout/Container";
import { useProgress } from "@/hooks/useProgress";
import type { KanaItem, KanaType } from "@/lib/kanaData";
import { getKanaData } from "@/lib/kanaData";

interface KanaGridProps {
  type: KanaType;
}

const typeTitle: Record<KanaType, { title: string; subtitle: string }> = {
  hiragana: {
    title: "হিরাগানা",
    subtitle: "জাপানিজ ভাষার মৌলিক ৪৬টি অক্ষর",
  },
  katakana: {
    title: "কাতাকানা",
    subtitle: "বিদেশি শব্দ লেখার জন্য ব্যবহৃত ৪৬টি অক্ষর",
  },
};

export function KanaGrid({ type }: KanaGridProps) {
  const data = useMemo(() => getKanaData(type), [type]);
  const { progress, loading, toggleKana } = useProgress();
  const [selected, setSelected] = useState<KanaItem | null>(null);

  const learned = progress?.[type].learned || [];
  const learnedCount = learned.length;
  const total = data.length;
  const percent = total > 0 ? Math.round((learnedCount / total) * 100) : 0;

  const info = typeTitle[type];

  async function handleToggleLearned() {
    if (!selected) return;
    await toggleKana(type, selected.char);
  }

  const isSelectedLearned = selected
    ? learned.includes(selected.char)
    : false;

  return (
    <div className="py-10">
      <Container>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-2 font-bangla">
            {info.title}
          </h1>
          <p className="text-text-secondary font-bangla">{info.subtitle}</p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-xl border border-border shadow-soft p-5 mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-text-primary font-bangla">
              তোমার অগ্রগতি
            </span>
            <span className="text-sm font-bold text-jp-red">
              {learnedCount} / {total} ({percent}%)
            </span>
          </div>
          <div className="w-full h-2 bg-bg-alt rounded-full overflow-hidden">
            <div
              className="h-full bg-jp-red transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
            {Array.from({ length: total }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-xl bg-bg-alt animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
            {data.map((item) => (
              <KanaCard
                key={item.char}
                item={item}
                isLearned={learned.includes(item.char)}
                onClick={() => setSelected(item)}
              />
            ))}
          </div>
        )}

        {/* Instruction */}
        <p className="text-center mt-8 text-sm text-text-secondary font-bangla">
          যেকোনো অক্ষরে ক্লিক করে উচ্চারণ শুনে শেখা চিহ্নিত করো
        </p>
      </Container>

      {/* Modal */}
      <KanaModal
        item={selected}
        isLearned={isSelectedLearned}
        onClose={() => setSelected(null)}
        onToggleLearned={handleToggleLearned}
      />
    </div>
  );
}
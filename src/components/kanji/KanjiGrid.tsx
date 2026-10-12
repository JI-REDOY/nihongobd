"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/layout/Container";
import { KanjiCard } from "./KanjiCard";
import { KanjiModal } from "./KanjiModal";
import { useProgress } from "@/hooks/useProgress";
import { n5Kanji, kanjiCategories, type KanjiItem } from "@/lib/n5Kanji";
import { cn } from "@/lib/utils";

export function KanjiGrid() {
  const { progress, loading, toggleKanji } = useProgress();
  const [selected, setSelected] = useState<KanjiItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("সব");

  const learned = progress?.kanji?.learned || [];
  const learnedCount = learned.length;
  const total = n5Kanji.length;
  const percent = total > 0 ? Math.round((learnedCount / total) * 100) : 0;

  const filtered = useMemo(() => {
    if (activeCategory === "সব") return n5Kanji;
    return n5Kanji.filter((k) => k.category === activeCategory);
  }, [activeCategory]);

  const isSelectedLearned = selected ? learned.includes(selected.id) : false;

  async function handleToggle() {
    if (!selected) return;
    await toggleKanji(selected.id);
  }

  return (
    <div className="py-10">
      <Container>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-2 font-bangla">
            N5 কাঞ্জি
          </h1>
          <p className="text-text-secondary font-bangla">
            ১০০টি মৌলিক জাপানিজ কাঞ্জি — অর্থ, reading ও উদাহরণসহ
          </p>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-xl border border-border shadow-soft p-5 mb-6">
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

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveCategory("সব")}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors font-bangla",
              activeCategory === "সব"
                ? "bg-jp-red text-white"
                : "bg-white border border-border text-text-secondary hover:border-jp-red/40"
            )}
          >
            সব
          </button>
          {kanjiCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors font-bangla",
                activeCategory === cat
                  ? "bg-jp-red text-white"
                  : "bg-white border border-border text-text-secondary hover:border-jp-red/40"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-xl bg-bg-alt animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {filtered.map((item) => (
              <KanjiCard
                key={item.id}
                item={item}
                isLearned={learned.includes(item.id)}
                onClick={() => setSelected(item)}
              />
            ))}
          </div>
        )}

        <p className="text-center mt-8 text-sm text-text-secondary font-bangla">
          যেকোনো কাঞ্জিতে ক্লিক করে অর্থ, reading ও উদাহরণ দেখো
        </p>
      </Container>

      <KanjiModal
        item={selected}
        isLearned={isSelectedLearned}
        onClose={() => setSelected(null)}
        onToggleLearned={handleToggle}
      />
    </div>
  );
}
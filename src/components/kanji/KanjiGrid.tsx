"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/layout/Container";
import { KanjiCard } from "./KanjiCard";
import { KanjiModal } from "./KanjiModal";
import { useProgress } from "@/hooks/useProgress";
import { getLevelData, type Level } from "@/lib/data";
import { kanjiCategories } from "@/lib/data/n5/kanji";
import type { KanjiItem } from "@/lib/data/types";
import { cn } from "@/lib/utils";

interface KanjiGridProps {
  level: Level;
}

export function KanjiGrid({ level }: KanjiGridProps) {
  const { progress, loading, toggleKanji } = useProgress();
  const [selected, setSelected] = useState<KanjiItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("সব");

  const data = getLevelData(level).kanji;
  const learned = progress?.[level]?.kanji.learned || [];
  const learnedCount = learned.length;
  const total = data.length;
  const percent = total > 0 ? Math.round((learnedCount / total) * 100) : 0;

  const filtered = useMemo(() => {
    if (activeCategory === "সব") return data;
    return data.filter((k) => k.category === activeCategory);
  }, [activeCategory, data]);

  const isSelectedLearned = selected ? learned.includes(selected.id) : false;

  async function handleToggle() {
    if (!selected) return;
    await toggleKanji(level, selected.id);
  }

  if (total === 0) {
    return (
      <div className="py-20">
        <Container>
          <div className="text-center">
            <p className="text-5xl mb-4">🚧</p>
            <h2 className="text-2xl font-bold text-text-primary mb-2 font-bangla">
              {level.toUpperCase()} কাঞ্জি শীঘ্রই আসছে
            </h2>
            <p className="text-text-secondary font-bangla">
              এই level এর কন্টেন্ট এখনো তৈরি হচ্ছে
            </p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-10">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-2 font-bangla">
            {level.toUpperCase()} কাঞ্জি
          </h1>
          <p className="text-text-secondary font-bangla">
            {total}টি কাঞ্জি — অর্থ, reading ও উদাহরণসহ
          </p>
        </div>

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

        {loading ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-xl bg-bg-alt animate-pulse" />
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
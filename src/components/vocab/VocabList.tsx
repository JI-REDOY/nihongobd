"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/layout/Container";
import { VocabCard } from "./VocabCard";
import { Flashcard } from "./Flashcard";
import { useProgress } from "@/hooks/useProgress";
import { speakJapanese } from "@/lib/audio";
import { n5Vocab } from "@/lib/n5Vocab";
import { cn } from "@/lib/utils";

type ViewMode = "list" | "flashcard";
type FilterMode = "all" | "learned" | "not-learned";

export function VocabList() {
  const { progress, loading, toggleVocab } = useProgress();
  const [view, setView] = useState<ViewMode>("list");
  const [filter, setFilter] = useState<FilterMode>("all");
  const [flashIndex, setFlashIndex] = useState(0);

  const learned = progress?.vocabulary.learned || [];
  const total = n5Vocab.length;
  const learnedCount = learned.length;
  const percent = Math.round((learnedCount / total) * 100);

  const filtered = useMemo(() => {
    if (filter === "learned") return n5Vocab.filter((v) => learned.includes(v.id));
    if (filter === "not-learned") return n5Vocab.filter((v) => !learned.includes(v.id));
    return n5Vocab;
  }, [filter, learned]);

  // Flashcard এর জন্য index safe রাখো
  const flashItem = filtered[flashIndex];

  async function handleToggle(id: string) {
    await toggleVocab(id);
  }

  function handleNext() {
    if (flashIndex < filtered.length - 1) setFlashIndex(flashIndex + 1);
  }

  function handlePrev() {
    if (flashIndex > 0) setFlashIndex(flashIndex - 1);
  }

  return (
    <div className="py-10">
      <Container>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-2 font-bangla">
            N5 ভোকাবুলারি
          </h1>
          <p className="text-text-secondary font-bangla">
            {total}টি মৌলিক জাপানিজ শব্দ — বাংলা অর্থসহ
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

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {/* View toggle */}
          <div className="inline-flex rounded-xl border border-border bg-white p-1">
            <button
              onClick={() => setView("list")}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors font-bangla",
                view === "list"
                  ? "bg-jp-red text-white"
                  : "text-text-secondary hover:bg-bg-alt"
              )}
            >
              📋 লিস্ট
            </button>
            <button
              onClick={() => {
                setView("flashcard");
                setFlashIndex(0);
              }}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors font-bangla",
                view === "flashcard"
                  ? "bg-jp-red text-white"
                  : "text-text-secondary hover:bg-bg-alt"
              )}
            >
              🎴 ফ্ল্যাশকার্ড
            </button>
          </div>

          {/* Filter (only in list view) */}
          {view === "list" && (
            <div className="inline-flex rounded-xl border border-border bg-white p-1">
              {(
                [
                  ["all", "সব"],
                  ["learned", "শেখা"],
                  ["not-learned", "না-শেখা"],
                ] as [FilterMode, string][]
              ).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-colors font-bangla",
                    filter === key
                      ? "bg-bd-green text-white"
                      : "text-text-secondary hover:bg-bg-alt"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          )}

          {/* Count */}
          <span className="text-sm text-text-secondary ml-auto font-bangla">
            {filtered.length}টি শব্দ
          </span>
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-48 rounded-xl bg-bg-alt animate-pulse"
              />
            ))}
          </div>
        ) : view === "list" ? (
          filtered.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl border border-border">
              <p className="text-5xl mb-4">📭</p>
              <p className="text-text-secondary font-bangla">
                এই filter এ কোনো শব্দ নেই
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((item) => (
                <VocabCard
                  key={item.id}
                  item={item}
                  isLearned={learned.includes(item.id)}
                  onToggle={() => handleToggle(item.id)}
                  onSpeak={() => speakJapanese(item.japanese)}
                />
              ))}
            </div>
          )
        ) : flashItem ? (
          <Flashcard
            item={flashItem}
            isLearned={learned.includes(flashItem.id)}
            current={flashIndex}
            total={filtered.length}
            onNext={handleNext}
            onPrev={handlePrev}
            onToggle={() => handleToggle(flashItem.id)}
          />
        ) : (
          <div className="text-center py-16">
            <p className="text-text-secondary font-bangla">
              Flashcard এ দেখানোর মতো শব্দ নেই
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}
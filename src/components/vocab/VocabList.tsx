"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/layout/Container";
import { VocabCard } from "./VocabCard";
import { Flashcard } from "./Flashcard";
import { useProgress } from "@/hooks/useProgress";
import { speakJapanese } from "@/lib/audio";
import { getLevelData, type Level } from "@/lib/data";
import { cn } from "@/lib/utils";

type ViewMode = "list" | "flashcard";
type FilterMode = "all" | "learned" | "not-learned";

const ITEMS_PER_PAGE = 30;

interface VocabListProps {
  level: Level;
  initialSearch?: string;
}

export function VocabList({ level, initialSearch = "" }: VocabListProps) {
  const { progress, loading, toggleVocab } = useProgress();
  const [view, setView] = useState<ViewMode>("list");
  const [filter, setFilter] = useState<FilterMode>("all");
  const [search, setSearch] = useState(initialSearch);
  const [flashIndex, setFlashIndex] = useState(0);
  const [page, setPage] = useState(1);

  const data = getLevelData(level).vocab;
  const learned = progress?.[level]?.vocabulary.learned || [];
  const total = data.length;
  const learnedCount = learned.length;
  const percent = total > 0 ? Math.round((learnedCount / total) * 100) : 0;

  const filtered = useMemo(() => {
    let result = data;

    if (filter === "learned") {
      result = result.filter((v) => learned.includes(v.id));
    } else if (filter === "not-learned") {
      result = result.filter((v) => !learned.includes(v.id));
    }

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (v) =>
          v.japanese.includes(q) ||
          v.romaji.toLowerCase().includes(q) ||
          v.bangla.includes(q) ||
          v.english.toLowerCase().includes(q)
      );
    }

    return result;
  }, [filter, learned, data, search]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedItems = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const flashItem = filtered[flashIndex];

  async function handleToggle(id: string) {
    await toggleVocab(level, id);
  }

  function handleNext() {
    if (flashIndex < filtered.length - 1) setFlashIndex(flashIndex + 1);
  }

  function handlePrev() {
    if (flashIndex > 0) setFlashIndex(flashIndex - 1);
  }

  function changeFilter(f: FilterMode) {
    setFilter(f);
    setPage(1);
  }

  function handleSearch(value: string) {
    setSearch(value);
    setPage(1);
    setFlashIndex(0);
  }

  if (total === 0) {
    return (
      <div className="py-20">
        <Container>
          <div className="text-center">
            <p className="text-5xl mb-4">🚧</p>
            <h2 className="text-2xl font-bold text-text-primary mb-2 font-bangla">
              {level.toUpperCase()} ভোকাবুলারি শীঘ্রই আসছে
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
            {level.toUpperCase()} ভোকাবুলারি
          </h1>
          <p className="text-text-secondary font-bangla">
            {total}টি মৌলিক জাপানিজ শব্দ — বাংলা অর্থসহ
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

        {/* Search */}
        <div className="mb-4">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">
              🔍
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="শব্দ খোঁজো (জাপানিজ, রোমাজি, বাংলা, ইংরেজি)..."
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:border-jp-red focus:ring-2 focus:ring-jp-red/20 min-h-[44px] font-bangla"
            />
            {search && (
              <button
                onClick={() => handleSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-error"
                aria-label="Clear"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-6">
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
                  onClick={() => changeFilter(key)}
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

          <span className="text-sm text-text-secondary ml-auto font-bangla">
            {filtered.length}টি শব্দ
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-48 rounded-xl bg-bg-alt animate-pulse" />
            ))}
          </div>
        ) : view === "list" ? (
          filtered.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl border border-border">
              <p className="text-5xl mb-4">📭</p>
              <p className="text-text-secondary font-bangla">
                {search
                  ? `"${search}" এর জন্য কোনো শব্দ পাওয়া যায়নি`
                  : "এই filter এ কোনো শব্দ নেই"}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {paginatedItems.map((item) => (
                  <VocabCard
                    key={item.id}
                    item={item}
                    isLearned={learned.includes(item.id)}
                    onToggle={() => handleToggle(item.id)}
                    onSpeak={() => speakJapanese(item.japanese)}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-sm text-text-secondary font-bangla">
                    দেখানো হচ্ছে {startIndex + 1}–
                    {Math.min(startIndex + ITEMS_PER_PAGE, filtered.length)} /{" "}
                    {filtered.length}
                  </p>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className={cn(
                        "px-3 py-2 rounded-lg text-sm font-medium transition-colors font-bangla",
                        page === 1
                          ? "text-text-secondary/40 cursor-not-allowed"
                          : "text-text-secondary hover:bg-bg-alt hover:text-jp-red"
                      )}
                    >
                      ← আগের
                    </button>

                    <PageNumbers
                      currentPage={page}
                      totalPages={totalPages}
                      onPageChange={setPage}
                    />

                    <button
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className={cn(
                        "px-3 py-2 rounded-lg text-sm font-medium transition-colors font-bangla",
                        page === totalPages
                          ? "text-text-secondary/40 cursor-not-allowed"
                          : "text-text-secondary hover:bg-bg-alt hover:text-jp-red"
                      )}
                    >
                      পরের →
                    </button>
                  </div>
                </div>
              )}
            </>
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

function PageNumbers({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const pages: (number | "...")[] = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  return (
    <>
      {pages.map((p, i) => {
        if (p === "...") {
          return (
            <span
              key={`dots-${i}`}
              className="px-2 text-text-secondary font-en"
            >
              …
            </span>
          );
        }

        return (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={cn(
              "w-9 h-9 rounded-lg text-sm font-medium transition-colors font-en",
              currentPage === p
                ? "bg-jp-red text-white"
                : "text-text-secondary hover:bg-bg-alt hover:text-jp-red"
            )}
          >
            {p}
          </button>
        );
      })}
    </>
  );
}
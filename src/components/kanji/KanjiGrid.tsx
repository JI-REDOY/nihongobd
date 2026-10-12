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

const ITEMS_PER_PAGE = 40;

interface KanjiGridProps {
  level: Level;
}

export function KanjiGrid({ level }: KanjiGridProps) {
  const { progress, loading, toggleKanji } = useProgress();
  const [selected, setSelected] = useState<KanjiItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("সব");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const data = getLevelData(level).kanji;
  const learned = progress?.[level]?.kanji.learned || [];
  const learnedCount = learned.length;
  const total = data.length;
  const percent = total > 0 ? Math.round((learnedCount / total) * 100) : 0;

  const filtered = useMemo(() => {
    let result = data;

    if (activeCategory !== "সব") {
      result = result.filter((k) => k.category === activeCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (k) =>
          k.kanji.includes(q) ||
          k.meaning.includes(q) ||
          k.meaningEn.toLowerCase().includes(q) ||
          k.onReading.includes(q) ||
          k.kunReading.includes(q)
      );
    }

    return result;
  }, [activeCategory, data, search]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedItems = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const isSelectedLearned = selected ? learned.includes(selected.id) : false;

  async function handleToggle() {
    if (!selected) return;
    await toggleKanji(level, selected.id);
  }

  function changeCategory(cat: string) {
    setActiveCategory(cat);
    setPage(1);
  }

  function handleSearch(value: string) {
    setSearch(value);
    setPage(1);
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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-2 font-bangla">
            {level.toUpperCase()} কাঞ্জি
          </h1>
          <p className="text-text-secondary font-bangla">
            {total}টি কাঞ্জি — অর্থ, reading ও উদাহরণসহ
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
              placeholder="কাঞ্জি, অর্থ বা reading খোঁজো..."
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

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => changeCategory("সব")}
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
              onClick={() => changeCategory(cat)}
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
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-border">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-text-secondary font-bangla">
              {search
                ? `"${search}" এর জন্য কোনো কাঞ্জি পাওয়া যায়নি`
                : "এই category তে কোনো কাঞ্জি নেই"}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {paginatedItems.map((item) => (
                <KanjiCard
                  key={item.id}
                  item={item}
                  isLearned={learned.includes(item.id)}
                  onClick={() => setSelected(item)}
                />
              ))}
            </div>

            {/* Pagination */}
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

// ===== Pagination Numbers =====
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
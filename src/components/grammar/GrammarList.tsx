"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { LessonCard } from "./LessonCard";
import { useProgress } from "@/hooks/useProgress";
import { getLevelData, type Level } from "@/lib/data";
import { cn } from "@/lib/utils";

const ITEMS_PER_PAGE = 12;

interface GrammarListProps {
  level: Level;
}

export function GrammarList({ level }: GrammarListProps) {
  const { progress, loading } = useProgress();
  const [page, setPage] = useState(1);

  const data = getLevelData(level).grammar;
  const completed = progress?.[level]?.grammar.completed || [];
  const total = data.length;
  const completedCount = completed.length;
  const percent = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedItems = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (total === 0) {
    return (
      <div className="py-20">
        <Container>
          <div className="text-center">
            <p className="text-5xl mb-4">🚧</p>
            <h2 className="text-2xl font-bold text-text-primary mb-2 font-bangla">
              {level.toUpperCase()} গ্রামার শীঘ্রই আসছে
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
            {level.toUpperCase()} গ্রামার
          </h1>
          <p className="text-text-secondary font-bangla">
            {total}টি মৌলিক জাপানিজ ব্যাকরণ পাঠ — উদাহরণসহ
          </p>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-xl border border-border shadow-soft p-5 mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-text-primary font-bangla">
              তোমার অগ্রগতি
            </span>
            <span className="text-sm font-bold text-jp-red">
              {completedCount} / {total} ({percent}%)
            </span>
          </div>
          <div className="w-full h-2 bg-bg-alt rounded-full overflow-hidden">
            <div
              className="h-full bg-jp-red transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* Lessons */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-40 rounded-xl bg-bg-alt animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedItems.map((lesson) => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  level={level}
                  isCompleted={completed.includes(lesson.id)}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-text-secondary font-bangla">
                  দেখানো হচ্ছে {startIndex + 1}–
                  {Math.min(startIndex + ITEMS_PER_PAGE, total)} / {total}
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
      </Container>
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
            <span key={`dots-${i}`} className="px-2 text-text-secondary font-en">
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
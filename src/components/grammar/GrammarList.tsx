"use client";

import { Container } from "@/components/layout/Container";
import { LessonCard } from "./LessonCard";
import { useProgress } from "@/hooks/useProgress";
import { n5Grammar } from "@/lib/n5Grammar";

export function GrammarList() {
  const { progress, loading } = useProgress();
  const completed = progress?.grammar.completed || [];
  const total = n5Grammar.length;
  const completedCount = completed.length;
  const percent = Math.round((completedCount / total) * 100);

  return (
    <div className="py-10">
      <Container>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-2 font-bangla">
            N5 গ্রামার
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

        {/* Lessons Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-40 rounded-xl bg-bg-alt animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {n5Grammar.map((lesson) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                isCompleted={completed.includes(lesson.id)}
              />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
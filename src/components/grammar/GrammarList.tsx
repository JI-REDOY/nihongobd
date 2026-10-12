"use client";

import { Container } from "@/components/layout/Container";
import { LessonCard } from "./LessonCard";
import { useProgress } from "@/hooks/useProgress";
import { getLevelData, type Level } from "@/lib/data";

interface GrammarListProps {
  level: Level;
}

export function GrammarList({ level }: GrammarListProps) {
  const { progress, loading } = useProgress();
  const data = getLevelData(level).grammar;
  const completed = progress?.[level]?.grammar.completed || [];
  const total = data.length;
  const completedCount = completed.length;
  const percent = total > 0 ? Math.round((completedCount / total) * 100) : 0;

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

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-40 rounded-xl bg-bg-alt animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((lesson) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                level={level}
                isCompleted={completed.includes(lesson.id)}
              />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
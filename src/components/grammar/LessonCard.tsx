"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { GrammarLesson } from "@/lib/data/types";
import type { Level } from "@/lib/data";

interface LessonCardProps {
  lesson: GrammarLesson;
  level: Level;
  isCompleted: boolean;
}

export function LessonCard({ lesson, level, isCompleted }: LessonCardProps) {
  return (
    <Link href={`/${level}/grammar/${lesson.id}`}>
      <div
        className={cn(
          "rounded-xl border p-5 transition-all duration-300 hover:shadow-soft hover:-translate-y-0.5 h-full",
          isCompleted
            ? "bg-bd-green/5 border-bd-green/30"
            : "bg-white border-border hover:border-jp-red/30"
        )}
      >
        <div className="flex items-start justify-between gap-3 mb-3">
          <div
            className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold shrink-0",
              isCompleted
                ? "bg-bd-green text-white"
                : "bg-jp-red/10 text-jp-red"
            )}
          >
            {isCompleted ? "✓" : lesson.number}
          </div>
          <span className="text-xs text-text-secondary font-jp">
            {lesson.titleJp}
          </span>
        </div>

        <h3 className="font-bold text-text-primary mb-1 font-bangla">
          {lesson.title}
        </h3>

        <p className="text-sm text-jp-red font-jp mb-2">{lesson.pattern}</p>

        <p className="text-xs text-text-secondary line-clamp-2 font-bangla">
          {lesson.explanation}
        </p>
      </div>
    </Link>
  );
}
"use client";

import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { useProgress } from "@/hooks/useProgress";
import { speakJapanese } from "@/lib/audio";
import { cn } from "@/lib/utils";
import type { GrammarLesson } from "@/lib/n5Grammar";

interface GrammarDetailProps {
  lesson: GrammarLesson;
  prev: GrammarLesson | null;
  next: GrammarLesson | null;
}

export function GrammarDetail({ lesson, prev, next }: GrammarDetailProps) {
  const { progress, toggleGrammar } = useProgress();
  const completed = progress?.grammar.completed || [];
  const isCompleted = completed.includes(lesson.id);

  async function handleToggle() {
    await toggleGrammar(lesson.id);
  }

  return (
    <div className="py-10">
      <Container>
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link
              href="/n5/grammar"
              className="text-sm text-text-secondary hover:text-jp-red font-bangla"
            >
              ← সব পাঠ
            </Link>
          </div>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div
                className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold",
                  isCompleted
                    ? "bg-bd-green text-white"
                    : "bg-jp-red/10 text-jp-red"
                )}
              >
                {isCompleted ? "✓" : lesson.number}
              </div>
              <span className="text-sm text-text-secondary font-jp">
                {lesson.titleJp}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3 font-bangla">
              {lesson.title}
            </h1>

            <div className="inline-block px-4 py-2 rounded-xl bg-jp-red/10 text-jp-red font-jp text-lg">
              {lesson.pattern}
            </div>
          </div>

          {/* Explanation */}
          <div className="bg-white rounded-xl border border-border shadow-soft p-6 mb-8">
            <h2 className="text-sm font-bold text-text-secondary uppercase mb-3 font-bangla">
              ব্যাখ্যা
            </h2>
            <p className="text-text-primary leading-relaxed font-bangla">
              {lesson.explanation}
            </p>
          </div>

          {/* Examples */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-text-primary mb-4 font-bangla">
              উদাহরণ
            </h2>
            <div className="space-y-4">
              {lesson.examples.map((ex, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-border p-5 hover:shadow-soft transition-shadow"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <p className="text-xl font-jp text-text-primary leading-relaxed flex-1">
                      {ex.jp}
                    </p>
                    <button
                      onClick={() => speakJapanese(ex.jp)}
                      className="w-10 h-10 rounded-lg hover:bg-bg-alt flex items-center justify-center text-lg transition-colors shrink-0"
                      aria-label="Speak"
                    >
                      🔊
                    </button>
                  </div>
                  <p className="text-sm text-text-secondary font-en mb-2">
                    {ex.romaji}
                  </p>
                  <p className="text-base font-medium text-text-primary font-bangla border-t border-border pt-3">
                    {ex.bangla}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mark Complete */}
          <div className="bg-white rounded-xl border border-border shadow-soft p-6">
            <Button
              variant={isCompleted ? "outline" : "primary"}
              size="lg"
              onClick={handleToggle}
              className="w-full font-bangla"
            >
              {isCompleted
                ? "✓ এই পাঠ সম্পন্ন — চিহ্ন সরাও"
                : "পাঠ সম্পন্ন হিসাবে চিহ্নিত করো"}
            </Button>
          </div>

          {/* Navigation */}
          <div className="grid grid-cols-2 gap-3 mt-8">
            {prev ? (
              <Link href={`/n5/grammar/${prev.id}`}>
                <Button variant="outline" className="w-full justify-start font-bangla">
                  ← পাঠ {prev.number}
                </Button>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link href={`/n5/grammar/${next.id}`}>
                <Button variant="outline" className="w-full justify-end font-bangla">
                  পাঠ {next.number} →
                </Button>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
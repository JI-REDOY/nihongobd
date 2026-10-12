"use client";

import { cn } from "@/lib/utils";
import type { QuizQuestion as QType } from "@/lib/quizGenerator";

interface QuizQuestionProps {
  question: QType;
  selectedAnswer: string | null;
  showResult: boolean;
  onSelect: (answer: string) => void;
}

export function QuizQuestionComponent({
  question,
  selectedAnswer,
  showResult,
  onSelect,
}: QuizQuestionProps) {
  // Question label type অনুযায়ী
  const label =
    question.type === "kana-romaji"
      ? "এই অক্ষরের রোমাজি কী?"
      : "এই শব্দের অর্থ কী?";

  return (
    <div>
      {/* Question */}
      <div className="text-center mb-8">
        <p className="text-xs text-text-secondary mb-3 font-bangla">
          {label}
        </p>
        <p
          className={cn(
            "font-jp text-text-primary leading-tight mb-2",
            question.type === "kana-romaji"
              ? "text-7xl sm:text-8xl"
              : "text-4xl sm:text-5xl"
          )}
        >
          {question.question}
        </p>
        {question.questionSub && (
          <p className="text-base text-text-secondary font-en mt-2">
            {question.questionSub}
          </p>
        )}
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {question.options.map((option, i) => {
          const isCorrect = option === question.correctAnswer;
          const isSelected = option === selectedAnswer;

          let variantClass =
            "bg-white border-border hover:border-jp-red/40 hover:bg-jp-red/5";

          if (showResult) {
            if (isCorrect) {
              variantClass = "bg-bd-green/10 border-bd-green text-bd-green";
            } else if (isSelected) {
              variantClass = "bg-error/10 border-error text-error";
            } else {
              variantClass = "bg-bg-alt border-border opacity-60";
            }
          } else if (isSelected) {
            variantClass = "bg-jp-red/10 border-jp-red text-jp-red";
          }

          return (
            <button
              key={`${option}-${i}`}
              onClick={() => !showResult && onSelect(option)}
              disabled={showResult}
              className={cn(
                "px-5 py-4 rounded-xl border-2 text-left transition-all duration-300 font-bangla font-medium min-h-[56px] flex items-center justify-between gap-3",
                variantClass
              )}
            >
              <span>{option}</span>
              {showResult && isCorrect && <span>✓</span>}
              {showResult && isSelected && !isCorrect && <span>✕</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
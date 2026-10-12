"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { speakJapanese } from "@/lib/audio";
import { generateReadingQuiz, type ReadingQuestion } from "@/lib/advancedQuiz";
import { QuizResult } from "./QuizResult";
import { useProgress } from "@/hooks/useProgress";
import { cn } from "@/lib/utils";
import type { Level } from "@/lib/data";

interface ReadingQuizProps {
  onBack: () => void;
  level: Level;
}

export function ReadingQuiz({ onBack, level }: ReadingQuizProps) {
  const { saveQuiz } = useProgress();
  const [questions, setQuestions] = useState<ReadingQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showBangla, setShowBangla] = useState(false);

  useEffect(() => {
    setQuestions(generateReadingQuiz(5));
  }, [level]);

  const currentQ = questions[current];

  function handleSelect(answer: string) {
    if (showResult) return;
    setSelected(answer);
    setShowResult(true);
    if (answer === currentQ.correctAnswer) setScore(score + 1);
  }

  async function handleNext() {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setSelected(null);
      setShowResult(false);
      setShowBangla(false);
    } else {
      setFinished(true);
      await saveQuiz(score, "reading");
    }
  }

  function restart() {
    setQuestions(generateReadingQuiz(5));
    setCurrent(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    setFinished(false);
    setShowBangla(false);
  }

  if (finished) {
    return (
      <QuizResult
        score={score}
        total={questions.length}
        onRetry={restart}
        onBack={onBack}
      />
    );
  }

  if (!currentQ) {
    return (
      <div className="text-center py-20">
        <p className="text-text-secondary font-bangla">লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="text-sm text-text-secondary hover:text-jp-red font-bangla"
        >
          ← বের হও
        </button>
        <span className="text-sm text-text-secondary font-en">
          {current + 1} / {questions.length}
        </span>
        <span className="text-sm font-bold text-jp-red font-en">
          স্কোর: {score}
        </span>
      </div>

      <div className="w-full h-1.5 bg-bg-alt rounded-full overflow-hidden mb-8">
        <div
          className="h-full bg-jp-red transition-all duration-300"
          style={{ width: `${((current + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="bg-white rounded-2xl border border-border shadow-soft p-6 mb-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <p className="text-2xl font-jp text-text-primary leading-relaxed flex-1">
            {currentQ.passage}
          </p>
          <button
            onClick={() => speakJapanese(currentQ.passage)}
            className="w-10 h-10 rounded-lg hover:bg-bg-alt flex items-center justify-center text-lg shrink-0"
            aria-label="Play"
          >
            🔊
          </button>
        </div>

        <p className="text-sm text-text-secondary font-en mb-3">
          {currentQ.passageRomaji}
        </p>

        {showBangla ? (
          <p className="text-sm text-jp-red font-bangla border-t border-border pt-3">
            {currentQ.passageBangla}
          </p>
        ) : (
          <button
            onClick={() => setShowBangla(true)}
            className="text-xs text-text-secondary hover:text-jp-red font-bangla border-t border-border pt-3 w-full text-left"
          >
            👁 বাংলা অনুবাদ দেখো
          </button>
        )}
      </div>

      <div className="mb-4">
        <p className="text-sm font-medium text-text-primary mb-3 font-bangla">
          {currentQ.question}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {currentQ.options.map((option, i) => {
            const isCorrect = option === currentQ.correctAnswer;
            const isSelected = option === selected;

            let cls = "bg-white border-border hover:border-jp-red/40 hover:bg-jp-red/5";
            if (showResult) {
              if (isCorrect) cls = "bg-bd-green/10 border-bd-green text-bd-green";
              else if (isSelected) cls = "bg-error/10 border-error text-error";
              else cls = "bg-bg-alt border-border opacity-60";
            } else if (isSelected) {
              cls = "bg-jp-red/10 border-jp-red text-jp-red";
            }

            return (
              <button
                key={`${option}-${i}`}
                onClick={() => handleSelect(option)}
                disabled={showResult}
                className={cn(
                  "px-5 py-4 rounded-xl border-2 text-left font-bangla font-medium min-h-[56px] flex items-center justify-between gap-3 transition-all",
                  cls
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

      {showResult && (
        <div className="mt-6 flex justify-end">
          <Button variant="primary" size="lg" onClick={handleNext} className="font-bangla">
            {current === questions.length - 1 ? "ফলাফল দেখো →" : "পরের প্রশ্ন →"}
          </Button>
        </div>
      )}
    </div>
  );
}
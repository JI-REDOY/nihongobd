"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { speakJapanese } from "@/lib/audio";
import { generateListeningQuiz, type ListeningQuestion } from "@/lib/advancedQuiz";
import { QuizResult } from "./QuizResult";
import { useProgress } from "@/hooks/useProgress";
import { cn } from "@/lib/utils";
import type { Level } from "@/lib/data";

interface ListeningQuizProps {
  onBack: () => void;
  level: Level;
}

export function ListeningQuiz({ onBack, level }: ListeningQuizProps) {
  const { saveQuiz } = useProgress();
  const [questions, setQuestions] = useState<ListeningQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const q = generateListeningQuiz(10, level);
    setQuestions(q);
    if (q.length > 0) {
      setTimeout(() => speakJapanese(q[0].audioText), 500);
    }
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
      const nextIdx = current + 1;
      setCurrent(nextIdx);
      setSelected(null);
      setShowResult(false);
      setTimeout(() => speakJapanese(questions[nextIdx].audioText), 300);
    } else {
      setFinished(true);
      await saveQuiz(score, "listening");
    }
  }

  function handleReplay() {
    speakJapanese(currentQ.audioText);
  }

  function restart() {
    const q = generateListeningQuiz(10, level);
    setQuestions(q);
    setCurrent(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    setFinished(false);
    if (q.length > 0) setTimeout(() => speakJapanese(q[0].audioText), 500);
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
        <p className="text-text-secondary font-bangla">
          এই level এ এখনো কোনো শব্দ নেই
        </p>
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

      <div className="text-center mb-8">
        <p className="text-xs text-text-secondary mb-4 font-bangla">
          যা শুনলে তার অর্থ কী?
        </p>

        <button
          onClick={handleReplay}
          className="w-32 h-32 rounded-full bg-jp-red text-white flex items-center justify-center text-5xl hover:scale-105 transition-transform shadow-card mx-auto mb-4"
          aria-label="Play audio"
        >
          🔊
        </button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleReplay}
          className="font-bangla"
        >
          আবার শুনো
        </Button>
      </div>

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
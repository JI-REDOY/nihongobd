"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { QuizQuestionComponent } from "./QuizQuestion";
import { QuizResult } from "./QuizResult";
import { ListeningQuiz } from "./ListeningQuiz";
import { ReadingQuiz } from "./ReadingQuiz";
import { useProgress } from "@/hooks/useProgress";
import {
  generateQuiz,
  type QuizQuestion,
  type QuizType,
} from "@/lib/quizGenerator";
import type { Level } from "@/lib/data";

const QUIZ_TYPES: {
  type: QuizType;
  label: string;
  icon: string;
  desc: string;
}[] = [
  { type: "vocab", label: "ভোকাবুলারি", icon: "語", desc: "জাপানিজ শব্দের অর্থ" },
  { type: "hiragana", label: "হিরাগানা", icon: "あ", desc: "রোমাজি মিলাও" },
  { type: "katakana", label: "কাতাকানা", icon: "ア", desc: "রোমাজি মিলাও" },
  { type: "listening", label: "লিসেনিং", icon: "🎧", desc: "শুনে অর্থ বলো" },
  { type: "reading", label: "রিডিং", icon: "📖", desc: "পড়ে উত্তর দাও" },
];

const QUESTIONS_PER_QUIZ = 10;

interface QuizGameProps {
  level: Level;
}

export function QuizGame({ level }: QuizGameProps) {
  const { saveQuiz } = useProgress();
  const [quizType, setQuizType] = useState<QuizType | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  function startQuiz(type: QuizType) {
    setQuizType(type);

    if (type === "listening" || type === "reading") {
      return;
    }

    const q = generateQuiz(type, QUESTIONS_PER_QUIZ, level);
    setQuestions(q);
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizFinished(false);
  }

  function handleSelect(answer: string) {
    if (showResult) return;
    setSelectedAnswer(answer);
    setShowResult(true);

    const isCorrect = answer === questions[currentIndex].correctAnswer;
    if (isCorrect) setScore(score + 1);
  }

  async function handleNext() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizFinished(true);
      if (quizType) {
        await saveQuiz(score, quizType);
      }
    }
  }

  function restart() {
    if (quizType) startQuiz(quizType);
  }

  function goBack() {
    setQuizType(null);
    setQuestions([]);
    setQuizFinished(false);
  }

  if (quizType === "listening") {
    return (
      <div className="py-10">
        <Container>
          <ListeningQuiz onBack={goBack} level={level} />
        </Container>
      </div>
    );
  }

  if (quizType === "reading") {
    return (
      <div className="py-10">
        <Container>
          <ReadingQuiz onBack={goBack} level={level} />
        </Container>
      </div>
    );
  }

  if (!quizType) {
    return (
      <div className="py-10">
        <Container>
          <div className="mb-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-2 font-bangla">
              কুইজ খেলো
            </h1>
            <p className="text-text-secondary font-bangla">
              তোমার জ্ঞান যাচাই করো — প্রতিটা কুইজে {QUESTIONS_PER_QUIZ}টা প্রশ্ন
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {QUIZ_TYPES.map(({ type, label, icon, desc }) => (
              <button
                key={type}
                onClick={() => startQuiz(type)}
                className="bg-white rounded-xl border border-border p-6 hover:shadow-card hover:-translate-y-0.5 transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-jp-red/10 flex items-center justify-center text-3xl font-jp text-jp-red mb-4">
                  {icon}
                </div>
                <h3 className="font-bold text-text-primary mb-1 font-bangla">
                  {label}
                </h3>
                <p className="text-xs text-text-secondary font-bangla">
                  {desc}
                </p>
              </button>
            ))}
          </div>
        </Container>
      </div>
    );
  }

  if (quizFinished) {
    return (
      <div className="py-10">
        <Container>
          <QuizResult
            score={score}
            total={questions.length}
            onRetry={restart}
            onBack={goBack}
          />
        </Container>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="py-10">
      <Container>
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={goBack}
              className="text-sm text-text-secondary hover:text-jp-red font-bangla"
            >
              ← বের হও
            </button>
            <span className="text-sm font-medium text-text-secondary font-en">
              {currentIndex + 1} / {questions.length}
            </span>
            <span className="text-sm font-bold text-jp-red font-en">
              স্কোর: {score}
            </span>
          </div>

          <div className="w-full h-1.5 bg-bg-alt rounded-full overflow-hidden mb-8">
            <div
              className="h-full bg-jp-red transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <QuizQuestionComponent
            question={currentQ}
            selectedAnswer={selectedAnswer}
            showResult={showResult}
            onSelect={handleSelect}
          />

          {showResult && (
            <div className="mt-6 flex justify-end">
              <Button
                variant="primary"
                size="lg"
                onClick={handleNext}
                className="font-bangla"
              >
                {currentIndex === questions.length - 1
                  ? "ফলাফল দেখো →"
                  : "পরের প্রশ্ন →"}
              </Button>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
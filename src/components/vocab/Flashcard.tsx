"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { speakJapanese } from "@/lib/audio";
import type { VocabItem } from "@/lib/n5Vocab";

interface FlashcardProps {
  item: VocabItem;
  isLearned: boolean;
  current: number;
  total: number;
  onNext: () => void;
  onPrev: () => void;
  onToggle: () => void;
}

export function Flashcard({
  item,
  isLearned,
  current,
  total,
  onNext,
  onPrev,
  onToggle,
}: FlashcardProps) {
  const [flipped, setFlipped] = useState(false);

  function handleNext() {
    setFlipped(false);
    onNext();
  }

  function handlePrev() {
    setFlipped(false);
    onPrev();
  }

  function handleSpeak() {
    speakJapanese(item.japanese);
  }

  return (
    <div className="max-w-lg mx-auto">
      {/* Counter */}
      <div className="text-center mb-4 text-sm text-text-secondary font-en">
        {current + 1} / {total}
      </div>

      {/* Card */}
      <div
        onClick={() => setFlipped(!flipped)}
        className="relative cursor-pointer select-none"
      >
        <div className="bg-white rounded-2xl border border-border shadow-card p-8 sm:p-12 min-h-[320px] flex flex-col items-center justify-center transition-all hover:shadow-lg">
          {!flipped ? (
            // Front
            <>
              <p className="text-5xl sm:text-6xl font-jp text-text-primary mb-6 leading-tight">
                {item.japanese}
              </p>
              <p className="text-lg text-text-secondary font-en mb-4">
                {item.romaji}
              </p>
              <p className="text-xs text-text-secondary">
                ক্লিক করে অর্থ দেখো
              </p>
            </>
          ) : (
            // Back
            <>
              <p className="text-sm text-text-secondary mb-3 font-jp">
                {item.japanese}
              </p>
              <p className="text-3xl sm:text-4xl font-bold text-jp-red mb-4 font-bangla text-center">
                {item.bangla}
              </p>
              <p className="text-base text-text-secondary italic">
                {item.english}
              </p>
              <p className="text-xs text-text-secondary mt-4">
                ক্লিক করে আবার দেখো
              </p>
            </>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-3 gap-2 mt-6">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={current === 0}
          className="font-bangla"
        >
          ← আগের
        </Button>

        <Button
          variant={isLearned ? "secondary" : "primary"}
          onClick={onToggle}
          className="font-bangla"
        >
          {isLearned ? "✓" : "শিখেছি"}
        </Button>

        <Button
          variant="outline"
          onClick={handleNext}
          disabled={current === total - 1}
          className="font-bangla"
        >
          পরের →
        </Button>
      </div>

      {/* Speak button */}
      <div className="text-center mt-4">
        <button
          onClick={handleSpeak}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-jp-red/10 text-jp-red hover:bg-jp-red/20 transition-colors font-bangla"
        >
          🔊 উচ্চারণ শুনো
        </button>
      </div>
    </div>
  );
}
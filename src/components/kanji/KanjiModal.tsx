"use client";

import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { speakJapanese } from "@/lib/audio";
import type { KanjiItem } from "@/lib/data/n5/kanji";

interface KanjiModalProps {
  item: KanjiItem | null;
  isLearned: boolean;
  onClose: () => void;
  onToggleLearned: () => void;
}

export function KanjiModal({
  item,
  isLearned,
  onClose,
  onToggleLearned,
}: KanjiModalProps) {
  if (!item) return null;

  return (
    <Modal isOpen={!!item} onClose={onClose}>
      <div>
        {/* Kanji */}
        <div className="text-center mb-6">
          <div className="text-7xl sm:text-8xl font-jp text-jp-red mb-3 leading-none">
            {item.kanji}
          </div>
          <p className="text-2xl font-bold text-text-primary font-bangla mb-1">
            {item.meaning}
          </p>
          <p className="text-sm text-text-secondary italic">
            {item.meaningEn}
          </p>
          <p className="text-xs text-text-secondary mt-2 font-bangla">
            {item.strokes} strokes • {item.category}
          </p>
        </div>

        {/* Readings */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-jp-red/5 rounded-xl p-3 text-center">
            <p className="text-xs text-text-secondary mb-1 font-bangla">
              On-yomi (音読み)
            </p>
            <p className="text-lg font-jp text-jp-red">{item.onReading}</p>
          </div>
          <div className="bg-bd-green/5 rounded-xl p-3 text-center">
            <p className="text-xs text-text-secondary mb-1 font-bangla">
              Kun-yomi (訓読み)
            </p>
            <p className="text-lg font-jp text-bd-green">{item.kunReading}</p>
          </div>
        </div>

        {/* Examples */}
        <div className="mb-6">
          <p className="text-sm font-bold text-text-primary mb-3 font-bangla">
            উদাহরণ
          </p>
          <div className="space-y-2">
            {item.examples.map((ex, i) => (
              <div
                key={i}
                className="bg-bg-alt rounded-xl p-3 flex items-center justify-between gap-2"
              >
                <div className="flex-1">
                  <p className="text-lg font-jp text-text-primary">
                    {ex.word}
                  </p>
                  <p className="text-xs text-text-secondary font-en">
                    {ex.reading}
                  </p>
                  <p className="text-xs text-text-primary mt-0.5 font-bangla">
                    {ex.meaning}
                  </p>
                </div>
                <button
                  onClick={() => speakJapanese(ex.word)}
                  className="w-9 h-9 rounded-lg hover:bg-white flex items-center justify-center text-base transition-colors shrink-0"
                  aria-label="Speak"
                >
                  🔊
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            size="lg"
            onClick={() => speakJapanese(item.kanji)}
            className="flex-1 gap-2 font-bangla"
          >
            🔊 শুনো
          </Button>

          <Button
            variant={isLearned ? "outline" : "primary"}
            size="lg"
            onClick={onToggleLearned}
            className="flex-1 font-bangla"
          >
            {isLearned ? "✓ শেখা হয়েছে" : "শিখেছি চিহ্নিত করো"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

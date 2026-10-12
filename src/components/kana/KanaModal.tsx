"use client";

import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { speakJapanese } from "@/lib/audio";
import type { KanaItem } from "@/lib/kanaData";

interface KanaModalProps {
  item: KanaItem | null;
  isLearned: boolean;
  onClose: () => void;
  onToggleLearned: () => void;
}

export function KanaModal({
  item,
  isLearned,
  onClose,
  onToggleLearned,
}: KanaModalProps) {
  if (!item) return null;

  return (
    <Modal isOpen={!!item} onClose={onClose}>
      <div className="text-center">
        {/* Character */}
        <div className="text-7xl sm:text-8xl font-jp text-jp-red mb-4">
          {item.char}
        </div>

        {/* Romaji */}
        <p className="text-xl text-text-secondary font-en mb-6">
          {item.romaji}
        </p>

        {/* Bangla pronunciation */}
        <div className="bg-bg-alt rounded-xl p-4 mb-6">
          <p className="text-xs text-text-secondary mb-1 font-bangla">
            বাংলা উচ্চারণ
          </p>
          <p className="text-2xl font-bold text-text-primary font-bangla">
            {item.bangla}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            size="lg"
            onClick={() => speakJapanese(item.char)}
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
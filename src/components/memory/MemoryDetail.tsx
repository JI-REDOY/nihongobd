"use client";

import { speakJapanese } from "@/lib/audio";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { MemoryRadical } from "@/lib/data/types";

interface MemoryDetailProps {
  radical: MemoryRadical;
  onBack: () => void;
}

export function MemoryDetail({ radical, onBack }: MemoryDetailProps) {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <button
        onClick={onBack}
        className="text-sm text-text-secondary hover:text-jp-red font-bangla mb-6"
      >
        ← সব radical
      </button>

      {/* Hero */}
      <div className="bg-gradient-to-br from-jp-red to-jp-red/80 rounded-2xl p-8 text-white shadow-card mb-8">
        <div className="flex items-center gap-6 flex-col sm:flex-row">
          <div className="w-28 h-28 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
            <span className="text-7xl font-jp font-bold">
              {radical.radical}
            </span>
          </div>
          <div className="text-center sm:text-left flex-1">
            <p className="text-xs uppercase tracking-widest opacity-80 mb-1 font-en">
              Radical
            </p>
            <h1 className="text-3xl font-bold font-bangla mb-2">
              {radical.radicalNameBangla}
            </h1>
            <p className="text-lg opacity-90 font-en mb-3">
              {radical.radicalName}
            </p>
            <div className="flex flex-wrap gap-3 text-sm opacity-90">
              <span>🔹 {radical.strokeCount} strokes</span>
              <span>🔹 {radical.kanjiFamily.length}+ kanji family</span>
            </div>
          </div>
        </div>
      </div>

      {/* Intro */}
      <div className="bg-white rounded-2xl border border-border shadow-soft p-6 mb-6">
        <h2 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-3 font-bangla">
          পরিচিতি
        </h2>
        <p className="text-text-primary leading-relaxed font-bangla">
          {radical.intro}
        </p>
      </div>

      {/* Mnemonic Tip */}
      <div className="bg-jp-red/5 border-2 border-jp-red/20 rounded-2xl p-6 mb-8">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <h2 className="text-sm font-bold text-jp-red uppercase tracking-wider mb-2 font-bangla">
              মনে রাখার টিপস
            </h2>
            <p className="text-text-primary leading-relaxed font-bangla">
              {radical.mnemonicTip}
            </p>
          </div>
        </div>
      </div>

      {/* Kanji Family */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-text-primary mb-4 font-bangla">
          🌳 এই radical এর পরিবার ({radical.kanjiFamily.length} kanji)
        </h2>

        <div className="space-y-3">
          {radical.kanjiFamily.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-border shadow-soft p-5 hover:shadow-card transition-shadow"
            >
              <div className="flex items-start gap-5 flex-col sm:flex-row">
                {/* Kanji */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="w-20 h-20 rounded-xl bg-jp-red/10 flex items-center justify-center">
                    <span className="text-4xl font-jp font-bold text-jp-red">
                      {item.kanji}
                    </span>
                  </div>
                  <button
                    onClick={() => speakJapanese(item.kanji)}
                    className="w-10 h-10 rounded-lg hover:bg-bg-alt flex items-center justify-center text-lg"
                    aria-label="Speak"
                  >
                    🔊
                  </button>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  {/* Reading + Meaning */}
                  <div className="mb-3">
                    <p className="text-sm text-jp-red font-jp mb-0.5">
                      {item.reading}
                    </p>
                    <p className="text-lg font-bold text-text-primary font-bangla">
                      {item.meaning}
                    </p>
                    <p className="text-xs text-text-secondary italic">
                      {item.meaningEn}
                    </p>
                  </div>

                  {/* Components */}
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="text-xs text-text-secondary font-bangla">
                      উপাদান:
                    </span>
                    {item.components.map((c, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-lg bg-bg-alt text-jp-red font-jp text-sm"
                      >
                        {c}
                      </span>
                    ))}
                  </div>

                  {/* Mnemonic */}
                  <div className="bg-bg-alt rounded-xl p-3">
                    <p className="text-xs text-text-secondary mb-1 font-bangla">
                      🧠 মনে রাখার গল্প:
                    </p>
                    <p className="text-sm text-text-primary font-bangla leading-relaxed">
                      {item.mnemonic}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-bd-green to-bd-green/80 rounded-2xl p-6 text-white text-center">
        <p className="text-sm opacity-90 mb-2 font-bangla">
          এই radical এর সব kanji শিখতে
        </p>
        <h3 className="text-xl font-bold mb-4 font-bangla">
          Practice করতে যাও
        </h3>
        <a href="/n5/kanji">
          <Button variant="outline" size="lg" className="font-bangla bg-white">
            🎯 Kanji Practice →
          </Button>
        </a>
      </div>
    </div>
  );
}
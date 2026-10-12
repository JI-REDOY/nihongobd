"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { speakJapanese } from "@/lib/audio";
import {
  recognizeSpeech,
  comparePronunciation,
  isSpeechRecognitionSupported,
} from "@/lib/speechRecognition";
import { useToast } from "@/context/ToastContext";
import { cn } from "@/lib/utils";

type PracticeItem = {
  japanese: string;
  romaji: string;
  bangla: string;
};

const practiceItems: PracticeItem[] = [
  { japanese: "こんにちは", romaji: "konnichiwa", bangla: "হ্যালো" },
  { japanese: "ありがとう", romaji: "arigatou", bangla: "ধন্যবাদ" },
  { japanese: "おはよう", romaji: "ohayou", bangla: "সুপ্রভাত" },
  { japanese: "すみません", romaji: "sumimasen", bangla: "মাফ করবেন" },
  { japanese: "さようなら", romaji: "sayounara", bangla: "বিদায়" },
  { japanese: "おやすみなさい", romaji: "oyasuminasai", bangla: "শুভ রাত্রি" },
  { japanese: "わたし", romaji: "watashi", bangla: "আমি" },
  { japanese: "がくせい", romaji: "gakusei", bangla: "ছাত্র" },
  { japanese: "せんせい", romaji: "sensei", bangla: "শিক্ষক" },
  { japanese: "ともだち", romaji: "tomodachi", bangla: "বন্ধু" },
];

export function SpeechPractice() {
  const toast = useToast();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [listening, setListening] = useState(false);
  const [result, setResult] = useState<{
    transcript: string;
    score: number;
  } | null>(null);
  const [supportChecked, setSupportChecked] = useState(false);
  const [supported, setSupported] = useState(true);

  const current = practiceItems[currentIdx];

  function checkSupport() {
    if (!supportChecked) {
      setSupported(isSpeechRecognitionSupported());
      setSupportChecked(true);
    }
    return supported;
  }

  function handleListen() {
    if (!checkSupport()) {
      toast.error("Support নেই", "Chrome বা Edge ব্যবহার করো");
      return;
    }

    setResult(null);
    setListening(true);

    const stop = recognizeSpeech(
      "ja-JP",
      (res) => {
        const score = comparePronunciation(current.japanese, res.transcript);
        setResult({ transcript: res.transcript, score });
        setListening(false);

        if (score >= 80) {
          toast.success("চমৎকার! 🎉", `${score}% সঠিক`);
        } else if (score >= 50) {
          toast.info("ভালো চেষ্টা", `${score}% — আরেকবার চেষ্টা করো`);
        } else {
          toast.warning("আরো চেষ্টা করো", `${score}% — আবার বলো`);
        }
      },
      (err) => {
        toast.error("সমস্যা", err);
        setListening(false);
      }
    );

    // Auto stop after 6 seconds
    setTimeout(() => {
      if (stop) stop();
      setListening(false);
    }, 6000);
  }

  function handleNext() {
    setResult(null);
    setCurrentIdx((currentIdx + 1) % practiceItems.length);
  }

  function handlePrev() {
    setResult(null);
    setCurrentIdx(
      currentIdx === 0 ? practiceItems.length - 1 : currentIdx - 1
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-2xl">🎤</span>
          <h2 className="text-xl font-bold text-text-primary font-bangla">
            উচ্চারণ চর্চা
          </h2>
        </div>
        <p className="text-sm text-text-secondary font-bangla">
          শব্দ শুনে নিজে বলো — AI তোমার উচ্চারণ যাচাই করবে
        </p>
      </div>

      {/* Counter */}
      <div className="text-center mb-4">
        <span className="text-sm text-text-secondary font-en">
          {currentIdx + 1} / {practiceItems.length}
        </span>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl border border-border shadow-card p-8 mb-6 text-center">
        <p className="text-6xl font-jp text-text-primary mb-4">
          {current.japanese}
        </p>
        <p className="text-lg text-text-secondary font-en mb-2">
          {current.romaji}
        </p>
        <p className="text-base font-bangla text-text-secondary mb-6">
          {current.bangla}
        </p>

        {/* Listen button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => speakJapanese(current.japanese)}
          className="font-bangla"
        >
          🔊 আগে শুনো
        </Button>
      </div>

      {/* Record Button */}
      <div className="text-center mb-6">
        <button
          onClick={handleListen}
          disabled={listening}
          className={cn(
            "w-24 h-24 rounded-full text-4xl flex items-center justify-center transition-all shadow-card",
            listening
              ? "bg-error text-white animate-pulse scale-110"
              : "bg-jp-red text-white hover:scale-105"
          )}
          aria-label="Record"
        >
          🎤
        </button>
        <p className="text-sm text-text-secondary mt-3 font-bangla">
          {listening ? "শুনছি... বলো!" : "🎤 button চেপে বলো"}
        </p>
      </div>

      {/* Result */}
      {result && (
        <div
          className={cn(
            "rounded-2xl p-6 border-2 mb-6",
            result.score >= 80
              ? "bg-bd-green/5 border-bd-green"
              : result.score >= 50
              ? "bg-warning/5 border-warning"
              : "bg-error/5 border-error"
          )}
        >
          <div className="text-center">
            <div className="text-5xl mb-2">
              {result.score >= 80 ? "🎉" : result.score >= 50 ? "👏" : "💪"}
            </div>
            <p className="text-xs text-text-secondary mb-2 font-bangla">
              তুমি বলেছ:
            </p>
            <p className="text-2xl font-jp text-text-primary mb-3">
              {result.transcript}
            </p>
            <p
              className={cn(
                "text-3xl font-bold",
                result.score >= 80
                  ? "text-bd-green"
                  : result.score >= 50
                  ? "text-warning"
                  : "text-error"
              )}
            >
              {result.score}%
            </p>
            <p className="text-xs text-text-secondary mt-2 font-bangla">
              {result.score >= 80
                ? "অসাধারণ!"
                : result.score >= 50
                ? "ভালো — আরো practice করো"
                : "আবার চেষ্টা করো"}
            </p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" onClick={handlePrev} className="font-bangla">
          ← আগের
        </Button>
        <Button variant="outline" onClick={handleNext} className="font-bangla">
          পরের →
        </Button>
      </div>

      {/* Support warning */}
      {supportChecked && !supported && (
        <div className="mt-4 p-3 rounded-xl bg-warning/10 border border-warning/20 text-xs text-warning font-bangla text-center">
          ⚠️ তোমার browser এ Speech Recognition নেই। Chrome বা Edge ব্যবহার করো।
        </div>
      )}
    </div>
  );
}
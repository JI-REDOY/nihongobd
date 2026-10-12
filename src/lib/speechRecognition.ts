"use client";

export type SpeechResult = {
  transcript: string;
  confidence: number;
  isSupported: boolean;
};

export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === "undefined") return false;
  const SpeechRecognition =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;
  return !!SpeechRecognition;
}

export function recognizeSpeech(
  lang: string = "ja-JP",
  onResult: (result: SpeechResult) => void,
  onError: (error: string) => void
): (() => void) | null {
  if (typeof window === "undefined") return null;

  const SpeechRecognition =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    onError("তোমার browser এ speech recognition support নেই");
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = lang;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.continuous = false;

  recognition.onresult = (event: any) => {
    const result = event.results[0][0];
    onResult({
      transcript: result.transcript,
      confidence: result.confidence,
      isSupported: true,
    });
  };

  recognition.onerror = (event: any) => {
    if (event.error === "no-speech") {
      onError("কিছু শোনা যায়নি — আবার চেষ্টা করো");
    } else if (event.error === "not-allowed") {
      onError("Microphone permission প্রয়োজন");
    } else {
      onError("Error: " + event.error);
    }
  };

  recognition.start();

  return () => recognition.stop();
}

// ===== Compare pronunciation =====
export function comparePronunciation(
  target: string,
  spoken: string
): number {
  if (!target || !spoken) return 0;

  const targetNorm = target.replace(/\s+/g, "").toLowerCase();
  const spokenNorm = spoken.replace(/\s+/g, "").toLowerCase();

  if (targetNorm === spokenNorm) return 100;

  // Levenshtein distance
  const matrix: number[][] = [];
  for (let i = 0; i <= spokenNorm.length; i++) matrix[i] = [i];
  for (let j = 0; j <= targetNorm.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= spokenNorm.length; i++) {
    for (let j = 1; j <= targetNorm.length; j++) {
      if (spokenNorm[i - 1] === targetNorm[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  const distance = matrix[spokenNorm.length][targetNorm.length];
  const maxLen = Math.max(targetNorm.length, spokenNorm.length);
  const similarity = Math.max(0, 100 - (distance / maxLen) * 100);

  return Math.round(similarity);
}
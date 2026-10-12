"use client";

import { Button } from "@/components/ui/Button";

interface QuizResultProps {
  score: number;
  total: number;
  onRetry: () => void;
  onBack: () => void;
}

export function QuizResult({
  score,
  total,
  onRetry,
  onBack,
}: QuizResultProps) {
  const percent = Math.round((score / total) * 100);

  let message = "";
  let emoji = "";
  let color = "";

  if (percent >= 90) {
    message = "অসাধারণ! তুমি দুর্দান্ত!";
    emoji = "🎉";
    color = "text-bd-green";
  } else if (percent >= 70) {
    message = "ভালো করেছ! আরেকটু চেষ্টা করলে perfect হবে";
    emoji = "👏";
    color = "text-bd-green";
  } else if (percent >= 50) {
    message = "চালিয়ে যাও! আরেকবার চেষ্টা করো";
    emoji = "💪";
    color = "text-warning";
  } else {
    message = "চিন্তা করো না — আবার চেষ্টা করো!";
    emoji = "📚";
    color = "text-jp-red";
  }

  return (
    <div className="max-w-md mx-auto text-center py-8">
      <div className="text-6xl mb-4">{emoji}</div>

      <h2 className="text-3xl font-bold text-text-primary mb-2 font-bangla">
        কুইজ শেষ!
      </h2>

      <p className={`text-lg font-medium mb-6 font-bangla ${color}`}>
        {message}
      </p>

      <div className="bg-white rounded-2xl border border-border shadow-soft p-8 mb-6">
        <p className="text-sm text-text-secondary mb-2 font-bangla">
          তোমার স্কোর
        </p>
        <p className="text-6xl font-bold text-jp-red mb-2">
          {score}
          <span className="text-3xl text-text-secondary">/{total}</span>
        </p>
        <div className="w-full h-2 bg-bg-alt rounded-full overflow-hidden mt-4">
          <div
            className="h-full bg-jp-red transition-all duration-1000"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="text-sm text-text-secondary mt-3">{percent}%</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="primary"
          size="lg"
          onClick={onRetry}
          className="flex-1 font-bangla"
        >
          🔄 আবার খেলো
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={onBack}
          className="flex-1 font-bangla"
        >
          ব্যাক
        </Button>
      </div>
    </div>
  );
}
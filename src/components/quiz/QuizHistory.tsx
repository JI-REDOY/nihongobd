"use client";

import { useProgress } from "@/hooks/useProgress";
import { Container } from "@/components/layout/Container";
import Link from "next/link";
import { cn } from "@/lib/utils";

const QUIZ_LABELS: Record<string, { label: string; icon: string }> = {
  vocab: { label: "ভোকাবুলারি", icon: "語" },
  hiragana: { label: "হিরাগানা", icon: "あ" },
  katakana: { label: "কাতাকানা", icon: "ア" },
  listening: { label: "লিসেনিং", icon: "🎧" },
  reading: { label: "রিডিং", icon: "📖" },
};

export function QuizHistory() {
  const { progress, loading } = useProgress();

  if (loading || !progress) {
    return (
      <div className="py-10">
        <Container>
          <div className="h-96 rounded-2xl bg-bg-alt animate-pulse" />
        </Container>
      </div>
    );
  }

  const attempts = [...progress.quiz.attempts].reverse();

  // Stats
  const total = attempts.length;
  const totalScore = attempts.reduce((s, a) => s + a.score, 0);
  const averageScore = total > 0 ? Math.round((totalScore / (total * 10)) * 100) : 0;
  const bestScore = total > 0 ? Math.max(...attempts.map((a) => a.score)) : 0;
  const perfectCount = attempts.filter((a) => a.score === 10).length;

  return (
    <div className="py-10">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-2 font-bangla">
              📊 কুইজ হিস্ট্রি
            </h1>
            <p className="text-text-secondary font-bangla">
              তোমার সব কুইজের অগ্রগতি
            </p>
          </div>

          {total === 0 ? (
            <div className="bg-white rounded-2xl border border-border shadow-soft p-12 text-center">
              <p className="text-6xl mb-4">🎯</p>
              <h2 className="text-2xl font-bold text-text-primary mb-3 font-bangla">
                এখনো কোনো কুইজ খেলা হয়নি
              </h2>
              <p className="text-text-secondary mb-6 font-bangla">
                প্রথম কুইজ খেলে শুরু করো
              </p>
              <Link
                href="/n5/quiz"
                className="inline-block px-6 py-3 bg-jp-red text-white rounded-xl hover:bg-jp-red/90 transition-colors font-bangla"
              >
                কুইজ খেলো →
              </Link>
            </div>
          ) : (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                <StatCard
                  label="মোট কুইজ"
                  value={total}
                  icon="🎯"
                  color="jp-red"
                />
                <StatCard
                  label="গড় স্কোর"
                  value={`${averageScore}%`}
                  icon="📈"
                  color="bd-green"
                />
                <StatCard
                  label="সর্বোচ্চ"
                  value={`${bestScore}/10`}
                  icon="⭐"
                  color="warning"
                />
                <StatCard
                  label="পারফেক্ট"
                  value={perfectCount}
                  icon="🏆"
                  color="jp-red"
                />
              </div>

              {/* Quiz Type Breakdown */}
              <div className="bg-white rounded-2xl border border-border shadow-soft p-6 mb-8">
                <h2 className="text-lg font-bold text-text-primary mb-4 font-bangla">
                  কুইজ টাইপ অনুযায়ী
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {Object.entries(QUIZ_LABELS).map(([type, meta]) => {
                    const typeAttempts = attempts.filter(
                      (a) => a.type === type
                    );
                    const count = typeAttempts.length;
                    const avg =
                      count > 0
                        ? Math.round(
                            (typeAttempts.reduce((s, a) => s + a.score, 0) /
                              (count * 10)) *
                              100
                          )
                        : 0;

                    return (
                      <div
                        key={type}
                        className="text-center p-3 rounded-xl bg-bg-alt"
                      >
                        <div className="text-2xl mb-1">{meta.icon}</div>
                        <p className="text-xs font-medium text-text-primary mb-1 font-bangla">
                          {meta.label}
                        </p>
                        <p className="text-lg font-bold text-jp-red">
                          {count}
                        </p>
                        {count > 0 && (
                          <p className="text-[10px] text-text-secondary font-en">
                            avg {avg}%
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Attempts List */}
              <div className="bg-white rounded-2xl border border-border shadow-soft overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h2 className="text-lg font-bold text-text-primary font-bangla">
                    সব কুইজ ({total})
                  </h2>
                </div>

                <div className="divide-y divide-border">
                  {attempts.map((attempt, idx) => {
                    const meta = QUIZ_LABELS[attempt.type] || {
                      label: attempt.type,
                      icon: "🎯",
                    };
                    const percent = (attempt.score / 10) * 100;
                    const date = new Date(attempt.date);

                    return (
                      <div
                        key={idx}
                        className="p-4 flex items-center gap-4 hover:bg-bg-alt/50 transition-colors"
                      >
                        <div className="w-12 h-12 rounded-xl bg-jp-red/10 text-jp-red flex items-center justify-center text-xl shrink-0 font-jp">
                          {meta.icon}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-text-primary text-sm font-bangla">
                            {meta.label}
                          </p>
                          <p className="text-xs text-text-secondary">
                            {date.toLocaleDateString("bn-BD", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>

                        <div className="text-right shrink-0">
                          <p
                            className={cn(
                              "text-lg font-bold font-en",
                              percent >= 80
                                ? "text-bd-green"
                                : percent >= 50
                                ? "text-warning"
                                : "text-error"
                            )}
                          >
                            {attempt.score}/10
                          </p>
                          <p className="text-xs text-text-secondary font-en">
                            {percent}%
                          </p>
                        </div>

                        <div className="w-16 h-1.5 bg-bg-alt rounded-full overflow-hidden shrink-0">
                          <div
                            className={cn(
                              "h-full rounded-full",
                              percent >= 80
                                ? "bg-bd-green"
                                : percent >= 50
                                ? "bg-warning"
                                : "bg-error"
                            )}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8 text-center">
                <Link
                  href="/n5/quiz"
                  className="inline-block px-6 py-3 bg-jp-red text-white rounded-xl hover:bg-jp-red/90 transition-colors font-bangla"
                >
                  🎯 নতুন কুইজ খেলো
                </Link>
              </div>
            </>
          )}
        </div>
      </Container>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: string | number;
  icon: string;
  color: "jp-red" | "bd-green" | "warning";
}) {
  const colorClass =
    color === "jp-red"
      ? "text-jp-red"
      : color === "bd-green"
      ? "text-bd-green"
      : "text-warning";

  return (
    <div className="bg-white rounded-2xl border border-border p-4 text-center">
      <div className="text-2xl mb-1">{icon}</div>
      <p className={cn("text-2xl font-bold mb-1", colorClass)}>{value}</p>
      <p className="text-xs text-text-secondary font-bangla">{label}</p>
    </div>
  );
}
"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { useProgress } from "@/hooks/useProgress";
import { cn } from "@/lib/utils";

interface DashboardClientProps {
    userName: string;
    courseGoal?: {
        durationDays: number;
        dailyTarget: number;
        startedAt: string;
    };
}

type ProgressItem = {
    key: string;
    label: string;
    icon: string;
    learned: number;
    total: number;
    color: "jp-red" | "bd-green";
    href: string;
};

export function DashboardClient({
    userName,
    courseGoal,
}: DashboardClientProps) {
    const { progress, loading } = useProgress();

    if (loading || !progress) {
        return (
            <div className="space-y-6">
                <div className="h-32 rounded-2xl bg-bg-alt animate-pulse" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="h-40 rounded-2xl bg-white animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    const items: ProgressItem[] = [
        {
            key: "hiragana",
            label: "হিরাগানা",
            icon: "あ",
            learned: progress.hiragana.learned.length,
            total: 46,
            color: "jp-red",
            href: "/hiragana",
        },
        {
            key: "katakana",
            label: "কাতাকানা",
            icon: "ア",
            learned: progress.katakana.learned.length,
            total: 46,
            color: "bd-green",
            href: "/katakana",
        },
        {
            key: "vocabulary",
            label: "N5 ভোকাবুলারি",
            icon: "語",
            learned: progress.n5.vocabulary.learned.length,
            total: 200,
            color: "jp-red",
            href: "/n5/vocabulary",
        },
        {
            key: "grammar",
            label: "N5 গ্রামার",
            icon: "文",
            learned: progress.n5.grammar.completed.length,
            total: 15,
            color: "bd-green",
            href: "/n5/grammar",
        },
        {
            key: "kanji",
            label: "N5 কাঞ্জি",
            icon: "漢",
            learned: progress.n5.kanji.learned.length,
            total: 100,
            color: "bd-green",
            href: "/n5/kanji",
        },
    ];

    const nextSuggestion = items.find((item) => item.learned < item.total);

    const totalLearned = items.reduce((sum, i) => sum + i.learned, 0);
    const totalItems = items.reduce((sum, i) => sum + i.total, 0);
    const overallPercent = Math.round((totalLearned / totalItems) * 100);

    const latestQuiz = progress.quiz.attempts[progress.quiz.attempts.length - 1];

    const firstName = userName.split(" ")[0];

    // Days remaining calculate
    let daysRemaining: number | null = null;
    let daysElapsed = 0;
    let onTrack = true;
    if (courseGoal) {
        daysElapsed = Math.floor(
            (Date.now() - new Date(courseGoal.startedAt).getTime()) /
            (1000 * 60 * 60 * 24)
        );
        daysRemaining = Math.max(0, courseGoal.durationDays - daysElapsed);

        // On track calculation: expected % based on elapsed days
        const expectedPercent = Math.min(
            100,
            Math.round((daysElapsed / courseGoal.durationDays) * 100)
        );
        onTrack = overallPercent >= expectedPercent - 10; // 10% tolerance
    }

    return (
        <div className="space-y-6">
            {/* Welcome Hero */}
            <div className="relative overflow-hidden bg-gradient-to-br from-jp-red to-jp-red/80 rounded-2xl p-6 sm:p-8 text-white shadow-card">
                <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5" />
                <div className="absolute -bottom-12 -left-12 w-56 h-56 rounded-full bg-white/5" />

                <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex-1">
                        <p className="text-sm opacity-90 font-bangla mb-1">
                            স্বাগতম, {firstName}! 👋
                        </p>
                        <h1 className="text-2xl sm:text-3xl font-bold font-bangla mb-2">
                            তোমার শেখার যাত্রা চালিয়ে যাও
                        </h1>
                        <p className="text-sm opacity-90 font-bangla">
                            সামগ্রিক অগ্রগতি:{" "}
                            <span className="font-bold">{overallPercent}%</span>
                        </p>

                        {/* Course duration info */}
                        {courseGoal && daysRemaining !== null && (
                            <p className="text-xs opacity-80 mt-2 font-bangla">
                                📅 {courseGoal.durationDays} দিনের প্ল্যান —{" "}
                                <span className="font-medium">{daysRemaining} দিন বাকি</span>
                                {!onTrack && (
                                    <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-full">
                                        ⚡ দ্রুত করো!
                                    </span>
                                )}
                                {onTrack && (
                                    <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-full">
                                        ✓ ঠিক পথে
                                    </span>
                                )}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-2 gap-3 lg:min-w-[260px]">
                        <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 text-center">
                            <p className="text-xs opacity-90 font-bangla">🔥 স্ট্রিক</p>
                            <p className="text-3xl font-bold mt-1">{progress.streak.current}</p>
                            <p className="text-xs opacity-80 font-bangla">দিন</p>
                        </div>
                        {courseGoal && daysRemaining !== null ? (
                            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 text-center">
                                <p className="text-xs opacity-90 font-bangla">📅 বাকি</p>
                                <p className="text-3xl font-bold mt-1">{daysRemaining}</p>
                                <p className="text-xs opacity-80 font-bangla">দিন</p>
                            </div>
                        ) : (
                            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 text-center">
                                <p className="text-xs opacity-90 font-bangla">📚 মোট</p>
                                <p className="text-3xl font-bold mt-1">{totalItems}</p>
                                <p className="text-xs opacity-80 font-bangla">item</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Daily target banner */}
            {courseGoal && (
                <div className="bg-white rounded-2xl border border-border p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-bd-green/10 text-bd-green flex items-center justify-center text-2xl shrink-0">
                        🎯
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-bold text-text-primary font-bangla">
                            দিনে {courseGoal.dailyTarget}টি item শেষ করো
                        </p>
                        <p className="text-xs text-text-secondary mt-0.5 font-bangla">
                            {courseGoal.durationDays} দিনে N5 শেষ করার লক্ষ্য
                        </p>
                    </div>
                </div>
            )}

            {/* Progress Grid */}
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">📚</span>
                    <h2 className="text-xl font-bold text-text-primary font-bangla">
                        শেখার অগ্রগতি
                    </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {items.map((item) => (
                        <ProgressTile key={item.key} item={item} />
                    ))}
                </div>
            </div>

            {/* Suggested Next + Quiz */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {nextSuggestion && (
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-2xl">🎯</span>
                            <h2 className="text-xl font-bold text-text-primary font-bangla">
                                এখনই শুরু করো
                            </h2>
                        </div>
                        <Link href={nextSuggestion.href}>
                            <Card hoverable className="h-full">
                                <div className="flex items-center gap-4">
                                    <div
                                        className={cn(
                                            "w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-jp font-bold shrink-0",
                                            nextSuggestion.color === "jp-red"
                                                ? "bg-jp-red/10 text-jp-red"
                                                : "bg-bd-green/10 text-bd-green"
                                        )}
                                    >
                                        {nextSuggestion.icon}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs text-text-secondary font-bangla mb-1">
                                            পরবর্তী পাঠ
                                        </p>
                                        <h3 className="font-bold text-text-primary font-bangla">
                                            {nextSuggestion.label}
                                        </h3>
                                        <p className="text-xs text-text-secondary mt-1">
                                            {nextSuggestion.learned} / {nextSuggestion.total} সম্পন্ন
                                        </p>
                                    </div>
                                    <span className="text-jp-red text-2xl">→</span>
                                </div>
                            </Card>
                        </Link>
                    </div>
                )}

                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl">🏆</span>
                        <h2 className="text-xl font-bold text-text-primary font-bangla">
                            শেষ কুইজ
                        </h2>
                    </div>
                    <Link href="/n5/quiz">
                        <Card hoverable className="h-full">
                            {latestQuiz ? (
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-xl bg-bd-green/10 text-bd-green flex items-center justify-center text-2xl shrink-0">
                                        ⭐
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs text-text-secondary font-bangla mb-1">
                                            সর্বশেষ স্কোর
                                        </p>
                                        <p className="text-2xl font-bold text-text-primary">
                                            {latestQuiz.score} / 10
                                        </p>
                                        <p className="text-xs text-text-secondary mt-1 capitalize">
                                            {latestQuiz.type}
                                        </p>
                                    </div>
                                    <span className="text-jp-red text-2xl">→</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-xl bg-jp-red/10 text-jp-red flex items-center justify-center text-2xl shrink-0">
                                        ✏️
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-text-primary font-bangla">
                                            কুইজ খেলো
                                        </h3>
                                        <p className="text-xs text-text-secondary mt-1 font-bangla">
                                            এখনো কোনো কুইজ খেলা হয়নি
                                        </p>
                                    </div>
                                    <span className="text-jp-red text-2xl">→</span>
                                </div>
                            )}
                        </Card>
                    </Link>
                </div>
            </div>
        </div>
    );
}

function ProgressTile({ item }: { item: ProgressItem }) {
    const percent =
        item.total > 0 ? Math.round((item.learned / item.total) * 100) : 0;
    const isRed = item.color === "jp-red";

    return (
        <Link href={item.href}>
            <div className="group bg-white rounded-2xl border border-border p-5 hover:shadow-card hover:-translate-y-0.5 transition-all duration-300 h-full">
                <div
                    className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center text-xl font-jp font-bold mb-3",
                        isRed ? "bg-jp-red/10 text-jp-red" : "bg-bd-green/10 text-bd-green"
                    )}
                >
                    {item.icon}
                </div>
                <h3 className="font-bold text-text-primary mb-1 font-bangla text-sm">
                    {item.label}
                </h3>
                <p
                    className={cn(
                        "text-xs mb-3 font-en",
                        isRed ? "text-jp-red" : "text-bd-green"
                    )}
                >
                    {item.learned} / {item.total}
                </p>
                <div className="w-full h-2 bg-bg-alt rounded-full overflow-hidden">
                    <div
                        className={cn(
                            "h-full transition-all duration-700 rounded-full",
                            isRed ? "bg-jp-red" : "bg-bd-green"
                        )}
                        style={{ width: `${percent}%` }}
                    />
                </div>
                <p className="text-xs text-text-secondary mt-2 text-right">
                    {percent}%
                </p>
            </div>
        </Link>
    );
}

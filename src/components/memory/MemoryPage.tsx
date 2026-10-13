"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { MemoryCard } from "./MemoryCard";
import { MemoryDetail } from "./MemoryDetail";
import { getLevelData, type Level } from "@/lib/data";
import type { MemoryRadical } from "@/lib/data/types";

interface MemoryPageProps {
    level: Level;
}

export function MemoryPage({ level }: MemoryPageProps) {
    const [selected, setSelected] = useState<MemoryRadical | null>(null);
    const radicals = getLevelData(level).memory;

    return (
        <div className="py-10 bg-bg-alt min-h-screen">
            <Container>
                {selected ? (
                    <MemoryDetail radical={selected} onBack={() => setSelected(null)} />
                ) : (
                    <>
                        {/* Header */}
                        <div className="inline-block px-3 py-1 rounded-full bg-jp-red/10 text-jp-red text-xs font-bold mb-3 font-bangla">
                            🥷 নিঞ্জা টেকনিক
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3 font-bangla">
                            এক Radical = অসংখ্য Kanji
                        </h1>
                        <p className="text-text-secondary font-bangla">
                            জাপানিজ নিঞ্জাদের মতো স্মার্ট উপায়ে kanji মনে রাখো —{" "}
                            <strong className="text-jp-red">এক radical</strong> শিখলে তার
                            পরিবারের <strong className="text-jp-red">১০-১৫টি kanji</strong> একসাথে
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-10">
                            <div className="bg-white rounded-xl border border-border p-4 text-center">
                                <p className="text-3xl font-bold text-jp-red">
                                    {radicals.length}
                                </p>
                                <p className="text-xs text-text-secondary font-bangla mt-1">
                                    Radicals
                                </p>
                            </div>
                            <div className="bg-white rounded-xl border border-border p-4 text-center">
                                <p className="text-3xl font-bold text-jp-red">
                                    {radicals.reduce((sum, r) => sum + r.kanjiFamily.length, 0)}
                                </p>
                                <p className="text-xs text-text-secondary font-bangla mt-1">
                                    Total kanji
                                </p>
                            </div>
                            <div className="bg-white rounded-xl border border-border p-4 text-center">
                                <p className="text-3xl font-bold text-jp-red">🥷</p>
                                <p className="text-xs text-text-secondary font-bangla mt-1">
                                    নিঞ্জা ট্রিকস
                                </p>
                            </div>
                        </div>

                        {/* Grid */}
                        {radicals.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-2xl border border-border">
                                <p className="text-6xl mb-4">🧠</p>
                                <h2 className="text-2xl font-bold text-text-primary mb-2 font-bangla">
                                    {level.toUpperCase()} Memory Method শীঘ্রই আসছে
                                </h2>
                                <p className="text-text-secondary font-bangla">
                                    আমরা এই section এ কাজ করছি
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                {radicals.map((r) => (
                                    <MemoryCard
                                        key={r.id}
                                        radical={r}
                                        onClick={() => setSelected(r)}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </Container>
        </div>
    );
}
"use client";

import { useEffect, useState, useCallback } from "react";
import type { UserProgress } from "@/types/progress";

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProgress = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/progress");
      if (!res.ok) throw new Error("Failed to load progress");
      const data = await res.json();
      setProgress(data);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  const toggleKana = useCallback(
    async (type: "hiragana" | "katakana", char: string) => {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "toggleKana", type, char }),
      });
      if (!res.ok) return null;
      const data = await res.json();
      setProgress((p) =>
        p
          ? {
            ...p,
            [type]: { learned: data.learned, inProgress: data.inProgress },
          }
          : p
      );
      return data;
    },
    []
  );

  const toggleVocab = useCallback(async (id: string) => {
    const res = await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "toggleVocab", id }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    setProgress((p) =>
      p ? { ...p, vocabulary: { learned: data.learned } } : p
    );
    return data;
  }, []);

  const toggleGrammar = useCallback(async (id: string) => {
    const res = await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "toggleGrammar", id }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    setProgress((p) =>
      p ? { ...p, grammar: { completed: data.completed } } : p
    );
    return data;
  }, []);

  const toggleKanji = useCallback(async (id: string) => {
    const res = await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "toggleKanji", id }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    setProgress((p) =>
      p ? { ...p, kanji: { learned: data.learned } } : p
    );
    return data;
  }, []);

  const saveQuiz = useCallback(
    async (score: number, type: string) => {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "saveQuiz", score, type }),
      });
      if (!res.ok) return null;
      const data = await res.json();
      setProgress((p) =>
        p ? { ...p, quiz: { attempts: data.attempts } } : p
      );
      return data;
    },
    []
  );

  return {
    progress,
    loading,
    error,
    refetch: fetchProgress,
    toggleKana,
    toggleVocab,
    toggleGrammar,
    toggleKanji,
    saveQuiz,
  };
}
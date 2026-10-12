import { db } from "./mongodb";
import type { UserProgress, LevelProgress } from "@/types/progress";
import type { Level } from "./data/types";

const COLLECTION = "userProgress";

function emptyLevelProgress(): LevelProgress {
  return {
    vocabulary: { learned: [] },
    grammar: { completed: [] },
    kanji: { learned: [] },
  };
}

export function emptyProgress(userId: string): UserProgress {
  return {
    userId,
    hiragana: { learned: [], inProgress: [] },
    katakana: { learned: [], inProgress: [] },
    n5: emptyLevelProgress(),
    n4: emptyLevelProgress(),
    quiz: { attempts: [] },
    streak: { current: 0, longest: 0, lastDate: null },
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export async function getProgress(userId: string): Promise<UserProgress> {
  const doc = await db.collection(COLLECTION).findOne({ userId });

  if (!doc) {
    const fresh = emptyProgress(userId);
    await db.collection(COLLECTION).insertOne(fresh);
    return fresh;
  }

  // Migration: পুরানো structure হলে নতুন structure এ convert করো
  const p = doc as any;
  let needsUpdate = false;

  if (!p.n5) {
    p.n5 = {
      vocabulary: p.vocabulary || { learned: [] },
      grammar: p.grammar || { completed: [] },
      kanji: p.kanji || { learned: [] },
    };
    delete p.vocabulary;
    delete p.grammar;
    delete p.kanji;
    needsUpdate = true;
  }

  if (!p.n4) {
    p.n4 = emptyLevelProgress();
    needsUpdate = true;
  }

  if (needsUpdate) {
    await db.collection(COLLECTION).updateOne(
      { userId },
      { $set: { n5: p.n5, n4: p.n4, updatedAt: new Date() }, $unset: { vocabulary: "", grammar: "", kanji: "" } }
    );
  }

  return p as UserProgress;
}

export async function updateProgress(
  userId: string,
  update: Partial<UserProgress>
): Promise<UserProgress> {
  const result = await db.collection(COLLECTION).findOneAndUpdate(
    { userId },
    {
      $set: { ...update, updatedAt: new Date() },
      $setOnInsert: { createdAt: new Date() },
    },
    { upsert: true, returnDocument: "after" }
  );
  return result as unknown as UserProgress;
}

// ===== Kana =====
export async function markKanaLearned(
  userId: string,
  type: "hiragana" | "katakana",
  char: string
) {
  const progress = await getProgress(userId);
  const current = progress[type];
  const learned = Array.from(new Set([...current.learned, char]));
  const inProgress = current.inProgress.filter((c) => c !== char);
  await updateProgress(userId, { [type]: { learned, inProgress } });
  return { learned, inProgress };
}

export async function toggleKanaLearned(
  userId: string,
  type: "hiragana" | "katakana",
  char: string
) {
  const progress = await getProgress(userId);
  const current = progress[type];
  const isLearned = current.learned.includes(char);
  const learned = isLearned
    ? current.learned.filter((c) => c !== char)
    : [...current.learned, char];
  await updateProgress(userId, { [type]: { ...current, learned } });
  return { learned, isLearned: !isLearned };
}

// ===== Level-specific =====
export async function toggleVocabLearned(
  userId: string,
  level: Level,
  id: string
) {
  const progress = await getProgress(userId);
  const levelData = progress[level] || emptyLevelProgress();
  const current = levelData.vocabulary.learned;
  const isLearned = current.includes(id);
  const learned = isLearned ? current.filter((v) => v !== id) : [...current, id];

  const updatedLevel = {
    ...levelData,
    vocabulary: { learned },
  };

  await updateProgress(userId, { [level]: updatedLevel });
  return { learned, isLearned: !isLearned };
}

export async function toggleGrammarCompleted(
  userId: string,
  level: Level,
  id: string
) {
  const progress = await getProgress(userId);
  const levelData = progress[level] || emptyLevelProgress();
  const current = levelData.grammar.completed;
  const isCompleted = current.includes(id);
  const completed = isCompleted ? current.filter((g) => g !== id) : [...current, id];

  const updatedLevel = {
    ...levelData,
    grammar: { completed },
  };

  await updateProgress(userId, { [level]: updatedLevel });
  return { completed, isCompleted: !isCompleted };
}

export async function toggleKanjiLearned(
  userId: string,
  level: Level,
  id: string
) {
  const progress = await getProgress(userId);
  const levelData = progress[level] || emptyLevelProgress();
  const current = levelData.kanji.learned;
  const isLearned = current.includes(id);
  const learned = isLearned ? current.filter((k) => k !== id) : [...current, id];

  const updatedLevel = {
    ...levelData,
    kanji: { learned },
  };

  await updateProgress(userId, { [level]: updatedLevel });
  return { learned, isLearned: !isLearned };
}

// ===== Quiz + Streak =====
export async function saveQuizAttempt(
  userId: string,
  score: number,
  type: string
) {
  const progress = await getProgress(userId);
  const attempts = [...progress.quiz.attempts, { score, date: new Date(), type }];
  await updateProgress(userId, { quiz: { attempts } });
  return attempts;
}

export async function updateStreak(userId: string) {
  const progress = await getProgress(userId);
  const now = new Date();
  const last = progress.streak.lastDate ? new Date(progress.streak.lastDate) : null;
  let current = progress.streak.current;
  let longest = progress.streak.longest;

  if (!last) {
    current = 1;
  } else {
    const diffDays = Math.floor(
      (now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (diffDays === 0) {
      // same day
    } else if (diffDays === 1) {
      current += 1;
    } else {
      current = 1;
    }
  }

  if (current > longest) longest = current;
  await updateProgress(userId, { streak: { current, longest, lastDate: now } });
  return { current, longest };
}
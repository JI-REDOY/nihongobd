import { db } from "./mongodb";
import type { UserProgress } from "@/types/progress";

const COLLECTION = "userProgress";

export function emptyProgress(userId: string): UserProgress {
  return {
    userId,
    hiragana: { learned: [], inProgress: [] },
    katakana: { learned: [], inProgress: [] },
    vocabulary: { learned: [] },
    grammar: { completed: [] },
    kanji: { learned: [] },  // ← নতুন
    quiz: { attempts: [] },
    streak: { current: 0, longest: 0, lastDate: null },
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}
// ===== Kanji =====
export async function toggleKanjiLearned(userId: string, id: string) {
  const progress = await getProgress(userId);
  const current = progress.kanji?.learned || [];
  const isLearned = current.includes(id);

  const learned = isLearned
    ? current.filter((k) => k !== id)
    : [...current, id];

  await updateProgress(userId, {
    kanji: { learned },
  });

  return { learned, isLearned: !isLearned };
}

export async function getProgress(userId: string): Promise<UserProgress> {
  const doc = await db.collection(COLLECTION).findOne({ userId });

  if (!doc) {
    const fresh = emptyProgress(userId);
    await db.collection(COLLECTION).insertOne(fresh);
    return fresh;
  }

  return doc as unknown as UserProgress;
}

export async function updateProgress(
  userId: string,
  update: Partial<UserProgress>
): Promise<UserProgress> {
  const result = await db.collection(COLLECTION).findOneAndUpdate(
    { userId },
    {
      $set: {
        ...update,
        updatedAt: new Date(),
      },
      $setOnInsert: { createdAt: new Date() },
    },
    { upsert: true, returnDocument: "after" }
  );

  return result as unknown as UserProgress;
}

// ===== Mark kana as learned =====
export async function markKanaLearned(
  userId: string,
  type: "hiragana" | "katakana",
  char: string
) {
  const progress = await getProgress(userId);
  const current = progress[type];
  const learned = Array.from(new Set([...current.learned, char]));
  const inProgress = current.inProgress.filter((c) => c !== char);

  await updateProgress(userId, {
    [type]: { learned, inProgress },
  });

  return { learned, inProgress };
}

// ===== Toggle kana learned =====
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

  await updateProgress(userId, {
    [type]: { ...current, learned },
  });

  return { learned, isLearned: !isLearned };
}

// ===== Vocabulary =====
export async function toggleVocabLearned(userId: string, id: string) {
  const progress = await getProgress(userId);
  const current = progress.vocabulary.learned;
  const isLearned = current.includes(id);

  const learned = isLearned
    ? current.filter((v) => v !== id)
    : [...current, id];

  await updateProgress(userId, {
    vocabulary: { learned },
  });

  return { learned, isLearned: !isLearned };
}

// ===== Grammar =====
export async function toggleGrammarCompleted(userId: string, id: string) {
  const progress = await getProgress(userId);
  const current = progress.grammar.completed;
  const isCompleted = current.includes(id);

  const completed = isCompleted
    ? current.filter((g) => g !== id)
    : [...current, id];

  await updateProgress(userId, {
    grammar: { completed },
  });

  return { completed, isCompleted: !isCompleted };
}

// ===== Quiz attempt =====
export async function saveQuizAttempt(
  userId: string,
  score: number,
  type: string
) {
  const progress = await getProgress(userId);
  const attempts = [
    ...progress.quiz.attempts,
    { score, date: new Date(), type },
  ];

  await updateProgress(userId, {
    quiz: { attempts },
  });

  return attempts;
}

// ===== Streak =====
export async function updateStreak(userId: string) {
  const progress = await getProgress(userId);
  const now = new Date();
  const last = progress.streak.lastDate
    ? new Date(progress.streak.lastDate)
    : null;

  let current = progress.streak.current;
  let longest = progress.streak.longest;

  if (!last) {
    current = 1;
  } else {
    const diffDays = Math.floor(
      (now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) {
      // একই দিনে — কিছু করব না
    } else if (diffDays === 1) {
      current += 1;
    } else {
      current = 1;
    }
  }

  if (current > longest) longest = current;

  await updateProgress(userId, {
    streak: { current, longest, lastDate: now },
  });

  return { current, longest };
}
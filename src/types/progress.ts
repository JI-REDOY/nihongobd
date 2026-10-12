export type LevelProgress = {
  vocabulary: { learned: string[] };
  grammar: { completed: string[] };
  kanji: { learned: string[] };
};

export type UserProgress = {
  userId: string;
  hiragana: { learned: string[]; inProgress: string[] };
  katakana: { learned: string[]; inProgress: string[] };
  n5: LevelProgress;
  n4: LevelProgress;
  quiz: { attempts: { score: number; date: Date; type: string }[] };
  streak: { current: number; longest: number; lastDate: Date | null };
  createdAt: Date;
  updatedAt: Date;
};
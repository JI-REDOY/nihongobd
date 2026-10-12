export type UserProgress = {
  userId: string;
  hiragana: { learned: string[]; inProgress: string[] };
  katakana: { learned: string[]; inProgress: string[] };
  vocabulary: { learned: string[] };
  grammar: { completed: string[] };
  quiz: { attempts: { score: number; date: Date; type: string }[] };
  streak: { current: number; longest: number; lastDate: Date | null };
  createdAt: Date;
  updatedAt: Date;
};
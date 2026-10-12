import type { UserProgress } from "@/types/progress";

export type Badge = {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: "jp-red" | "bd-green" | "warning";
  check: (progress: UserProgress) => boolean;
  progress: (progress: UserProgress) => { current: number; target: number };
};

export const BADGES: Badge[] = [
  // ===== Kana =====
  {
    id: "hiragana-first",
    title: "প্রথম হিরাগানা",
    description: "প্রথম হিরাগানা শেখা",
    icon: "あ",
    color: "jp-red",
    check: (p) => p.hiragana.learned.length >= 1,
    progress: (p) => ({ current: Math.min(p.hiragana.learned.length, 1), target: 1 }),
  },
  {
    id: "hiragana-master",
    title: "হিরাগানা মাস্টার",
    description: "সব ৪৬টা হিরাগানা",
    icon: "あ",
    color: "jp-red",
    check: (p) => p.hiragana.learned.length >= 46,
    progress: (p) => ({ current: p.hiragana.learned.length, target: 46 }),
  },
  {
    id: "katakana-master",
    title: "কাতাকানা মাস্টার",
    description: "সব ৪৬টা কাতাকানা",
    icon: "ア",
    color: "bd-green",
    check: (p) => p.katakana.learned.length >= 46,
    progress: (p) => ({ current: p.katakana.learned.length, target: 46 }),
  },

  // ===== Vocab =====
  {
    id: "vocab-50",
    title: "৫০ শব্দ",
    description: "৫০টি vocab শেখা",
    icon: "📖",
    color: "jp-red",
    check: (p) => (p.n5?.vocabulary.learned.length || 0) >= 50,
    progress: (p) => ({ current: p.n5?.vocabulary.learned.length || 0, target: 50 }),
  },
  {
    id: "vocab-200",
    title: "২০০ শব্দ",
    description: "২০০টি vocab শেখা",
    icon: "📚",
    color: "bd-green",
    check: (p) => (p.n5?.vocabulary.learned.length || 0) >= 200,
    progress: (p) => ({ current: p.n5?.vocabulary.learned.length || 0, target: 200 }),
  },
  {
    id: "vocab-500",
    title: "৫০০ শব্দ",
    description: "৫০০টি vocab শেখা",
    icon: "🎓",
    color: "warning",
    check: (p) => (p.n5?.vocabulary.learned.length || 0) >= 500,
    progress: (p) => ({ current: p.n5?.vocabulary.learned.length || 0, target: 500 }),
  },
  {
    id: "vocab-800",
    title: "N5 ভোকাব মাস্টার",
    description: "সব ৮০০টি vocab",
    icon: "👑",
    color: "warning",
    check: (p) => (p.n5?.vocabulary.learned.length || 0) >= 800,
    progress: (p) => ({ current: p.n5?.vocabulary.learned.length || 0, target: 800 }),
  },

  // ===== Grammar =====
  {
    id: "grammar-10",
    title: "১০ গ্রামার",
    description: "১০টি grammar lesson সম্পন্ন",
    icon: "文",
    color: "jp-red",
    check: (p) => (p.n5?.grammar.completed.length || 0) >= 10,
    progress: (p) => ({ current: p.n5?.grammar.completed.length || 0, target: 10 }),
  },
  {
    id: "grammar-50",
    title: "গ্রামার মাস্টার",
    description: "সব ৫০টা grammar lesson",
    icon: "語",
    color: "warning",
    check: (p) => (p.n5?.grammar.completed.length || 0) >= 50,
    progress: (p) => ({ current: p.n5?.grammar.completed.length || 0, target: 50 }),
  },

  // ===== Kanji =====
  {
    id: "kanji-25",
    title: "২৫ কাঞ্জি",
    description: "২৫টি kanji শেখা",
    icon: "漢",
    color: "jp-red",
    check: (p) => (p.n5?.kanji.learned.length || 0) >= 25,
    progress: (p) => ({ current: p.n5?.kanji.learned.length || 0, target: 25 }),
  },
  {
    id: "kanji-100",
    title: "কাঞ্জি মাস্টার",
    description: "সব ১০০টা kanji",
    icon: "字",
    color: "warning",
    check: (p) => (p.n5?.kanji.learned.length || 0) >= 100,
    progress: (p) => ({ current: p.n5?.kanji.learned.length || 0, target: 100 }),
  },

  // ===== Streak =====
  {
    id: "streak-3",
    title: "৩ দিন স্ট্রিক",
    description: "৩ দিন টানা পড়াশোনা",
    icon: "🔥",
    color: "jp-red",
    check: (p) => p.streak.current >= 3,
    progress: (p) => ({ current: Math.min(p.streak.current, 3), target: 3 }),
  },
  {
    id: "streak-7",
    title: "সাপ্তাহিক স্ট্রিক",
    description: "৭ দিন টানা পড়াশোনা",
    icon: "🔥",
    color: "warning",
    check: (p) => p.streak.current >= 7,
    progress: (p) => ({ current: Math.min(p.streak.current, 7), target: 7 }),
  },
  {
    id: "streak-30",
    title: "মাসিক স্ট্রিক",
    description: "৩০ দিন টানা পড়াশোনা",
    icon: "💎",
    color: "warning",
    check: (p) => p.streak.current >= 30,
    progress: (p) => ({ current: Math.min(p.streak.current, 30), target: 30 }),
  },

  // ===== Quiz =====
  {
    id: "quiz-first",
    title: "প্রথম কুইজ",
    description: "প্রথম কুইজ সম্পন্ন",
    icon: "✏️",
    color: "jp-red",
    check: (p) => p.quiz.attempts.length >= 1,
    progress: (p) => ({ current: Math.min(p.quiz.attempts.length, 1), target: 1 }),
  },
  {
    id: "quiz-10",
    title: "১০ কুইজ",
    description: "১০টি কুইজ সম্পন্ন",
    icon: "🏆",
    color: "bd-green",
    check: (p) => p.quiz.attempts.length >= 10,
    progress: (p) => ({ current: p.quiz.attempts.length, target: 10 }),
  },
  {
    id: "quiz-perfect",
    title: "পারফেক্ট স্কোর",
    description: "কোনো কুইজে ১০/১০",
    icon: "⭐",
    color: "warning",
    check: (p) => p.quiz.attempts.some((a) => a.score === 10),
    progress: (p) => ({
      current: p.quiz.attempts.some((a) => a.score === 10) ? 1 : 0,
      target: 1,
    }),
  },

  // ===== Overall =====
  {
    id: "n5-complete",
    title: "N5 সম্পূর্ণ",
    description: "N5 এর সব কন্টেন্ট শেষ",
    icon: "🎌",
    color: "warning",
    check: (p) => {
      const h = p.hiragana.learned.length >= 46;
      const k = p.katakana.learned.length >= 46;
      const v = (p.n5?.vocabulary.learned.length || 0) >= 800;
      const g = (p.n5?.grammar.completed.length || 0) >= 50;
      const kn = (p.n5?.kanji.learned.length || 0) >= 100;
      return h && k && v && g && kn;
    },
    progress: (p) => {
      let count = 0;
      if (p.hiragana.learned.length >= 46) count++;
      if (p.katakana.learned.length >= 46) count++;
      if ((p.n5?.vocabulary.learned.length || 0) >= 800) count++;
      if ((p.n5?.grammar.completed.length || 0) >= 50) count++;
      if ((p.n5?.kanji.learned.length || 0) >= 100) count++;
      return { current: count, target: 5 };
    },
  },
];

export function getEarnedBadges(progress: UserProgress): Badge[] {
  return BADGES.filter((b) => b.check(progress));
}

export function getLockedBadges(progress: UserProgress): Badge[] {
  return BADGES.filter((b) => !b.check(progress));
}
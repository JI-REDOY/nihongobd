import { getLevelData, type Level } from "./data";

export type QuizQuestion = {
  id: string;
  question: string;
  questionSub?: string;
  options: string[];
  correctAnswer: string;
  type: "vocab-jp-to-bn" | "kana-romaji";
};

export type QuizType = "vocab" | "hiragana" | "katakana" | "listening" | "reading";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickRandomUnique<T>(
  arr: T[],
  n: number,
  keyFn: (item: T) => string
): T[] {
  const seen = new Set<string>();
  const result: T[] = [];

  for (const item of shuffle(arr)) {
    const key = keyFn(item);
    if (!seen.has(key)) {
      seen.add(key);
      result.push(item);
      if (result.length === n) break;
    }
  }

  return result;
}

function makeVocabQuestions(count: number, level: Level): QuizQuestion[] {
  const data = getLevelData(level).vocab;
  if (data.length === 0) return [];

  const selected = pickRandomUnique(data, count, (v) => v.id);

  return selected.map((vocab, idx) => {
    const wrong = pickRandomUnique(
      data.filter((v) => v.id !== vocab.id && v.bangla !== vocab.bangla),
      3,
      (v) => v.bangla
    );

    const options = shuffle([vocab.bangla, ...wrong.map((w) => w.bangla)]);

    return {
      id: `q-${idx}-${vocab.id}`,
      question: vocab.japanese,
      questionSub: vocab.romaji,
      options,
      correctAnswer: vocab.bangla,
      type: "vocab-jp-to-bn",
    };
  });
}

function makeKanaQuestions(
  type: "hiragana" | "katakana",
  count: number
): QuizQuestion[] {
  // Kana data same as before
  const { hiraganaData, katakanaData } = require("./kanaData");
  const data = type === "hiragana" ? hiraganaData : katakanaData;

  const selected = pickRandomUnique(data, count, (k: any) => k.char);

  return selected.map((kana: any, idx: number) => {
    const wrong = pickRandomUnique(
      data.filter((k: any) => k.char !== kana.char && k.romaji !== kana.romaji),
      3,
      (k: any) => k.romaji
    );

    const options = shuffle([kana.romaji, ...wrong.map((w: any) => w.romaji)]);

    return {
      id: `q-${idx}-${kana.char}`,
      question: kana.char,
      options,
      correctAnswer: kana.romaji,
      type: "kana-romaji" as const,
    };
  });
}

export function generateQuiz(
  type: QuizType,
  count: number = 10,
  level: Level = "n5"
): QuizQuestion[] {
  if (type === "vocab") return makeVocabQuestions(count, level);
  if (type === "hiragana") return makeKanaQuestions("hiragana", count);
  if (type === "katakana") return makeKanaQuestions("katakana", count);
  return makeKanaQuestions("katakana", count);
}
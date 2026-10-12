import { n5Vocab } from "./n5Vocab";
import { hiraganaData, katakanaData } from "./kanaData";

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

function makeVocabQuestions(count: number): QuizQuestion[] {
  const selected = pickRandomUnique(n5Vocab, count, (v) => v.id);

  return selected.map((vocab, idx) => {
    const wrong = pickRandomUnique(
      n5Vocab.filter((v) => v.id !== vocab.id && v.bangla !== vocab.bangla),
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
  const data = type === "hiragana" ? hiraganaData : katakanaData;

  const selected = pickRandomUnique(data, count, (k) => k.char);

  return selected.map((kana, idx) => {
    const wrong = pickRandomUnique(
      data.filter((k) => k.char !== kana.char && k.romaji !== kana.romaji),
      3,
      (k) => k.romaji
    );

    const options = shuffle([kana.romaji, ...wrong.map((w) => w.romaji)]);

    return {
      id: `q-${idx}-${kana.char}`,
      question: kana.char,
      options,
      correctAnswer: kana.romaji,
      type: "kana-romaji",
    };
  });
}

export function generateQuiz(
  type: QuizType,
  count: number = 10
): QuizQuestion[] {
  if (type === "vocab") return makeVocabQuestions(count);
  if (type === "hiragana") return makeKanaQuestions("hiragana", count);
  return makeKanaQuestions("katakana", count);
}
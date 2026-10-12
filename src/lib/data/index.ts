import type { Level, VocabItem, GrammarLesson, KanjiItem } from "./types";
import { n5Vocab } from "./n5/vocab";
import { n5Grammar } from "./n5/grammar";
import { n5Kanji } from "./n5/kanji";

export const N5_DATA = {
  vocab: n5Vocab,
  grammar: n5Grammar,
  kanji: n5Kanji,
};

export const N4_DATA = {
  vocab: [] as VocabItem[],
  grammar: [] as GrammarLesson[],
  kanji: [] as KanjiItem[],
};

export function getLevelData(level: Level) {
  return level === "n5" ? N5_DATA : N4_DATA;
}

export type { Level, VocabItem, GrammarLesson, KanjiItem };
export { ALL_LEVELS } from "../levels";
import type { Level, VocabItem, GrammarLesson, KanjiItem } from "./types";
import { n5Vocab } from "./n5/vocab";
import { n5Grammar } from "./n5/grammar";
import { n5Kanji } from "./n5/kanji";
import { n4Vocab } from "./n4/vocab";
import { n4Grammar } from "./n4/grammar";
import { n4Kanji } from "./n4/kanji";

export const N5_DATA = {
  vocab: n5Vocab,
  grammar: n5Grammar,
  kanji: n5Kanji,
};

export const N4_DATA = {
  vocab: n4Vocab,
  grammar: n4Grammar,
  kanji: n4Kanji,
};

export function getLevelData(level: Level) {
  return level === "n5" ? N5_DATA : N4_DATA;
}

export type { Level, VocabItem, GrammarLesson, KanjiItem };
export { ALL_LEVELS } from "../levels";
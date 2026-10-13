export type Level = "n5" | "n4";

export type VocabItem = {
  id: string;
  japanese: string;
  romaji: string;
  bangla: string;
  english: string;
  category: "noun" | "verb" | "adjective" | "adverb" | "expression";
};

export type GrammarExample = {
  jp: string;
  romaji: string;
  bangla: string;
};

export type GrammarLesson = {
  id: string;
  number: number;
  title: string;
  titleJp: string;
  pattern: string;
  explanation: string;
  examples: GrammarExample[];
};

export type KanjiItem = {
  id: string;
  kanji: string;
  meaning: string;
  meaningEn: string;
  onReading: string;
  kunReading: string;
  strokes: number;
  category: string;
  examples: { word: string; reading: string; meaning: string }[];
};

export type LevelConfig = {
  id: Level;
  name: string;
  nameJp: string;
  description: string;
  totalVocab: number;
  totalGrammar: number;
  totalKanji: number;
  color: "jp-red" | "bd-green";
};

// ===== Memory Method Types =====
export type MemoryKanji = {
  kanji: string;
  reading: string;
  meaning: string;
  meaningEn: string;
  components: string[];
  mnemonic: string;
};

export type MemoryRadical = {
  id: string;
  radical: string;
  radicalName: string;
  radicalNameBangla: string;
  meaning: string;
  strokeCount: number;
  category: string;
  intro: string;
  mnemonicTip: string;
  kanjiFamily: MemoryKanji[];
};
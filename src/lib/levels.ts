import type { Level, LevelConfig } from "./data/types";

export const LEVELS: Record<Level, LevelConfig> = {
  n5: {
    id: "n5",
    name: "N5",
    nameJp: "N5",
    description: "জাপানিজ ভাষার বেসিক স্তর",
    totalVocab: 200,
    totalGrammar: 15,
    totalKanji: 100,
    color: "jp-red",
  },
  n4: {
    id: "n4",
    name: "N4",
    nameJp: "N4",
    description: "জাপানিজ ভাষার প্রাথমিক স্তর",
    totalVocab: 1500,
    totalGrammar: 80,
    totalKanji: 300,
    color: "bd-green",
  },
};

export const ALL_LEVELS: Level[] = ["n5", "n4"];

export function getLevelConfig(level: Level): LevelConfig {
  return LEVELS[level];
}
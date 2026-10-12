export type KanaItem = {
  char: string;
  romaji: string;
  bangla: string;
  group: string;
};

export type KanaType = "hiragana" | "katakana";

// ===== HIRAGANA (46 basic) =====
export const hiraganaData: KanaItem[] = [
  // Vowels
  { char: "あ", romaji: "a", bangla: "আ", group: "vowel" },
  { char: "い", romaji: "i", bangla: "ই", group: "vowel" },
  { char: "う", romaji: "u", bangla: "উ", group: "vowel" },
  { char: "え", romaji: "e", bangla: "এ", group: "vowel" },
  { char: "お", romaji: "o", bangla: "ও", group: "vowel" },

  // K
  { char: "か", romaji: "ka", bangla: "কা", group: "k" },
  { char: "き", romaji: "ki", bangla: "কি", group: "k" },
  { char: "く", romaji: "ku", bangla: "কু", group: "k" },
  { char: "け", romaji: "ke", bangla: "কে", group: "k" },
  { char: "こ", romaji: "ko", bangla: "কো", group: "k" },

  // S
  { char: "さ", romaji: "sa", bangla: "সা", group: "s" },
  { char: "し", romaji: "shi", bangla: "শি", group: "s" },
  { char: "す", romaji: "su", bangla: "সু", group: "s" },
  { char: "せ", romaji: "se", bangla: "সে", group: "s" },
  { char: "そ", romaji: "so", bangla: "সো", group: "s" },

  // T
  { char: "た", romaji: "ta", bangla: "তা", group: "t" },
  { char: "ち", romaji: "chi", bangla: "চি", group: "t" },
  { char: "つ", romaji: "tsu", bangla: "ৎসু", group: "t" },
  { char: "て", romaji: "te", bangla: "তে", group: "t" },
  { char: "と", romaji: "to", bangla: "তো", group: "t" },

  // N
  { char: "な", romaji: "na", bangla: "না", group: "n" },
  { char: "に", romaji: "ni", bangla: "নি", group: "n" },
  { char: "ぬ", romaji: "nu", bangla: "নু", group: "n" },
  { char: "ね", romaji: "ne", bangla: "নে", group: "n" },
  { char: "の", romaji: "no", bangla: "নো", group: "n" },

  // H
  { char: "は", romaji: "ha", bangla: "হা", group: "h" },
  { char: "ひ", romaji: "hi", bangla: "হি", group: "h" },
  { char: "ふ", romaji: "fu", bangla: "ফু", group: "h" },
  { char: "へ", romaji: "he", bangla: "হে", group: "h" },
  { char: "ほ", romaji: "ho", bangla: "হো", group: "h" },

  // M
  { char: "ま", romaji: "ma", bangla: "মা", group: "m" },
  { char: "み", romaji: "mi", bangla: "মি", group: "m" },
  { char: "む", romaji: "mu", bangla: "মু", group: "m" },
  { char: "め", romaji: "me", bangla: "মে", group: "m" },
  { char: "も", romaji: "mo", bangla: "মো", group: "m" },

  // Y
  { char: "や", romaji: "ya", bangla: "ইয়া", group: "y" },
  { char: "ゆ", romaji: "yu", bangla: "ইউ", group: "y" },
  { char: "よ", romaji: "yo", bangla: "ইয়ো", group: "y" },

  // R
  { char: "ら", romaji: "ra", bangla: "রা", group: "r" },
  { char: "り", romaji: "ri", bangla: "রি", group: "r" },
  { char: "る", romaji: "ru", bangla: "রু", group: "r" },
  { char: "れ", romaji: "re", bangla: "রে", group: "r" },
  { char: "ろ", romaji: "ro", bangla: "রো", group: "r" },

  // W
  { char: "わ", romaji: "wa", bangla: "ওয়া", group: "w" },
  { char: "を", romaji: "wo", bangla: "ও", group: "w" },

  // N
  { char: "ん", romaji: "n", bangla: "ন", group: "n-final" },
];

// ===== KATAKANA (46 basic) =====
export const katakanaData: KanaItem[] = [
  // Vowels
  { char: "ア", romaji: "a", bangla: "আ", group: "vowel" },
  { char: "イ", romaji: "i", bangla: "ই", group: "vowel" },
  { char: "ウ", romaji: "u", bangla: "উ", group: "vowel" },
  { char: "エ", romaji: "e", bangla: "এ", group: "vowel" },
  { char: "オ", romaji: "o", bangla: "ও", group: "vowel" },

  // K
  { char: "カ", romaji: "ka", bangla: "কা", group: "k" },
  { char: "キ", romaji: "ki", bangla: "কি", group: "k" },
  { char: "ク", romaji: "ku", bangla: "কু", group: "k" },
  { char: "ケ", romaji: "ke", bangla: "কে", group: "k" },
  { char: "コ", romaji: "ko", bangla: "কো", group: "k" },

  // S
  { char: "サ", romaji: "sa", bangla: "সা", group: "s" },
  { char: "シ", romaji: "shi", bangla: "শি", group: "s" },
  { char: "ス", romaji: "su", bangla: "সু", group: "s" },
  { char: "セ", romaji: "se", bangla: "সে", group: "s" },
  { char: "ソ", romaji: "so", bangla: "সো", group: "s" },

  // T
  { char: "タ", romaji: "ta", bangla: "তা", group: "t" },
  { char: "チ", romaji: "chi", bangla: "চি", group: "t" },
  { char: "ツ", romaji: "tsu", bangla: "ৎসু", group: "t" },
  { char: "テ", romaji: "te", bangla: "তে", group: "t" },
  { char: "ト", romaji: "to", bangla: "তো", group: "t" },

  // N
  { char: "ナ", romaji: "na", bangla: "না", group: "n" },
  { char: "ニ", romaji: "ni", bangla: "নি", group: "n" },
  { char: "ヌ", romaji: "nu", bangla: "নু", group: "n" },
  { char: "ネ", romaji: "ne", bangla: "নে", group: "n" },
  { char: "ノ", romaji: "no", bangla: "নো", group: "n" },

  // H
  { char: "ハ", romaji: "ha", bangla: "হা", group: "h" },
  { char: "ヒ", romaji: "hi", bangla: "হি", group: "h" },
  { char: "フ", romaji: "fu", bangla: "ফু", group: "h" },
  { char: "ヘ", romaji: "he", bangla: "হে", group: "h" },
  { char: "ホ", romaji: "ho", bangla: "হো", group: "h" },

  // M
  { char: "マ", romaji: "ma", bangla: "মা", group: "m" },
  { char: "ミ", romaji: "mi", bangla: "মি", group: "m" },
  { char: "ム", romaji: "mu", bangla: "মু", group: "m" },
  { char: "メ", romaji: "me", bangla: "মে", group: "m" },
  { char: "モ", romaji: "mo", bangla: "মো", group: "m" },

  // Y
  { char: "ヤ", romaji: "ya", bangla: "ইয়া", group: "y" },
  { char: "ユ", romaji: "yu", bangla: "ইউ", group: "y" },
  { char: "ヨ", romaji: "yo", bangla: "ইয়ো", group: "y" },

  // R
  { char: "ラ", romaji: "ra", bangla: "রা", group: "r" },
  { char: "リ", romaji: "ri", bangla: "রি", group: "r" },
  { char: "ル", romaji: "ru", bangla: "রু", group: "r" },
  { char: "レ", romaji: "re", bangla: "রে", group: "r" },
  { char: "ロ", romaji: "ro", bangla: "রো", group: "r" },

  // W
  { char: "ワ", romaji: "wa", bangla: "ওয়া", group: "w" },
  { char: "ヲ", romaji: "wo", bangla: "ও", group: "w" },

  // N
  { char: "ン", romaji: "n", bangla: "ন", group: "n-final" },
];

export function getKanaData(type: KanaType): KanaItem[] {
  return type === "hiragana" ? hiraganaData : katakanaData;
}
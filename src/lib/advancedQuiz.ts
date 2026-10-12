import { getLevelData, type Level } from "./data";
import type { VocabItem } from "./data/types";

export type ListeningQuestion = {
  id: string;
  audioText: string;
  options: string[];
  correctAnswer: string;
  questionLabel: string;
};

export type ReadingQuestion = {
  id: string;
  passage: string;
  passageRomaji: string;
  passageBangla: string;
  question: string;
  options: string[];
  correctAnswer: string;
};

export function generateListeningQuiz(
  count: number = 10,
  level: Level = "n5"
): ListeningQuestion[] {
  const data = getLevelData(level).vocab;
  if (data.length === 0) return [];

  const shuffled = [...data].sort(() => Math.random() - 0.5).slice(0, count);

  return shuffled.map((vocab: VocabItem, idx: number) => {
    const wrong = [...data]
      .filter((v: VocabItem) => v.id !== vocab.id && v.bangla !== vocab.bangla)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const options = [vocab.bangla, ...wrong.map((w) => w.bangla)].sort(
      () => Math.random() - 0.5
    );

    return {
      id: `l-${idx}-${vocab.id}`,
      audioText: vocab.japanese,
      options,
      correctAnswer: vocab.bangla,
      questionLabel: "যা শুনলে তার অর্থ কী?",
    };
  });
}

export type ReadingPassage = {
  id: string;
  japanese: string;
  romaji: string;
  bangla: string;
  question: string;
  options: string[];
  correctAnswer: string;
};

const readingData: ReadingPassage[] = [
  {
    id: "r01",
    japanese: "わたしはがくせいです。まいにちがっこうへいきます。",
    romaji: "Watashi wa gakusei desu. Mainichi gakkou e ikimasu.",
    bangla: "আমি একজন ছাত্র। প্রতিদিন স্কুলে যাই।",
    question: "লেখক কি প্রতিদিন করে?",
    options: ["স্কুলে যায়", "বাড়িতে থাকে", "কাজ করে", "খায়"],
    correctAnswer: "স্কুলে যায়",
  },
  {
    id: "r02",
    japanese: "あさ、ごはんをたべます。それから、コーヒーをのみます。",
    romaji: "Asa, gohan o tabemasu. Sorekara, koohii o nomimasu.",
    bangla: "সকালে ভাত খাই। তারপর কফি পান করি।",
    question: "ভাত খাওয়ার পর কী পান করে?",
    options: ["চা", "পানি", "কফি", "দুধ"],
    correctAnswer: "কফি",
  },
  {
    id: "r03",
    japanese: "わたしのともだちはせんせいです。とてもしんせつです。",
    romaji: "Watashi no tomodachi wa sensei desu. Totemo shinsetsu desu.",
    bangla: "আমার বন্ধু একজন শিক্ষক। খুব দয়ালু।",
    question: "লেখকের বন্ধু কেমন?",
    options: ["দয়ালু", "রাগী", "অলস", "ব্যস্ত"],
    correctAnswer: "দয়ালু",
  },
  {
    id: "r04",
    japanese: "きょうはあついです。だから、みずをたくさんのみます。",
    romaji: "Kyou wa atsui desu. Dakara, mizu o takusan nomimasu.",
    bangla: "আজ গরম। তাই অনেক পানি পান করি।",
    question: "আজ কেমন আবহাওয়া?",
    options: ["ঠান্ডা", "গরম", "বৃষ্টি", "বাতাস"],
    correctAnswer: "গরম",
  },
  {
    id: "r05",
    japanese: "にほんごをべんきょうしています。まいにち、かんじをおぼえます。",
    romaji: "Nihongo o benkyou shite imasu. Mainichi, kanji o oboemasu.",
    bangla: "জাপানিজ শিখছি। প্রতিদিন কাঞ্জি মুখস্থ করি।",
    question: "লেখক প্রতিদিন কী মুখস্থ করে?",
    options: ["হিরাগানা", "কাঞ্জি", "ইংরেজি", "গান"],
    correctAnswer: "কাঞ্জি",
  },
  {
    id: "r06",
    japanese: "あした、ともだちとえいがをみます。",
    romaji: "Ashita, tomodachi to eiga o mimasu.",
    bangla: "আগামীকাল বন্ধুর সাথে সিনেমা দেখব।",
    question: "আগামীকাল লেখক কার সাথে সিনেমা দেখবে?",
    options: ["পরিবার", "শিক্ষক", "বন্ধু", "একা"],
    correctAnswer: "বন্ধু",
  },
  {
    id: "r07",
    japanese: "わたしのいえはえきのちかくにあります。",
    romaji: "Watashi no ie wa eki no chikaku ni arimasu.",
    bangla: "আমার বাড়ি স্টেশনের কাছেই।",
    question: "লেখকের বাড়ি কোথায়?",
    options: ["স্কুলের কাছে", "স্টেশনের কাছে", "সমুদ্রের কাছে", "পাহাড়ে"],
    correctAnswer: "স্টেশনের কাছে",
  },
  {
    id: "r08",
    japanese: "ねこはとてもかわいいです。わたしはねこがすきです。",
    romaji: "Neko wa totemo kawaii desu. Watashi wa neko ga suki desu.",
    bangla: "বিড়াল খুব cute। আমি বিড়াল পছন্দ করি।",
    question: "লেখক কাকে পছন্দ করে?",
    options: ["কুকুর", "বিড়াল", "পাখি", "মাছ"],
    correctAnswer: "বিড়াল",
  },
  {
    id: "r09",
    japanese: "せんしゅう、ともだちとレストランへいきました。",
    romaji: "Senshuu, tomodachi to resutoran e ikimashita.",
    bangla: "গত সপ্তাহে বন্ধুর সাথে রেস্টুরেন্টে গিয়েছিলাম।",
    question: "লেখক কোথায় গিয়েছিল?",
    options: ["স্কুল", "রেস্টুরেন্ট", "হাসপাতাল", "বাজার"],
    correctAnswer: "রেস্টুরেন্ট",
  },
  {
    id: "r10",
    japanese: "あにはこうこうせいです。サッカーがじょうずです。",
    romaji: "Ani wa koukousei desu. Sakkaa ga jouzu desu.",
    bangla: "বড় ভাই হাই স্কুলের ছাত্র। ফুটবলে দক্ষ।",
    question: "লেখকের বড় ভাই কোন খেলায় দক্ষ?",
    options: ["ক্রিকেট", "সাঁতার", "ফুটবল", "দাবা"],
    correctAnswer: "ফুটবল",
  },
];

export function generateReadingQuiz(count: number = 5): ReadingQuestion[] {
  const shuffled = [...readingData].sort(() => Math.random() - 0.5).slice(0, count);

  return shuffled.map((r) => ({
    id: r.id,
    passage: r.japanese,
    passageRomaji: r.romaji,
    passageBangla: r.bangla,
    question: r.question,
    options: [...r.options].sort(() => Math.random() - 0.5),
    correctAnswer: r.correctAnswer,
  }));
}
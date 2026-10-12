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
    {
        id: "r11",
        japanese: "わたしはまいあさ、ろくじにおきます。それから、さんぽします。",
        romaji: "Watashi wa maiasa, roku-ji ni okimasu. Sorekara, sanpo shimasu.",
        bangla: "আমি প্রতিদিন সকালে ৬টায় উঠি। তারপর হাঁটাহাঁটি করি।",
        question: "লেখক কয়টায় ওঠে?",
        options: ["৫টা", "৬টা", "৭টা", "৮টা"],
        correctAnswer: "৬টা",
    },
    {
        id: "r12",
        japanese: "きのう、こうえんへいきました。とてもきれいでした。",
        romaji: "Kinou, kouen e ikimashita. Totemo kirei deshita.",
        bangla: "গতকাল পার্কে গেলাম। খুব সুন্দর ছিল।",
        question: "পার্ক কেমন ছিল?",
        options: ["নোংরা", "সুন্দর", "ভয়ংকর", "গরম"],
        correctAnswer: "সুন্দর",
    },
    {
        id: "r13",
        japanese: "わたしはにほんりょうりがすきです。とくにすしがすきです。",
        romaji: "Watashi wa nihon ryouri ga suki desu. Tokuni sushi ga suki desu.",
        bangla: "আমি জাপানিজ খাবার পছন্দ করি। বিশেষ করে সুশি পছন্দ।",
        question: "লেখক বিশেষ করে কী পছন্দ করে?",
        options: ["রামেন", "সুশি", "তেনপুরা", "কারি"],
        correctAnswer: "সুশি",
    },
    {
        id: "r14",
        japanese: "あにはいしゃです。びょういんではたらいています。",
        romaji: "Ani wa isha desu. Byouin de hataraite imasu.",
        bangla: "বড় ভাই ডাক্তার। হাসপাতালে কাজ করছেন।",
        question: "লেখকের বড় ভাই কী করেন?",
        options: ["শিক্ষক", "ইঞ্জিনিয়ার", "ডাক্তার", "ব্যাংকার"],
        correctAnswer: "ডাক্তার",
    },
    {
        id: "r15",
        japanese: "まいにち、にほんごをべんきょうしています。すこしずつ、じょうずになりました。",
        romaji: "Mainichi, nihongo o benkyou shite imasu. Sukoshizutsu, jouzu ni narimashita.",
        bangla: "প্রতিদিন জাপানিজ পড়ছি। ধীরে ধীরে দক্ষ হয়ে উঠেছি।",
        question: "লেখকের দক্ষতা কেমন হয়েছে?",
        options: ["খারাপ", "ধীরে ধীরে ভালো", "একই", "একদম ভালো"],
        correctAnswer: "ধীরে ধীরে ভালো",
    },
    {
        id: "r16",
        japanese: "わたしのしゅみはおんがくをきくことです。ロックがすきです。",
        romaji: "Watashi no shumi wa ongaku o kiku koto desu. Rokku ga suki desu.",
        bangla: "আমার শখ সংগীত শোনা। রক পছন্দ।",
        question: "লেখকের শখ কী?",
        options: ["পড়া", "সংগীত শোনা", "নাচা", "রান্না"],
        correctAnswer: "সংগীত শোনা",
    },
    {
        id: "r17",
        japanese: "らいしゅう、ともだちととうきょうへいきます。とてもたのしみです。",
        romaji: "Raishuu, tomodachi to Toukyou e ikimasu. Totemo tanoshimi desu.",
        bangla: "আগামী সপ্তাহে বন্ধুর সাথে টোকিও যাব। খুব অপেক্ষা করছি।",
        question: "লেখক কার সাথে যাবে?",
        options: ["পরিবার", "বন্ধু", "শিক্ষক", "একা"],
        correctAnswer: "বন্ধু",
    },
    {
        id: "r18",
        japanese: "きょうはてんきがいいです。だから、さんぽにいきます。",
        romaji: "Kyou wa tenki ga ii desu. Dakara, sanpo ni ikimasu.",
        bangla: "আজ আবহাওয়া ভালো। তাই হাঁটতে যাব।",
        question: "লেখক কেন হাঁটতে যাবে?",
        options: ["বৃষ্টি", "আবহাওয়া ভালো", "বন্ধু ডেকেছে", "ক্ষুধা"],
        correctAnswer: "আবহাওয়া ভালো",
    },
    {
        id: "r19",
        japanese: "わたしのちちはやさしいです。いつもわらっています。",
        romaji: "Watashi no chichi wa yasashii desu. Itsumo waratte imasu.",
        bangla: "আমার বাবা দয়ালু। সবসময় হাসেন।",
        question: "লেখকের বাবা কেমন?",
        options: ["রাগী", "দয়ালু", "নীরব", "ব্যস্ত"],
        correctAnswer: "দয়ালু",
    },
    {
        id: "r20",
        japanese: "にほんのふゆはさむいです。ゆきがたくさんふります。",
        romaji: "Nihon no fuyu wa samui desu. Yuki ga takusan furimasu.",
        bangla: "জাপানের শীত ঠান্ডা। অনেক তুষার পড়ে।",
        question: "জাপানের শীতে কী পড়ে?",
        options: ["বৃষ্টি", "তুষার", "শিলা", "কুয়াশা"],
        correctAnswer: "তুষার",
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
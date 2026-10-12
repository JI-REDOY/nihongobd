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

export const n5Grammar: GrammarLesson[] = [
  {
    id: "g01",
    number: 1,
    title: "হলো / হয়",
    titleJp: "〜は〜です",
    pattern: "A は B です",
    explanation: "A হলো B। সবচেয়ে মৌলিক sentence pattern। 'は' হলো topic marker, 'です' হলো polite form of 'to be'।",
    examples: [
      { jp: "わたしはがくせいです。", romaji: "Watashi wa gakusei desu.", bangla: "আমি একজন ছাত্র।" },
      { jp: "これはほんです。", romaji: "Kore wa hon desu.", bangla: "এটা একটা বই।" },
      { jp: "あのひとはせんせいです。", romaji: "Ano hito wa sensei desu.", bangla: "উনি একজন শিক্ষক।" },
    ],
  },
  {
    id: "g02",
    number: 2,
    title: "এটা / সেটা / ওটা",
    titleJp: "これ / それ / あれ",
    pattern: "これ / それ / あれ",
    explanation: "কাছের জিনিসের জন্য 'これ', শ্রোতার কাছে থাকলে 'それ', দূরে থাকলে 'あれ'।",
    examples: [
      { jp: "これはなんですか。", romaji: "Kore wa nan desu ka.", bangla: "এটা কী?" },
      { jp: "それはペンです。", romaji: "Sore wa pen desu.", bangla: "ওটা একটা কলম।" },
      { jp: "あれはでんしゃです。", romaji: "Are wa densha desu.", bangla: "ওটা (দূরে) একটা ট্রেন।" },
    ],
  },
  {
    id: "g03",
    number: 3,
    title: "কোথায় আছে",
    titleJp: "〜にあります / います",
    pattern: "A は B にあります",
    explanation: "জড় পদার্থের জন্য 'あります', প্রাণীর জন্য 'います'। কোথায় আছে বোঝাতে 'に' particle।",
    examples: [
      { jp: "ほんはつくえのうえにあります。", romaji: "Hon wa tsukue no ue ni arimasu.", bangla: "বইটা টেবিলের উপরে আছে।" },
      { jp: "ねこはへやにいます。", romaji: "Neko wa heya ni imasu.", bangla: "বিড়ালটা ঘরে আছে।" },
      { jp: "トイレはどこにありますか。", romaji: "Toire wa doko ni arimasu ka.", bangla: "টয়লেট কোথায়?" },
    ],
  },
  {
    id: "g04",
    number: 4,
    title: "সময় / তারিখ",
    titleJp: "〜時に〜",
    pattern: "〜時に〜",
    explanation: "নির্দিষ্ট সময়ে কোনো কাজ করা বোঝাতে 'に' particle। '〜時' মানে '〜টা'।",
    examples: [
      { jp: "わたしは７じにおきます。", romaji: "Watashi wa shichi-ji ni okimasu.", bangla: "আমি ৭টায় ঘুম থেকে উঠি।" },
      { jp: "がっこうは８じはんに始まります。", romaji: "Gakkou wa hachi-ji han ni hajimarimasu.", bangla: "স্কুল ৮টা ৩০ মিনিটে শুরু হয়।" },
    ],
  },
  {
    id: "g05",
    number: 5,
    title: "যাওয়া / আসা / ফেরা",
    titleJp: "〜へ行きます",
    pattern: "A へ / に B ます",
    explanation: "গন্তব্যের জন্য 'へ' বা 'に'। '行きます' মানে যাই, '来ます' মানে আসি, '帰ります' মানে ফিরি।",
    examples: [
      { jp: "わたしはにほんへいきます。", romaji: "Watashi wa nihon e ikimasu.", bangla: "আমি জাপানে যাব।" },
      { jp: "ともだちはうちにきます。", romaji: "Tomodachi wa uchi ni kimasu.", bangla: "বন্ধু আমার বাড়িতে আসে।" },
    ],
  },
  {
    id: "g06",
    number: 6,
    title: "করা",
    titleJp: "〜を〜ます",
    pattern: "A を B ます",
    explanation: "কোনো কাজের object এর জন্য 'を' particle।",
    examples: [
      { jp: "ごはんをたべます。", romaji: "Gohan o tabemasu.", bangla: "আমি ভাত খাই।" },
      { jp: "にほんごをべんきょうします。", romaji: "Nihongo o benkyou shimasu.", bangla: "আমি জাপানিজ পড়ি।" },
    ],
  },
  {
    id: "g07",
    number: 7,
    title: "কীভাবে / কী দিয়ে",
    titleJp: "〜で〜",
    pattern: "A で B ます",
    explanation: "যানবাহন বা টুলের জন্য 'で' particle।",
    examples: [
      { jp: "でんしゃでいきます。", romaji: "Densha de ikimasu.", bangla: "ট্রেনে যাই।" },
      { jp: "えんぴつでかきます。", romaji: "Enpitsu de kakimasu.", bangla: "পেন্সিল দিয়ে লিখি।" },
    ],
  },
  {
    id: "g08",
    number: 8,
    title: "বিশেষণ",
    titleJp: "い-形容詞 / な-形容詞",
    pattern: "A は B い/な です",
    explanation: "い-adjective শেষে 'い' থাকে, na-adjective এর সাথে 'な' যোগ হয়।",
    examples: [
      { jp: "このほんはおもしろいです。", romaji: "Kono hon wa omoshiroi desu.", bangla: "এই বইটা মজার।" },
      { jp: "ここはしずかです。", romaji: "Koko wa shizuka desu.", bangla: "এখানটা শান্ত।" },
    ],
  },
  {
    id: "g09",
    number: 9,
    title: "কী চাও / কী করো",
    titleJp: "〜がほしいです / 〜たいです",
    pattern: "A が ほしいです / A たいです",
    explanation: "'ほしい' মানে চাই (জিনিস), 'たい' মানে করতে চাই (কাজ)।",
    examples: [
      { jp: "くるまがほしいです。", romaji: "Kuruma ga hoshii desu.", bangla: "আমার গাড়ি চাই।" },
      { jp: "にほんにいきたいです。", romaji: "Nihon ni ikitai desu.", bangla: "আমি জাপানে যেতে চাই।" },
    ],
  },
  {
    id: "g10",
    number: 10,
    title: "পারি / পারি না",
    titleJp: "〜ことができます",
    pattern: "A が できます",
    explanation: "কিছু করতে পারা বোঝাতে। নেতিবাচক: 'できません'।",
    examples: [
      { jp: "にほんごができます。", romaji: "Nihongo ga dekimasu.", bangla: "আমি জাপানিজ বলতে পারি।" },
      { jp: "うんてんができません。", romaji: "Unten ga dekimasen.", bangla: "আমি গাড়ি চালাতে পারি না।" },
    ],
  },
  {
    id: "g11",
    number: 11,
    title: "তুলনা",
    titleJp: "A より B のほうが〜",
    pattern: "A より B のほうが C です",
    explanation: "A এর চেয়ে B বেশি C (tulona)।",
    examples: [
      { jp: "なつよりふゆのほうがさむいです。", romaji: "Natsu yori fuyu no hou ga samui desu.", bangla: "গ্রীষ্মের চেয়ে শীত বেশি ঠান্ডা।" },
    ],
  },
  {
    id: "g12",
    number: 12,
    title: "একসাথে করা",
    titleJp: "〜と〜",
    pattern: "A と B",
    explanation: "দুইটা জিনিস বা ব্যক্তি একসাথে।",
    examples: [
      { jp: "わたしはともだちとにほんへいきます。", romaji: "Watashi wa tomodachi to nihon e ikimasu.", bangla: "আমি বন্ধুর সাথে জাপানে যাব।" },
    ],
  },
  {
    id: "g13",
    number: 13,
    title: "কেননা",
    titleJp: "〜から〜",
    pattern: "A から B",
    explanation: "'A কারণ, তাই B'। 'から' মানে 'কারণ'।",
    examples: [
      { jp: "あついですから、まどをあけます。", romaji: "Atsui desu kara, mado o akemasu.", bangla: "গরম লাগছে, তাই জানালা খুলছি।" },
    ],
  },
  {
    id: "g14",
    number: 14,
    title: "আগে / পরে",
    titleJp: "〜まえに / 〜あとで",
    pattern: "A まえに B / A あとで B",
    explanation: "'আগে' = まえに, 'পরে' = あとで।",
    examples: [
      { jp: "ねるまえに、ほんをよみます。", romaji: "Neru mae ni, hon o yomimasu.", bangla: "ঘুমানোর আগে বই পড়ি।" },
      { jp: "ごはんのあとで、べんきょうします。", romaji: "Gohan no ato de, benkyou shimasu.", bangla: "খাওয়ার পরে পড়াশোনা করি।" },
    ],
  },
  {
    id: "g15",
    number: 15,
    title: "অনুরোধ / আমন্ত্রণ",
    titleJp: "〜ませんか / 〜ましょう",
    pattern: "A ませんか / A ましょう",
    explanation: "'ませんか' মানে 'করবেন না?' (invitation), 'ましょう' মানে 'চলুন করি'।",
    examples: [
      { jp: "いっしょにごはんをたべませんか。", romaji: "Issho ni gohan o tabemasen ka.", bangla: "একসাথে খেতে যাবেন না?" },
      { jp: "いっしょにいきましょう。", romaji: "Issho ni ikimashou.", bangla: "চলুন একসাথে যাই।" },
    ],
  },
];
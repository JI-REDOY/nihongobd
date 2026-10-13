import { NextRequest, NextResponse } from "next/server";
import { getLevelData, ALL_LEVELS, type Level } from "@/lib/data";

export type SearchResult = {
  type: "vocab" | "grammar" | "kanji";
  level: Level;
  id: string;
  title: string;
  subtitle: string;
  href: string;
  icon: string;
  score?: number;
};

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const q = url.searchParams.get("q")?.trim().toLowerCase() || "";

  if (q.length < 1) {
    return NextResponse.json({ results: [] });
  }

  const results: SearchResult[] = [];

  for (const level of ALL_LEVELS) {
    const data = getLevelData(level);

    // Vocab search
    for (const v of data.vocab) {
      let score = 0;
      const jp = v.japanese.toLowerCase();
      const ro = v.romaji.toLowerCase();
      const bn = v.bangla;
      const en = v.english.toLowerCase();

      // Exact match gets highest score
      if (jp === q || ro === q) score = 100;
      else if (ro.startsWith(q)) score = 80;
      else if (jp.startsWith(q)) score = 80;
      else if (ro.includes(q)) score = 60;
      else if (jp.includes(q)) score = 60;
      else if (bn.includes(q)) score = 40;
      else if (en.includes(q)) score = 40;

      if (score > 0) {
        results.push({
          type: "vocab",
          level,
          id: v.id,
          title: v.japanese,
          subtitle: `${v.romaji} · ${v.bangla}`,
          href: `/${level}/vocabulary?q=${encodeURIComponent(v.japanese)}`,
          icon: "語",
          score,
        });
      }
    }

    // Grammar search
    for (const g of data.grammar) {
      let score = 0;
      const title = g.title.toLowerCase();
      const titleJp = g.titleJp;
      const pattern = g.pattern;

      if (title === q || titleJp === q || pattern === q) score = 100;
      else if (title.startsWith(q) || titleJp.startsWith(q) || pattern.startsWith(q)) score = 80;
      else if (title.includes(q) || titleJp.includes(q) || pattern.includes(q)) score = 60;
      else if (g.explanation.includes(q)) score = 40;

      if (score > 0) {
        results.push({
          type: "grammar",
          level,
          id: g.id,
          title: g.title,
          subtitle: g.pattern,
          href: `/${level}/grammar/${g.id}`,
          icon: "文",
          score,
        });
      }
    }

    // Kanji search
    for (const k of data.kanji) {
      let score = 0;
      if (k.kanji === q) score = 100;
      else if (k.onReading.includes(q) || k.kunReading.includes(q)) score = 80;
      else if (k.meaning.includes(q)) score = 60;
      else if (k.meaningEn.toLowerCase().includes(q)) score = 60;
      else if (k.kanji.includes(q)) score = 40;

      if (score > 0) {
        results.push({
          type: "kanji",
          level,
          id: k.id,
          title: k.kanji,
          subtitle: `${k.meaning} · ${k.onReading}`,
          href: `/${level}/kanji?q=${encodeURIComponent(k.kanji)}`,
          icon: "漢",
          score,
        });
      }
    }
  }

  // ⭐ Sort by score (highest first), N5 before N4 on tie
  results.sort((a, b) => {
    const scoreDiff = (b.score || 0) - (a.score || 0);
    if (scoreDiff !== 0) return scoreDiff;
    // Tie: N5 first (easier level first)
    if (a.level === "n5" && b.level === "n4") return -1;
    if (a.level === "n4" && b.level === "n5") return 1;
    return 0;
  });

  return NextResponse.json({ results: results.slice(0, 20) });
}
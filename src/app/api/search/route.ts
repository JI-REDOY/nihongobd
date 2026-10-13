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
      if (
        v.japanese.toLowerCase().includes(q) ||
        v.romaji.toLowerCase().includes(q) ||
        v.bangla.includes(q) ||
        v.english.toLowerCase().includes(q)
      ) {
        results.push({
          type: "vocab",
          level,
          id: v.id,
          title: v.japanese,
          subtitle: `${v.romaji} · ${v.bangla}`,
          href: `/${level}/vocabulary?q=${encodeURIComponent(v.japanese)}`,
          icon: "語",
        });
        if (results.length >= 30) break;
      }
    }

    // Grammar search
    for (const g of data.grammar) {
      if (
        g.title.toLowerCase().includes(q) ||
        g.titleJp.includes(q) ||
        g.pattern.includes(q) ||
        g.explanation.includes(q)
      ) {
        results.push({
          type: "grammar",
          level,
          id: g.id,
          title: g.title,
          subtitle: g.pattern,
          href: `/${level}/grammar/${g.id}`,
          icon: "文",
        });
        if (results.length >= 30) break;
      }
    }

    // Kanji search
    for (const k of data.kanji) {
      if (
        k.kanji.includes(q) ||
        k.meaning.includes(q) ||
        k.meaningEn.toLowerCase().includes(q) ||
        k.onReading.includes(q) ||
        k.kunReading.includes(q)
      ) {
        results.push({
          type: "kanji",
          level,
          id: k.id,
          title: k.kanji,
          subtitle: `${k.meaning} · ${k.onReading}`,
          href: `/${level}/kanji?q=${encodeURIComponent(k.kanji)}`,
          icon: "漢",
        });
        if (results.length >= 30) break;
      }
    }

    if (results.length >= 30) break;
  }

  return NextResponse.json({ results: results.slice(0, 20) });
}
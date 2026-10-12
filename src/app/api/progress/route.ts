import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import {
  getProgress,
  toggleKanaLearned,
  toggleVocabLearned,
  toggleGrammarCompleted,
  toggleKanjiLearned,
  saveQuizAttempt,
  updateStreak,
} from "@/lib/progress";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await updateStreak(session.user.id);
  const progress = await getProgress(session.user.id);
  return NextResponse.json(progress);
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { action } = body;

  try {
    switch (action) {
      case "toggleKana": {
        const { type, char } = body;
        const result = await toggleKanaLearned(session.user.id, type, char);
        return NextResponse.json(result);
      }
      case "toggleVocab": {
        const { level, id } = body;
        const result = await toggleVocabLearned(session.user.id, level, id);
        return NextResponse.json(result);
      }
      case "toggleGrammar": {
        const { level, id } = body;
        const result = await toggleGrammarCompleted(session.user.id, level, id);
        return NextResponse.json(result);
      }
      case "toggleKanji": {
        const { level, id } = body;
        const result = await toggleKanjiLearned(session.user.id, level, id);
        return NextResponse.json(result);
      }
      case "saveQuiz": {
        const { score, type } = body;
        const result = await saveQuizAttempt(session.user.id, score, type);
        return NextResponse.json({ attempts: result });
      }
      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Progress API error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
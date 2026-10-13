import { db } from "./mongodb";
import { ObjectId } from "mongodb";
import type { UserProgress } from "@/types/progress";

export type Certificate = {
  _id?: ObjectId;
  userId: string;
  userName: string;
  level: "n5" | "n4";
  issuedAt: Date;
  certificateId: string;
  stats: {
    hiragana?: number;
    katakana?: number;
    vocabulary: number;
    grammar: number;
    kanji: number;
    quizAverage: number;
  };
};

const COLLECTION = "certificates";

// ===== ID Generators =====
export function generateCertificateId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `N5-${timestamp}-${random}`;
}

export function generateN4CertificateId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `N4-${timestamp}-${random}`;
}

// ===== Completion Calculators =====
export function calculateN5Completion(progress: UserProgress) {
  const hiragana = progress.hiragana.learned.length / 46;
  const katakana = progress.katakana.learned.length / 46;
  const vocabulary = (progress.n5?.vocabulary.learned.length || 0) / 800;
  const grammar = (progress.n5?.grammar.completed.length || 0) / 50;
  const kanji = (progress.n5?.kanji.learned.length || 0) / 100;

  const total = (hiragana + katakana + vocabulary + grammar + kanji) / 5;
  return Math.round(total * 100);
}

export function calculateN4Completion(progress: UserProgress) {
  const vocab = (progress.n4?.vocabulary.learned.length || 0) / 1000;
  const grammar = (progress.n4?.grammar.completed.length || 0) / 80;
  const kanji = (progress.n4?.kanji.learned.length || 0) / 300;

  const total = (vocab + grammar + kanji) / 3;
  return Math.round(total * 100);
}

export function calculateLevelCompletion(
  progress: UserProgress,
  level: "n5" | "n4"
): number {
  if (level === "n5") return calculateN5Completion(progress);
  return calculateN4Completion(progress);
}

// ===== Eligibility =====
export function isEligibleForCertificate(progress: UserProgress): boolean {
  return calculateN5Completion(progress) >= 80;
}

export function isEligibleForN4Certificate(progress: UserProgress): boolean {
  return calculateN4Completion(progress) >= 80;
}

// ===== Quiz Average =====
export function calculateQuizAverage(progress: UserProgress): number {
  if (progress.quiz.attempts.length === 0) return 0;
  const total = progress.quiz.attempts.reduce((sum, a) => sum + a.score, 0);
  const max = progress.quiz.attempts.length * 10;
  return Math.round((total / max) * 100);
}

// ===== Fetch Certificate =====
export async function getUserCertificateByLevel(
  userId: string,
  level: "n5" | "n4"
): Promise<Certificate | null> {
  const cert = await db.collection(COLLECTION).findOne({ userId, level });
  return cert as unknown as Certificate | null;
}

// ===== Issue Certificate =====
export async function issueCertificate(
  userId: string,
  userName: string,
  progress: UserProgress,
  level: "n5" | "n4"
): Promise<Certificate> {
  const existing = await getUserCertificateByLevel(userId, level);
  if (existing) return existing;

  const isN5 = level === "n5";

  const cert: Certificate = {
    userId,
    userName,
    level,
    issuedAt: new Date(),
    certificateId: isN5
      ? generateCertificateId()
      : generateN4CertificateId(),
    stats: {
      ...(isN5 && {
        hiragana: progress.hiragana.learned.length,
        katakana: progress.katakana.learned.length,
      }),
      vocabulary: isN5
        ? progress.n5.vocabulary.learned.length
        : progress.n4.vocabulary.learned.length,
      grammar: isN5
        ? progress.n5.grammar.completed.length
        : progress.n4.grammar.completed.length,
      kanji: isN5
        ? progress.n5.kanji.learned.length
        : progress.n4.kanji.learned.length,
      quizAverage: calculateQuizAverage(progress),
    },
  };

  const result = await db.collection(COLLECTION).insertOne(cert);
  return { ...cert, _id: result.insertedId };
}
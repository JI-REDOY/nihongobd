import { db } from "./mongodb";
import { ObjectId } from "mongodb";
import type { UserProgress } from "@/types/progress";

export type Certificate = {
    _id?: ObjectId;
    userId: string;
    userName: string;
    issuedAt: Date;
    certificateId: string;
    stats: {
        hiragana: number;
        katakana: number;
        vocabulary: number;
        grammar: number;
        quizAverage: number;
        kanji: number;
    };
};

const COLLECTION = "certificates";

export function generateCertificateId(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `N5-${timestamp}-${random}`;
}

// Calculate completion %
export function calculateN5Completion(progress: UserProgress) {
    const hiragana = progress.hiragana.learned.length / 46;
    const katakana = progress.katakana.learned.length / 46;
    const vocabulary = progress.vocabulary.learned.length / 200;
    const grammar = progress.grammar.completed.length / 15;
    const kanji = (progress.kanji?.learned?.length || 0) / 100;

    const total = (hiragana + katakana + vocabulary + grammar + kanji) / 5;

    return Math.round(total * 100);
}

// Quiz average
export function calculateQuizAverage(progress: UserProgress): number {
    if (progress.quiz.attempts.length === 0) return 0;
    const total = progress.quiz.attempts.reduce((sum, a) => sum + a.score, 0);
    const max = progress.quiz.attempts.length * 10;
    return Math.round((total / max) * 100);
}

// Check eligibility (80%+)
export function isEligibleForCertificate(progress: UserProgress): boolean {
    return calculateN5Completion(progress) >= 80;
}

// Get existing certificate
export async function getUserCertificate(
    userId: string
): Promise<Certificate | null> {
    const cert = await db.collection(COLLECTION).findOne({ userId });
    return cert as unknown as Certificate | null;
}

// Issue certificate
export async function issueCertificate(
    userId: string,
    userName: string,
    progress: UserProgress
): Promise<Certificate> {
    const existing = await getUserCertificate(userId);
    if (existing) return existing;

    const cert: Certificate = {
        userId,
        userName,
        issuedAt: new Date(),
        certificateId: generateCertificateId(),
        stats: {
            hiragana: progress.hiragana.learned.length,
            katakana: progress.katakana.learned.length,
            vocabulary: progress.vocabulary.learned.length,
            grammar: progress.grammar.completed.length,
            quizAverage: calculateQuizAverage(progress),
            kanji: progress.kanji?.learned?.length || 0,
        },
    };

    const result = await db.collection(COLLECTION).insertOne(cert);
    return { ...cert, _id: result.insertedId };
}
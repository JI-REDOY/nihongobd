import { db } from "./mongodb";
import { ObjectId } from "mongodb";

const COLLECTION = "certificates";

export type VerificationResult = {
  valid: boolean;
  certificate?: {
    certificateId: string;
    userName: string;
    level: "n5" | "n4";
    issuedAt: string;
    stats: {
      hiragana?: number;
      katakana?: number;
      vocabulary: number;
      grammar: number;
      kanji: number;
      quizAverage: number;
    };
  };
  reason?: string;
};

export async function verifyCertificate(
  certificateId: string
): Promise<VerificationResult> {
  if (!certificateId || certificateId.trim().length === 0) {
    return { valid: false, reason: "কোনো সার্টিফিকেট আইডি দেওয়া হয়নি" };
  }

  try {
    const cert = await db
      .collection(COLLECTION)
      .findOne({ certificateId: certificateId.trim() });

    if (!cert) {
      return { valid: false, reason: "এই সার্টিফিকেটটি খুঁজে পাওয়া যায়নি" };
    }

    // ⭐ Current user এর name নাও (session থেকে না, DB এর user collection থেকে)
    let currentName = cert.userName;
    try {
      const user = await db
        .collection("user")
        .findOne({ _id: new ObjectId(cert.userId) });
      if (user && user.name) {
        currentName = user.name;
      }
    } catch (err) {
      // اگر user না পাওয়া যায়, certificate এর পুরানো name ব্যবহার করো
      console.error("User lookup failed:", err);
    }

    return {
      valid: true,
      certificate: {
        certificateId: cert.certificateId,
        userName: currentName,
        level: cert.level,
        issuedAt: cert.issuedAt.toISOString(),
        stats: cert.stats,
      },
    };
  } catch (error) {
    console.error("Verification error:", error);
    return { valid: false, reason: "সার্ভার সমস্যা হয়েছে" };
  }
}
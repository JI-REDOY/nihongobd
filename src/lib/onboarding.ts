import { db } from "./mongodb";
import { ObjectId } from "mongodb";

export type CourseGoal = {
  userId: string;
  durationDays: number;
  startedAt: Date;
  dailyTarget: number;
  completedAt?: Date;
};

const COLLECTION = "courseGoals";

// Total N5 items (hiragana 46 + katakana 46 + vocab 200 + grammar 15)
const TOTAL_ITEMS = 46 + 46 + 200 + 15; // = 307

export function calculateDailyTarget(durationDays: number): number {
  return Math.ceil(TOTAL_ITEMS / durationDays);
}

export async function getCourseGoal(userId: string): Promise<CourseGoal | null> {
  const goal = await db.collection(COLLECTION).findOne({ userId });
  return goal as unknown as CourseGoal | null;
}

export async function setCourseGoal(
  userId: string,
  durationDays: number
): Promise<CourseGoal> {
  const existing = await getCourseGoal(userId);

  if (existing) {
    await db.collection(COLLECTION).updateOne(
      { userId },
      {
        $set: {
          durationDays,
          dailyTarget: calculateDailyTarget(durationDays),
        },
      }
    );
    return {
      ...existing,
      durationDays,
      dailyTarget: calculateDailyTarget(durationDays),
    };
  }

  const goal: CourseGoal = {
    userId,
    durationDays,
    startedAt: new Date(),
    dailyTarget: calculateDailyTarget(durationDays),
  };

  await db.collection(COLLECTION).insertOne(goal);
  return goal;
}

export async function getDaysElapsed(startedAt: Date): Promise<number> {
  const now = new Date();
  const diff = Math.floor(
    (now.getTime() - new Date(startedAt).getTime()) / (1000 * 60 * 60 * 24)
  );
  return diff;
}
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const LEVELS = [
  { id: "n5", label: "N5", available: true },
  { id: "n4", label: "N4", available: true },
  { id: "n3", label: "N3", available: false },
];

// যে page গুলো level-specific
const LEVEL_PAGES = ["vocabulary", "grammar", "kanji", "quiz", "speaking"];

export function LevelSwitcher() {
  const pathname = usePathname();

  // Current level & section detect
  const pathParts = pathname?.split("/").filter(Boolean) || [];
  const currentLevel = pathParts[0];
  const currentSection = pathParts[1];

  // যদি level-specific page এ থাকো
  const isOnLevelPage = LEVELS.some((l) => l.id === currentLevel);
  const isKnownSection = LEVEL_PAGES.includes(currentSection);

  function getHref(targetLevel: string) {
    // যদি level-specific page এ থাকো, same section এ যাবে
    if (isOnLevelPage && isKnownSection) {
      return `/${targetLevel}/${currentSection}`;
    }
    // নাহলে default vocabulary
    return `/${targetLevel}/vocabulary`;
  }

  return (
    <div className="inline-flex rounded-lg border border-border bg-bg-alt p-0.5">
      {LEVELS.map((level) => {
        if (!level.available) {
          return (
            <span
              key={level.id}
              className="px-2.5 py-1 rounded-md text-xs font-medium text-text-secondary/50 cursor-not-allowed font-en"
              title="শীঘ্রই আসছে"
            >
              {level.label}
            </span>
          );
        }

        const isActive = currentLevel === level.id;

        return (
          <Link
            key={level.id}
            href={getHref(level.id)}
            className={cn(
              "px-2.5 py-1 rounded-md text-xs font-bold transition-colors font-en",
              isActive
                ? level.id === "n5"
                  ? "bg-jp-red text-white"
                  : "bg-bd-green text-white"
                : "text-text-secondary hover:text-text-primary"
            )}
          >
            {level.label}
          </Link>
        );
      })}
    </div>
  );
}
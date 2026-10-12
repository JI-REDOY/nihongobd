"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const LEVELS = [
  { id: "n5", label: "N5", available: true },
  { id: "n4", label: "N4", available: false },
];

export function LevelSwitcher() {
  const pathname = usePathname();

  return (
    <div className="inline-flex rounded-xl border border-border bg-white p-1">
      {LEVELS.map((level) => {
        const active = pathname?.includes(`/${level.id}/`);

        if (!level.available) {
          return (
            <span
              key={level.id}
              className="px-4 py-2 rounded-lg text-sm font-medium text-text-secondary/50 cursor-not-allowed font-en"
              title="শীঘ্রই আসছে"
            >
              {level.label} 🔒
            </span>
          );
        }

        return (
          <Link
            key={level.id}
            href={`/${level.id}/vocabulary`}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors font-en",
              active
                ? "bg-jp-red text-white"
                : "text-text-secondary hover:bg-bg-alt"
            )}
          >
            {level.label}
          </Link>
        );
      })}
    </div>
  );
}
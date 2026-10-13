"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { LevelSwitcher } from "./LevelSwitcher";
import { GlobalSearch } from "./GlobalSearch";
import { InstallButton } from "@/components/pwa/InstallButton";
import { UserMenu } from "@/components/auth/UserMenu";
import { cn } from "@/lib/utils";
import type { Level } from "@/lib/data";

const levelLinks = [
  { section: "vocabulary", label: "ভোকাব" },
  { section: "grammar", label: "গ্রামার" },
  { section: "kanji", label: "কাঞ্জি" },
  { section: "memory", label: "নিঞ্জা টেকনিক", premium: true },
  { section: "quiz", label: "কুইজ" },
  { section: "speaking", label: "স্পিকিং" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const pathParts = pathname?.split("/").filter(Boolean) || [];
  const currentLevel: Level = pathParts[0] === "n4" ? "n4" : "n5";

  const isKanaActive = (path: string) =>
    pathname === path || pathname?.startsWith(`${path}/`);

  const isLevelActive = (section: string) =>
    pathname?.startsWith(`/${currentLevel}/${section}`);

  const navBase =
    "px-3 py-1.5 text-sm font-medium rounded-lg transition-colors font-bangla";
  const navInactive = "text-text-secondary hover:text-jp-red hover:bg-bg-alt";

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-border">
      <Container>
        <div className="flex items-center justify-between h-16 gap-3">
          <div className="flex items-center gap-3 shrink-0">
            <Logo />
            <LevelSwitcher />
          </div>

          <div className="hidden xl:flex flex-1 justify-center max-w-md">
            <GlobalSearch />
          </div>

          <nav className="hidden xl:flex items-center gap-1 shrink-0">
            <Link
              href="/hiragana"
              className={cn(
                navBase,
                isKanaActive("/hiragana")
                  ? "bg-jp-red text-white"
                  : navInactive
              )}
            >
              হিরাগানা
            </Link>
            <Link
              href="/katakana"
              className={cn(
                navBase,
                isKanaActive("/katakana")
                  ? "bg-jp-red text-white"
                  : navInactive
              )}
            >
              কাতাকানা
            </Link>

            {levelLinks.map((link) => (
              <Link
                key={link.section}
                href={`/${currentLevel}/${link.section}`}
                className={cn(
                  navBase,
                  isLevelActive(link.section)
                    ? currentLevel === "n5"
                      ? "bg-jp-red text-white"
                      : "bg-bd-green text-white"
                    : navInactive
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <div className="xl:hidden">
              <GlobalSearch />
            </div>

            <InstallButton />
            <UserMenu />

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="xl:hidden w-11 h-11 flex items-center justify-center rounded-lg hover:bg-bg-alt"
              aria-label="Menu"
            >
              <span className="text-2xl">{isOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>

        {isOpen && (
          <nav className="xl:hidden py-4 border-t border-border flex flex-col gap-1">
            <Link
              href="/hiragana"
              onClick={() => setIsOpen(false)}
              className={cn(
                "px-3 py-2 text-base font-medium rounded-lg font-bangla",
                isKanaActive("/hiragana")
                  ? "bg-jp-red text-white"
                  : "text-text-primary hover:text-jp-red hover:bg-bg-alt"
              )}
            >
              হিরাগানা
            </Link>
            <Link
              href="/katakana"
              onClick={() => setIsOpen(false)}
              className={cn(
                "px-3 py-2 text-base font-medium rounded-lg font-bangla",
                isKanaActive("/katakana")
                  ? "bg-jp-red text-white"
                  : "text-text-primary hover:text-jp-red hover:bg-bg-alt"
              )}
            >
              কাতাকানা
            </Link>

            {levelLinks.map((link) => (
              <Link
                key={link.section}
                href={`/${currentLevel}/${link.section}`}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "px-3 py-2 text-base font-medium rounded-lg font-bangla",
                  isLevelActive(link.section)
                    ? currentLevel === "n5"
                      ? "bg-jp-red text-white"
                      : "bg-bd-green text-white"
                    : "text-text-primary hover:text-jp-red hover:bg-bg-alt"
                )}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/signin"
              onClick={() => setIsOpen(false)}
              className="mt-2 px-4 py-3 text-base font-medium bg-jp-red text-white rounded-xl text-center hover:bg-jp-red/90 font-bangla"
            >
              শুরু করো
            </Link>
          </nav>
        )}
      </Container>
    </header>
  );
}
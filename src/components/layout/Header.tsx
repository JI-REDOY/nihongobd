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
import type { Level } from "@/lib/data";

const navLinks = [
  { section: "vocabulary", label: "ভোকাব" },
  { section: "grammar", label: "গ্রামার" },
  { section: "kanji", label: "কাঞ্জি" },
  { section: "quiz", label: "কুইজ" },
  { section: "speaking", label: "স্পিকিং" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Current level detect করো URL থেকে
  const pathParts = pathname?.split("/").filter(Boolean) || [];
  const currentLevel: Level =
    pathParts[0] === "n4" ? "n4" : "n5"; // default n5

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-border">
      <Container>
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo + Level Switcher */}
          <div className="flex items-center gap-3 shrink-0">
            <Logo />
            <LevelSwitcher />
          </div>

          {/* Desktop Search (center) */}
          <div className="hidden lg:flex flex-1 justify-center max-w-md">
            <GlobalSearch />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 shrink-0">
            {navLinks.map((link) => (
              <Link
                key={link.section}
                href={`/${currentLevel}/${link.section}`}
                className="px-2.5 py-2 text-sm font-medium text-text-secondary hover:text-jp-red hover:bg-bg-alt rounded-lg transition-colors font-bangla"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="lg:hidden">
              <GlobalSearch />
            </div>

            <InstallButton />
            <UserMenu />

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-11 h-11 flex items-center justify-center rounded-lg hover:bg-bg-alt"
              aria-label="Menu"
            >
              <span className="text-2xl">{isOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <nav className="lg:hidden py-4 border-t border-border flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.section}
                href={`/${currentLevel}/${link.section}`}
                onClick={() => setIsOpen(false)}
                className="px-3 py-3 text-base font-medium text-text-primary hover:text-jp-red hover:bg-bg-alt rounded-lg font-bangla"
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
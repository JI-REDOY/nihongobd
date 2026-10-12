"use client";

import Link from "next/link";
import { useState } from "react";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { InstallButton } from "@/components/pwa/InstallButton";
import { UserMenu } from "@/components/auth/UserMenu";

const navLinks = [
  { href: "/hiragana", label: "হিরাগানা" },
  { href: "/katakana", label: "কাতাকানা" },
  { href: "/n5/vocabulary", label: "ভোকাব" },
  { href: "/n5/grammar", label: "গ্রামার" },
  { href: "/n5/kanji", label: "কাঞ্জি" },
  { href: "/n5/quiz", label: "কুইজ" },
  { href: "/n5/speaking", label: "স্পিকিং" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-border">
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo />

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-text-secondary hover:text-jp-red hover:bg-bg-alt rounded-lg transition-colors font-bangla"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <InstallButton />
            <UserMenu />

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-11 h-11 flex items-center justify-center rounded-lg hover:bg-bg-alt"
              aria-label="Menu"
            >
              <span className="text-2xl">{isOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <nav className="md:hidden py-4 border-t border-border flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
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
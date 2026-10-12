import Link from "next/link";
import { Container } from "./Container";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-white mt-auto">
      <Container>
        <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Logo />

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
            <Link
              href="/hiragana"
              className="text-text-secondary hover:text-jp-red font-bangla"
            >
              হিরাগানা
            </Link>
            <Link
              href="/katakana"
              className="text-text-secondary hover:text-jp-red font-bangla"
            >
              কাতাকানা
            </Link>
            <Link
              href="/n5/vocabulary"
              className="text-text-secondary hover:text-jp-red font-bangla"
            >
              ভোকাব
            </Link>
            <Link
              href="/n5/grammar"
              className="text-text-secondary hover:text-jp-red font-bangla"
            >
              গ্রামার
            </Link>
            <Link
              href="/n5/quiz"
              className="text-text-secondary hover:text-jp-red font-bangla"
            >
              কুইজ
            </Link>
          </nav>
        </div>

        {/* Bottom */}
        <div className="py-4 border-t border-border text-center text-xs text-text-secondary">
          © {year} NihongoBD — তৈরি হয়েছে বাংলাদেশে{" "}
          <span className="text-jp-red">♥</span> দিয়ে
        </div>
      </Container>
    </footer>
  );
}
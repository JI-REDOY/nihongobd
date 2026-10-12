import Link from "next/link";
import { Container } from "./Container";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-alt mt-auto">
      <Container>
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 text-sm text-text-secondary max-w-sm font-bangla">
              বাংলাদেশি শিক্ষার্থীদের জন্য জাপানিজ ভাষা শেখার সহজ প্ল্যাটফর্ম।
              হিরাগানা থেকে শুরু করে N5 পর্যন্ত — সম্পূর্ণ বাংলায়।
            </p>
          </div>

          {/* Learn Links */}
          <div>
            <h3 className="font-bold text-text-primary mb-3 font-bangla">
              শেখা
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/hiragana"
                  className="text-text-secondary hover:text-jp-red font-bangla"
                >
                  হিরাগানা
                </Link>
              </li>
              <li>
                <Link
                  href="/katakana"
                  className="text-text-secondary hover:text-jp-red font-bangla"
                >
                  কাতাকানা
                </Link>
              </li>
              <li>
                <Link
                  href="/n5/vocabulary"
                  className="text-text-secondary hover:text-jp-red font-bangla"
                >
                  N5 ভোকাবুলারি
                </Link>
              </li>
              <li>
                <Link
                  href="/n5/grammar"
                  className="text-text-secondary hover:text-jp-red font-bangla"
                >
                  N5 গ্রামার
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="font-bold text-text-primary mb-3 font-bangla">
              একাউন্ট
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/signin"
                  className="text-text-secondary hover:text-jp-red font-bangla"
                >
                  সাইন ইন
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="text-text-secondary hover:text-jp-red font-bangla"
                >
                  সাইন আপ
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-text-secondary hover:text-jp-red font-bangla"
                >
                  ড্যাশবোর্ড
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="text-text-secondary hover:text-jp-red font-bangla"
                >
                  প্রোফাইল
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="py-6 border-t border-border text-center text-sm text-text-secondary">
          <p>
            © {new Date().getFullYear()} NihongoBD — তৈরি হয়েছে{" "}
            <span className="text-jp-red">♥</span> দিয়ে বাংলাদেশে
          </p>
        </div>
      </Container>
    </footer>
  );
}
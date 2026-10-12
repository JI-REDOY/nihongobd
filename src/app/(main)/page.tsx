import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { getSession } from "@/lib/session";

export default async function Home() {
  const session = await getSession();
  const isLoggedIn = !!session;

  return (
    <div className="py-20">
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-sm font-medium text-jp-red mb-3 font-bangla">
            🎌 জাপানিজ শেখা এখন সহজ
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-text-primary mb-6 font-bangla leading-tight">
            শূন্য থেকে <span className="text-jp-red">N5</span> পর্যন্ত
            <br />
            বাংলায় জাপানিজ শেখো
          </h1>
          <p className="text-lg text-text-secondary mb-8 font-bangla">
            হিরাগানা, কাতাকানা, ২০০+ ভোকাবুলারি, গ্রামার ও কুইজ —
            সবকিছু এক জায়গায়। সম্পূর্ণ বিনামূল্যে।
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {isLoggedIn ? (
              <Link href="/dashboard">
                <Button size="lg" className="font-bangla">
                  ড্যাশবোর্ডে যাও →
                </Button>
              </Link>
            ) : (
              <Link href="/signup">
                <Button size="lg" className="font-bangla">
                  বিনামূল্যে শুরু করো →
                </Button>
              </Link>
            )}
            <Link href="/hiragana">
              <Button variant="outline" size="lg" className="font-bangla">
                হিরাগানা দেখো
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
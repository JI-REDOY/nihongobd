import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-alt">
      <Container>
        <div className="max-w-md mx-auto text-center">
          <div className="text-7xl font-jp font-bold text-jp-red mb-4">
            ４０４
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-3 font-bangla">
            পেজটি খুঁজে পাওয়া যায়নি
          </h1>
          <p className="text-text-secondary mb-8 font-bangla">
            তুমি যে পেজটি খুঁজছো সেটি নেই বা সরিয়ে ফেলা হয়েছে।
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/">
              <Button variant="primary" size="lg" className="font-bangla w-full sm:w-auto">
                ← হোমে ফিরে যাও
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="lg" className="font-bangla w-full sm:w-auto">
                ড্যাশবোর্ড
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
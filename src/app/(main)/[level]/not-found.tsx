import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export default function LevelNotFound() {
  return (
    <div className="py-20 min-h-[60vh] flex items-center">
      <Container>
        <div className="max-w-md mx-auto text-center">
          <div className="text-6xl mb-4">🎌</div>
          <h1 className="text-2xl font-bold text-text-primary mb-3 font-bangla">
            এই level টা এখনো নেই
          </h1>
          <p className="text-text-secondary mb-8 font-bangla">
            আপাতত শুধু N5 available। N4 শীঘ্রই আসছে।
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/n5/vocabulary">
              <Button variant="primary" size="lg" className="font-bangla w-full sm:w-auto">
                N5 শুরু করো
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
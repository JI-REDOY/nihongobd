"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/context/ToastContext";
import { CertificateView } from "./CertificateView";
import { cn } from "@/lib/utils";

interface CertData {
  certificate: {
    certificateId: string;
    userName: string;
    issuedAt: string;
    level: "n5" | "n4";
    stats: {
      hiragana?: number;
      katakana?: number;
      vocabulary: number;
      grammar: number;
      kanji: number;
      quizAverage: number;
    };
  } | null;
  completion: number;
  eligible: boolean;
  level: "n5" | "n4";
}

export function CertificatePage() {
  const toast = useToast();
  const searchParams = useSearchParams();
  const level = (searchParams.get("level") || "n5") as "n5" | "n4";

  const [data, setData] = useState<CertData | null>(null);
  const [loading, setLoading] = useState(true);
  const [issuing, setIssuing] = useState(false);

  const isN5 = level === "n5";
  const levelName = isN5 ? "N5" : "N4";

  async function load() {
    setLoading(true);
    try {
      const res = await fetch(`/api/certificate?level=${level}`);
      const d = await res.json();
      setData(d);
    } catch {
      toast.error("লোড ব্যর্থ", "আবার চেষ্টা করো");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [level]);

  async function handleIssue() {
    setIssuing(true);
    try {
      const res = await fetch("/api/certificate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ level }),
      });
      const d = await res.json();
      if (!res.ok) {
        toast.error("ব্যর্থ", d.error);
        return;
      }
      toast.success("🎉 অভিনন্দন!", "তোমার সার্টিফিকেট তৈরি হয়েছে");
      load();
    } catch {
      toast.error("ব্যর্থ", "আবার চেষ্টা করো");
    } finally {
      setIssuing(false);
    }
  }

  if (loading) {
    return (
      <div className="py-20">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="h-96 rounded-2xl bg-bg-alt animate-pulse" />
          </div>
        </Container>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="py-10 sm:py-14 bg-bg-alt min-h-screen">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center no-print">
            <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-2 font-bangla">
              🎓 {levelName} সার্টিফিকেট
            </h1>
            <p className="text-text-secondary font-bangla">
              সম্পূর্ণ {levelName} কোর্স শেষ করে সার্টিফিকেট নাও
            </p>

            {/* Level tabs */}
            <div className="inline-flex rounded-xl border border-border bg-white p-1 mt-4">
              <button
                onClick={() => {
                  window.location.href = "/certificate?level=n5";
                }}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors font-en",
                  isN5
                    ? "bg-jp-red text-white"
                    : "text-text-secondary hover:bg-bg-alt"
                )}
              >
                N5
              </button>
              <button
                onClick={() => {
                  window.location.href = "/certificate?level=n4";
                }}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors font-en",
                  !isN5
                    ? "bg-bd-green text-white"
                    : "text-text-secondary hover:bg-bg-alt"
                )}
              >
                N4
              </button>
            </div>
          </div>

          {data.certificate ? (
            <CertificateView certificate={data.certificate} />
          ) : data.eligible ? (
            <div className="bg-white rounded-2xl border border-border shadow-soft p-8 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-text-primary mb-3 font-bangla">
                অভিনন্দন!
              </h2>
              <p className="text-text-secondary mb-6 font-bangla">
                তুমি {levelName} এর ৮০%+ সম্পন্ন করেছ। এখনই সার্টিফিকেট নাও!
              </p>
              <Button
                variant="primary"
                size="lg"
                onClick={handleIssue}
                isLoading={issuing}
                className="font-bangla"
              >
                সার্টিফিকেট দাও
              </Button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-border shadow-soft p-8 text-center">
              <div className="text-6xl mb-4">📚</div>
              <h2 className="text-2xl font-bold text-text-primary mb-3 font-bangla">
                আরো শিখতে হবে
              </h2>
              <p className="text-text-secondary mb-6 font-bangla">
                সার্টিফিকেট পেতে কমপক্ষে ৮০% সম্পন্ন করো
              </p>

              <div className="max-w-md mx-auto">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-text-secondary font-bangla">
                    তোমার অগ্রগতি
                  </span>
                  <span className="text-lg font-bold text-jp-red">
                    {data.completion}%
                  </span>
                </div>
                <div className="w-full h-3 bg-bg-alt rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full transition-all duration-700 rounded-full",
                      isN5 ? "bg-jp-red" : "bg-bd-green"
                    )}
                    style={{ width: `${data.completion}%` }}
                  />
                </div>
                <p className="text-xs text-text-secondary mt-2 font-bangla">
                  আরো {Math.max(0, 80 - data.completion)}% প্রয়োজন
                </p>
              </div>

              <div className="flex flex-wrap gap-2 justify-center mt-6 no-print">
                <a href={`/${level}/vocabulary`}>
                  <Button variant="outline" size="sm" className="font-bangla">
                    ভোকাব
                  </Button>
                </a>
                <a href={`/${level}/grammar`}>
                  <Button variant="outline" size="sm" className="font-bangla">
                    গ্রামার
                  </Button>
                </a>
                <a href={`/${level}/kanji`}>
                  <Button variant="outline" size="sm" className="font-bangla">
                    কাঞ্জি
                  </Button>
                </a>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
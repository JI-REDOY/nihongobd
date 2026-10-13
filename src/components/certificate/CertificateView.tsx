"use client";

import { Button } from "@/components/ui/Button";
import { useToast } from "@/context/ToastContext";
import { cn } from "@/lib/utils";

interface Certificate {
  certificateId: string;
  userName: string;
  issuedAt: string;
  level?: "n5" | "n4";
  stats: {
    hiragana?: number;
    katakana?: number;
    vocabulary: number;
    grammar: number;
    kanji: number;
    quizAverage: number;
  };
}

interface CertificateViewProps {
  certificate: Certificate;
}

export function CertificateView({ certificate }: CertificateViewProps) {
  const toast = useToast();
  const level = certificate.level || "n5";
  const isN5 = level === "n5";
  const levelName = isN5 ? "N5" : "N4";

  function handlePrint() {
    window.print();
  }

  const issuedDate = new Date(certificate.issuedAt).toLocaleDateString("bn-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Border & accent color per level
  const borderColor = isN5 ? "border-jp-red/20" : "border-bd-green/20";
  const accentColor = isN5 ? "text-jp-red" : "text-bd-green";
  const accentBg = isN5 ? "bg-jp-red" : "bg-bd-green";
  const accentBorder = isN5 ? "border-jp-red/40" : "border-bd-green/40";

  return (
    <div>
      {/* Certificate */}
      <div
        id="certificate"
        className={cn(
          "relative bg-white rounded-2xl border-4 p-8 sm:p-12 shadow-card overflow-hidden",
          borderColor
        )}
      >
        {/* Decorative corners */}
        <div className={cn("absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2", accentBorder)} />
        <div className={cn("absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2", accentBorder)} />
        <div className={cn("absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2", accentBorder)} />
        <div className={cn("absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2", accentBorder)} />

        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
          <span className={cn("text-[300px] font-jp font-bold", accentColor)}>
            日
          </span>
        </div>

        <div className="relative text-center">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className={cn("w-10 h-10 rounded-lg text-white flex items-center justify-center text-xl font-bold", accentBg)}>
              日
            </span>
            <span className="text-xl font-bold">
              Nihongo
              <span className={accentColor}>BD</span>
            </span>
          </div>

          <p className="text-xs uppercase tracking-widest text-text-secondary mb-2 font-en">
            Certificate of Completion
          </p>

          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-6 font-bangla">
            জাপানিজ ভাষা {levelName} সম্পূর্ণ
          </h1>

          <p className="text-sm text-text-secondary mb-3 font-bangla">
            এই সার্টিফিকেট প্রদান করা হলো
          </p>

          <p className={cn("text-3xl sm:text-4xl font-bold mb-6 font-bangla", accentColor)}>
            {certificate.userName}
          </p>

          <p className="text-sm text-text-secondary max-w-md mx-auto mb-8 font-bangla leading-relaxed">
            কে সফলভাবে NihongoBD এর সম্পূর্ণ {levelName} কোর্স সম্পন্ন করার জন্য।
            এই শিক্ষার্থী{" "}
            {isN5
              ? "হিরাগানা, কাতাকানা, ৮০০টি শব্দ, ৫০টি গ্রামার পাঠ, ১০০টি কাঞ্জি ও কুইজ সম্পূর্ণ করেছেন।"
              : "১০০০টি শব্দ, ৮০টি গ্রামার পাঠ, ৩০০টি কাঞ্জি ও কুইজ সম্পূর্ণ করেছেন।"}
          </p>

          {/* Stats */}
          <div
            className={cn(
              "grid gap-3 mb-8 max-w-3xl mx-auto",
              isN5
                ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-6"
                : "grid-cols-2 sm:grid-cols-4"
            )}
          >
            {isN5 && certificate.stats.hiragana !== undefined && (
              <>
                <StatBox
                  label="হিরাগানা"
                  value={certificate.stats.hiragana}
                  total={46}
                  accentColor={accentColor}
                />
                <StatBox
                  label="কাতাকানা"
                  value={certificate.stats.katakana || 0}
                  total={46}
                  accentColor={accentColor}
                />
              </>
            )}
            <StatBox
              label="ভোকাব"
              value={certificate.stats.vocabulary}
              total={isN5 ? 800 : 1000}
              accentColor={accentColor}
            />
            <StatBox
              label="গ্রামার"
              value={certificate.stats.grammar}
              total={isN5 ? 50 : 80}
              accentColor={accentColor}
            />
            <StatBox
              label="কাঞ্জি"
              value={certificate.stats.kanji}
              total={isN5 ? 100 : 300}
              accentColor={accentColor}
            />
            <StatBox
              label="কুইজ"
              value={certificate.stats.quizAverage}
              suffix="%"
              accentColor={accentColor}
            />
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border max-w-md mx-auto">
            <div className="text-center sm:text-left">
              <p className="text-xs text-text-secondary font-bangla">তারিখ</p>
              <p className="text-sm font-medium text-text-primary">{issuedDate}</p>
            </div>
            <div className="text-center sm:text-right">
              <p className="text-xs text-text-secondary font-bangla">
                সার্টিফিকেট আইডি
              </p>
              <p className="text-sm font-mono text-text-primary">
                {certificate.certificateId}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3 no-print">
        <Button
          variant="primary"
          size="lg"
          onClick={handlePrint}
          className="flex-1 font-bangla"
        >
          📥 ডাউনলোড / প্রিন্ট
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => {
            navigator.clipboard.writeText(certificate.certificateId);
            toast.success("কপি হয়েছে!", "সার্টিফিকেট আইডি কপি হয়েছে");
          }}
          className="flex-1 font-bangla"
        >
          📋 আইডি কপি করো
        </Button>
      </div>

      <style jsx global>{`
        @media print {
          header,
          footer,
          .no-print {
            display: none !important;
          }
          #certificate {
            border-width: 2px !important;
            box-shadow: none !important;
          }
          body {
            background: white !important;
          }
        }
      `}</style>
    </div>
  );
}

function StatBox({
  label,
  value,
  total,
  suffix,
  accentColor,
}: {
  label: string;
  value: number;
  total?: number;
  suffix?: string;
  accentColor: string;
}) {
  return (
    <div className="bg-bg-alt rounded-xl p-3">
      <p className="text-xs text-text-secondary font-bangla mb-1">{label}</p>
      <p className={cn("text-lg font-bold", accentColor)}>
        {value}
        {total && <span className="text-xs text-text-secondary">/{total}</span>}
        {suffix}
      </p>
    </div>
  );
}
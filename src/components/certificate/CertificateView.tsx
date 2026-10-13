"use client";

import { useState, useEffect } from "react";
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
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
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

  const accent = isN5 ? "#BC002D" : "#006A4E";
  const accentDark = isN5 ? "#8E0021" : "#004A36";

  useEffect(() => {
    async function generateQR() {
      try {
        const QRCode = (await import("qrcode")).default;
        const verifyUrl = `${window.location.origin}/verify/${certificate.certificateId}`;
        const url = await QRCode.toDataURL(verifyUrl, {
          width: 200,
          margin: 1,
          color: { dark: "#000000", light: "#FFFFFF" },
          errorCorrectionLevel: "M",
        });
        setQrDataUrl(url);
      } catch (err) {
        console.error("QR generation failed:", err);
      }
    }
    generateQR();
  }, [certificate.certificateId]);

  return (
    <div>
      {/* ===== CERTIFICATE ===== */}
      <div
        id="certificate"
        className="relative bg-white overflow-hidden"
        style={{
          boxShadow:
            "0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)",
        }}
      >
        {/* QR CODE — Top Right */}
        {qrDataUrl && (
          <div className="absolute top-6 right-6 sm:top-10 sm:right-10 z-10 print:top-4 print:right-4">
            <div
              className="bg-white p-2 rounded-lg border-2"
              style={{ borderColor: `${accent}30` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={qrDataUrl}
                alt="Verify QR Code"
                className="w-16 h-16 sm:w-20 sm:h-20 print:w-14 print:h-14"
              />
            </div>
            <p
              className="text-[8px] text-center mt-1 font-en uppercase tracking-wider"
              style={{ color: accent }}
            >
              Verify
            </p>
          </div>
        )}

        {/* Outer borders */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ border: `3px solid ${accent}` }}
        />
        <div
          className="absolute inset-2 pointer-events-none"
          style={{ border: `1px solid ${accent}30` }}
        />

        {/* Corner ornaments */}
        {(["top", "bottom"] as const).map((v) =>
          (["left", "right"] as const).map((h) => (
            <div
              key={`${v}-${h}`}
              className="absolute w-24 h-24 pointer-events-none"
              style={{ [v]: 0, [h]: 0 }}
            >
              <div
                className="absolute"
                style={{
                  [v]: 0,
                  [h]: 0,
                  width: "100%",
                  height: "6px",
                  background: accent,
                }}
              />
              <div
                className="absolute"
                style={{
                  [v]: 0,
                  [h]: 0,
                  height: "100%",
                  width: "6px",
                  background: accent,
                }}
              />
              <div
                className="absolute w-8 h-8 rounded-full"
                style={{ [v]: "16px", [h]: "16px", background: `${accent}15` }}
              />
              <div
                className="absolute w-2 h-2 rounded-full"
                style={{ [v]: "28px", [h]: "28px", background: accent }}
              />
            </div>
          ))
        )}

        {/* Diagonal accents */}
        <div
          className="absolute top-0 right-0 w-32 h-32 pointer-events-none opacity-5"
          style={{
            background: `linear-gradient(135deg, transparent 50%, ${accent} 50%)`,
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-32 h-32 pointer-events-none opacity-5"
          style={{
            background: `linear-gradient(315deg, transparent 50%, ${accent} 50%)`,
          }}
        />

        {/* Content */}
        <div className="relative px-8 py-10 sm:px-14 sm:py-16 lg:px-16 lg:py-20">
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center bg-white shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.png"
                  alt="NihongoBD"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-bold text-text-primary">
                Nihongo<span style={{ color: accent }}>BD</span>
              </span>
            </div>
            <div
              className="h-0.5 w-24 my-1"
              style={{
                background: `linear-gradient(to right, transparent, ${accent}, transparent)`,
              }}
            />
          </div>

          {/* Title */}
          <div className="text-center mb-6">
            <p
              className="text-xs font-semibold uppercase tracking-[0.3em] mb-2 font-en"
              style={{ color: accent }}
            >
              Certificate of Completion
            </p>
            <h1
              className="text-3xl sm:text-4xl font-bold mb-2 font-bangla"
              style={{ color: accentDark }}
            >
              জাপানিজ ভাষা {levelName} সম্পূর্ণ
            </h1>
            <div
              className="w-16 h-1 mx-auto rounded-full"
              style={{ background: accent }}
            />
          </div>

          {/* Award text */}
          <div className="text-center mb-4">
            <p className="text-sm text-text-secondary font-bangla mb-3">
              এই সার্টিফিকেট গর্বের সাথে প্রদান করা হলো
            </p>
            <div className="relative inline-block mb-3">
              <p
                className="text-4xl sm:text-5xl font-bold font-bangla px-8 py-2 relative z-10"
                style={{ color: accent }}
              >
                {certificate.userName}
              </p>
              <div
                className="absolute bottom-0 left-0 right-0 h-1 rounded-full"
                style={{
                  background: `linear-gradient(to right, transparent, ${accent}, transparent)`,
                }}
              />
            </div>
            <p className="text-sm text-text-secondary font-bangla max-w-lg mx-auto leading-relaxed">
              কে সফলভাবে NihongoBD এর সম্পূর্ণ{" "}
              <strong style={{ color: accent }}>{levelName}</strong> কোর্স
              সম্পূর্ণ করার জন্য। এই শিক্ষার্থী{" "}
              {isN5
                ? "হিরাগানা, কাতাকানা, ৮০০টি শব্দ, ৫০টি গ্রামার পাঠ, ১০০টি কাঞ্জি ও কুইজ সম্পূর্ণ করেছেন।"
                : "১০০০টি শব্দ, ৮০টি গ্রামার পাঠ, ৩০০টি কাঞ্জি ও কুইজ সম্পূর্ণ করেছেন।"}
            </p>
          </div>

          {/* Stats */}
          <div
            className={cn(
              "grid gap-3 my-8 max-w-3xl mx-auto",
              isN5
                ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-6"
                : "grid-cols-2 sm:grid-cols-4"
            )}
          >
            {isN5 && certificate.stats.hiragana !== undefined && (
              <>
                <PremiumStatBox
                  label="হিরাগানা"
                  value={certificate.stats.hiragana}
                  total={46}
                  accent={accent}
                />
                <PremiumStatBox
                  label="কাতাকানা"
                  value={certificate.stats.katakana || 0}
                  total={46}
                  accent={accent}
                />
              </>
            )}
            <PremiumStatBox
              label="ভোকাব"
              value={certificate.stats.vocabulary}
              total={isN5 ? 800 : 1000}
              accent={accent}
            />
            <PremiumStatBox
              label="গ্রামার"
              value={certificate.stats.grammar}
              total={isN5 ? 50 : 80}
              accent={accent}
            />
            <PremiumStatBox
              label="কাঞ্জি"
              value={certificate.stats.kanji}
              total={isN5 ? 100 : 300}
              accent={accent}
            />
            <PremiumStatBox
              label="কুইজ"
              value={certificate.stats.quizAverage}
              suffix="%"
              accent={accent}
            />
          </div>

          {/* Footer */}
          <div className="grid grid-cols-3 gap-6 items-end pt-6 mt-6 border-t border-border max-w-3xl mx-auto">
            {/* Date */}
            <div className="text-center">
              <p
                className="text-base font-semibold mb-1"
                style={{ color: accentDark }}
              >
                {issuedDate}
              </p>
              <div
                className="w-full h-0.5 my-1"
                style={{ background: `${accent}40` }}
              />
              <p className="text-xs text-text-secondary font-bangla uppercase tracking-wider">
                তারিখ
              </p>
            </div>

            {/* Founder Signature */}
            <div className="flex flex-col items-center">
              <div className="relative w-36 h-14 flex items-end justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/signature.png"
                  alt="Founder Signature"
                  className="w-full h-full object-contain"
                />
              </div>
              <div
                className="w-32 h-0.5 my-1"
                style={{ background: `${accent}40` }}
              />
              <p className="text-xs text-text-secondary font-bangla uppercase tracking-wider">
                প্রতিষ্ঠাতা
              </p>
              <p className="text-[10px] text-text-secondary/60 font-en">
                Founder
              </p>
            </div>

            {/* Certificate ID */}
            <div className="text-center">
              <p
                className="text-sm font-mono font-semibold mb-1"
                style={{ color: accentDark }}
              >
                {certificate.certificateId}
              </p>
              <div
                className="w-full h-0.5 my-1"
                style={{ background: `${accent}40` }}
              />
              <p className="text-xs text-text-secondary font-bangla uppercase tracking-wider">
                সার্টিফিকেট আইডি
              </p>
            </div>
          </div>

          {/* Bottom flourish */}
          <div className="flex justify-center mt-6">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-px"
                style={{ background: `${accent}40` }}
              />
              <span className="text-xs tracking-widest font-en uppercase text-text-secondary/60">
                NihongoBD.com
              </span>
              <div
                className="w-12 h-px"
                style={{ background: `${accent}40` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ===== ACTIONS ===== */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3 no-print">
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
        <Button
          variant="secondary"
          size="lg"
          onClick={() => {
            window.open(`/verify/${certificate.certificateId}`, "_blank");
          }}
          className="flex-1 font-bangla"
        >
          🔍 Verify Page দেখো
        </Button>
      </div>

      {/* ===== PRINT STYLES ===== */}
      <style jsx global>{`
        @media print {
          /* Hide everything except certificate */
          header,
          footer,
          nav,
          .no-print {
            display: none !important;
          }

          /* Reset page */
          html,
          body {
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
          }

          /* Force colors */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }

          /* A4 page — minimal margin */
          @page {
            size: A4 portrait;
            margin: 4mm;
          }

          /* Certificate = single page */
          #certificate {
            box-shadow: none !important;
            border-radius: 0 !important;
            margin: 0 auto !important;
            padding: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            page-break-inside: avoid !important;
            page-break-after: avoid !important;
            page-break-before: avoid !important;
            overflow: hidden !important;
          }

          /* No page breaks inside */
          #certificate,
          #certificate * {
            page-break-inside: avoid !important;
            page-break-before: avoid !important;
            page-break-after: avoid !important;
          }

          /* Compact all typography */
          #certificate h1 {
            font-size: 22px !important;
            line-height: 1.2 !important;
            margin-bottom: 4px !important;
          }

          #certificate p {
            line-height: 1.35 !important;
          }

          /* Force single row stats */
          #certificate .grid {
            gap: 4px !important;
          }

          /* Reduce main content padding */
          #certificate > div:last-child {
            padding: 14mm !important;
          }

          /* Fixed image sizes */
          #certificate img[alt="Verify QR Code"] {
            width: 56px !important;
            height: 56px !important;
          }

          #certificate img[alt="NihongoBD"] {
            width: 36px !important;
            height: 36px !important;
          }

          #certificate img[alt="Founder Signature"] {
            width: 90px !important;
            height: 36px !important;
          }
        }
      `}</style>
    </div>
  );
}

function PremiumStatBox({
  label,
  value,
  total,
  suffix,
  accent,
}: {
  label: string;
  value: number;
  total?: number;
  suffix?: string;
  accent: string;
}) {
  return (
    <div
      className="rounded-xl p-2.5 text-center border"
      style={{
        background: "linear-gradient(135deg, #FFFFFF 0%, #F9FAFB 100%)",
        borderColor: `${accent}20`,
      }}
    >
      <p className="text-[10px] text-text-secondary font-bangla uppercase tracking-wider mb-0.5">
        {label}
      </p>
      <p className="text-base font-bold" style={{ color: accent }}>
        {value}
        {total && (
          <span className="text-xs text-text-secondary/70">/{total}</span>
        )}
        {suffix}
      </p>
    </div>
  );
}
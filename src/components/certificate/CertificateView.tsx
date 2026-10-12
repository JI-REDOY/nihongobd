"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/context/ToastContext";

interface Certificate {
  certificateId: string;
  userName: string;
  issuedAt: string;
  stats: {
    hiragana: number;
    katakana: number;
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
  const [downloading, setDownloading] = useState(false);

  function handlePrint() {
    window.print();
  }

  const issuedDate = new Date(certificate.issuedAt).toLocaleDateString("bn-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      {/* Certificate */}
      <div
        id="certificate"
        className="relative bg-white rounded-2xl border-4 border-jp-red/20 p-8 sm:p-12 shadow-card overflow-hidden"
      >
        {/* Decorative corners */}
        <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-jp-red/40" />
        <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-jp-red/40" />
        <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-jp-red/40" />
        <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-jp-red/40" />

        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
          <span className="text-[300px] font-jp font-bold text-jp-red">日</span>
        </div>

        <div className="relative text-center">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="w-10 h-10 rounded-lg bg-jp-red text-white flex items-center justify-center text-xl font-bold">
              日
            </span>
            <span className="text-xl font-bold">
              Nihongo<span className="text-jp-red">BD</span>
            </span>
          </div>

          <p className="text-xs uppercase tracking-widest text-text-secondary mb-2 font-en">
            Certificate of Completion
          </p>

          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-6 font-bangla">
            জাপানিজ ভাষা N5 সম্পূর্ণ
          </h1>

          <p className="text-sm text-text-secondary mb-3 font-bangla">
            এই সার্টিফিকেট প্রদান করা হলো
          </p>

          <p className="text-3xl sm:text-4xl font-bold text-jp-red mb-6 font-bangla">
            {certificate.userName}
          </p>

          <p className="text-sm text-text-secondary max-w-md mx-auto mb-8 font-bangla leading-relaxed">
            কে সফলভাবে NihongoBD এর সম্পূর্ণ N5 কোর্স সম্পন্ন করার জন্য। এই
            শিক্ষার্থী হিরাগানা, কাতাকানা, ২০০টি শব্দ, ১৫টি গ্রামার পাঠ,
            ১০০টি কাঞ্জি ও কুইজ সম্পূর্ণ করেছেন।
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-8 max-w-3xl mx-auto">
            <StatBox label="হিরাগানা" value={certificate.stats.hiragana} total={46} />
            <StatBox label="কাতাকানা" value={certificate.stats.katakana} total={46} />
            <StatBox label="ভোকাব" value={certificate.stats.vocabulary} total={200} />
            <StatBox label="গ্রামার" value={certificate.stats.grammar} total={15} />
            <StatBox label="কাঞ্জি" value={certificate.stats.kanji} total={100} />
            <StatBox label="কুইজ" value={certificate.stats.quizAverage} suffix="%" />
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
}: {
  label: string;
  value: number;
  total?: number;
  suffix?: string;
}) {
  return (
    <div className="bg-bg-alt rounded-xl p-3">
      <p className="text-xs text-text-secondary font-bangla mb-1">{label}</p>
      <p className="text-lg font-bold text-jp-red">
        {value}
        {total && <span className="text-xs text-text-secondary">/{total}</span>}
        {suffix}
      </p>
    </div>
  );
}
import { Container } from "@/components/layout/Container";
import { verifyCertificate } from "@/lib/verify";
import Link from "next/link";
import Image from "next/image";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function VerifyPage({ params }: PageProps) {
  const { id } = await params;
  const result = await verifyCertificate(id);

  return (
    <div className="py-12 sm:py-20 bg-bg-alt min-h-screen">
      <Container>
        <div className="max-w-2xl mx-auto">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center bg-white">
              <Image
                src="/logo.png"
                alt="NihongoBD"
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xl font-bold">
              Nihongo<span className="text-jp-red">BD</span>
            </span>
          </div>

          {result.valid && result.certificate ? (
            <>
              {/* Success Banner */}
              <div className="bg-white rounded-2xl border-2 border-bd-green shadow-card overflow-hidden mb-6">
                {/* Green top bar */}
                <div className="bg-bd-green h-2" />

                <div className="p-8 text-center">
                  {/* Check icon */}
                  <div className="w-20 h-20 rounded-full bg-bd-green/10 flex items-center justify-center mx-auto mb-4">
                    <div className="w-14 h-14 rounded-full bg-bd-green flex items-center justify-center text-white text-3xl">
                      ✓
                    </div>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-bold text-bd-green mb-2 font-bangla">
                    সার্টিফিকেট বৈধ
                  </h1>
                  <p className="text-text-secondary font-bangla">
                    এই সার্টিফিকেটটি NihongoBD কর্তৃক ইস্যু করা হয়েছে
                  </p>
                </div>

                {/* Certificate Details */}
                <div className="border-t border-border bg-bg-alt p-6">
                  <div className="space-y-4">
                    <DetailRow
                      label="শিক্ষার্থীর নাম"
                      value={result.certificate.userName}
                      highlight
                    />
                    <DetailRow
                      label="লেভেল"
                      value={result.certificate.level.toUpperCase()}
                    />
                    <DetailRow
                      label="সার্টিফিকেট আইডি"
                      value={result.certificate.certificateId}
                      mono
                    />
                    <DetailRow
                      label="ইস্যুর তারিখ"
                      value={new Date(
                        result.certificate.issuedAt
                      ).toLocaleDateString("bn-BD", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    />
                  </div>

                  {/* Stats */}
                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3 font-bangla">
                      অর্জিত ফলাফল
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {result.certificate.level === "n5" &&
                        result.certificate.stats.hiragana !== undefined && (
                          <>
                            <StatBox
                              label="হিরাগানা"
                              value={`${result.certificate.stats.hiragana}/46`}
                            />
                            <StatBox
                              label="কাতাকানা"
                              value={`${result.certificate.stats.katakana}/46`}
                            />
                          </>
                        )}
                      <StatBox
                        label="ভোকাব"
                        value={`${result.certificate.stats.vocabulary}/${
                          result.certificate.level === "n5" ? 800 : 1000
                        }`}
                      />
                      <StatBox
                        label="গ্রামার"
                        value={`${result.certificate.stats.grammar}/${
                          result.certificate.level === "n5" ? 50 : 80
                        }`}
                      />
                      <StatBox
                        label="কাঞ্জি"
                        value={`${result.certificate.stats.kanji}/${
                          result.certificate.level === "n5" ? 100 : 300
                        }`}
                      />
                      <StatBox
                        label="কুইজ"
                        value={`${result.certificate.stats.quizAverage}%`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="text-center">
                <Link
                  href="/"
                  className="inline-block px-6 py-3 bg-jp-red text-white rounded-xl hover:bg-jp-red/90 transition-colors font-bangla"
                >
                  ← হোমে ফিরে যাও
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* Invalid Banner */}
              <div className="bg-white rounded-2xl border-2 border-error shadow-card overflow-hidden">
                <div className="bg-error h-2" />

                <div className="p-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-error/10 flex items-center justify-center mx-auto mb-4">
                    <div className="w-14 h-14 rounded-full bg-error flex items-center justify-center text-white text-3xl">
                      ✕
                    </div>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-bold text-error mb-2 font-bangla">
                    সার্টিফিকেট অবৈধ
                  </h1>
                  <p className="text-text-secondary mb-6 font-bangla">
                    {result.reason ||
                      "এই সার্টিফিকেটটি NihongoBD এ নিবন্ধিত নয়"}
                  </p>

                  <div className="bg-bg-alt rounded-xl p-4 text-sm text-text-secondary font-bangla">
                    সার্টিফিকেট আইডি:{" "}
                    <span className="font-mono font-bold text-text-primary">
                      {id}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-center mt-6">
                <Link
                  href="/"
                  className="inline-block px-6 py-3 bg-jp-red text-white rounded-xl hover:bg-jp-red/90 transition-colors font-bangla"
                >
                  ← হোমে ফিরে যাও
                </Link>
              </div>
            </>
          )}
        </div>
      </Container>
    </div>
  );
}

function DetailRow({
  label,
  value,
  highlight,
  mono,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  mono?: boolean;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-2 border-b border-border/50 last:border-0">
      <span className="text-xs text-text-secondary font-bangla uppercase tracking-wider">
        {label}
      </span>
      <span
        className={`text-sm font-semibold ${
          highlight ? "text-jp-red text-base" : "text-text-primary"
        } ${mono ? "font-mono" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white rounded-lg p-3 text-center border border-border">
      <p className="text-[10px] text-text-secondary font-bangla uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className="text-sm font-bold text-jp-red">{value}</p>
    </div>
  );
}
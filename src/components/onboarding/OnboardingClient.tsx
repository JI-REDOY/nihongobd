"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/context/ToastContext";
import { cn } from "@/lib/utils";

interface OnboardingClientProps {
  userName: string;
}

const OPTIONS = [
  {
    days: 30,
    label: "৩০ দিন",
    tag: "🚀 ফাস্ট ট্র্যাক",
    desc: "দিনে ৩০ মিনিট — দ্রুত শেষ করো",
    color: "jp-red",
  },
  {
    days: 60,
    label: "৬০ দিন",
    tag: "⭐ জনপ্রিয়",
    desc: "দিনে ১৫ মিনিট — ঠিক আছে",
    color: "bd-green",
  },
  {
    days: 90,
    label: "৯০ দিন",
    tag: "🎯 রিল্যাক্সড",
    desc: "দিনে ১০ মিনিট — ধীরে শেখো",
    color: "jp-red",
  },
  {
    days: 180,
    label: "১৮০ দিন",
    tag: "🐢 ক্যাজুয়াল",
    desc: "দিনে ৫ মিনিট — কেবল শখে",
    color: "bd-green",
  },
];

export function OnboardingClient({ userName }: OnboardingClientProps) {
  const router = useRouter();
  const toast = useToast();
  const [selected, setSelected] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!selected) {
      toast.warning("একটা option বেছে নাও", "");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ durationDays: selected }),
      });

      if (!res.ok) {
        toast.error("সমস্যা", "আবার চেষ্টা করো");
        setLoading(false);
        return;
      }

      toast.success("প্ল্যান সেট!", "চলো শুরু করি");
      router.push("/dashboard");
      router.refresh();
    } catch {
      toast.error("সমস্যা", "আবার চেষ্টা করো");
      setLoading(false);
    }
  }

  const firstName = userName.split(" ")[0];

  return (
    <div className="py-12 min-h-screen bg-bg-alt">
      <Container>
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="text-5xl mb-4">🎯</div>
            <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3 font-bangla">
              স্বাগতম, {firstName}!
            </h1>
            <p className="text-text-secondary font-bangla">
              কত দিনে N5 শেষ করতে চাও? তোমার সময়সূচি বেছে নাও।
            </p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {OPTIONS.map((opt) => {
              const isSelected = selected === opt.days;
              const isRed = opt.color === "jp-red";

              return (
                <button
                  key={opt.days}
                  onClick={() => setSelected(opt.days)}
                  className={cn(
                    "text-left rounded-2xl border-2 p-6 transition-all duration-300 bg-white",
                    isSelected
                      ? isRed
                        ? "border-jp-red shadow-card scale-[1.02]"
                        : "border-bd-green shadow-card scale-[1.02]"
                      : "border-border hover:border-jp-red/40 hover:shadow-soft"
                  )}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span
                      className={cn(
                        "text-2xl font-bold font-bangla",
                        isRed ? "text-jp-red" : "text-bd-green"
                      )}
                    >
                      {opt.label}
                    </span>
                    <span className="text-2xl">
                      {isSelected ? "✅" : "⭕"}
                    </span>
                  </div>

                  <p className="text-sm font-medium text-text-primary mb-1 font-bangla">
                    {opt.tag}
                  </p>
                  <p className="text-xs text-text-secondary font-bangla">
                    {opt.desc}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Info */}
          {selected && (
            <div className="bg-jp-red/5 border border-jp-red/20 rounded-xl p-4 mb-6">
              <p className="text-sm text-text-primary font-bangla text-center">
                🎯 দিনে প্রায়{" "}
                <span className="font-bold text-jp-red">
                  {Math.ceil(307 / selected)}টি
                </span>{" "}
                item শেষ করলেই লক্ষ্যে পৌঁছে যাবে
              </p>
            </div>
          )}

          {/* Submit */}
          <Button
            variant="primary"
            size="lg"
            onClick={handleSubmit}
            isLoading={loading}
            disabled={!selected}
            className="w-full font-bangla"
          >
            শুরু করি →
          </Button>

          <p className="text-xs text-text-secondary text-center mt-4 font-bangla">
            পরে profile এ গিয়ে পরিবর্তন করতে পারবে
          </p>
        </div>
      </Container>
    </div>
  );
}
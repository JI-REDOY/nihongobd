"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/Button";
import { AuthInput } from "@/components/auth/AuthInput";
import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { GitHubIcon } from "@/components/icons/GitHubIcon";
import { useToast } from "@/context/ToastContext";

export function SignUpForm() {
  const router = useRouter();
  const toast = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password.length < 8) {
      toast.warning("পাসওয়ার্ড দুর্বল", "কমপক্ষে ৮ অক্ষরের পাসওয়ার্ড দাও");
      return;
    }

    setLoading(true);

    const { error } = await authClient.signUp.email({
      email,
      password,
      name,
    });

    if (error) {
      toast.error("সাইন আপ ব্যর্থ", error.message || "আবার চেষ্টা করুন");
      setLoading(false);
      return;
    }

    toast.success("সফল!", "তোমার অ্যাকাউন্ট তৈরি হয়েছে");
    router.push("/dashboard");
    router.refresh();
  }

  async function handleGoogle() {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  }

  async function handleGitHub() {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
    });
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={handleGoogle}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-border bg-white hover:bg-bg-alt transition-colors min-h-[44px]"
        >
          <GoogleIcon />
          <span className="text-sm font-medium">Google</span>
        </button>
        <button
          type="button"
          onClick={handleGitHub}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-border bg-white hover:bg-bg-alt transition-colors min-h-[44px]"
        >
          <GitHubIcon />
          <span className="text-sm font-medium">GitHub</span>
        </button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white px-3 text-text-secondary font-bangla">
            অথবা
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthInput
          label="তোমার নাম"
          name="name"
          type="text"
          placeholder="রহিম আহমেদ"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <AuthInput
          label="ইমেইল"
          name="email"
          type="email"
          placeholder="tumi@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <AuthInput
          label="পাসওয়ার্ড"
          name="password"
          type="password"
          placeholder="কমপক্ষে ৮ অক্ষর"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button
          type="submit"
          size="lg"
          isLoading={loading}
          className="w-full font-bangla"
        >
          অ্যাকাউন্ট খোলো
        </Button>
      </form>
    </div>
  );
}
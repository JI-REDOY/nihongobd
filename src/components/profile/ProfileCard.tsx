"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface ProfileCardProps {
  name: string;
  email: string;
  image?: string | null;
}

export function ProfileCard({ name, email, image }: ProfileCardProps) {
  const initial = (name || email || "U")[0].toUpperCase();

  return (
    <div className="relative overflow-hidden bg-white rounded-2xl border border-border shadow-soft">
      {/* Decorative banner with pattern */}
      <div className="relative h-32 bg-gradient-to-r from-jp-red via-jp-red/90 to-bd-green">
        {/* Japanese pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-8 text-6xl font-jp text-white">
            日
          </div>
          <div className="absolute bottom-2 right-32 text-4xl font-jp text-white">
            本
          </div>
          <div className="absolute top-8 left-1/3 text-5xl font-jp text-white">
            語
          </div>
        </div>
      </div>

      <div className="px-6 sm:px-8 pb-6 sm:pb-8">
        {/* Avatar overlapping banner */}
        <div className="-mt-14 flex justify-center sm:justify-start">
          <div className="relative">
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={image}
                alt={name}
                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-card"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-jp-red text-white flex items-center justify-center text-4xl font-bold border-4 border-white shadow-card">
                {initial}
              </div>
            )}
            {/* Online dot */}
            <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-success border-3 border-white" />
          </div>
        </div>

        {/* Info */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold text-text-primary font-bangla">
              {name}
            </h2>
            <p className="text-sm text-text-secondary mt-1 font-en">{email}</p>
          </div>

          <Link href="/profile/edit">
            <Button variant="outline" size="sm" className="font-bangla gap-1.5">
              <span>✏️</span>
              <span>এডিট করো</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
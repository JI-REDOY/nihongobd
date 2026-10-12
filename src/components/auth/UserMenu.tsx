"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/context/ToastContext";

export function UserMenu() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const toast = useToast();
  const [open, setOpen] = useState(false);

  async function handleSignOut() {
    await authClient.signOut();
    toast.success("বিদায়!", "আবার দেখা হবে");
    router.push("/");
    router.refresh();
  }


  if (isPending) {
    return <div className="w-9 h-9 rounded-full bg-bg-alt animate-pulse" />;
  }

  if (!session) {
    return (
      <Link
        href="/signin"
        className="hidden sm:inline-flex px-4 py-2 text-sm font-medium bg-jp-red text-white rounded-xl hover:bg-jp-red/90 transition-colors font-bangla"
      >
        শুরু করো
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full hover:bg-bg-alt p-1 transition-colors"
        aria-label="User menu"
      >
        {session.user.image ? (
          <img
            src={session.user.image}
            alt={session.user.name || "User"}
            className="w-9 h-9 rounded-full object-cover"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-jp-red text-white flex items-center justify-center font-bold">
            {(session.user.name || session.user.email || "U")[0].toUpperCase()}
          </div>
        )}
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl border border-border shadow-card z-50 py-2">
            <div className="px-4 py-2 border-b border-border">
              <p className="text-sm font-medium text-text-primary truncate">
                {session.user.name}
              </p>
              <p className="text-xs text-text-secondary truncate">
                {session.user.email}
              </p>
            </div>
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm hover:bg-bg-alt font-bangla"
            >
              ড্যাশবোর্ড
            </Link>
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm hover:bg-bg-alt font-bangla"
            >
              প্রোফাইল
            </Link>
            <button
              onClick={handleSignOut}
              className="w-full text-left px-4 py-2 text-sm text-error hover:bg-error/5 font-bangla"
            >
              সাইন আউট
            </button>
          </div>
        </>
      )}
    </div>
  );
}
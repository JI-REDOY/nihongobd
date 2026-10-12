"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastContextValue {
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
  warning: (title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((type: ToastType, title: string, message?: string) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, type, title, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const value: ToastContextValue = {
    success: (t, m) => addToast("success", t, m),
    error: (t, m) => addToast("error", t, m),
    info: (t, m) => addToast("info", t, m),
    warning: (t, m) => addToast("warning", t, m),
  };

  return (
    <ToastContext.Provider value={value}>
      {children}

      {/* Toast container */}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 max-w-sm">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

function ToastItem({ toast }: { toast: Toast }) {
  const styles: Record<ToastType, { bg: string; icon: string; border: string }> = {
    success: { bg: "bg-white", icon: "✅", border: "border-l-4 border-success" },
    error: { bg: "bg-white", icon: "❌", border: "border-l-4 border-error" },
    info: { bg: "bg-white", icon: "ℹ️", border: "border-l-4 border-jp-red" },
    warning: { bg: "bg-white", icon: "⚠️", border: "border-l-4 border-warning" },
  };

  const s = styles[toast.type];

  return (
    <div
      className={cn(
        "rounded-lg shadow-card p-4 flex items-start gap-3 animate-in slide-in-from-right",
        s.bg,
        s.border
      )}
    >
      <span className="text-lg shrink-0">{s.icon}</span>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-text-primary text-sm font-bangla">
          {toast.title}
        </p>
        {toast.message && (
          <p className="text-xs text-text-secondary mt-0.5 font-bangla">
            {toast.message}
          </p>
        )}
      </div>
    </div>
  );
}
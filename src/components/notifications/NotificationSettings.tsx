"use client";

import { useState } from "react";
import { useNotification } from "@/hooks/useNotification";
import { useToast } from "@/context/ToastContext";
import { cn } from "@/lib/utils";

export function NotificationSettings() {
    const toast = useToast();
    const { supported, permission, enabled, requestPermission, disable, enable } =
        useNotification();
    const [loading, setLoading] = useState(false);

    async function handleToggle() {
        if (!supported) {
            toast.error("Support নেই", "তোমার browser এ notification support নেই");
            return;
        }

        setLoading(true);

        if (enabled) {
            disable();
            toast.info("বন্ধ করা হলো", "আর reminder আসবে না");
        } else {
            const granted = await requestPermission();
            if (granted) {
                toast.success("চালু হলো!", "প্রতিদিন reminder পাবে");
            } else {
                toast.error("Permission দাওনি", "Browser settings থেকে চালু করো");
            }
        }

        setLoading(false);
    }

    if (!supported) {
        return (
            <div className="bg-white rounded-2xl border border-border p-5">
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">🔕</span>
                    <h3 className="font-bold text-text-primary font-bangla">
                        Notification
                    </h3>
                </div>
                <p className="text-sm text-text-secondary font-bangla">
                    তোমার browser এ notification support নেই
                </p>
            </div>
        );
    }

    const isDenied = permission === "denied";

    return (
        <div className="bg-white rounded-2xl border border-border p-5">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1">
                    <span className="text-2xl">{enabled ? "🔔" : "🔕"}</span>
                    <div className="flex-1">
                        <h3 className="font-bold text-text-primary font-bangla">
                            দৈনিক reminder
                        </h3>
                        <p className="text-xs text-text-secondary mt-0.5 font-bangla">
                            {enabled
                                ? "প্রতিদিন পড়ার জন্য reminder পাচ্ছো"
                                : isDenied
                                    ? "Browser settings থেকে permission দাও"
                                    : "প্রতিদিন পড়ার জন্য reminder পাও"}
                        </p>
                    </div>
                </div>

                <button
                    onClick={handleToggle}
                    disabled={loading || isDenied}
                    className={cn(
                        "relative w-14 h-8 rounded-full transition-colors shrink-0 overflow-hidden",
                        (loading || isDenied) && "opacity-50 cursor-not-allowed"
                    )}
                    style={{
                        backgroundColor: enabled ? "#006A4E" : "#BC002D",
                    }}
                    aria-label="Toggle notifications"
                >
                    <span
                        className="absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-md transition-transform"
                        style={{
                            transform: enabled ? "translateX(24px)" : "translateX(0)",
                        }}
                    />
                </button>
            </div>
        </div>
    );
}
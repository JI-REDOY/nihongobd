"use client";

import { useEffect } from "react";
import {
  showNotification,
  shouldShowDailyReminder,
  markNotified,
} from "@/hooks/useNotification";

const MESSAGES = [
  {
    title: "🎌 NihongoBD — পড়ার সময়!",
    body: "আজকে তোমার জাপানিজ শেখার টার্গেট পূরণ করো",
  },
  {
    title: "🔥 স্ট্রিক ধরে রাখো!",
    body: "প্রতিদিন ৫ মিনিট হলেও পড়াশোনা করো",
  },
  {
    title: "📚 নতুন শব্দ শেখো",
    body: "আজ ১০টি নতুন ভোকাবুলারি শিখে ফেলো",
  },
  {
    title: "🎯 N5 লক্ষ্যের দিকে এগিয়ে যাও",
    body: "আজ একটু হলেও এগিয়ে যাও",
  },
  {
    title: "⛩️ শুভ সকাল!",
    body: "আজকের পড়া শুরু করার সুন্দর সময়",
  },
];

export function NotificationManager() {
  useEffect(() => {
    // Check দৈনিক reminder প্রযোজ্য কিনা
    if (!shouldShowDailyReminder()) return;

    // Random message pick করো
    const msg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];

    // ৫ সেকেন্ড পর notification দেখাও
    const timer = setTimeout(() => {
      showNotification(msg.title, {
        body: msg.body,
        tag: "daily-reminder",
        requireInteraction: false,
      });
      markNotified();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
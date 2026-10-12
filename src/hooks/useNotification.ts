"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "nihongobd_notification_enabled";
const LAST_NOTIFIED_KEY = "nihongobd_last_notified";

export function useNotification() {
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [enabled, setEnabled] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("Notification" in window)) {
      setSupported(false);
      return;
    }

    setPermission(Notification.permission);
    const stored = localStorage.getItem(STORAGE_KEY) === "true";
    setEnabled(stored && Notification.permission === "granted");
  }, []);

  async function requestPermission(): Promise<boolean> {
    if (!supported) return false;

    try {
      const result = await Notification.requestPermission();
      setPermission(result);

      if (result === "granted") {
        localStorage.setItem(STORAGE_KEY, "true");
        setEnabled(true);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  function disable() {
    localStorage.setItem(STORAGE_KEY, "false");
    setEnabled(false);
  }

  function enable() {
    localStorage.setItem(STORAGE_KEY, "true");
    setEnabled(true);
  }

  return {
    supported,
    permission,
    enabled,
    requestPermission,
    disable,
    enable,
  };
}

// ===== Show a notification =====
export function showNotification(title: string, options?: NotificationOptions) {
  if (typeof window === "undefined") return;
  if (!("Notification" in window)) return;
  if (Notification.permission !== "granted") return;

  try {
    new Notification(title, {
      icon: "/icons/icon-192.png",
      badge: "/icons/icon-192.png",
      ...options,
    });
  } catch (e) {
    console.error("Notification error:", e);
  }
}

// ===== Check if should show daily reminder =====
export function shouldShowDailyReminder(): boolean {
  if (typeof window === "undefined") return false;
  if (!("Notification" in window)) return false;
  if (Notification.permission !== "granted") return false;
  if (localStorage.getItem(STORAGE_KEY) !== "true") return false;

  const lastNotified = localStorage.getItem(LAST_NOTIFIED_KEY);
  if (!lastNotified) return true;

  const last = new Date(lastNotified);
  const now = new Date();
  const hoursSince = (now.getTime() - last.getTime()) / (1000 * 60 * 60);

  return hoursSince >= 20; // প্রতি ২০ ঘণ্টা পর
}

export function markNotified() {
  if (typeof window === "undefined") return;
  localStorage.setItem(LAST_NOTIFIED_KEY, new Date().toISOString());
}
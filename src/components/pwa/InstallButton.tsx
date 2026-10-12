"use client";

import { Button } from "@/components/ui/Button";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import { useEffect, useState } from "react";

export function InstallButton() {
  const { isInstallable, isInstalled, install } = usePWAInstall();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!isInstallable || isInstalled) return;

    const visited = Number(localStorage.getItem("pwa_pages_visited") || "0");
    localStorage.setItem("pwa_pages_visited", String(visited + 1));

    // ২ পেজ visit হলে সাথে সাথে দেখাও
    if (visited + 1 >= 2) {
      setShow(true);
      return;
    }

    // নাহলে ৩০ সেকেন্ড পরে
    const timer = setTimeout(() => setShow(true), 30000);
    return () => clearTimeout(timer);
  }, [isInstallable, isInstalled]);

  if (!show || isInstalled || !isInstallable) return null;

  return (
    <Button variant="outline" size="sm" onClick={install} className="gap-2">
      <span>📲</span>
      <span className="hidden sm:inline font-bangla">ইনস্টল করো</span>
    </Button>
  );
}
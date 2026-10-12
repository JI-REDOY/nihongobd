import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_JP, Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import { ServiceWorkerRegister } from "@/components/shared/ServiceWorkerRegister";
import { ToastProvider } from "@/context/ToastContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-jp",
  display: "swap",
  weight: ["400", "500", "700"],
});

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["bengali"],
  variable: "--font-noto-bn",
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "NihongoBD — জাপানিজ শেখা সহজ হয়েছে",
  description:
    "বাংলাদেশি শিক্ষার্থীদের জন্য জাপানিজ ভাষা শেখার প্ল্যাটফর্ম। Hiragana, Katakana, N5 Vocabulary, Grammar ও Quiz — সম্পূর্ণ বাংলায়।",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "NihongoBD",
  },
};

export const viewport: Viewport = {
  themeColor: "#BC002D",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      className={`${inter.variable} ${notoSansJP.variable} ${notoSerifBengali.variable}`}
    >
      <body className="font-sans antialiased bg-white text-text-primary">
        <ToastProvider>
          <ServiceWorkerRegister />
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
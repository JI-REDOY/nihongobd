# 🎌 NihongoBD — জাপানিজ শেখা সহজ

বাংলাদেশি শিক্ষার্থীদের জন্য জাপানিজ ভাষা শেখার সম্পূর্ণ প্ল্যাটফর্ম। **শূন্য থেকে N5** পর্যন্ত — সম্পূর্ণ বাংলায়।

🌐 **Live:** [https://nihongobd.vercel.app](https://nihongobd.vercel.app)

---

## ✨ Features

### 📚 Core Learning
- **হিরাগানা** (৪৬টি অক্ষর) — Grid view + Modal + Audio + Progress
- **কাতাকানা** (৪৬টি অক্ষর) — Same structure
- **N5 Vocabulary** (২০০টি শব্দ) — Flashcard + List + Filter
- **N5 Grammar** (১৫টি lesson) — Pattern + Explanation + Examples

### 🎯 Practice
- **Quiz System** — Vocab / Hiragana / Katakana (10 questions, 4 options)
- **Progress Tracking** — Real-time save to MongoDB
- **Streak System** — Daily learning streak

### 👤 User
- Email / Google / GitHub authentication
- Profile with image upload (GridFS)
- Progress dashboard

### 📱 PWA
- Installable on mobile + desktop
- Offline support
- Standalone mode
- Home screen icon

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Auth | BetterAuth (Email + Google + GitHub) |
| Database | MongoDB Atlas + GridFS |
| Audio | Web Speech API (ja-JP) |
| PWA | Service Worker + Manifest |
| Deploy | Vercel |

---

---

## 📊 Current Status (Phase 1 Complete)

### ✅ Completed Features
- Landing page + Trial preview
- Sign up / Sign in (Email + Google + GitHub)
- Onboarding (duration select — 30/60/90/180 days)
- হিরাগানা (46) — grid + modal + audio + progress
- কাতাকানা (46) — same structure
- N5 Vocabulary (200) — flashcard + list + filter
- N5 Grammar (15) — list + detail + mark complete
- N5 Kanji (100) — grid + category filter + modal + readings
- Quiz — 5 types (vocab, hiragana, katakana, listening, reading)
- Speaking Practice (Web Speech API pronunciation check)
- Dashboard — hero + progress tiles + streak + course countdown
- Profile + Edit + Image upload (GridFS)
- Certificate system (80% eligibility + print)
- Toast notifications + Loading + 404
- PWA (installable + offline + custom install button)
- MongoDB Atlas + GridFS image storage
- Vercel deployed: https://nihongobd.vercel.app

### 🚧 Next Phase Options
- N5 polish (search, quiz history, dark mode, password reset)
- N4 content (kanji + vocab + grammar + mock test)
- Marketing + analytics
- Payment (Stripe) + AI assistant

### 🛠️ Tech Stack
Next.js 16 · TypeScript · Tailwind CSS v4 · BetterAuth · 
MongoDB Atlas · GridFS · Web Speech API · PWA · Vercel

### 📁 Key Files
- `src/lib/` — auth, mongodb, gridfs, progress, n5Vocab, n5Grammar, n5Kanji, kanaData, certificate, onboarding, quizGenerator, advancedQuiz
- `src/app/(main)/` — protected routes (hiragana, katakana, n5/*, dashboard, profile, certificate, onboarding)
- `src/components/` — layout, ui, kana, vocab, grammar, kanji, quiz, profile, dashboard, auth, pwa, onboarding, certificate, speaking
- `src/hooks/` — useProgress, usePWAInstall, useServiceWorker

---

## 📝 Last Session Summary

**Date:** 2026-10-12  
**Completed:** Full N5 MVP with Kanji page + Onboarding + Certificate  
**Deployed:** https://nihongobd.vercel.app  
**Status:** Phase 1 Complete, ready for user feedback

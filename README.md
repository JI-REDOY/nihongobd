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

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- MongoDB Atlas account
- Google + GitHub OAuth credentials

### Installation

```bash
# Clone
git clone https://github.com/YOUR_USERNAME/nihongobd.git
cd nihongobd

# Install
npm install

# Environment
cp .env.example .env.local
# Fill in all variables

# Dev server
npm run dev

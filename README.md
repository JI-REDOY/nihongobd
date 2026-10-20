# 🇯🇵 NihongoBD — বাংলায় জাপানিজ শেখার প্ল্যাটফর্ম

> বাংলাদেশি শিক্ষার্থীদের জন্য সম্পূর্ণ বাংলায় জাপানিজ ভাষা শেখার ফ্রি প্ল্যাটফর্ম। শূন্য থেকে N5 এবং N4 পর্যন্ত — সবকিছু এক জায়গায়।

🌐 **Live Demo:** [https://nihongobd.vercel.app](https://nihongobd.vercel.app)
📦 **GitHub:** [https://github.com/JI-REDOY/nihongobd](https://github.com/JI-REDOY/nihongobd)

---

## ✨ Features

### 📚 Complete N5 + N4 Content
- **হিরাগানা** (৪৬টি অক্ষর) + **কাতাকানা** (৪৬টি অক্ষর)
- **১৮০০+ Vocabulary** (N5: ৮০০, N4: ১০০০)
- **১৩০ Grammar Lessons** (N5: ৫০, N4: ৮০)
- **৪০০+ Kanji** (N5: ১০০, N4: ৩০০)
- **Reading Passages** (২০+)

### 🥷 Ninja Technique (Premium Method)
- **Radical-based Kanji Learning** — এক radical শিখলে ১৫+ kanji একসাথে
- Mnemonic stories বাংলায়
- Visual component breakdown
- ৮টা radical → ১১৫+ kanji family

### 🎯 Practice Features
- **Quiz System** — ৫ type: Vocab, Hiragana, Katakana, Listening, Reading
- **Speaking Practice** — Web Speech API দিয়ে pronunciation check
- **Real-time Progress Tracking** — MongoDB এ save

### 🎓 Certificate System
- **QR-Verified Certificate** — scan করলে online valid/invalid দেখাবে
- **Founder Signature** সহ premium design
- N5 + N4 both levels
- Print/PDF download ready

### 🏆 Gamification
- **Badges System** — ২৬টা achievement
- **Streak Tracking** — daily learning streak
- **Course Duration** — ৩০/৬০/৯০/১৮০ দিনের প্ল্যান

### 📱 PWA
- **Installable** — মোবাইল + desktop home screen এ
- **Offline Support** — Service Worker
- **Standalone Mode** — native app feel
- Custom install button

### 🔍 Global Search
- **Cmd/Ctrl + K** shortcut
- Vocab + Grammar + Kanji একসাথে search
- Level-specific filter

### 👤 User System
- **Auth:** Email/Password + Google + GitHub (BetterAuth)
- **Profile:** নাম + ছবি update (GridFS)
- **Multi-level Dashboard** — N5/N4 switch

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 |
| **Auth** | BetterAuth (Email + Google + GitHub) |
| **Database** | MongoDB Atlas |
| **File Storage** | GridFS (images) |
| **Audio** | Web Speech API (ja-JP) |
| **QR Code** | qrcode npm package |
| **PWA** | Service Worker + Manifest |
| **Deploy** | Vercel |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- MongoDB Atlas account
- Google OAuth credentials
- GitHub OAuth credentials

### Installation

```bash
# Clone repository
git clone https://github.com/JI-REDOY/nihongobd.git
cd nihongobd

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local

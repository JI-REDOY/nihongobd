export function speakJapanese(text: string) {
  if (typeof window === "undefined") return;
  if (!("speechSynthesis" in window)) {
    console.warn("Speech synthesis not supported");
    return;
  }

  // আগের speech বাতিল করো
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ja-JP";
  utterance.rate = 0.8;
  utterance.pitch = 1;

  // জাপানিজ voice খোঁজো
  const voices = window.speechSynthesis.getVoices();
  const jpVoice = voices.find((v) => v.lang.startsWith("ja"));
  if (jpVoice) utterance.voice = jpVoice;

  window.speechSynthesis.speak(utterance);
}
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { SearchResult } from "@/app/api/search/route";

const TYPE_LABELS: Record<string, string> = {
  vocab: "ভোকাব",
  grammar: "গ্রামার",
  kanji: "কাঞ্জি",
};

const TYPE_COLORS: Record<string, string> = {
  vocab: "bg-jp-red/10 text-jp-red",
  grammar: "bg-bd-green/10 text-bd-green",
  kanji: "bg-warning/10 text-warning",
};

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut: Cmd/Ctrl + K
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Auto focus + reset
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
      setResults([]);
      setLoading(false);
    }
  }, [open]);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.results || []);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <>
      {/* Search trigger button (desktop) */}
      <button
        onClick={() => setOpen(true)}
        className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-bg-alt hover:border-jp-red/40 transition-colors text-sm text-text-secondary w-full max-w-xs"
        aria-label="Search"
      >
        <span>🔍</span>
        <span className="font-bangla">খোঁজো...</span>
        <kbd className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-white border border-border font-en">
          ⌘K
        </kbd>
      </button>

      {/* Mobile icon */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden w-11 h-11 flex items-center justify-center rounded-lg hover:bg-bg-alt"
        aria-label="Search"
      >
        <span className="text-xl">🔍</span>
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-20 p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-card w-full max-w-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
              <span className="text-lg">🔍</span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Vocabulary, grammar, kanji খোঁজো..."
                className="flex-1 bg-transparent text-base outline-none placeholder:text-text-secondary/60 font-bangla"
              />
              {loading && (
                <span className="w-4 h-4 border-2 border-jp-red/30 border-t-jp-red rounded-full animate-spin" />
              )}
              <button
                onClick={() => setOpen(false)}
                className="text-xs px-2 py-1 rounded border border-border text-text-secondary hover:bg-bg-alt font-en"
              >
                ESC
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto">
              {!query.trim() ? (
                <div className="p-8 text-center">
                  <p className="text-5xl mb-3">🔍</p>
                  <p className="text-sm text-text-secondary font-bangla">
                    কী খুঁজছো লেখা শুরু করো
                  </p>
                  <p className="text-xs text-text-secondary/60 mt-2 font-bangla">
                    Vocabulary, Grammar lesson বা Kanji
                  </p>
                </div>
              ) : results.length === 0 && !loading ? (
                <div className="p-8 text-center">
                  <p className="text-5xl mb-3">📭</p>
                  <p className="text-sm text-text-secondary font-bangla">
                    &quot;{query}&quot; এর জন্য কিছু পাওয়া যায়নি
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {results.map((result) => (
                    <Link
                      key={`${result.type}-${result.level}-${result.id}`}
                      href={result.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-bg-alt transition-colors"
                    >
                      <div
                        className={cn(
                          "w-10 h-10 rounded-lg flex items-center justify-center text-lg font-jp font-bold shrink-0",
                          TYPE_COLORS[result.type]
                        )}
                      >
                        {result.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-jp font-medium text-text-primary truncate">
                            {result.title}
                          </p>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-bg-alt text-text-secondary font-en uppercase">
                            {result.level}
                          </span>
                        </div>
                        <p className="text-xs text-text-secondary truncate mt-0.5 font-bangla">
                          {result.subtitle}
                        </p>
                      </div>
                      <span className="text-[10px] px-2 py-1 rounded-full bg-bg-alt text-text-secondary font-bangla shrink-0">
                        {TYPE_LABELS[result.type]}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {query.trim() && results.length > 0 && (
              <div className="px-4 py-2 border-t border-border bg-bg-alt text-xs text-text-secondary flex items-center justify-between font-bangla">
                <span>{results.length}টি ফলাফল</span>
                <span className="font-en">
                  <kbd className="px-1 rounded border border-border bg-white">
                    ESC
                  </kbd>{" "}
                  close
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
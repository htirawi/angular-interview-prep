import { useEffect, useMemo, useRef, useState } from "react";
import type { QA } from "../data/questions";

type Props = {
  item: QA;
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
  isBookmarked?: boolean;
  isCompleted?: boolean;
  onToggleBookmark?: () => void;
};

const difficultyColors: Record<string, string> = {
  intermediate: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  advanced: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  expert: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};

export default function QuestionCard({
  item,
  index,
  total,
  onPrev,
  onNext,
  canPrev,
  canNext,
  isBookmarked = false,
  isCompleted = false,
  onToggleBookmark,
}: Props) {
  const [showAnswer, setShowAnswer] = useState(true);
  const percent = useMemo(() => Math.round(((index + 1) / total) * 100), [index, total]);
  const answerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && canNext) onNext();
      if (e.key === "ArrowLeft" && canPrev) onPrev();
      if (e.key.toLowerCase() === "a") setShowAnswer((s) => !s);
      if (e.key.toLowerCase() === "b" && onToggleBookmark) onToggleBookmark();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onNext, onPrev, canNext, canPrev, onToggleBookmark]);

  useEffect(() => {
    setShowAnswer(true);
    answerRef.current?.scrollTo({ top: 0 });
  }, [item.id]);

  return (
    <article
      className="relative mx-auto w-full max-w-4xl transform rounded-2xl bg-white p-6 shadow-xl ring-1 ring-gray-200 transition-all hover:shadow-2xl dark:bg-gray-800 dark:ring-gray-700 md:p-10"
      aria-labelledby={`q-${item.id}`}
    >
      {/* Completed Badge */}
      {isCompleted && (
        <div className="absolute right-4 top-4 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800 dark:bg-green-900/30 dark:text-green-400">
          ✓ Completed
        </div>
      )}

      <header className="mb-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="mb-1 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Angular Senior Interview
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Essential questions for your next role
            </p>
          </div>

          <ThemeToggle />
        </div>

        {/* Metadata Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
            {item.category}
          </span>
          <span className={`rounded-full px-3 py-1 text-xs font-medium ${difficultyColors[item.difficulty || "intermediate"]}`}>
            {item.difficulty || "intermediate"}
          </span>
          {item.tags?.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300"
            >
              #{tag}
            </span>
          ))}
        </div>
      </header>

      <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-700">
        <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Question <span className="tabular-nums text-blue-600 dark:text-blue-400">{index + 1}</span> /{" "}
          <span className="tabular-nums">{total}</span>
          <span className="ml-3 text-gray-500">·</span>
          <span className="ml-3 tabular-nums text-purple-600 dark:text-purple-400">{percent}%</span>
        </div>

        <div className="flex items-center gap-2">
          {onToggleBookmark && (
            <button
              onClick={onToggleBookmark}
              className="rounded-lg border border-gray-300 p-2 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
              aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
              title="Press 'B' to bookmark"
            >
              <span className="text-xl">{isBookmarked ? "⭐" : "☆"}</span>
            </button>
          )}
          <label className="inline-flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
              checked={showAnswer}
              onChange={() => setShowAnswer((s) => !s)}
              aria-controls={`answer-${item.id}`}
              aria-expanded={showAnswer}
            />
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {showAnswer ? "Hide" : "Show"} answer
            </span>
          </label>
        </div>
      </div>

      <section className="mb-8">
        <h2
          id={`q-${item.id}`}
          className="mb-4 text-xl font-bold leading-tight text-gray-900 dark:text-white"
        >
          {item.question}
        </h2>
        <div
          id={`answer-${item.id}`}
          ref={answerRef}
          className={`prose prose-gray max-w-none whitespace-pre-wrap leading-relaxed dark:prose-invert ${
            showAnswer ? "block" : "hidden"
          }`}
        >
          {item.answer}
        </div>
      </section>

      <footer className="flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-700">
        <button
          onClick={onPrev}
          disabled={!canPrev}
          aria-label="Previous question"
          className="flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <button
          onClick={onNext}
          disabled={!canNext}
          aria-label="Next question"
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-2.5 text-sm font-bold text-white transition-all hover:from-blue-700 hover:to-blue-800 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </footer>

      <kbd className="mt-6 block text-center text-xs text-gray-500 dark:text-gray-400">
        Tips: ← → to navigate · A to toggle answer · B to bookmark
      </kbd>
    </article>
  );
}

function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = isDark ? "dark" : "light";
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setIsDark((d) => !d)}
      className="rounded-xl border border-gray-300 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
    >
      {isDark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}


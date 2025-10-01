import { useEffect, useMemo, useRef, useState } from "react";
import type { QA } from "../data/questions";
import QuestionNotes from "../features/notes/components/QuestionNotes";
import StudyTimer from "../features/study/components/StudyTimer";

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
  note?: string;
  onSaveNote?: (note: string) => void;
};

const difficultyColors: Record<string, string> = {
  intermediate: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  advanced: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  expert: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400",
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
  note,
  onSaveNote,
}: Props) {
  const [showAnswer, setShowAnswer] = useState(false);  // Hidden by default!
  const percent = useMemo(() => Math.round(((index + 1) / total) * 100), [index, total]);
  const answerRef = useRef<HTMLDivElement | null>(null);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Prevent shortcuts when typing in input/textarea
      if ((e.target as HTMLElement).tagName === "INPUT" || (e.target as HTMLElement).tagName === "TEXTAREA") {
        return;
      }

      if (e.key === "ArrowRight" && canNext) onNext();
      if (e.key === "ArrowLeft" && canPrev) onPrev();
      if (e.key.toLowerCase() === "a") {
        e.preventDefault();
        setShowAnswer((s) => !s);
      }
      if (e.key.toLowerCase() === "b" && onToggleBookmark) {
        e.preventDefault();
        onToggleBookmark();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onNext, onPrev, canNext, canPrev, onToggleBookmark]);

  // Reset to hidden when question changes
  useEffect(() => {
    setShowAnswer(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [item.id]);

  return (
    <article className="animate-fade-in">
      {/* Header Bar - Minimal */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Question {index + 1} / {total}
          </span>
          <span className="text-sm text-gray-400 dark:text-gray-600">•</span>
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
            {percent}%
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <ThemeToggle />
          
          {/* Bookmark */}
          {onToggleBookmark && (
            <button
              onClick={onToggleBookmark}
              className="rounded-lg p-2 transition-all hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label={isBookmarked ? "Remove bookmark (B)" : "Bookmark question (B)"}
              title="Press 'B'"
            >
              <span className="text-2xl transition-transform hover:scale-110">
                {isBookmarked ? "⭐" : "☆"}
              </span>
            </button>
          )}

          {/* Completed Badge */}
          {isCompleted && (
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
              ✓ Done
            </span>
          )}
        </div>
      </div>

      {/* Main Question Card */}
      <div className="group rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-md dark:bg-gray-800 dark:ring-gray-700">
        {/* Question Section - Prominent */}
        <div className="border-b border-gray-100 p-8 dark:border-gray-700">
          {/* Metadata Tags */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="rounded-lg bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
              {item.category || "General"}
            </span>
            <span
              className={`rounded-lg px-3 py-1 text-xs font-semibold ${
                difficultyColors[item.difficulty || "intermediate"]
              }`}
            >
              {item.difficulty || "intermediate"}
            </span>
            {item.tags?.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Question - Large, Clear, Focused */}
          <h2
            className="text-2xl font-bold leading-tight text-gray-900 dark:text-white md:text-3xl"
            id={`question-${item.id}`}
          >
            {item.question}
          </h2>
        </div>

        {/* Answer Section - Clearly Separated */}
        <div className="p-8">
          {/* Show/Hide Answer Button */}
          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className={`mb-6 w-full rounded-xl px-6 py-4 text-sm font-semibold transition-all ${
              showAnswer
                ? "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                : "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md hover:shadow-lg"
            }`}
            aria-controls={`answer-${item.id}`}
            aria-expanded={showAnswer}
          >
            {showAnswer ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
                Hide Answer
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Show Answer
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            )}
          </button>

          {/* Answer Content - Hidden by Default */}
          {showAnswer && (
            <div
              id={`answer-${item.id}`}
              ref={answerRef}
              className="animate-slide-in-down rounded-xl bg-gradient-to-br from-blue-50/50 to-purple-50/50 p-6 dark:from-blue-950/20 dark:to-purple-950/20"
            >
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Answer
              </div>
              <div className="prose prose-gray max-w-none whitespace-pre-wrap leading-relaxed dark:prose-invert">
                {item.answer}
              </div>
            </div>
          )}

          {/* Personal Notes */}
          {showAnswer && onSaveNote && (
            <div className="mt-6">
              <QuestionNotes
                questionId={item.id}
                initialNote={note}
                onSave={onSaveNote}
              />
            </div>
          )}
        </div>

        {/* Navigation Footer */}
        <div className="border-t border-gray-100 p-6 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <button
              onClick={onPrev}
              disabled={!canPrev}
              aria-label="Previous question (←)"
              className="flex items-center gap-2 rounded-xl border-2 border-gray-200 px-6 py-3 font-semibold text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:bg-gray-800"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Previous
            </button>

            <button
              onClick={onNext}
              disabled={!canNext}
              aria-label="Next question (→)"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-md transition-all hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Keyboard Hints */}
          <div className="mt-4 text-center text-xs text-gray-500 dark:text-gray-600">
            ← → Navigate • A Show/Hide • B Bookmark
          </div>
        </div>
      </div>

      {/* Study Timer - Below Card */}
      <div className="mt-6 flex justify-center">
        <StudyTimer />
      </div>
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
      className="rounded-lg p-2 text-xl transition-all hover:bg-gray-100 dark:hover:bg-gray-800"
      title="Toggle dark mode"
    >
      {isDark ? "🌙" : "☀️"}
    </button>
  );
}


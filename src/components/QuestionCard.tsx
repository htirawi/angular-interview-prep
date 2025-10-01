import { useEffect, useMemo, useRef, useState } from "react";
import type { QA } from "../data/questions";
import QuestionNotes from "../features/notes/components/QuestionNotes";
import StudyTimer from "../features/study/components/StudyTimer";
import type { JSX } from "react";

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

// Enhanced markdown renderer for technical content
function MarkdownRenderer({ content }: { content: string }) {
  const [copiedBlocks, setCopiedBlocks] = useState<Set<number>>(new Set());

  // Parse markdown-like content and render appropriately
  const renderContent = (text: string) => {
    const lines = text.split("\n");
    const elements: JSX.Element[] = [];
    let codeBlockIndex = 0;
    let inCodeBlock = false;
    let currentCodeBlock: string[] = [];
    let codeLanguage = "";

    const flushCodeBlock = () => {
      if (currentCodeBlock.length > 0) {
        const code = currentCodeBlock.join("\n");
        const blockIndex = codeBlockIndex++;

        elements.push(
          <div key={`code-${blockIndex}`} className="group relative">
            <div className="flex items-center justify-between rounded-t-lg bg-gray-800 px-4 py-2">
              <span className="text-xs font-medium uppercase tracking-wider text-gray-300">
                {codeLanguage || "code"}
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(code);
                  setCopiedBlocks((prev) => new Set(prev).add(blockIndex));
                  setTimeout(() => {
                    setCopiedBlocks((prev) => {
                      const newSet = new Set(prev);
                      newSet.delete(blockIndex);
                      return newSet;
                    });
                  }, 2000);
                }}
                className="rounded bg-gray-700 px-2 py-1 text-xs text-gray-300 opacity-0 transition-opacity hover:bg-gray-600 group-hover:opacity-100"
              >
                {copiedBlocks.has(blockIndex) ? "✓ Copied!" : "Copy"}
              </button>
            </div>
            <pre className="overflow-x-auto rounded-b-lg bg-gray-900 p-4 text-sm leading-relaxed text-gray-100">
              <code>{code}</code>
            </pre>
          </div>
        );
        currentCodeBlock = [];
        codeLanguage = "";
      }
    };

    lines.forEach((line, index) => {
      // Handle code block start
      if (line.startsWith("```")) {
        if (inCodeBlock) {
          flushCodeBlock();
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
          codeLanguage = line.slice(3).trim();
        }
        return;
      }

      if (inCodeBlock) {
        currentCodeBlock.push(line);
        return;
      }

      // Handle regular content
      flushCodeBlock();

      // Handle bold text (**text**)
      if (line.includes("**")) {
        const parts = line.split("**");
        const processedLine = parts.map((part, i) => {
          if (i % 2 === 1) {
            return (
              <strong key={i} className="font-semibold text-gray-900 dark:text-white">
                {part}
              </strong>
            );
          }
          return part;
        });
        elements.push(
          <p key={index} className="mb-3 leading-relaxed text-gray-700 dark:text-gray-300">
            {processedLine}
          </p>
        );
        return;
      }

      // Handle table rows (| separated)
      if (line.includes("|") && line.trim().length > 0) {
        const cells = line
          .split("|")
          .map((cell) => cell.trim())
          .filter((cell) => cell);
        if (cells.length > 1) {
          elements.push(
            <div key={index} className="mb-2 flex gap-4 text-sm">
              {cells.map((cell, cellIndex) => (
                <div
                  key={cellIndex}
                  className={`flex-1 p-2 ${cellIndex === 0 ? "rounded bg-gray-100 font-medium dark:bg-gray-800" : ""}`}
                >
                  {cell}
                </div>
              ))}
            </div>
          );
          return;
        }
      }

      // Handle empty lines
      if (line.trim() === "") {
        elements.push(<div key={index} className="mb-2" />);
        return;
      }

      // Regular paragraph
      elements.push(
        <p key={index} className="mb-3 leading-relaxed text-gray-700 dark:text-gray-300">
          {line}
        </p>
      );
    });

    flushCodeBlock();
    return elements;
  };

  return <div className="space-y-2">{renderContent(content)}</div>;
}

export default function QuestionCardEnhanced({
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
  const [showAnswer, setShowAnswer] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const percent = useMemo(() => Math.round(((index + 1) / total) * 100), [index, total]);
  const answerRef = useRef<HTMLDivElement | null>(null);

  // Check if answer is long (more than 2000 characters)
  const isLongAnswer = item.answer.length > 2000;

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Prevent shortcuts when typing in input/textarea
      if (
        (e.target as HTMLElement).tagName === "INPUT" ||
        (e.target as HTMLElement).tagName === "TEXTAREA"
      ) {
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
    setIsExpanded(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [item.id]);

  return (
    <article className="animate-fade-in">
      {/* Header Bar - Enhanced */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Question {index + 1} / {total}
          </span>
          <span className="text-sm text-gray-400 dark:text-gray-600">•</span>
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{percent}%</span>
          {isLongAnswer && (
            <>
              <span className="text-sm text-gray-400 dark:text-gray-600">•</span>
              <span className="rounded-full bg-orange-100 px-2 py-1 text-xs text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">
                Detailed Answer
              </span>
            </>
          )}
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
        {/* Question Section - Enhanced */}
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

        {/* Answer Section - Enhanced */}
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

          {/* Answer Content - Enhanced with Markdown */}
          {showAnswer && (
            <div
              id={`answer-${item.id}`}
              ref={answerRef}
              className="animate-slide-in-down rounded-xl bg-gradient-to-br from-blue-50/50 to-purple-50/50 p-6 dark:from-blue-950/20 dark:to-purple-950/20"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Comprehensive Answer
                </div>
                {isLongAnswer && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    {isExpanded ? "Show Less" : "Show Full Answer"}
                  </button>
                )}
              </div>

              <div className="max-h-96 overflow-y-auto">
                <MarkdownRenderer content={item.answer} />
              </div>

              {isLongAnswer && !isExpanded && (
                <div className="mt-4 text-center">
                  <button
                    onClick={() => setIsExpanded(true)}
                    className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Show full answer ({Math.round(item.answer.length / 1000)}k characters)
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Personal Notes */}
          {showAnswer && onSaveNote && (
            <div className="mt-6">
              <QuestionNotes
                questionId={item.id}
                initialNote={note}
                onSave={(_, note) => onSaveNote(note)}
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

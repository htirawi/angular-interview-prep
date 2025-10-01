import { useCallback, useEffect, useMemo, useState } from "react";
import QuestionCard from "./components/QuestionCard";
import SearchBar from "./components/SearchBar";
import StatsPanel from "./components/StatsPanel";
import FilterPanel from "./components/FilterPanel";
import { QUESTIONS, type QA } from "./data/questions";
import { enrichQuestions } from "./utils/questionMetadata";
import { useLocalStorage } from "./hooks/useLocalStorage";

const KEY_INDEX = "mockInterview.index";
const KEY_COMPLETED = "mockInterview.completed";
const KEY_BOOKMARKS = "mockInterview.bookmarks";
const KEY_MODE = "mockInterview.mode";

type Mode = "sequential" | "random" | "bookmarked";

export default function App() {
  const enrichedQuestions = useMemo(() => enrichQuestions(QUESTIONS), []);
  const [index, setIndex] = useLocalStorage<number>(KEY_INDEX, 0);
  const [completed, setCompleted] = useLocalStorage<Set<number>>(KEY_COMPLETED, new Set());
  const [bookmarks, setBookmarks] = useLocalStorage<Set<number>>(KEY_BOOKMARKS, new Set());
  const [mode, setMode] = useLocalStorage<Mode>(KEY_MODE, "sequential");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [randomOrder, setRandomOrder] = useState<number[]>([]);

  // Initialize random order
  useEffect(() => {
    if (randomOrder.length === 0) {
      const indices = Array.from({ length: enrichedQuestions.length }, (_, i) => i);
      setRandomOrder(indices.sort(() => Math.random() - 0.5));
    }
  }, [enrichedQuestions.length, randomOrder.length]);

  // Filter questions
  const filteredQuestions = useMemo(() => {
    let filtered = enrichedQuestions;

    if (mode === "bookmarked") {
      filtered = filtered.filter((q) => bookmarks.has(q.id));
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (q) =>
          q.question.toLowerCase().includes(query) ||
          q.answer.toLowerCase().includes(query) ||
          q.category.toLowerCase().includes(query) ||
          q.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((q) => q.category === selectedCategory);
    }

    if (selectedDifficulty) {
      filtered = filtered.filter((q) => q.difficulty === selectedDifficulty);
    }

    return filtered;
  }, [enrichedQuestions, mode, bookmarks, searchQuery, selectedCategory, selectedDifficulty]);

  // Current question logic
  const currentQuestionList = useMemo(() => {
    if (mode === "random" && randomOrder.length > 0) {
      return randomOrder.map((i) => filteredQuestions[i]).filter(Boolean);
    }
    return filteredQuestions;
  }, [mode, randomOrder, filteredQuestions]);

  const total = currentQuestionList.length;
  const safeIndex = Math.min(Math.max(0, index), total - 1);
  const item: QA | undefined = currentQuestionList[safeIndex];

  useEffect(() => {
    if (safeIndex !== index) {
      setIndex(safeIndex);
    }
  }, [safeIndex, index, setIndex]);

  const goPrev = useCallback(() => {
    setIndex((i) => Math.max(0, i - 1));
  }, [setIndex]);

  const goNext = useCallback(() => {
    if (item) {
      setCompleted((prev) => new Set(prev).add(item.id));
    }
    setIndex((i) => Math.min(total - 1, i + 1));
  }, [setIndex, total, item, setCompleted]);

  const toggleBookmark = useCallback(
    (id: number) => {
      setBookmarks((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
    },
    [setBookmarks]
  );

  const shuffleQuestions = useCallback(() => {
    const indices = Array.from({ length: enrichedQuestions.length }, (_, i) => i);
    setRandomOrder(indices.sort(() => Math.random() - 0.5));
    setIndex(0);
  }, [enrichedQuestions.length, setIndex]);

  const resetProgress = useCallback(() => {
    if (confirm("Reset all progress? This cannot be undone.")) {
      setCompleted(new Set());
      setIndex(0);
    }
  }, [setCompleted, setIndex]);

  if (!item) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No questions match your filters</h2>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("");
              setSelectedDifficulty("");
              setMode("sequential");
            }}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Reset Filters
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-gradient-to-br from-gray-50 to-gray-100 py-8 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto max-w-5xl px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Angular Senior Interview Prep
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Master 100 essential questions for your next senior Angular interview
          </p>
        </div>

        {/* Stats */}
        <div className="mb-6">
          <StatsPanel
            total={enrichedQuestions.length}
            completed={completed.size}
            bookmarked={bookmarks.size}
          />
        </div>

        {/* Mode Selector */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <div className="flex rounded-lg border border-gray-300 bg-white p-1 dark:border-gray-600 dark:bg-gray-800">
            <button
              onClick={() => setMode("sequential")}
              className={`rounded px-4 py-1.5 text-sm font-medium transition-colors ${
                mode === "sequential"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              Sequential
            </button>
            <button
              onClick={() => {
                setMode("random");
                shuffleQuestions();
              }}
              className={`rounded px-4 py-1.5 text-sm font-medium transition-colors ${
                mode === "random"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              🎲 Random
            </button>
            <button
              onClick={() => setMode("bookmarked")}
              className={`rounded px-4 py-1.5 text-sm font-medium transition-colors ${
                mode === "bookmarked"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
              disabled={bookmarks.size === 0}
            >
              ⭐ Bookmarked ({bookmarks.size})
            </button>
          </div>

          <button
            onClick={resetProgress}
            className="rounded-lg border border-gray-300 px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Reset Progress
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <SearchBar
            onSearch={setSearchQuery}
            onClear={() => setSearchQuery("")}
          />
        </div>

        {/* Filters */}
        <div className="mb-6">
          <FilterPanel
            questions={enrichedQuestions}
            selectedCategory={selectedCategory}
            selectedDifficulty={selectedDifficulty}
            onCategoryChange={setSelectedCategory}
            onDifficultyChange={setSelectedDifficulty}
          />
        </div>

        {/* Question Navigation */}
        <div className="mb-4 flex items-center justify-between">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing {total} question{total !== 1 ? "s" : ""}
          </div>
          <select
            aria-label="Jump to question"
            value={safeIndex}
            onChange={(e) => setIndex(Number(e.target.value))}
            className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm dark:border-gray-600 dark:bg-gray-800"
          >
            {currentQuestionList.map((q, i) => (
              <option key={q.id} value={i}>
                Q{i + 1}: {q.question.slice(0, 50)}...
              </option>
            ))}
          </select>
        </div>

        {/* Question Card */}
        <QuestionCard
          item={item}
          index={safeIndex}
          total={total}
          onPrev={goPrev}
          onNext={goNext}
          canPrev={safeIndex > 0}
          canNext={safeIndex < total - 1}
          isBookmarked={bookmarks.has(item.id)}
          isCompleted={completed.has(item.id)}
          onToggleBookmark={() => toggleBookmark(item.id)}
        />
      </div>
    </div>
  );
}


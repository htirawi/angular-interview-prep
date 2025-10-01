import { useCallback, useEffect, useMemo, useState } from "react";
import QuestionCardPro from "./components/QuestionCard-pro";
import Sidebar from "./components/Sidebar";
import { QUESTIONS, type QA } from "./data/questions";
import { enrichQuestions } from "./utils/questionMetadata";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { ErrorBoundary } from "./core/components/ErrorBoundary";
import { useToast } from "./shared/hooks/useToast";
import Toast from "./shared/components/Toast";
import { STORAGE_KEYS } from "./shared/constants/app";

type Mode = "sequential" | "random" | "bookmarked";

export default function App() {
  const enrichedQuestions = useMemo(() => enrichQuestions(QUESTIONS), []);
  const [index, setIndex] = useLocalStorage<number>(STORAGE_KEYS.INDEX, 0);
  const [completed, setCompleted] = useLocalStorage<Set<number>>(STORAGE_KEYS.COMPLETED, new Set());
  const [bookmarks, setBookmarks] = useLocalStorage<Set<number>>(STORAGE_KEYS.BOOKMARKS, new Set());
  const [mode, setMode] = useLocalStorage<Mode>(STORAGE_KEYS.MODE, "sequential");
  const [notes, setNotes] = useLocalStorage<Record<number, string>>(STORAGE_KEYS.NOTES, {});

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [randomOrder, setRandomOrder] = useState<number[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { toasts, removeToast, success, warning } = useToast();

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
          q.category?.toLowerCase().includes(query) ||
          q.tags?.some((tag) => tag.toLowerCase().includes(query))
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
    if (item && !completed.has(item.id)) {
      setCompleted((prev) => new Set(prev).add(item.id));
      success("Question marked as completed!");
    }
    setIndex((i) => Math.min(total - 1, i + 1));
  }, [setIndex, total, item, setCompleted, completed, success]);

  const toggleBookmark = useCallback(
    (id: number) => {
      setBookmarks((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
          warning("Bookmark removed");
        } else {
          next.add(id);
          success("Question bookmarked!");
        }
        return next;
      });
    },
    [setBookmarks, success, warning]
  );

  const shuffleQuestions = useCallback(() => {
    const indices = Array.from({ length: enrichedQuestions.length }, (_, i) => i);
    setRandomOrder(indices.sort(() => Math.random() - 0.5));
    setIndex(0);
    success("Questions shuffled!");
  }, [enrichedQuestions.length, setIndex, success]);

  const resetProgress = useCallback(() => {
    if (confirm("Reset all progress? This cannot be undone.")) {
      setCompleted(new Set());
      setIndex(0);
      success("Progress reset!");
    }
  }, [setCompleted, setIndex, success]);

  const saveNote = useCallback(
    (questionId: number, note: string) => {
      setNotes((prev) => ({ ...prev, [questionId]: note }));
      success("Note saved!");
    },
    [setNotes, success]
  );

  if (!item) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            No questions match your filters
          </h2>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("");
              setSelectedDifficulty("");
              setMode("sequential");
            }}
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Reset Filters
          </button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          // Stats
          totalQuestions={enrichedQuestions.length}
          completed={completed.size}
          bookmarked={bookmarks.size}
          // Mode
          mode={mode}
          onModeChange={(newMode) => {
            setMode(newMode);
            if (newMode === "random") shuffleQuestions();
          }}
          // Search & Filters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          questions={enrichedQuestions}
          selectedCategory={selectedCategory}
          selectedDifficulty={selectedDifficulty}
          onCategoryChange={setSelectedCategory}
          onDifficultyChange={setSelectedDifficulty}
          // Actions
          onResetProgress={resetProgress}
          currentIndex={safeIndex}
          totalFiltered={total}
          onJumpToQuestion={setIndex}
          questionList={currentQuestionList}
        />

        {/* Main Content - Focused on Questions */}
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? "lg:ml-80" : "ml-0"}`}>
          <div className="container mx-auto max-w-4xl px-4 py-8 md:px-8 md:py-12">
            <QuestionCardPro
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
              note={notes[item.id]}
              onSaveNote={(note) => saveNote(item.id, note)}
            />
          </div>
        </main>

        {/* Toast Notifications */}
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              message={toast.message}
              type={toast.type}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </div>
      </div>
    </ErrorBoundary>
  );
}

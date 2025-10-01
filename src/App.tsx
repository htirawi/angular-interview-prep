import { useCallback, useEffect, useMemo, useState } from "react";
import QuestionCardPro from "./components/QuestionCard-pro";
import Sidebar from "./components/Sidebar";
import FrameworkSelector from "./components/FrameworkSelector";
import FrameworkSwitcher from "./components/FrameworkSwitcher";
import {
  QUESTIONS,
  NEXTJS_QUESTIONS,
  REACT_QUESTIONS,
  REDUX_QUESTIONS,
  type QA,
  type QuestionSetId,
} from "./data";
import { enrichQuestions } from "./utils/questionMetadata";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { ErrorBoundary } from "./core/components/ErrorBoundary";
import { useToast } from "./shared/hooks/useToast";
import Toast from "./shared/components/Toast";
import { STORAGE_KEYS } from "./shared/constants/app";

type Mode = "sequential" | "random" | "bookmarked";

// Framework-specific storage keys
const getFrameworkKey = (framework: QuestionSetId, key: string) => `${framework}_${key}`;

export default function App() {
  // Framework selection
  const [selectedFramework, setSelectedFramework] = useLocalStorage<QuestionSetId>(
    STORAGE_KEYS.SELECTED_FRAMEWORK,
    "angular"
  );
  const [showFrameworkModal, setShowFrameworkModal] = useState(false);

  // Check if first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem(STORAGE_KEYS.SELECTED_FRAMEWORK);
    if (!hasVisited) {
      setShowFrameworkModal(true);
    }
  }, []);

  // Get questions for selected framework
  const allFrameworkQuestions = useMemo(() => {
    switch (selectedFramework) {
      case "nextjs":
        return NEXTJS_QUESTIONS;
      case "react":
        return REACT_QUESTIONS;
      case "redux":
        return REDUX_QUESTIONS;
      default:
        return QUESTIONS;
    }
  }, [selectedFramework]);

  const enrichedQuestions = useMemo(
    () => enrichQuestions(allFrameworkQuestions),
    [allFrameworkQuestions]
  );

  // Framework-specific state
  const [index, setIndex] = useLocalStorage<number>(
    getFrameworkKey(selectedFramework, STORAGE_KEYS.INDEX),
    0
  );
  const [completed, setCompleted] = useLocalStorage<Set<number>>(
    getFrameworkKey(selectedFramework, STORAGE_KEYS.COMPLETED),
    new Set()
  );
  const [bookmarks, setBookmarks] = useLocalStorage<Set<number>>(
    getFrameworkKey(selectedFramework, STORAGE_KEYS.BOOKMARKS),
    new Set()
  );
  const [mode, setMode] = useLocalStorage<Mode>(
    getFrameworkKey(selectedFramework, STORAGE_KEYS.MODE),
    "sequential"
  );
  const [notes, setNotes] = useLocalStorage<Record<number, string>>(
    getFrameworkKey(selectedFramework, STORAGE_KEYS.NOTES),
    {}
  );

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

  // Handle framework change
  const handleFrameworkChange = useCallback(
    (framework: QuestionSetId) => {
      setSelectedFramework(framework);
      setIndex(0); // Reset to first question
      success(`Switched to ${framework}! 🎉`);
    },
    [setSelectedFramework, setIndex, success]
  );

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
          success("Bookmarked! ⭐");
        }
        return next;
      });
    },
    [setBookmarks, success, warning]
  );

  const saveNote = useCallback(
    (note: string) => {
      if (item) {
        setNotes((prev) => ({ ...prev, [item.id]: note }));
        success("Note saved!");
      }
    },
    [item, setNotes, success]
  );

  const handleReset = useCallback(() => {
    if (window.confirm(`Reset all progress for ${selectedFramework}? This cannot be undone.`)) {
      setCompleted(new Set());
      setBookmarks(new Set());
      setNotes({});
      setIndex(0);
      success("Progress reset!");
    }
  }, [selectedFramework, setCompleted, setBookmarks, setNotes, setIndex, success]);

  const handleJump = useCallback(
    (targetIndex: number) => {
      setIndex(targetIndex);
    },
    [setIndex]
  );

  return (
    <ErrorBoundary>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          totalQuestions={enrichedQuestions.length}
          completed={completed.size}
          bookmarked={bookmarks.size}
          mode={mode}
          onModeChange={setMode}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          questions={enrichedQuestions}
          selectedCategory={selectedCategory}
          selectedDifficulty={selectedDifficulty}
          onCategoryChange={setSelectedCategory}
          onDifficultyChange={setSelectedDifficulty}
          onResetProgress={handleReset}
          currentIndex={safeIndex}
          totalFiltered={total}
          onJumpToQuestion={handleJump}
          questionList={currentQuestionList}
        >
          {/* Framework Switcher in Sidebar */}
          <FrameworkSwitcher
            currentFramework={selectedFramework}
            onSwitch={handleFrameworkChange}
            onOpenModal={() => setShowFrameworkModal(true)}
          />
        </Sidebar>

        <main className="min-h-screen flex-1 lg:ml-80">
          <div className="mx-auto max-w-4xl px-4 py-8">
            {item ? (
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
                note={notes[item.id] || ""}
                onSaveNote={saveNote}
              />
            ) : (
              <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <p className="text-gray-600 dark:text-gray-400">
                  No questions match your filters. Try adjusting your search or filters.
                </p>
              </div>
            )}
          </div>
        </main>

        {/* Framework Selector Modal */}
        <FrameworkSelector
          isOpen={showFrameworkModal}
          onClose={() => setShowFrameworkModal(false)}
          onSelect={handleFrameworkChange}
          currentFramework={selectedFramework}
        />

        {/* Toast Notifications */}
        <Toast toasts={toasts} onClose={removeToast} />
      </div>
    </ErrorBoundary>
  );
}

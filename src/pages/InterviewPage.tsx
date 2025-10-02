import { useCallback, useEffect, useState } from "react";
import QuestionCard from "../components/study/QuestionCard";
import Sidebar from "../components/layout/Sidebar";
import { QUESTION_SETS } from "../data";
import { FrameworkIcon } from "../components/common/icons/FrameworkIcon";
import { ErrorBoundary } from "../core/components/ErrorBoundary";
import { useToast } from "../shared/hooks/useToast";
import Toast from "../shared/components/Toast";
import { useFrameworkManager } from "../hooks/useFrameworkManager";
import { useQuestionNavigation } from "../hooks/useQuestionNavigation";
import { useProgressManager } from "../hooks/useProgressManager";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";
import { QuestionService } from "../services/QuestionService";
import { SidebarProvider } from "../contexts/SidebarContext";
import type { Question } from "../types";

/**
 * Refactored InterviewPage component with clean separation of concerns
 * Uses custom hooks and services for better maintainability
 */
export default function InterviewPage() {
  const { toasts, removeToast, success, warning } = useToast();

  // Framework management
  const { selectedFramework, isValidFramework, enrichedQuestions, navigate, isLoading, error } =
    useFrameworkManager();

  // Progress management
  const {
    index,
    completed,
    bookmarks,
    mode,
    notes,
    setIndex,
    setMode,
    goPrev,
    goNext,
    handleJump,
    toggleBookmark,
    saveNote,
    handleReset,
  } = useProgressManager(selectedFramework, success, warning);

  // Question navigation and filtering
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedDifficulty,
    setSelectedDifficulty,
    currentQuestionList,
  } = useQuestionNavigation(enrichedQuestions, bookmarks, mode);

  // UI state - start with sidebar closed on mobile, open on desktop
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Auto-open sidebar on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    // Set initial state
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate current question and safe index
  const total = currentQuestionList.length;
  const safeIndex = QuestionService.getSafeIndex(index, total);
  const item: Question | undefined = currentQuestionList[safeIndex];

  // Update index when safe index changes
  useEffect(() => {
    if (safeIndex !== index) {
      setIndex(safeIndex);
    }
  }, [safeIndex, index, setIndex]);

  // Navigation handlers
  const handlePrev = useCallback(() => {
    goPrev();
  }, [goPrev]);

  const handleNext = useCallback(() => {
    goNext(item, total);
  }, [goNext, item, total]);

  const handleToggleBookmark = useCallback(() => {
    if (item) {
      toggleBookmark(item.id);
    }
  }, [item, toggleBookmark]);

  const handleSaveNote = useCallback(
    (note: string) => {
      saveNote(note, item);
    },
    [saveNote, item]
  );

  const handleFrameworkChange = useCallback(
    (newFramework: string) => {
      navigate(`/study/${newFramework}`);
      success(`Switched to ${newFramework}! 🎉`);
    },
    [navigate, success]
  );

  const handleBackToHome = useCallback(() => {
    navigate("/");
  }, [navigate]);

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onNextQuestion: handleNext,
    onPreviousQuestion: handlePrev,
    onToggleBookmark: handleToggleBookmark,
    onRandomQuestion: () => {
      const randomIndex = Math.floor(Math.random() * total);
      setIndex(randomIndex);
    },
  });

  // Early return for invalid framework
  if (!isValidFramework) {
    return null; // Will redirect
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="mb-4 h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Loading {selectedFramework} questions...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="mb-4 text-6xl">😞</div>
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            Failed to Load Questions
          </h2>
          <p className="mb-6 text-gray-600 dark:text-gray-400">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Sidebar context value
  const sidebarContextValue = {
    currentFramework: selectedFramework,
    totalQuestions: enrichedQuestions.length,
    completed: completed.size,
    bookmarked: bookmarks.size,
    mode,
    onModeChange: setMode,
    searchQuery,
    onSearchChange: setSearchQuery,
    questions: enrichedQuestions,
    selectedCategory,
    selectedDifficulty,
    onCategoryChange: setSelectedCategory,
    onDifficultyChange: setSelectedDifficulty,
    onResetProgress: handleReset,
    currentIndex: safeIndex,
    totalFiltered: total,
    onJumpToQuestion: handleJump,
    questionList: currentQuestionList,
  };

  return (
    <ErrorBoundary>
      <SidebarProvider value={sidebarContextValue}>
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
          <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)}>
            {/* Back to Home + Framework Switcher */}
            <div className="mb-6 space-y-3">
              <button
                onClick={handleBackToHome}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <span>Change Framework</span>
              </button>

              {/* Quick Framework Switch */}
              <div className="grid grid-cols-4 gap-2">
                {QUESTION_SETS.map((set) => (
                  <button
                    key={set.id}
                    onClick={() => handleFrameworkChange(set.id)}
                    disabled={set.id === selectedFramework}
                    className={`flex flex-col items-center gap-1 rounded-lg border p-2 text-center transition-all ${
                      set.id === selectedFramework
                        ? "border-blue-500 bg-blue-50 dark:border-blue-600 dark:bg-blue-900/20"
                        : "border-gray-200 hover:scale-105 hover:border-blue-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:border-blue-600 dark:hover:bg-gray-700"
                    }`}
                    title={set.name}
                  >
                    <FrameworkIcon framework={set.icon} size={20} />
                    <div
                      className={`text-[10px] font-medium ${
                        set.id === selectedFramework
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {set.name.split(" ")[0]}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </Sidebar>

          <main className="min-h-screen flex-1 overflow-hidden lg:ml-80">
            <div className="w-full overflow-hidden px-2 py-2 sm:mx-auto sm:max-w-4xl sm:px-6 sm:py-6 lg:max-w-6xl lg:px-8 lg:py-8">
              {item ? (
                <QuestionCard
                  item={item}
                  index={safeIndex}
                  total={total}
                  onPrev={handlePrev}
                  onNext={handleNext}
                  canPrev={safeIndex > 0}
                  canNext={safeIndex < total - 1}
                  isBookmarked={QuestionService.isBookmarked(item.id, bookmarks)}
                  isCompleted={QuestionService.isCompleted(item.id, completed)}
                  onToggleBookmark={handleToggleBookmark}
                  note={notes[item.id] || ""}
                  onSaveNote={handleSaveNote}
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

          {/* Toast Notifications */}
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              message={toast.message}
              type={toast.type}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </div>
      </SidebarProvider>
    </ErrorBoundary>
  );
}

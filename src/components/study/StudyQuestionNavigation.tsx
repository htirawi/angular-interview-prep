/**
 * Study Question Navigation Component
 */

import type { QuestionNavigationProps } from "../../types/study-components";

export function StudyQuestionNavigation({
  canPrev,
  canNext,
  onPrev,
  onNext,
  studyTime,
}: QuestionNavigationProps) {
  const formatTime = (seconds: number) => {
    if (seconds === 0) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="border-t border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/50">
      {/* Mobile hint */}
      <div className="px-3 py-2 text-center sm:hidden">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          💡 Swipe left/right or tap buttons to navigate
        </p>
      </div>

      {/* Navigation */}
      <div className="px-3 py-4 sm:px-6 sm:py-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <button
            onClick={onPrev}
            disabled={!canPrev}
            className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 active:scale-95 sm:gap-3 sm:px-6 sm:py-3 sm:text-base ${
              canPrev
                ? "bg-white text-gray-700 shadow-md hover:bg-gray-50 hover:shadow-lg active:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:active:bg-gray-600"
                : "cursor-not-allowed bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-600"
            }`}
          >
            <svg
              className="h-4 w-4 sm:h-5 sm:w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="hidden sm:inline">Previous</span>
            <span className="sm:hidden">Prev</span>
          </button>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="text-center">
              <div className="text-xs text-gray-500 dark:text-gray-400 sm:text-sm">Study Time</div>
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 sm:text-lg">
                {formatTime(studyTime)}
              </div>
            </div>
          </div>

          <button
            onClick={onNext}
            disabled={!canNext}
            className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 active:scale-95 sm:gap-3 sm:px-6 sm:py-3 sm:text-base ${
              canNext
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md hover:from-blue-700 hover:to-purple-700 hover:shadow-lg active:from-blue-800 active:to-purple-800"
                : "cursor-not-allowed bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-600"
            }`}
          >
            <span className="hidden sm:inline">Next</span>
            <span className="sm:hidden">Next</span>
            <svg
              className="h-4 w-4 sm:h-5 sm:w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

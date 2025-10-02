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
    <div className="border-t border-gray-200 bg-gray-50 px-8 py-6 dark:border-gray-700 dark:bg-gray-900/50">
      <div className="flex items-center justify-between">
        <button
          onClick={onPrev}
          disabled={!canPrev}
          className={`inline-flex items-center gap-3 rounded-xl px-6 py-3 text-base font-medium transition-all duration-200 ${
            canPrev
              ? "bg-white text-gray-700 shadow-md hover:bg-gray-50 hover:shadow-lg dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              : "cursor-not-allowed bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-600"
          }`}
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

        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-sm text-gray-500 dark:text-gray-400">Study Time</div>
            <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              {formatTime(studyTime)}
            </div>
          </div>
        </div>

        <button
          onClick={onNext}
          disabled={!canNext}
          className={`inline-flex items-center gap-3 rounded-xl px-6 py-3 text-base font-medium transition-all duration-200 ${
            canNext
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md hover:from-blue-700 hover:to-purple-700 hover:shadow-lg"
              : "cursor-not-allowed bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-600"
          }`}
        >
          Next
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

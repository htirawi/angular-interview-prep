/**
 * Action Buttons Component for Quiz Results
 */

import type { ActionButtonsProps } from "../../../types/quiz-results";

export function ActionButtons({ onRestart, onBackToSelection }: ActionButtonsProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
      <button
        onClick={onRestart}
        className="group relative flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 sm:px-8"
      >
        {/* Background glow effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-75" />

        {/* Content */}
        <div className="relative flex items-center gap-2">
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
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          <span className="text-sm sm:text-base">Try Again</span>
        </div>
      </button>

      <button
        onClick={onBackToSelection}
        className="group relative flex items-center justify-center gap-2 rounded-xl border-2 border-purple-600 bg-white px-6 py-3 font-semibold text-purple-600 transition-all duration-300 hover:scale-105 hover:bg-purple-50 active:scale-95 dark:border-purple-400 dark:bg-gray-800 dark:text-purple-400 dark:hover:bg-purple-900/20 sm:px-8"
      >
        {/* Background glow effect */}
        <div className="absolute inset-0 rounded-xl bg-purple-600 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-10" />

        {/* Content */}
        <div className="relative flex items-center gap-2">
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span className="text-sm sm:text-base">Back to Selection</span>
        </div>
      </button>
    </div>
  );
}

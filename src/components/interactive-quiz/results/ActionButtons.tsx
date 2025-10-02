/**
 * Action Buttons Component for Quiz Results
 */

import type { ActionButtonsProps } from "../../../types/quiz-results";

export function ActionButtons({ onRestart, onBackToSelection }: ActionButtonsProps) {
  return (
    <div className="flex justify-center gap-4">
      <button
        onClick={onRestart}
        className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-3 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        Try Again
      </button>

      <button
        onClick={onBackToSelection}
        className="flex items-center gap-2 rounded-xl border-2 border-purple-600 px-8 py-3 font-semibold text-purple-600 transition-all hover:scale-105 hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-900/20"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Selection
      </button>
    </div>
  );
}

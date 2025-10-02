interface PreviousQuestionButtonProps {
  canPrevious: boolean;
  onPrevious: () => void;
}

/**
 * Floating Previous Question button positioned on the left side
 * Mirrors the Next Question button for consistent navigation
 */
export function PreviousQuestionButton({ canPrevious, onPrevious }: PreviousQuestionButtonProps) {
  if (!canPrevious) return null;

  return (
    <div className="fixed left-[22rem] top-1/2 z-50 -translate-y-1/2">
      <button
        onClick={onPrevious}
        className="group flex flex-col items-center gap-2 rounded-2xl bg-white px-4 py-6 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:bg-gray-800"
        aria-label="Previous Question"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg transition-transform group-hover:scale-110">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 17l-5-5m0 0l5-5m-5 5h12"
            />
          </svg>
        </div>
        <div className="text-center">
          <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">Previous</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Question</div>
        </div>
      </button>
    </div>
  );
}
